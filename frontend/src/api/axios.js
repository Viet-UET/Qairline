import axios from 'axios';

const api = axios.create({
  baseURL: "https://api.sbltsena.me/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Request Interceptor: Tự động đính kèm Token vào mỗi request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Response Interceptor: Xử lý lỗi tập trung (đặc biệt là 401 Unauthorized)
api.interceptors.response.use(
  (response) => response, // Nếu thành công thì trả về luôn
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra nếu lỗi 401 (hết hạn access token) và chưa từng thử refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Gọi API làm mới token (dựa trên Swagger: /auth/refresh-token)
        // Lưu ý: Dùng axios thường ở đây để tránh lặp vô tận (infinite loop)
        const response = await axios.post('https://api.sbltsena.me/api/auth/refresh-token', {
          refreshToken: refreshToken
        });

        const { accessToken, newRefreshToken } = response.data;

        // Lưu token mới vào storage
        localStorage.setItem('access_token', accessToken);
        if (newRefreshToken) localStorage.setItem('refresh_token', newRefreshToken);

        // Cập nhật lại header cho request ban đầu và thực hiện lại nó
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
        
      } catch (refreshError) {
        // Nếu refresh token cũng hết hạn -> Xóa sạch và đẩy về login
        console.error("Refresh token expired or invalid");
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Xử lý các lỗi khác như 403 (Forbidden), 500 (Server Error)
    return Promise.reject(error);
  }
);

export default api;