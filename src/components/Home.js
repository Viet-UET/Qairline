import React, { useState } from 'react';
import styles from './Home.module.css';
import Header from './Header';
import Footer from './Footer';

// IMPORT HÌNH ẢNH (Thay bằng ảnh thật trong Assets)
import imgAdelaide from '../Assets/milan.png'; // Ảnh Adelaide
import imgTuscany from '../Assets/sagrada_familia_1.png'; // Ảnh Tuscany
import imgMali from '../Assets/angko_wat.png'; // Ảnh Mali
import imgStudent from '../Assets/lourve.png'; // Ảnh ưu đãi sinh viên
import imgMember from '../Assets/sagrada_familia_2.png'; // Ảnh gói hội viên
import imgSponsor from '../Assets/angko_wat.png'; // Ảnh nhà tài trợ

function Home() {
    // State quản lý slide hiện tại
    const [currentSlide, setCurrentSlide] = useState(0);

    // Dữ liệu cho Slider (Hero)
    const slides = [
        {
            id: 1,
            label: "Hành trình khám phá",
            location: "ADELAIDE",
            desc: "Hãy bắt đầu lên kế hoạch cho danh sách những điều cần làm hàng đầu ở Adelaide để sẵn sàng lên đường...",
            img: imgAdelaide
        },
        {
            id: 2,
            label: "Điểm đến được yêu thích",
            location: "TUSCANY",
            desc: "Bên cạnh những công trình kiến trúc độc đáo, du lịch Tuscany còn mang đến cơ hội khám phá thiên nhiên...",
            img: imgTuscany
        },
        {
            id: 3,
            label: "Di sản thế giới tại",
            location: "MALI",
            desc: "Là một trong những kỳ quan của Châu Phi và là một trong những công trình tôn giáo độc đáo nhất...",
            img: imgMali
        }
    ];

    // Chuyển slide
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <div className={styles.homeWrapper}>
            <Header />

            {/* --- 1. HERO SLIDER SECTION --- */}
            <section className={styles.heroSection}>
                {/* Nút điều hướng */}
                <button className={`${styles.navArrow} ${styles.prevBtn}`} onClick={prevSlide}>&lt;</button>
                <button className={`${styles.navArrow} ${styles.nextBtn}`} onClick={nextSlide}>&gt;</button>

                {/* Render Slide hiện tại */}
                <div 
                    className={styles.slide} 
                    style={{backgroundImage: `url(${slides[currentSlide].img})`}}
                >
                    {/* Hộp nội dung xanh bên trái */}
                    <div className={styles.heroOverlay}>
                        <div className={styles.heroTitleLabel}>{slides[currentSlide].label}</div>
                        <div className={styles.heroLocation}>{slides[currentSlide].location}</div>
                        <p className={styles.heroDesc}>{slides[currentSlide].desc}</p>
                        <button className={styles.heroBtn}>Tìm hiểu thêm</button>
                    </div>
                </div>
            </section>

            {/* --- 2. SEARCH BOX (Đè lên banner) --- */}
            <div className={styles.searchContainer}>
                <div className={styles.searchHeader}>
                    <span>✈️ Tìm kiếm chuyến bay</span>
                </div>

                <div className={styles.searchFormGrid}>
                    {/* Input 1 */}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Điểm khởi hành</label>
                        <div className={styles.inputVal}>📍 Hà Nội</div>
                    </div>
                    {/* Input 2 */}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Điểm đến</label>
                        <div className={styles.inputVal}>📍 Chọn điểm đến</div>
                    </div>
                    {/* Input 3 */}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Thời gian xuất phát</label>
                        <div className={styles.inputVal}>📅 Thêm ngày</div>
                    </div>
                    {/* Nút tìm kiếm */}
                    <button className={styles.searchBtnCircle}>🔍</button>
                </div>

                {/* Tùy chọn dưới */}
                <div className={styles.searchOptions}>
                    <select className={styles.optionSelect}><option>Khứ hồi</option></select>
                    <select className={styles.optionSelect}><option>Phổ thông</option></select>
                    <select className={styles.optionSelect}><option>1 Hành khách</option></select>
                    <select className={styles.optionSelect}><option>Mã ưu đãi (nếu có)</option></select>
                </div>

                {/* Thông báo Alert */}
                <div className={styles.alerts}>
                    <div className={`${styles.alertBox} ${styles.alertGreen}`}>
                        <span>ⓘ</span>
                        <span>Bay cùng gia đình? Hãy chắc chắn rằng quý khách đã chuẩn bị đầy đủ giấy tờ...</span>
                    </div>
                    <div className={`${styles.alertBox} ${styles.alertGreen}`}>
                        <span>ⓘ</span>
                        <span>Thông tin trễ chuyến: Vui lòng theo dõi email để cập nhật thông tin...</span>
                    </div>
                     <div className={`${styles.alertBox} ${styles.alertYellow}`}>
                        <span>⚠️</span>
                        <span>Một người lớn có thể đi cùng tối đa 1 trẻ sơ sinh...</span>
                    </div>
                </div>
            </div>

            {/* --- 3. KHUYẾN MÃI HÀNG NGÀY --- */}
            <section className={styles.sectionWrapper}>
                <h2 className={styles.sectionTitle}>Khám phá khuyến mãi hàng ngày</h2>
                <p className={styles.sectionSub}>Tiết kiệm nhiều hơn khi đặt vé bay và khách sạn đến những điểm đến tuyệt vời.</p>

                <div className={styles.promoGrid}>
                    {/* Card Vé 1 */}
                    <div className={styles.ticketCard}>
                        <div className={styles.route}>Thành phố Hồ Chí Minh đến</div>
                        <div className={styles.destination}>Bangkok <span style={{fontSize:'0.8rem', color:'orange'}}>(Thái Lan)</span></div>
                        <span style={{background:'orange', color:'white', fontSize:'0.7rem', padding:'2px 5px', borderRadius:'3px'}}>Chỗ ngồi có hạn</span>
                        <div style={{marginTop:'10px', textAlign:'right'}}>
                            <span className={styles.price}>3,490,000<sup>đ</sup></span>
                        </div>
                        <span className={styles.dateInfo}>30/11/2025 - 31/12/2025</span>
                        <div style={{borderTop:'1px dashed #ddd', margin:'10px 0'}}></div>
                        <span className={styles.status}>Hạn chót đăng ký: 23h59 ngày 22/11/2025</span>
                    </div>

                    {/* Card Vé 2 */}
                    <div className={styles.ticketCard}>
                        <div className={styles.route}>Thành phố Hồ Chí Minh đến</div>
                        <div className={styles.destination}>Hà Nội</div>
                        <div style={{marginTop:'33px', textAlign:'right'}}>
                            <span className={styles.price} style={{color:'#e65100'}}>1,290,000<sup>đ</sup></span>
                        </div>
                        <span className={styles.dateInfo}>18/11/2025 - 15/03/2026</span>
                        <div style={{borderTop:'1px dashed #ddd', margin:'10px 0'}}></div>
                        <span className={styles.status}>Hạn chót đăng ký: 23h59 ngày 22/10/2025</span>
                    </div>

                    {/* Card CTA */}
                    <div className={styles.ctaCard}>
                        <span style={{fontSize:'2rem', marginBottom:'10px'}}>✈️</span>
                        <div className={styles.ctaText}>Bạn muốn xem thêm ưu đãi?</div>
                        <button className={styles.ctaBtn}>Xem tất cả các khuyến mãi</button>
                    </div>
                </div>
            </section>

            {/* --- 4. ƯU ĐÃI ĐẶC BIỆT --- */}
            <section className={styles.sectionWrapper}>
                <h2 className={styles.sectionTitle}>Ưu đãi đặc biệt</h2>
                
                <div className={styles.offersGrid}>
                    {/* Offer 1 */}
                    <div className={styles.offerCard}>
                        <img src={imgStudent} alt="Sinh viên" className={styles.offerImg} />
                        <h3 className={styles.offerTitle}>Ưu đãi dành cho sinh viên</h3>
                        <p className={styles.offerDesc}>Giá vé giảm đến 20%. Nâng niu hành lý. Wifi miễn phí và hơn thế nữa.</p>
                        <a href="#" className={styles.offerLink}>&gt;&gt; Tìm hiểu thêm</a>
                    </div>
                    {/* Offer 2 */}
                    <div className={styles.offerCard}>
                        <img src={imgMember} alt="Hội viên" className={styles.offerImg} />
                        <h3 className={styles.offerTitle}>Đăng ký gói hội viên</h3>
                        <p className={styles.offerDesc}>Sử dụng quyền lợi đặc biệt của hội viên để giảm giá vé, nâng cấp hạng ghế.</p>
                        <a href="#" className={styles.offerLink}>&gt;&gt; Tìm hiểu thêm</a>
                    </div>
                    {/* Offer 3 */}
                    <div className={styles.offerCard}>
                        <img src={imgSponsor} alt="Nhà tài trợ" className={styles.offerImg} />
                        <h3 className={styles.offerTitle}>Ưu đãi từ nhà tài trợ</h3>
                        <p className={styles.offerDesc}>Mã giảm giá đặc biệt đến từ những quý nhà tài trợ hảo tâm của QAirline.</p>
                        <a href="#" className={styles.offerLink}>&gt;&gt; Tìm hiểu thêm</a>
                    </div>
                </div>
            </section>

            {/* --- 5. NEWSLETTER --- */}
            <section className={styles.newsletterSection}>
                <h2 className={styles.newsTitle}>Đăng ký Q-eflight News</h2>
                
                <div className={styles.newsletterBox}>
                    <p className={styles.newsTitle} style={{fontSize:'1rem'}}>Đăng ký Q-eflight News để cập nhật các thông tin, ưu đãi mới nhất từ QAirline.</p>
                    <p className={styles.newsSub}>(Không bao gồm thông tin ưu đãi dành riêng cho gói hội viên "Long-Lân-Quy-Phụng")</p>
                    
                    <div className={styles.formRow}>
                        <input type="text" placeholder="Khách Thư Điện Tử" className={styles.newsInput} />
                        <input type="text" placeholder="Ngôn ngữ: Tiếng Việt" className={styles.newsInput} />
                        <input type="text" placeholder="Thành phố Khởi hành Ưu Tiên" className={styles.newsInput} />
                    </div>

                    <div className={styles.checkboxRow}>
                        <input type="checkbox" />
                        <span>Tôi muốn nhận các ưu đãi và tin tức từ QAirline. Tôi đã đọc và hiểu.</span>
                    </div>

                    <button className={styles.subscribeBtn}>Đăng ký</button>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Home;