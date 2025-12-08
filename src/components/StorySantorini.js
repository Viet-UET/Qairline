import React, { useEffect } from "react";
import styles from './Article.module.css';

// IMPORT ẢNH (Thay bằng ảnh thật)
import imgHeader from '../Assets/null_island.png'; // Ảnh bìa hoàng hôn Oia
import imgWhite from '../Assets/null_island.png';   // Ảnh nhà trắng
import imgWine from '../Assets/null_island.png';     // Ảnh rượu vang & biển
import imgNight from '../Assets/null_island.png';   // Ảnh đêm đầy sao

function StorySantorini() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className={styles.articleMain}>
            <article className={styles['article-container']}>
                <h1>Một mùa hè ở Santorini</h1>
                
                <p className={styles.subtitle}>
                    Tác giả: Annia Norwood | Thời gian đọc: 5 phút | Ngày viết: 13/12/2025
                </p>

                <img 
                    src={imgHeader} 
                    alt="Santorini Header" 
                    className="header-image" 
                    style={{width: '100%', borderRadius: '12px', margin: '20px 0'}}
                />

                <p style={{fontStyle: 'italic', color: '#555'}}>
                    "Santorini là nơi mà ánh sáng có thể khiến bạn tin vào phép màu. Mỗi buổi hoàng hôn nơi đây như một lời thì thầm rằng: có những vẻ đẹp chỉ xuất hiện khi ta thật sự dừng lại để ngắm nhìn."
                </p>

                <h2>Vì sao lại là Santorini?</h2>
                <p>
                    Trong danh sách những điểm đến mơ ước của mọi tín đồ du lịch, Santorini luôn nằm ở vị trí đầu tiên. Hòn đảo thiên thần của Hy Lạp này không chỉ là những ngôi nhà trắng mái xanh, mà là nơi ánh sáng, gió biển và lịch sử hòa quyện.
                </p>

                <h2>Bình minh, gió và những bậc thang trắng</h2>
                <p>
                    Buổi sáng đầu tiên ở Oia, mình thức dậy khi những tia nắng đầu tiên chiếu xuống biển Aegean. Không gian tĩnh lặng, chỉ có tiếng gió và tiếng sóng vỗ.
                </p>
                <img 
                    src={imgWhite} 
                    alt="Kiến trúc trắng Santorini" 
                    className="paragraph-image" 
                    style={{width: '100%', borderRadius: '12px', margin: '20px 0'}}
                />
                <p>
                    Những ngôi nhà trắng tinh khôi xếp chồng lên nhau, bám vào vách đá dựng đứng tạo nên một khung cảnh siêu thực. Mình đã dành cả buổi sáng để lang thang qua những bậc thang nhỏ, lạc vào những con ngõ hẹp và chụp hàng trăm bức ảnh.
                </p>

                <h2>Vị rượu vang và những câu chuyện nắng gió</h2>
                <p>
                    Santorini không chỉ có biển, mà còn có những vườn nho tuyệt đẹp. Đất đai núi lửa ở đây tạo nên hương vị rượu vang Assyrtiko đặc trưng - mạnh mẽ, giòn tan và mang vị khoáng chất của biển.
                </p>
                <img 
                    src={imgWine} 
                    alt="Rượu vang và biển" 
                    className="paragraph-image" 
                    style={{width: '100%', borderRadius: '12px', margin: '20px 0'}}
                />
                <p>
                    Mình đã ghé thăm Santo Wines vào buổi chiều tà. Cầm ly rượu vang trắng lạnh, nhìn mặt trời từ từ lặn xuống biển Aegean, đó là khoảnh khắc mình cảm thấy cuộc sống thật trọn vẹn.
                </p>

                <h2>Biển đen, cát đỏ và sự yên bình tuyệt đối</h2>
                <p>
                    Santorini sở hữu những bãi biển độc nhất vô nhị: Biển Đỏ (Red Beach) với vách đá dựng đứng màu đỏ rực, và Biển Đen (Perissa) với bờ cát đen tuyền từ tro núi lửa.
                </p>
                <img 
                    src={imgNight} 
                    alt="Santorini về đêm" 
                    className="paragraph-image" 
                    style={{width: '100%', borderRadius: '12px', margin: '20px 0'}}
                />

                <h2>Đêm cuối cùng và giấc mơ mang tên Santorini</h2>
                <p>
                    Đêm cuối cùng, mình ngồi ở ban công khách sạn, nhìn xuống thị trấn Fira lung linh ánh đèn. Santorini về đêm không ồn ào, mà lấp lánh như một dải ngân hà rơi xuống mặt đất.
                </p>
                <p>
                    Tạm biệt hòn đảo của những giấc mơ. Santorini đã dạy mình cách sống chậm lại, hít thở sâu hơn và trân trọng từng khoảnh khắc đẹp đẽ của tự nhiên.
                </p>

                <hr style={{margin: '40px 0', border: '0', borderTop: '1px solid #eee'}} />

                <h2>Bạn có hứng thú với một chuyến du lịch trải nghiệm tại Santorini không? Hãy nhanh tay đặt vé nhé!</h2>
                <div className={styles['button']} style={{display: 'flex', justifyContent: 'center'}}>
                    <button className={styles['book-now-button']}>Đặt vé đến Santorini ngay</button>
                </div>
            </article>
        </main>
    );
}

export default StorySantorini;