import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; 
import styles from "./Home.module.css";
import Header from "./Header";
import FlightSearch from "./FlightSearch";
import FlightSearchModal from "./FlightSearchModal"; // Import Modal

// IMPORT HÌNH ẢNH
import imgAdelaide from "../Assets/Adelaide.png";
import imgTuscany from "../Assets/Tuscany.png";
import imgMali from "../Assets/Mali.png";
import imgSarajero from "../Assets/Sarajevo.png";
import imgCamogli from "../Assets/Camogli.png";
import imgSagradaFamilia from "../Assets/Sagrada_Familia.png";

import imgStudent from "../Assets/student_discount.png";
import imgMember from "../Assets/membership.png";
import imgSponsor from "../Assets/sponsors.png";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dữ liệu Slider
  const slides = [
    { id: 1, img: imgAdelaide, link: "/adelaide" },
    { id: 2, img: imgTuscany, link: "/tuscany" },
    { id: 3, img: imgMali, link: "/mali" },
    { id: 4, img: imgSarajero, link: "/discover/stories/sarajevo" },
    { id: 5, img: imgCamogli, link: "/camogli" },
    { id: 6, img: imgSagradaFamilia, link: "/article/sagrada-familia" },
  ];

  // --- 1. HERO SLIDER LOGIC ---
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Tự động chuyển slide sau 5s
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  // --- 2. MODAL BOOKING LOGIC ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ origin: '', dest: '' });

  const openBookingModal = (from, to) => {
      setModalData({ origin: from, dest: to });
      setIsModalOpen(true);
  };

  // --- 3. NEWSLETTER DROPDOWN STATE ---
  const [newsEmail, setNewsEmail] = useState("");
  const [newsLang, setNewsLang] = useState(["Tiếng Việt"]); 
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [newsCity, setNewsCity] = useState("");
  const [showCityMenu, setShowCityMenu] = useState(false);

  const langRef = useRef(null);
  const cityRef = useRef(null);

  // Click outside to close menus
  useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) setShowLangMenu(false);
      if (cityRef.current && !cityRef.current.contains(event.target)) setShowCityMenu(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleLang = (lang) => {
    if (newsLang.includes(lang)) {
        if (newsLang.length > 1) {
            setNewsLang(newsLang.filter(l => l !== lang));
        }
    } else {
        setNewsLang([...newsLang, lang]);
    }
  };

  const CITY_OPTIONS = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Cần Thơ", "Hải Phòng"];

  return (
    <div className={styles.homeWrapper}>
      <Header />

      {/* --- HERO SLIDER --- */}
      <section className={styles.heroSection}>
        <button className={`${styles.navArrow} ${styles.prevBtn}`} onClick={prevSlide}>
          &lt;
        </button>
        <button className={`${styles.navArrow} ${styles.nextBtn}`} onClick={nextSlide}>
          &gt;
        </button>

        <div
          className={styles.slide}
          style={{ backgroundImage: `url(${slides[currentSlide].img})` }}
          onClick={() => (window.location.href = slides[currentSlide].link)}
        >
          <div className={styles.heroOverlay}>
            <button className={styles.heroBtn}>Tìm hiểu thêm</button>
          </div>
        </div>
      </section>

      <div style={{ marginTop: "-100px", marginBottom: "60px", position: "relative", zIndex: 100 }}>
        <FlightSearch />
      </div>

      {/* --- MODAL --- */}
      <FlightSearchModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={modalData}
      />

      {/* --- KHUYẾN MÃI HÀNG NGÀY --- */}
      <section className={styles.sectionWrapper}>
        <h2 className={styles.sectionTitle}>Khám phá khuyến mãi hàng ngày</h2>
        <p className={styles.sectionSub}>
          Tiết kiệm nhiều hơn khi đặt vé bay và khách sạn đến những điểm đến tuyệt vời.
        </p>

        <div className={styles.promoGrid}>
          {/* Card Vé 1: HCM -> Bangkok */}
          <div 
            className={styles.ticketCard} 
            onClick={() => openBookingModal("Hồ Chí Minh", "Bangkok")}
            style={{cursor: 'pointer'}}
          >
            <div>
                <div className={styles.cardHeader}>
                    <div className={styles.routeInfo}>
                        <div className={styles.fromText}>Thành phố Hồ Chí Minh đến</div>
                        <div className={styles.toText}>Bangkok</div>
                    </div>
                    <div className={styles.priceTag}>
                        3,490,000<span className={styles.currency}>đ</span>
                    </div>
                </div>
                <div className={styles.tag}>Chỗ ngồi có hạn</div>
            </div>
            <div className={styles.cardFooter}>
                <div className={styles.dateRange}>30/11/2025 - 31/12/2025</div>
                <div className={styles.deadline}>Hạn chót đăng ký: 23:59' ngày 22/11/2025</div>
            </div>
          </div>

          {/* Card Vé 2: HCM -> Hà Nội */}
          <div 
            className={styles.ticketCard} 
            onClick={() => openBookingModal("Hồ Chí Minh", "Hà Nội")}
            style={{cursor: 'pointer'}}
          >
            <div>
                <div className={styles.cardHeader}>
                    <div className={styles.routeInfo}>
                        <div className={styles.fromText}>Thành phố Hồ Chí Minh đến</div>
                        <div className={styles.toText}>Hà Nội</div>
                    </div>
                    <div className={styles.priceTag}>
                        1,290,000<span className={styles.currency}>đ</span>
                    </div>
                </div>
                <div className={styles.tag}>Chỗ ngồi có hạn</div>
            </div>
            <div className={styles.cardFooter}>
                <div className={styles.dateRange}>18/11/2025 - 15/03/2026</div>
                <div className={styles.deadline}>Hạn chót đăng ký: 23:59' ngày 22/10/2025</div>
            </div>
          </div>

          {/* Card CTA: Link sang trang Promo */}
          <Link to="/promo" className={styles.ctaCard}>
            <span style={{ fontSize: "2rem", marginBottom: "10px" }}>✈️</span>
            <div className={styles.ctaText}>Bạn muốn xem thêm ưu đãi?</div>
            <button className={styles.ctaBtn}>Xem tất cả các khuyến mãi</button>
          </Link>
        </div>
      </section>

      {/* --- ƯU ĐÃI ĐẶC BIỆT --- */}
      <section className={styles.sectionWrapper}>
        <h2 className={styles.sectionTitle}>Ưu đãi đặc biệt</h2>
        <div className={styles.offersGrid}>
          <div className={styles.offerCard}>
            <img src={imgStudent} alt="Sinh viên" className={styles.offerImg} />
            <h3 className={styles.offerTitle}>Ưu đãi dành cho sinh viên</h3>
            <p className={styles.offerDesc}>Giá vé giảm đến 20%, tăng giới hạn hành lý, WiFi miễn phí...</p>
            <a href="#" className={styles.offerLink}>&gt;&gt; Tìm hiểu thêm</a>
          </div>
          <div className={styles.offerCard}>
            <img src={imgMember} alt="Hội viên" className={styles.offerImg} />
            <h3 className={styles.offerTitle}>Đăng ký gói hội viên</h3>
            <p className={styles.offerDesc}>Sử dụng quyền lợi đặc biệt của hội viên để giảm giá vé...</p>
            <a href="#" className={styles.offerLink}>&gt;&gt; Tìm hiểu thêm</a>
          </div>
          <div className={styles.offerCard}>
            <img src={imgSponsor} alt="Nhà tài trợ" className={styles.offerImg} />
            <h3 className={styles.offerTitle}>Ưu đãi từ nhà tài trợ</h3>
            <p className={styles.offerDesc}>Mã giảm giá đặc biệt đến từ những quý nhà tài trợ hảo tâm...</p>
            <a href="#" className={styles.offerLink}>&gt;&gt; Tìm hiểu thêm</a>
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER --- */}
      <section className={styles.sectionWrapper}>
        <h2 className={styles.sectionTitle}>Đăng ký Q-eflight News</h2>

        <div className={styles.newsletterBox}>
          <p className={styles.newsTitle}>
            Đăng ký Q-eflight News để cập nhật các thông tin, ưu đãi mới nhất từ QAirlines.
          </p>
          <p className={styles.newsSub}>
            (Không bao gồm thông tin ưu đãi dành riêng cho gói hội viên "Long-Lân-Quy-Phụng")
          </p>

          <div className={styles.formRow}>
            {/* 1. Email */}
            <div className={styles.inputGroup}>
                <div className={styles.labelSmall}>Địa chỉ thư điện tử</div>
                <input 
                    type="email" 
                    placeholder="nhap_email@example.com" 
                    className={styles.inputText}
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                />
            </div>

            {/* 2. Ngôn ngữ (Chọn nhiều) */}
            <div className={styles.inputGroup} ref={langRef} onClick={() => setShowLangMenu(!showLangMenu)}>
                <div className={styles.labelSmall}>Ngôn ngữ</div>
                <div className={styles.inputText}>
                    {newsLang.join(", ")}
                </div>
                <span className={styles.arrowIcon}>▼</span>
                {showLangMenu && (
                    <div className={styles.dropdownMenu}>
                        <div 
                            className={`${styles.dropdownItem} ${newsLang.includes("Tiếng Việt") ? styles.active : ''}`}
                            onClick={(e) => { e.stopPropagation(); toggleLang("Tiếng Việt"); }}
                        >
                            Tiếng Việt
                        </div>
                        <div 
                            className={`${styles.dropdownItem} ${newsLang.includes("Tiếng Anh") ? styles.active : ''}`}
                            onClick={(e) => { e.stopPropagation(); toggleLang("Tiếng Anh"); }}
                        >
                            Tiếng Anh
                        </div>
                    </div>
                )}
            </div>

            {/* 3. Thành phố (Chọn 1) */}
            <div className={styles.inputGroup} ref={cityRef} onClick={() => setShowCityMenu(!showCityMenu)}>
                <div className={styles.labelSmall}>Thành phố khởi hành ưu tiên</div>
                <div className={styles.inputText} style={{fontWeight: newsCity ? '600' : 'normal', color: newsCity ? '#333' : '#999'}}>
                    {newsCity || "Chọn thành phố"}
                </div>
                <span className={styles.arrowIcon}>▼</span>
                {showCityMenu && (
                    <div className={styles.dropdownMenu}>
                        <div className={styles.dropdownItem} onClick={() => { setNewsCity(""); setShowCityMenu(false); }}>
                            (Bỏ chọn)
                        </div>
                        {CITY_OPTIONS.map((city, idx) => (
                            <div 
                                key={idx} 
                                className={`${styles.dropdownItem} ${newsCity === city ? styles.active : ''}`}
                                onClick={() => { setNewsCity(city); setShowCityMenu(false); }}
                            >
                                {city}
                            </div>
                        ))}
                    </div>
                )}
            </div>
          </div>

          <div className={styles.checkboxRow}>
            <input type="checkbox" />
            <span>
              Tôi muốn nhận các ưu đãi và tin tức từ QAirline. Tôi đã đọc và hiểu
            </span>
          </div>

          <button className={styles.subscribeBtn}>Đăng ký</button>
        </div>
      </section>
    </div>
  );
}

export default Home;