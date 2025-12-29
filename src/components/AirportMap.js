import React, { useEffect } from 'react';
import styles from './AirportMap.module.css';
import Header from './Header';
import Footer from './Footer';

// IMPORT ẢNH HERO (Dùng chung với CustomerCommitment cho đồng bộ)
import imgHero from '../Assets/plane_2.png'; 

// IMPORT ẢNH SƠ ĐỒ (Bạn hãy thay bằng ảnh thật của bạn)
// Nếu chưa có, hãy tạo tạm 2 ảnh trống hoặc dùng ảnh có sẵn để test
import imgMapDomestic from '../Assets/Promo_1.png'; // Thay bằng sơ đồ VN
import imgMapWorld from '../Assets/Promo_2.png';   // Thay bằng sơ đồ Thế giới

// DỮ LIỆU SÂN BAY
const DOMESTIC_AIRPORTS = [
    { code: "HAN", name: "Sân bay Quốc tế Nội Bài", city: "Hà Nội", web: "http://noibaiairport.vn/" },
    { code: "SGN", name: "Sân bay Quốc tế Tân Sơn Nhất", city: "TP. Hồ Chí Minh", web: "http://tansonnhatairport.vn/" },
    { code: "DAD", name: "Sân bay Quốc tế Đà Nẵng", city: "Đà Nẵng", web: "https://vietnamairport.vn/danangairport/" },
    { code: "CXR", name: "Sân bay Quốc tế Cam Ranh", city: "Nha Trang", web: "http://camranh.aero/" },
    { code: "PQC", name: "Sân bay Quốc tế Phú Quốc", city: "Phú Quốc", web: "https://vietnamairport.vn/phuquocairport/" },
    { code: "HPH", name: "Sân bay Quốc tế Cát Bi", city: "Hải Phòng", web: "https://vietnamairport.vn/catbiairport/" },
];

const INTERNATIONAL_AIRPORTS = [
    { code: "BKK", name: "Sân bay Suvarnabhumi", city: "Bangkok, Thái Lan", web: "https://suvarnabhumi.airportthai.co.th/" },
    { code: "SIN", name: "Sân bay Changi", city: "Singapore", web: "https://www.changiairport.com/" },
    { code: "ICN", name: "Sân bay Incheon", city: "Seoul, Hàn Quốc", web: "https://www.airport.kr/" },
    { code: "NRT", name: "Sân bay Narita", city: "Tokyo, Nhật Bản", web: "https://www.narita-airport.jp/" },
    { code: "SYD", name: "Sân bay Kingsford Smith", city: "Sydney, Úc", web: "https://www.sydneyairport.com.au/" },
    { code: "CDG", name: "Sân bay Charles de Gaulle", city: "Paris, Pháp", web: "https://www.parisaeroport.fr/" },
];

function AirportMap() {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.container}>
            <Header />

            {/* HERO BANNER (Đã sửa lỗi chồng chéo - Code giống CustomerCommitment) */}
            <div className={styles.heroBanner} style={{backgroundImage: `url(${imgHero})`}}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <h1 className={styles.mainTitle}>Mạng lưới đường bay</h1>
                    <p className={styles.subTitle}>
                        QAirline tự hào kết nối bạn đến hơn 50 điểm đến hấp dẫn trong nước và quốc tế.
                    </p>
                </div>
            </div>

            {/* --- KHU VỰC SƠ ĐỒ (Thay thế bản đồ cũ) --- */ }
            <div className={styles.diagramWrapper}>
                
                {/* Sơ đồ 1: Nội địa */}
                <div className={styles.diagramCard}>
                    <h3 className={styles.diagramTitle}>Mạng lưới bay Nội địa</h3>
                    <img src={imgMapDomestic} alt="Sơ đồ bay nội địa" className={styles.diagramImage} />
                    <p style={{marginTop:'15px', color:'#666', fontSize:'0.9rem'}}>
                        Kết nối các thành phố lớn và điểm du lịch trọng điểm.
                    </p>
                </div>

                {/* Sơ đồ 2: Quốc tế */}
                <div className={styles.diagramCard}>
                    <h3 className={styles.diagramTitle}>Mạng lưới bay Thế giới</h3>
                    <img src={imgMapWorld} alt="Sơ đồ bay quốc tế" className={styles.diagramImage} />
                    <p style={{marginTop:'15px', color:'#666', fontSize:'0.9rem'}}>
                        Vươn xa tới 5 châu lục với các đường bay thẳng.
                    </p>
                </div>

            </div>

            {/* --- DANH SÁCH CHI TIẾT (Giữ nguyên) --- */}
            <div className={styles.listWrapper}>
                
                {/* SÂN BAY NỘI ĐỊA */}
                <h2 className={styles.sectionTitle}>Danh sách sân bay Nội địa</h2>
                <div className={styles.airportGrid}>
                    {DOMESTIC_AIRPORTS.map((apt, idx) => (
                        <div key={idx} className={styles.airportCard}>
                            <div>
                                <div className={styles.code}>{apt.code}</div>
                                <div className={styles.name}>{apt.name}</div>
                                <div className={styles.location}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                    {apt.city}
                                </div>
                            </div>
                            <a href={apt.web} target="_blank" rel="noreferrer" className={styles.visitBtn}>
                                Website sân bay
                            </a>
                        </div>
                    ))}
                </div>

                {/* SÂN BAY QUỐC TẾ */}
                <h2 className={styles.sectionTitle}>Danh sách sân bay Quốc tế</h2>
                <div className={styles.airportGrid}>
                    {INTERNATIONAL_AIRPORTS.map((apt, idx) => (
                        <div key={idx} className={styles.airportCard}>
                            <div>
                                <div className={styles.code}>{apt.code}</div>
                                <div className={styles.name}>{apt.name}</div>
                                <div className={styles.location}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                                    {apt.city}
                                </div>
                            </div>
                            <a href={apt.web} target="_blank" rel="noreferrer" className={styles.visitBtn}>
                                Website sân bay
                            </a>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
}

export default AirportMap;