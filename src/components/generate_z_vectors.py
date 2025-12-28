import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset
import torchvision.transforms as transforms
import os
import cv2
import numpy as np
import pandas as pd
from tqdm import tqdm

# --- CẤU HÌNH ---
DATA_PATH = "final_dataset_clean"        # Thư mục ảnh sạch của bạn
CSV_PATH = "landmark_dataset_strictly_positive.csv" # File CSV landmark chuẩn
MODEL_PATH = "began_models/generator_epoch_27.pth"  # File model tốt nhất của bạn
OUTPUT_Z_FILE = "z_vectors_dataset.npz"  # File kết quả sẽ lưu

Z_DIM = 64
IMAGE_SIZE = 128
CHANNELS = 3
BATCH_SIZE = 50       # Tăng lên nếu GPU mạnh (GTX 1650 thì 32-50 là ổn)
OPTIM_STEPS = 500     # Số bước tìm kiếm Z cho mỗi ảnh (Paper không nói rõ, nhưng 500-1000 là chuẩn)
LR = 0.1              # Theo báo cáo: learning rate = 0.1
BETAS = (0.9, 0.999)  # Theo báo cáo

device = 'cuda' if torch.cuda.is_available() else 'cpu'

# --- 1. ĐỊNH NGHĨA MODEL (Copy y nguyên class Decoder) ---
class Decoder(nn.Module):
    def __init__(self):
        super(Decoder, self).__init__()
        self.fc = nn.Linear(Z_DIM, 8 * 8 * 64)
        self.layers = nn.Sequential(
            nn.Conv2d(64, 64, 3, 1, 1), nn.ELU(), nn.Upsample(scale_factor=2),
            nn.Conv2d(64, 64, 3, 1, 1), nn.ELU(), nn.Upsample(scale_factor=2),
            nn.Conv2d(64, 64, 3, 1, 1), nn.ELU(), nn.Upsample(scale_factor=2),
            nn.Conv2d(64, 64, 3, 1, 1), nn.ELU(), nn.Upsample(scale_factor=2),
            nn.Conv2d(64, 64, 3, 1, 1), nn.ELU(),
            nn.Conv2d(64, CHANNELS, 3, 1, 1), nn.Tanh()
        )
    def forward(self, x):
        x = self.fc(x)
        x = x.view(-1, 64, 8, 8)
        return self.layers(x)

# --- 2. DATASET ĐẶC BIỆT ---
# Trả về cả ảnh và tên file để ta biết Z nào của ảnh nào
class InverseDataset(Dataset):
    def __init__(self, root_dir, csv_file):
        self.root_dir = root_dir
        # Chỉ lấy những ảnh có trong CSV landmark để đảm bảo đồng bộ
        df = pd.read_csv(csv_file)
        self.files = df['image_id'].tolist()
        
        self.transform = transforms.Compose([
            transforms.ToPILImage(),
            transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
            transforms.ToTensor(),
            transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
        ])

    def __len__(self):
        return len(self.files)

    def __getitem__(self, idx):
        filename = self.files[idx]
        img_path = os.path.join(self.root_dir, filename)
        img = cv2.imread(img_path)
        if img is None:
            # Xử lý nếu file lỗi (trả về ảnh đen)
            return torch.zeros((3, IMAGE_SIZE, IMAGE_SIZE)), filename
            
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        return self.transform(img), filename

def main():
    print(f"--- BẮT ĐẦU TÌM Z VECTORS (INVERSE MAPPING) ---")
    print(f"Thiết bị: {device}")
    
    # 1. Load Generator đã train
    generator = Decoder().to(device)
    if os.path.exists(MODEL_PATH):
        # Load weights (chỉ cần weights, không cần optimizer state cũ)
        state_dict = torch.load(MODEL_PATH, map_location=device)
        # Nếu file save chứa cả 'generator_state_dict', hãy lấy nó ra
        if 'generator_state_dict' in state_dict:
            generator.load_state_dict(state_dict['generator_state_dict'])
        else:
            generator.load_state_dict(state_dict)
            
        print(f"Đã load model: {MODEL_PATH}")
    else:
        print(f"LỖI: Không tìm thấy model tại {MODEL_PATH}")
        return

    # Quan trọng: Chuyển sang chế độ eval và đóng băng trọng số
    generator.eval()
    for param in generator.parameters():
        param.requires_grad = False

    # 2. Chuẩn bị dữ liệu
    dataset = InverseDataset(DATA_PATH, CSV_PATH)
    dataloader = DataLoader(dataset, batch_size=BATCH_SIZE, shuffle=False, num_workers=0)
    
    print(f"Tổng số ảnh cần xử lý: {len(dataset)}")
    
    # Danh sách lưu kết quả
    z_list = []
    filename_list = []
    
    # 3. Vòng lặp tìm Z
    for i, (real_imgs, filenames) in tqdm(enumerate(dataloader), total=len(dataloader), unit="batch"):
        real_imgs = real_imgs.to(device)
        current_batch_size = real_imgs.size(0)
        
        # Khởi tạo Z ngẫu nhiên cho batch này
        # requires_grad=True để Adam có thể tối ưu hoá Z này
        z_batch = torch.randn((current_batch_size, Z_DIM), device=device, requires_grad=True)
        
        # Tạo Optimizer riêng cho batch Z này
        optimizer_z = optim.Adam([z_batch], lr=LR, betas=BETAS)
        
        # Vòng lặp tối ưu hoá (Inverse Optimization Loop)
        for step in range(OPTIM_STEPS):
            optimizer_z.zero_grad()
            
            # Sinh ảnh từ Z hiện tại
            gen_imgs = generator(z_batch)
            
            # Tính loss: Sự khác biệt giữa ảnh sinh ra và ảnh thật
            # Paper dùng: err = |x - G(z)| (L1 Loss)
            loss = torch.mean(torch.abs(real_imgs - gen_imgs))
            
            loss.backward()
            optimizer_z.step()
            
            # (Tùy chọn) Kẹp giá trị Z trong khoảng hợp lý [-1, 1] hoặc để thả nổi
            # Bài báo không nói rõ, nhưng thường để thả nổi sẽ tìm được ảnh giống hơn
            # z_batch.data.clamp_(-1, 1) 
        
        # Lưu kết quả sau khi tối ưu xong
        z_list.append(z_batch.detach().cpu().numpy())
        filename_list.extend(filenames)

    # 4. Gộp và Lưu xuống đĩa
    print("\nĐang lưu kết quả...")
    all_z = np.concatenate(z_list, axis=0) # Shape: (Total_Images, 64)
    all_filenames = np.array(filename_list)
    
    # Lưu dưới dạng file nén .npz của numpy
    np.savez_compressed(OUTPUT_Z_FILE, z_vectors=all_z, filenames=all_filenames)
    
    print(f"--- HOÀN TẤT ---")
    print(f"Đã lưu {len(all_z)} vector Z vào file: {OUTPUT_Z_FILE}")
    print("Bạn đã sẵn sàng cho Bước 4: Huấn luyện L-Gen!")

if __name__ == "__main__":
    main()