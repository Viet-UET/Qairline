import React, { useEffect } from 'react';
import styles from './Promotion.module.css';
import Header from './Header';
import Footer from './Footer';

// IMPORT ẢNH (Dùng ảnh hồ nước/núi cho Hero)
// Bạn thay bằng ảnh thật trong folder Assets nhé
import imgPromo_1 from '../Assets/Promo_1.png'; 
import imgPromo_2 from '../Assets/Promo_2.png';


function Promotion() {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Dữ liệu Vé Nội Địa
    const domesticFlights = [
        { id: 1, from: "Thành phố Hà Nội đến", to: "Đà Nẵng", price: "990,000", date: "01/12/2025 - 31/03/2026" },
        { id: 2, from: "Thành phố Hồ Chí Minh đến", to: "Hà Nội", price: "1,290,000", date: "15/11/2025 - 15/02/2026" },
        { id: 3, from: "Thành phố Hà Nội đến", to: "Phú Quốc", price: "1,590,000", date: "20/12/2025 - 30/03/2026" },
        { id: 4, from: "Thành phố Hồ Chí Minh đến", to: "Nha Trang", price: "890,000", date: "01/12/2025 - 28/02/2026" },
        { id: 5, from: "Thành phố Hà Nội đến", to: "Huế", price: "1,090,000", date: "01/01/2026 - 31/03/2026" },
        { id: 6, from: "Thành phố Hồ Chí Minh đến", to: "Đà Lạt", price: "980,000", date: "20/11/2025 - 30/03/2026" }
    ];

    // Dữ liệu Vé Quốc Tế
    const intlFlights = [
        { id: 1, from: "Thành phố Hà Nội đến", to: "Bangkok (Thái Lan)", price: "3,490,000", date: "20/11/2025 - 31/12/2025" },
        { id: 2, from: "Thành phố Hồ Chí Minh đến", to: "Dubai (UAE)", price: "17,900,000", date: "15/12/2025 - 31/03/2026" },
        { id: 3, from: "Thành phố Hồ Chí Minh đến", to: "Kuala Lumpur (Malaysia)", price: "3,790,000", date: "20/11/2025 - 30/01/2026" },
        { id: 4, from: "Thành phố Hà Nội đến", to: "Singapore", price: "4,390,000", date: "01/12/2025 - 15/03/2026" },
        { id: 5, from: "Thành phố Hà Nội đến", to: "Seoul (Hàn Quốc)", price: "9,900,000", date: "15/12/2025 - 30/04/2026" },
        { id: 6, from: "Thành phố Hồ Chí Minh đến", to: "Tuscany (Ý)", price: "19,980,000", date: "01/12/2025 - 15/12/2025" },
        { id: 7, from: "Thành phố Hà Nội đến", to: "Paris (Pháp)", price: "21,500,000", date: "10/01/2026 - 31/03/2026" },
        { id: 8, from: "Thành phố Hà Nội đến", to: "Tokyo (Nhật Bản)", price: "12,900,000", date: "01/02/2026 - 31/03/2026" },
        { id: 9, from: "Thành phố Hồ Chí Minh đến", to: "Luân Đôn (Anh)", price: "19,980,000", date: "01/12/2025 - 15/12/2025" }
    ];

    // Component nhỏ để render thẻ vé (giảm lặp code)
    const TicketCard = ({ item }) => (
        <div className={styles.ticketCard}>
            <div>
                <div className={styles.routeInfo}>{item.from}</div>
                <div className={styles.destination}>{item.to}</div>
                <div className={styles.tag}>Chỗ ngồi có hạn</div>
            </div>
            
            <div>
                <div className={styles.priceRow}>
                    <span className={styles.price}>{item.price}<sup style={{fontSize:'0.8rem'}}>đ</sup></span>
                </div>
                <div className={styles.dateRange}>{item.date}</div>
                <div className={styles.deadline}>
                    Hạn chót đăng ký: 23:59' ngày 31/12/2025 hoặc khi hết vé
                </div>
            </div>
        </div>
    );

    return (
        <div className={styles.container}>
            <Header />
            
            <main className={styles.wrapper}>
                
                {/* --- HERO SECTION --- */}
                {/* --- HERO SECTION (Sửa lại cấu trúc) --- */ }
                <section className={styles.hero}>
                    
                    {/* CỘT TRÁI: Text + Ảnh nhỏ */}
                    <div className={styles.heroLeft}>
                        {/* 1. Văn bản phía trên bên trái */}
                        <div className={styles.heroContent}>
                            <h1 className={styles.heroTitle}>Khám phá ưu đãi mỗi ngày <br/> cùng QAirline</h1>
                            <p className={styles.heroDesc}>
                                Tiết kiệm nhiều hơn khi đặt vé máy bay và khách sạn đến những điểm đến mơ ước. 
                                Cùng QAirline biến chuyến đi trong mơ của bạn thành hiện thực với mức giá hấp dẫn mỗi ngày!
                            </p>
                        </div>

                        {/* 2. Ảnh ở phía dưới bên trái */}
                        <img 
                            src={imgPromo_1} 
                            alt="Small Promo" 
                            className={styles.heroSmallImg} 
                        />
                    </div>

                    {/* CỘT PHẢI: Ảnh lớn */}
                    {/* 3. Ảnh ở bên phải */}
                    <div className={styles.heroRight}>
                        <img 
                            src={imgPromo_2} 
                            alt="Large Promo" 
                            className={styles.heroLargeImg} 
                        />
                    </div>
                </section>

                <p style={{fontSize:'0.8rem', fontStyle:'italic', color:'#1b5e20', marginBottom:'40px'}}>
                    * * Giá vé một chiều, chỉ áp dụng trên web. Không bao gồm hành lý ký gửi. Không có trên tất cả các chuyến bay hoặc ngày bay. Số lượng vé có hạn. Áp dụng các điều kiện.
                </p>

                {/* --- 2. DOMESTIC FLIGHTS --- */}
                <h2 className={styles.sectionTitle}>Ưu đãi bay trong nước</h2>
                
                {/* Filter Bar */}
                <div className={styles.filterBar}>
                    <input type="text" placeholder="Điểm khởi hành" className={styles.filterInput} />
                    <input type="text" placeholder="Điểm đến" className={styles.filterInput} />
                    <input type="text" placeholder="Tháng mong muốn" className={styles.filterInput} />
                    <div className={styles.searchIcon}>🔍</div>
                </div>

                <div className={styles.domesticSection}>
                    {/* List vé (Cột trái - Chiếm 2/3) */}
                    <div className={styles.ticketGridTwo}>
                        {domesticFlights.map(item => (
                            <TicketCard key={item.id} item={item} />
                        ))}
                    </div>

                    {/* Sidebar Đăng ký (Cột phải - Chiếm 1/3) */}
                    <aside className={styles.sidebar}>
                        <h3 className={styles.sidebarTitle}>Đăng ký Q-eflight News để cập nhật các thông tin, ưu đãi mới nhất</h3>
                        <p className={styles.sidebarDesc}>
                            (Không bao gồm thông tin ưu đãi dành riêng cho gói hội viên "Long-Lân-Quy-Phụng")
                        </p>
                        <input type="email" placeholder="Địa chỉ thư điện tử" className={styles.sidebarInput} />
                        <input type="text" placeholder="Ngôn ngữ: Tiếng Việt" className={styles.sidebarInput} />
                        <input type="text" placeholder="Thành phố khởi hành ưu tiên" className={styles.sidebarInput} />
                        
                        <div className={styles.sidebarCheckbox}>
                            <input type="checkbox" />
                            <span>Tôi muốn nhận các ưu đãi và tin tức từ QAirline. Tôi đã đọc và hiểu chính sách quyền riêng tư.</span>
                        </div>
                        <button className={styles.sidebarBtn}>Đăng ký</button>
                    </aside>
                </div>

                {/* --- 3. INTERNATIONAL FLIGHTS --- */}
                <h2 className={styles.sectionTitle}>Ưu đãi bay quốc tế</h2>
                 {/* Filter Bar (Lặp lại) */}
                 <div className={styles.filterBar}>
                    <input type="text" placeholder="Điểm khởi hành" className={styles.filterInput} />
                    <input type="text" placeholder="Điểm đến" className={styles.filterInput} />
                    <input type="text" placeholder="Tháng mong muốn" className={styles.filterInput} />
                    <div className={styles.searchIcon}>🔍</div>
                </div>

                <div className={styles.internationalSection}>
                    <div className={styles.ticketGridThree}>
                        {intlFlights.map(item => (
                            <TicketCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
}

export default Promotion;