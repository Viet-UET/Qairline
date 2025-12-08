import React, { useEffect } from "react";
import styles from './Article.module.css'; // Tái sử dụng CSS của bài viết

// IMPORT ẢNH (Bạn hãy thay bằng ảnh thật từ file thiết kế)
import imgHeader from '../Assets/null_island.png'; // Ảnh cầu và phố cổ (Header)
import imgFood from '../Assets/null_island.png';     // Ảnh món ăn (Soup/Meatballs)
import imgView from '../Assets/null_island.png';     // Ảnh cô gái ngắm thành phố từ trên cao

function StorySarajevo() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className={styles.articleMain}>
            <article className={styles['article-container']}>
                <h1>10 ngày dạo bước ở Sarajevo</h1>
                
                <p className={styles.subtitle}>
                    Tác giả: Annia Norwood | Thời gian đọc: 6 phút | Ngày viết: 13/05/2025
                </p>

                <img 
                    src={imgHeader} 
                    alt="Sarajevo Header" 
                    className="header-image" 
                    style={{width: '100%', borderRadius: '12px', margin: '20px 0'}}
                />

                <p style={{fontStyle: 'italic', color: '#555'}}>
                    "Xin chào mọi người, mình là Annia Norwood, một blogger du lịch yêu tự do và cái đẹp mộc mạc của thế giới. Mình luôn tin rằng, mỗi hành trình đều là một cuốn sách - và mỗi vùng đất mới là một chương chưa được viết."
                </p>
                <p>
                    Lần này, trang sách của mình mang tên Sarajevo – thủ đô của Bosnia và Herzegovina, thành phố nhỏ bé nằm giữa những dãy núi Ba Lan, nơi quá khứ và hiện tại hòa quyện một cách dịu dàng.
                </p>

                <h2>Vì Sao Lại Là Sarajevo?</h2>
                <p>
                    "Annia Norwood, tại sao lại là nơi đó, mà không phải là Paris lãng mạn hay London sầm uất?" - bạn mình đã hỏi như vậy. Câu trả lời thật đơn giản: Vì mình muốn tìm kiếm một vẻ đẹp "lạ".
                </p>
                <p>
                    Không choáng ngợp, hào nhoáng, Sarajevo mang vẻ đẹp của sự kiên cường, thăng trầm và hy vọng. Sarajevo là nơi những tiếng chuông nhà thờ hòa quyện với lời cầu nguyện từ các thánh đường Hồi giáo.
                </p>

                <h2>Ngày 1–2: Lạc Bước Ở Baščaršija – Trái Tim Cổ Kính</h2>
                <p>
                    Mình đã dành trọn 2 ngày đầu tiên để "lạc" ở khu phố cổ Baščaršija. Những con hẻm nhỏ lát đá, những cửa hàng đồ đồng thủ công, mùi cà phê Bosnia thơm nồng... tất cả tạo nên một không gian đậm chất Đông phương giữa lòng châu Âu.
                </p>
                <p>
                    Điểm nhấn không thể bỏ qua là đài phun nước Sebilj – biểu tượng của thành phố. Đứng ở đây, ngắm nhìn đàn bồ câu bay lượn và dòng người qua lại, mình cảm thấy thời gian như ngừng trôi.
                </p>

                <h2>Ngày 3–4: Khi Vị Giác Lên Tiếng... Ẩm Thực Sarajevo</h2>
                <p>
                    Ẩm thực ở đây là sự pha trộn tuyệt vời giữa hương vị Thổ Nhĩ Kỳ và Balkan. Mình đã thử món Cevapi (xúc xích thịt băm nướng ăn kèm bánh mì dẹt) và Burek (bánh nướng nhân thịt hoặc phô mai).
                </p>
                <img 
                    src={imgFood} 
                    alt="Ẩm thực Sarajevo" 
                    className="paragraph-image" 
                    style={{width: '100%', borderRadius: '12px', margin: '20px 0'}}
                />
                <p>
                    Một trải nghiệm thú vị khác là uống cà phê Bosnia. Cách pha chế và thưởng thức rất cầu kỳ, đậm đà và thường đi kèm với một viên kẹo dẻo Rahatlokum. Một buổi chiều ngồi nhâm nhi cà phê và ngắm phố phường là trải nghiệm "must-try".
                </p>

                <h2>Ngày 5–6: Dạo quanh thành phố của những tín ngưỡng</h2>
                <p>
                    Sarajevo được mệnh danh là "Jerusalem của Châu Âu". Thật hiếm có nơi nào mà trong cùng một khu phố, bạn có thể tìm thấy cả Nhà thờ Công giáo, Nhà thờ Chính thống giáo, Giáo đường Do Thái và Thánh đường Hồi giáo. Sự hòa hợp tôn giáo ở đây là một nét đẹp văn hóa đáng trân trọng.
                </p>

                <h2>Ngày 7–8: Khi Thiên nhiên lên tiếng – những góc xanh</h2>
                <p>
                    Mình đã đi cáp treo lên núi Trebević. Từ đây, bạn có thể ngắm toàn cảnh thành phố Sarajevo nằm gọn trong thung lũng. Cảm giác hít thở không khí trong lành và nhìn ngắm những mái nhà ngói đỏ bên dưới thật bình yên.
                </p>
                <img 
                    src={imgView} 
                    alt="Ngắm cảnh Sarajevo" 
                    className="paragraph-image" 
                    style={{width: '100%', borderRadius: '12px', margin: '20px 0'}}
                />

                <h2>Ngày 9–10: Thư giãn, mua sắm và tạm biệt Sarajevo</h2>
                <p>
                    Những ngày cuối, mình dành thời gian để mua sắm vài món quà lưu niệm. Những bộ ấm chén cà phê bằng đồng được chạm khắc tinh xảo là món quà tuyệt vời nhất. Mình cũng dành thời gian đi dạo dọc bờ sông Miljacka, nơi có cây cầu Latin lịch sử.
                </p>

                <h2>Kết lại...</h2>
                <p>
                    10 ngày ở Sarajevo trôi qua nhanh như một cái chớp mắt. Nhưng những ký ức thì sẽ còn đọng lại mãi. Sarajevo không lộng lẫy, nhưng "chạm" vào trái tim mình bằng sự chân thành, mộc mạc và kiên cường.
                </p>

                <hr style={{margin: '40px 0', border: '0', borderTop: '1px solid #eee'}} />

                <h2>Bạn có hứng thú với một chuyến du lịch trải nghiệm tại thành phố Sarajevo không? Hãy nhanh tay đặt vé nhé!</h2>
                <div className={styles['button']} style={{display: 'flex', justifyContent: 'center'}}>
                    <button className={styles['book-now-button']}>Đặt vé đến Sarajevo ngay</button>
                </div>
            </article>
        </main>
    );
}

export default StorySarajevo;