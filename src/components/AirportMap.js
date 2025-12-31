import React, { useEffect } from 'react';
import styles from './AirportMap.module.css';
import Header from './Header';
import Footer from './Footer';

// IMPORT ẢNH
import imgHero from '../Assets/plane_2.png'; 
import imgMapDomestic from '../Assets/domestic.jpg'; // Thay bằng ảnh bản đồ VN
import imgMapWorld from '../Assets/international.png';   // Thay bằng ảnh bản đồ TG

// --- DỮ LIỆU SÂN BAY & ĐƯỜNG BAY (Trích xuất từ Promotion.js) ---

// 1. Danh sách các đường bay khai thác (Dùng để hiển thị list)
const DOMESTIC_ROUTES = [
    "Hà Nội ↔ TP. Hồ Chí Minh", "Hà Nội ↔ Đà Nẵng", "Hà Nội ↔ Phú Quốc", 
    "Hà Nội ↔ Nha Trang", "Hà Nội ↔ Huế", "Hà Nội ↔ Quy Nhơn", 
    "Hà Nội ↔ Buôn Ma Thuột", "Hà Nội ↔ Côn Đảo", "TP. Hồ Chí Minh ↔ Đà Nẵng", 
    "TP. Hồ Chí Minh ↔ Hà Nội", "TP. Hồ Chí Minh ↔ Phú Quốc", "TP. Hồ Chí Minh ↔ Đà Lạt",
    "TP. Hồ Chí Minh ↔ Thanh Hóa", "TP. Hồ Chí Minh ↔ Vân Đồn", "TP. Hồ Chí Minh ↔ Pleiku"
];

const INT_ROUTES = [
    "Hà Nội ↔ Bangkok (Thái Lan)", "Hà Nội ↔ Singapore", "Hà Nội ↔ Seoul (Hàn Quốc)", 
    "Hà Nội ↔ Tokyo (Nhật Bản)", "Hà Nội ↔ Paris (Pháp)", "Hà Nội ↔ Frankfurt (Đức)",
    "Hà Nội ↔ New York (Mỹ)", "TP. Hồ Chí Minh ↔ Dubai (UAE)", "TP. Hồ Chí Minh ↔ Kuala Lumpur",
    "TP. Hồ Chí Minh ↔ Sydney (Úc)", "TP. Hồ Chí Minh ↔ London (Anh)", "Đà Nẵng ↔ Incheon (Hàn Quốc)"
];

// 2. Danh sách Sân bay liên kết (Đầy đủ hơn)
const DOMESTIC_AIRPORTS = [
    { code: "HAN", name: "Quốc tế Nội Bài", city: "Hà Nội", web: "http://noibaiairport.vn/" },
    { code: "SGN", name: "Quốc tế Tân Sơn Nhất", city: "TP. Hồ Chí Minh", web: "http://tansonnhatairport.vn/" },
    { code: "DAD", name: "Quốc tế Đà Nẵng", city: "Đà Nẵng", web: "https://vietnamairport.vn/danangairport/" },
    { code: "CXR", name: "Quốc tế Cam Ranh", city: "Nha Trang", web: "http://camranh.aero/" },
    { code: "PQC", name: "Quốc tế Phú Quốc", city: "Phú Quốc", web: "https://vietnamairport.vn/phuquocairport/" },
    { code: "HUI", name: "Quốc tế Phú Bài", city: "Huế", web: "https://vietnamairport.vn/phubaiairport/" },
    { code: "DLI", name: "Sân bay Liên Khương", city: "Đà Lạt", web: "https://vietnamairport.vn/lienkhuongairport/" },
    { code: "HPH", name: "Quốc tế Cát Bi", city: "Hải Phòng", web: "https://vietnamairport.vn/catbiairport/" },
    { code: "VCA", name: "Quốc tế Cần Thơ", city: "Cần Thơ", web: "https://vietnamairport.vn/canthoairport/" },
    { code: "VDO", name: "Quốc tế Vân Đồn", city: "Quảng Ninh", web: "http://vandoniairport.vn/" },
    { code: "UIH", name: "Sân bay Phù Cát", city: "Quy Nhơn", web: "https://vietnamairport.vn/phucatairport/" },
    { code: "VCS", name: "Sân bay Côn Đảo", city: "Bà Rịa - Vũng Tàu", web: "#" },
];

const INTERNATIONAL_AIRPORTS = [
    { code: "BKK", name: "Suvarnabhumi", city: "Bangkok, Thái Lan", web: "https://suvarnabhumi.airportthai.co.th/" },
    { code: "SIN", name: "Changi Airport", city: "Singapore", web: "https://www.changiairport.com/" },
    { code: "ICN", name: "Incheon Intl", city: "Seoul, Hàn Quốc", web: "https://www.airport.kr/" },
    { code: "NRT", name: "Narita Intl", city: "Tokyo, Nhật Bản", web: "https://www.narita-airport.jp/" },
    { code: "CDG", name: "Charles de Gaulle", city: "Paris, Pháp", web: "https://www.parisaeroport.fr/" },
    { code: "LHR", name: "Heathrow", city: "London, Anh", web: "https://www.heathrow.com/" },
    { code: "DXB", name: "Dubai International", city: "Dubai, UAE", web: "https://www.dubaiairports.ae/" },
    { code: "SYD", name: "Sydney Airport", city: "Sydney, Úc", web: "https://www.sydneyairport.com.au/" },
];

// ICON Component
const PlaneIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
);

const LocationIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);

function AirportMap() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.heroBanner} style={{backgroundImage: `url(${imgHero})`}}>
                
                <div className={styles.heroContent}>
                    <h1 className={styles.mainTitle}>Mạng lưới đường bay</h1>
                    <p className={styles.subTitle}>
                        QAirline tự hào kết nối bạn đến hơn 50 điểm đến hấp dẫn trong nước và quốc tế.
                    </p>
                </div>
            </div>
            

            {/* --- HERO BANNER --- */}
            

            {/* --- STATS --- */}
            <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                    <h3>50+</h3>
                    <p>Điểm đến</p>
                </div>
                <div className={styles.statItem}>
                    <h3>20+</h3>
                    <p>Quốc gia & Vùng lãnh thổ</p>
                </div>
                <div className={styles.statItem}>
                    <h3>400+</h3>
                    <p>Chuyến bay mỗi ngày</p>
                </div>
                <div className={styles.statItem}>
                    <h3>10M+</h3>
                    <p>Hành khách mỗi năm</p>
                </div>
            </div>

            {/* --- 1. GIỚI THIỆU ĐƯỜNG BAY ĐANG KHAI THÁC --- */}
            <section className={`${styles.sectionWrapper} ${styles.bgWhite}`}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Các đường bay trọng điểm</h2>
                    <p className={styles.sectionDesc}>
                        QAirline tự hào mang đến mạng lưới kết nối rộng khắp, giúp bạn dễ dàng di chuyển 
                        giữa các trung tâm kinh tế, văn hóa và du lịch lớn.
                    </p>
                </div>

                <div className={styles.routeContainer}>
                    {/* Cột Nội Địa */}
                    <div className={styles.routeColumn}>
                        <h3>Đường bay Nội địa</h3>
                        <ul className={styles.routeList}>
                            {DOMESTIC_ROUTES.map((route, idx) => (
                                <li key={idx} className={styles.routeItem}>
                                    <PlaneIcon /> {route}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cột Quốc Tế */}
                    <div className={styles.routeColumn}>
                        <h3>Đường bay Quốc tế</h3>
                        <ul className={styles.routeList}>
                            {INT_ROUTES.map((route, idx) => (
                                <li key={idx} className={styles.routeItem}>
                                    <PlaneIcon /> {route}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Sơ đồ chuyến bay (Ảnh) */}
                <div className={styles.mapImageContainer}>
                    <h2 className={styles.sectionTitle}>Sơ đồ mạng lưới đường bay Nội địa</h2>

                    <img src={imgMapDomestic} alt="Ban do noi dia" className={styles.mapImg} />
                    
                    <h2 className={styles.sectionTitle}>Sơ đồ mạng lưới đường bay Quốc tế</h2>
                    <img src={imgMapWorld} alt="Ban do quoc te" className={styles.mapImg} />
                </div>
            </section>

            {/* --- 2. SÂN BAY LIÊN KẾT & HUBS --- */}
            <section className={`${styles.sectionWrapper} ${styles.bgGray}`}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Sân bay liên kết</h2>
                    <p className={styles.sectionDesc}>
                        QAirline hợp tác với các cảng hàng không hàng đầu để đảm bảo trải nghiệm 
                        mặt đất tiện nghi và suôn sẻ nhất cho hành khách.
                    </p>
                </div>

                {/* Hubs */}
                <div className={styles.hubsGrid} style={{marginBottom: '60px'}}>
                    <div className={styles.hubCard}>
                        <div className={styles.hubIcon}>HAN</div>
                        <div className={styles.hubInfo}>
                            <h4>Trung tâm Nội Bài (Hà Nội)</h4>
                            <p>Cửa ngõ miền Bắc, kết nối thủ đô với thế giới. Phòng chờ Bông Sen hạng Thương gia 5 sao.</p>
                        </div>
                    </div>
                    <div className={styles.hubCard}>
                        <div className={styles.hubIcon}>SGN</div>
                        <div className={styles.hubInfo}>
                            <h4>Trung tâm Tân Sơn Nhất (TP.HCM)</h4>
                            <p>Đầu mối giao thương sầm uất nhất cả nước. Dịch vụ check-in nhanh Priority.</p>
                        </div>
                    </div>
                </div>

                {/* LIST SÂN BAY NỘI ĐỊA */}
                <h3 style={{color: '#004D40', marginBottom: '20px', marginLeft: '10px'}}>Mạng lưới Quốc nội</h3>
                <div className={styles.airportGrid}>
                    {DOMESTIC_AIRPORTS.map((apt, idx) => (
                        <div key={idx} className={styles.airportCard}>
                            <div>
                                <div className={styles.code}>{apt.code}</div>
                                <div className={styles.name}>{apt.name}</div>
                                <div className={styles.location}><LocationIcon /> {apt.city}</div>
                            </div>
                            <a href={apt.web} target="_blank" rel="noreferrer" className={styles.visitBtn}>
                                Website sân bay
                            </a>
                        </div>
                    ))}
                </div>

                {/* LIST SÂN BAY QUỐC TẾ */}
                <h3 style={{color: '#004D40', margin: '50px 0 20px 10px'}}>Mạng lưới Quốc tế</h3>
                <div className={styles.airportGrid}>
                    {INTERNATIONAL_AIRPORTS.map((apt, idx) => (
                        <div key={idx} className={styles.airportCard}>
                            <div>
                                <div className={styles.code}>{apt.code}</div>
                                <div className={styles.name}>{apt.name}</div>
                                <div className={styles.location}><LocationIcon /> {apt.city}</div>
                            </div>
                            <a href={apt.web} target="_blank" rel="noreferrer" className={styles.visitBtn}>
                                Website sân bay
                            </a>
                        </div>
                    ))}
                </div>
            </section>




        </div>
    );
}

export default AirportMap;