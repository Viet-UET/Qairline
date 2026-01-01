import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; 
import FlightSearch from "../../shared/components/common/FlightSearch";

// TODO: Move images to this path
import imgAdelaide from "../../shared/assets/images/home/Adelaide.png";
import imgTuscany from "../../shared/assets/images/home/Tuscany.png";
import imgMali from "../../shared/assets/images/home/Mali.png";
import imgSarajero from "../../shared/assets/images/home/Sarajevo.png";
import imgCamogli from "../../shared/assets/images/home/Camogli.png";
import imgSagradaFamilia from "../../shared/assets/images/home/Sagrada_Familia.png";

import imgStudent from "../../shared/assets/images/home/student_discount.png";
import imgMember from "../../shared/assets/images/home/membership.png";
import imgSponsor from "../../shared/assets/images/home/sponsors.png";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, img: imgAdelaide, link: "/adelaide" },
    { id: 2, img: imgTuscany, link: "/tuscany" },
    { id: 3, img: imgMali, link: "/mali" },
    { id: 4, img: imgSarajero, link: "/discover/stories/sarajevo" },
    { id: 5, img: imgCamogli, link: "/camogli" },
    { id: 6, img: imgSagradaFamilia, link: "/article/sagrada-familia" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ origin: '', dest: '' });

  const openBookingModal = (from, to) => {
      setModalData({ origin: from, dest: to });
      setIsModalOpen(true);
  };

  // Newsletter state
  const [newsEmail, setNewsEmail] = useState("");
  const [newsLang, setNewsLang] = useState(["Tiếng Việt"]); 
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [newsCity, setNewsCity] = useState("");
  const [showCityMenu, setShowCityMenu] = useState(false);

  const langRef = useRef(null);
  const cityRef = useRef(null);

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
    <div style={{ paddingTop: "100px", width: "100%", backgroundColor: "#fcfcfc", fontFamily: "'Afacad', sans-serif", paddingBottom: "40px", position: "relative" }}>
      {/* --- HERO SLIDER --- */}
      <section style={{ position: "relative", width: "1265px", height: "430px", margin: "40px auto 0 auto", marginTop: "60px", overflow: "visible", cursor: "pointer" }}>
        <button style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", background: "white", color: "#006D5B", border: "1px solid #eee", fontSize: "2rem", cursor: "pointer", zIndex: 10, width: "50px", height: "50px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", left: "-70px" }} onClick={prevSlide}>
          &lt;
        </button>
        <button style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", background: "white", color: "#006D5B", border: "1px solid #eee", fontSize: "2rem", cursor: "pointer", zIndex: 10, width: "50px", height: "50px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", right: "-70px" }} onClick={nextSlide}>
          &gt;
        </button>

        <div
          style={{ width: "100%", height: "100%", position: "relative", backgroundSize: "cover", backgroundPosition: "center", transition: "opacity 0.5s ease-in-out", borderRadius: "30px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", cursor: "pointer", backgroundImage: `url(${slides[currentSlide].img})` }}
          onClick={() => window.location.href = slides[currentSlide].link}
        >
          <div style={{ position: "absolute", top: "50%", transform: "translateY(70%)", left: "60px", width: "350px", color: "white", padding: "30px", zIndex: 2, borderTopRightRadius: "5px", borderBottomLeftRadius: "50px", borderTopLeftRadius: "20px", borderBottomRightRadius: "20px" }}>
            <button style={{ background: "transparent", border: "2px solid white", color: "white", padding: "8px 20px", borderRadius: "20px", fontWeight: "bold", cursor: "pointer", fontSize: "0.9rem", transition: "all 0.3s" }}>Tìm hiểu thêm</button>
          </div>
        </div>
      </section>

      <div style={{ marginTop: "-100px", marginBottom: "60px", position: "relative", zIndex: 100 }}>
        <FlightSearch />
      </div>

      {/* --- DAILY PROMOTIONS --- */}
      <section style={{ maxWidth: "1265px", margin: "0 auto 60px auto" }}>
        <h2 style={{ fontSize: "3rem", color: "#006D5B", fontWeight: 700, marginBottom: "10px" }}>Khám phá khuyến mãi hàng ngày</h2>
        <p style={{ color: "#529246", marginBottom: "30px", fontSize: "1rem" }}>
          Tiết kiệm nhiều hơn khi đặt vé bay và khách sạn đến những điểm đến tuyệt vời.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "25px" }}>
          {/* Ticket Card 1 */}
          <div 
            style={{ width: "100%", height: "216px", background: "white", borderRadius: "16px", padding: "25px", boxSizing: "border-box", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", border: "1px solid #e0e0e0", transition: "transform 0.2s, border-color 0.2s", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}
            onClick={() => openBookingModal("Hồ Chí Minh", "Bangkok")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.borderColor = "#529246";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(82, 146, 70, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "#e0e0e0";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.05)";
            }}
          >
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        <div style={{ fontSize: "0.85rem", color: "#004D40", fontWeight: 500 }}>Thành phố Hồ Chí Minh đến</div>
                        <div style={{ fontSize: "1.4rem", color: "#004D40", fontWeight: 800, lineHeight: 1.2 }}>Bangkok</div>
                    </div>
                    <div style={{ fontSize: "1.5rem", color: "#D32F2F", fontWeight: 800, textAlign: "right", lineHeight: 1 }}>
                        3,490,000<span style={{ fontSize: "0.9rem", verticalAlign: "super", marginLeft: "2px", color: "#D32F2F" }}>đ</span>
                    </div>
                </div>
                <div style={{ display: "inline-block", backgroundColor: "#FFF3E0", border: "1px solid #FFE0B2", color: "#F57C00", fontSize: "0.75rem", padding: "4px 10px", borderRadius: "6px", fontWeight: "bold", width: "fit-content" }}>Chỗ ngồi có hạn</div>
            </div>
            <div style={{ borderTop: "1px dashed #eee", paddingTop: "15px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ fontSize: "0.9rem", color: "#006D5B", fontWeight: 700 }}>30/11/2025 - 31/12/2025</div>
                <div style={{ fontSize: "0.75rem", color: "#666", fontStyle: "italic" }}>Hạn chót đăng ký: 23:59' ngày 22/11/2025</div>
            </div>
          </div>

          {/* Ticket Card 2 */}
          <div 
            style={{ width: "100%", height: "216px", background: "white", borderRadius: "16px", padding: "25px", boxSizing: "border-box", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", border: "1px solid #e0e0e0", transition: "transform 0.2s, border-color 0.2s", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}
            onClick={() => openBookingModal("Hồ Chí Minh", "Hà Nội")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.borderColor = "#529246";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(82, 146, 70, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "#e0e0e0";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.05)";
            }}
          >
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        <div style={{ fontSize: "0.85rem", color: "#004D40", fontWeight: 500 }}>Thành phố Hồ Chí Minh đến</div>
                        <div style={{ fontSize: "1.4rem", color: "#004D40", fontWeight: 800, lineHeight: 1.2 }}>Hà Nội</div>
                    </div>
                    <div style={{ fontSize: "1.5rem", color: "#D32F2F", fontWeight: 800, textAlign: "right", lineHeight: 1 }}>
                        1,290,000<span style={{ fontSize: "0.9rem", verticalAlign: "super", marginLeft: "2px", color: "#D32F2F" }}>đ</span>
                    </div>
                </div>
                <div style={{ display: "inline-block", backgroundColor: "#FFF3E0", border: "1px solid #FFE0B2", color: "#F57C00", fontSize: "0.75rem", padding: "4px 10px", borderRadius: "6px", fontWeight: "bold", width: "fit-content" }}>Chỗ ngồi có hạn</div>
            </div>
            <div style={{ borderTop: "1px dashed #eee", paddingTop: "15px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ fontSize: "0.9rem", color: "#006D5B", fontWeight: 700 }}>18/11/2025 - 15/03/2026</div>
                <div style={{ fontSize: "0.75rem", color: "#666", fontStyle: "italic" }}>Hạn chót đăng ký: 23:59' ngày 22/10/2025</div>
            </div>
          </div>

          {/* CTA Card */}
          <Link to="/explore/promotions" style={{ width: "100%", height: "216px", backgroundColor: "#004D40", borderRadius: "16px", padding: "30px 20px", color: "white", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", position: "relative", overflow: "hidden", boxSizing: "border-box", cursor: "pointer", textDecoration: "none", transition: "transform 0.2s" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.backgroundColor = "#00695c";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.backgroundColor = "#004D40";
            }}
          >
            <div style={{ content: "", position: "absolute", top: "-30px", right: "-30px", width: "100px", height: "100px", background: "#cddc39", borderRadius: "50%", zIndex: 1, opacity: 0.2 }}></div>
            <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "20px", zIndex: 2, color: "white" }}>Bạn muốn xem thêm ưu đãi?</div>
            <button style={{ background: "transparent", border: "1px solid white", color: "white", padding: "10px 30px", borderRadius: "20px", fontWeight: "bold", cursor: "pointer", zIndex: 2, fontSize: "0.9rem" }}>Xem tất cả các khuyến mãi</button>
          </Link>
        </div>
      </section>

      {/* --- SPECIAL OFFERS --- */}
      <section style={{ maxWidth: "1265px", margin: "0 auto 60px auto" }}>
        <h2 style={{ fontSize: "3rem", color: "#006D5B", fontWeight: 700 }}>Ưu đãi đặc biệt</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "25px", marginTop: "30px" }}>
          
          <Link to="/special-offers#student" style={{ background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", textAlign: "center", paddingBottom: "20px", border: "10px solid #ffffff", textDecoration: "none", color: "inherit", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(82, 146, 70, 0.15)";
              e.currentTarget.firstElementChild.style.transform = "scale(1.05)";
              e.currentTarget.children[1].style.color = "#529246";
              e.currentTarget.children[2].style.color = "#004D40";
              e.currentTarget.lastElementChild.style.color = "#004D40";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.05)";
              e.currentTarget.firstElementChild.style.transform = "scale(1)";
              e.currentTarget.children[1].style.color = "#004D40";
              e.currentTarget.children[2].style.color = "#529246";
              e.currentTarget.lastElementChild.style.color = "#006D5B";
            }}
          >
            <img src={imgStudent} alt="Sinh viên" style={{ width: "100%", height: "100px", objectFit: "cover", transition: "transform 0.2s" }} />
            <h3 style={{ fontSize: "2rem", fontWeight: "bold", color: "#004D40", margin: "15px 0 10px 0" }}>Ưu đãi dành cho sinh viên</h3>
            <p style={{ fontSize: "1rem", color: "#529246", padding: "0 15px", margin: "0 auto 15px auto", fontStyle: "italic", textAlign: "center" }}>Giá vé giảm đến 20%, tăng giới hạn hành lý, WiFi miễn phí...</p>
            <span style={{ color: "#006D5B", fontWeight: "bold", fontSize: "0.85rem" }}>&gt;&gt; Tìm hiểu thêm</span>
          </Link>

          <Link to="/special-offers#member" style={{ background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", textAlign: "center", paddingBottom: "20px", border: "10px solid #ffffff", textDecoration: "none", color: "inherit", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(82, 146, 70, 0.15)";
              e.currentTarget.firstElementChild.style.transform = "scale(1.05)";
              e.currentTarget.children[1].style.color = "#529246";
              e.currentTarget.children[2].style.color = "#004D40";
              e.currentTarget.lastElementChild.style.color = "#004D40";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.05)";
              e.currentTarget.firstElementChild.style.transform = "scale(1)";
              e.currentTarget.children[1].style.color = "#004D40";
              e.currentTarget.children[2].style.color = "#529246";
              e.currentTarget.lastElementChild.style.color = "#006D5B";
            }}
          >
            <img src={imgMember} alt="Hội viên" style={{ width: "100%", height: "100px", objectFit: "cover", transition: "transform 0.2s" }} />
            <h3 style={{ fontSize: "2rem", fontWeight: "bold", color: "#004D40", margin: "15px 0 10px 0" }}>Đăng ký gói hội viên</h3>
            <p style={{ fontSize: "1rem", color: "#529246", padding: "0 15px", margin: "0 auto 15px auto", fontStyle: "italic", textAlign: "center" }}>Sử dụng quyền lợi đặc biệt của hội viên để giảm giá vé...</p>
            <span style={{ color: "#006D5B", fontWeight: "bold", fontSize: "0.85rem" }}>&gt;&gt; Tìm hiểu thêm</span>
          </Link>

          <Link to="/special-offers#sponsor" style={{ background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", textAlign: "center", paddingBottom: "20px", border: "10px solid #ffffff", textDecoration: "none", color: "inherit", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(82, 146, 70, 0.15)";
              e.currentTarget.firstElementChild.style.transform = "scale(1.05)";
              e.currentTarget.children[1].style.color = "#529246";
              e.currentTarget.children[2].style.color = "#004D40";
              e.currentTarget.lastElementChild.style.color = "#004D40";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.05)";
              e.currentTarget.firstElementChild.style.transform = "scale(1)";
              e.currentTarget.children[1].style.color = "#004D40";
              e.currentTarget.children[2].style.color = "#529246";
              e.currentTarget.lastElementChild.style.color = "#006D5B";
            }}
          >
            <img src={imgSponsor} alt="Nhà tài trợ" style={{ width: "100%", height: "100px", objectFit: "cover", transition: "transform 0.2s" }} />
            <h3 style={{ fontSize: "2rem", fontWeight: "bold", color: "#004D40", margin: "15px 0 10px 0" }}>Ưu đãi từ nhà tài trợ</h3>
            <p style={{ fontSize: "1rem", color: "#529246", padding: "0 15px", margin: "0 auto 15px auto", fontStyle: "italic", textAlign: "center" }}>Mã giảm giá đặc biệt đến từ những quý nhà tài trợ hảo tâm...</p>
            <span style={{ color: "#006D5B", fontWeight: "bold", fontSize: "0.85rem" }}>&gt;&gt; Tìm hiểu thêm</span>
          </Link>

        </div>
      </section>

      {/* --- NEWSLETTER --- */}
      <section style={{ maxWidth: "1265px", margin: "0 auto 60px auto" }}>
        <h2 style={{ fontSize: "3rem", color: "#006D5B", fontWeight: 700, textAlign: "center" }}>Đăng ký Q-eflight News</h2>

        <div style={{ background: "white", width: "880px", maxWidth: "100%", margin: "0 auto", padding: "40px 60px", borderRadius: "12px", boxShadow: "0 5px 20px rgba(0,0,0,0.05)", border: "1px solid #eee", textAlign: "center" }}>
          <p style={{ color: "#004D40", fontWeight: "bold", marginBottom: "10px", fontSize: "1.3rem", textAlign: "center" }}>
            Đăng ký Q-eflight News để cập nhật các thông tin, ưu đãi mới nhất từ QAirlines.
          </p>
          <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "30px", fontStyle: "italic", textAlign: "center" }}>
            (Không bao gồm thông tin ưu đãi dành riêng cho gói hội viên "Long-Lân-Quy-Phụng")
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1.5fr", gap: "20px", marginBottom: "25px" }}>
            {/* Email */}
            <div style={{ position: "relative", border: "1px solid #ccc", borderRadius: "8px", background: "#f9f9f9", height: "50px", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 15px", cursor: "pointer" }}>
                <div style={{ fontSize: "0.75rem", color: "#006D5B", marginBottom: "2px" }}>Địa chỉ thư điện tử</div>
                <input 
                    type="email" 
                    placeholder="nhap_email@example.com" 
                    style={{ border: "none", background: "transparent", width: "100%", outline: "none", fontSize: "0.95rem", color: "#333", fontWeight: 600 }}
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                />
            </div>

            {/* Language */}
            <div style={{ position: "relative", border: "1px solid #ccc", borderRadius: "8px", background: "#f9f9f9", height: "50px", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 15px", cursor: "pointer" }} ref={langRef} onClick={() => setShowLangMenu(!showLangMenu)}>
                <div style={{ fontSize: "0.75rem", color: "#006D5B", marginBottom: "2px" }}>Ngôn ngữ</div>
                <div style={{ border: "none", background: "transparent", width: "100%", outline: "none", fontSize: "0.95rem", color: "#333", fontWeight: 600 }}>
                    {newsLang.join(", ")}
                </div>
                <span style={{ position: "absolute", right: "15px", color: "#999", fontSize: "0.8rem" }}>▼</span>
                {showLangMenu && (
                    <div style={{ position: "absolute", top: "110%", left: "0", width: "100%", background: "white", border: "1px solid #006D5B", borderRadius: "8px", padding: "5px", boxShadow: "0 5px 15px rgba(0,0,0,0.15)", zIndex: 10, textAlign: "left" }}>
                        <div 
                            style={{ padding: "10px", cursor: "pointer", fontSize: "0.9rem", borderRadius: "4px", color: newsLang.includes("Tiếng Việt") ? "#006D5B" : "#333", fontWeight: newsLang.includes("Tiếng Việt") ? "bold" : "normal", backgroundColor: newsLang.includes("Tiếng Việt") ? "#e8f5e9" : "transparent" }}
                            onClick={(e) => { e.stopPropagation(); toggleLang("Tiếng Việt"); }}
                        >
                            Tiếng Việt
                        </div>
                        <div 
                            style={{ padding: "10px", cursor: "pointer", fontSize: "0.9rem", borderRadius: "4px", color: newsLang.includes("Tiếng Anh") ? "#006D5B" : "#333", fontWeight: newsLang.includes("Tiếng Anh") ? "bold" : "normal", backgroundColor: newsLang.includes("Tiếng Anh") ? "#e8f5e9" : "transparent" }}
                            onClick={(e) => { e.stopPropagation(); toggleLang("Tiếng Anh"); }}
                        >
                            Tiếng Anh
                        </div>
                    </div>
                )}
            </div>

            {/* City */}
            <div style={{ position: "relative", border: "1px solid #ccc", borderRadius: "8px", background: "#f9f9f9", height: "50px", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 15px", cursor: "pointer" }} ref={cityRef} onClick={() => setShowCityMenu(!showCityMenu)}>
                <div style={{ fontSize: "0.75rem", color: "#006D5B", marginBottom: "2px" }}>Thành phố khởi hành ưu tiên</div>
                <div style={{ border: "none", background: "transparent", width: "100%", outline: "none", fontSize: "0.95rem", fontWeight: 600, color: newsCity ? "#333" : "#999" }}>
                    {newsCity || "Chọn thành phố"}
                </div>
                <span style={{ position: "absolute", right: "15px", color: "#999", fontSize: "0.8rem" }}>▼</span>
                {showCityMenu && (
                    <div style={{ position: "absolute", top: "110%", left: "0", width: "100%", background: "white", border: "1px solid #006D5B", borderRadius: "8px", padding: "5px", boxShadow: "0 5px 15px rgba(0,0,0,0.15)", zIndex: 10, textAlign: "left" }}>
                        <div style={{ padding: "10px", cursor: "pointer", fontSize: "0.9rem", borderRadius: "4px" }} onClick={() => { setNewsCity(""); setShowCityMenu(false); }}>
                            (Bỏ chọn)
                        </div>
                        {CITY_OPTIONS.map((city, idx) => (
                            <div 
                                key={idx} 
                                style={{ padding: "10px", cursor: "pointer", fontSize: "0.9rem", borderRadius: "4px", color: newsCity === city ? "#006D5B" : "#333", fontWeight: newsCity === city ? "bold" : "normal", backgroundColor: newsCity === city ? "#e8f5e9" : "transparent" }}
                                onClick={() => { setNewsCity(city); setShowCityMenu(false); }}
                            >
                                {city}
                            </div>
                        ))}
                    </div>
                )}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", fontSize: "0.9rem", color: "#004D40", marginBottom: "30px" }}>
            <input type="checkbox" />
            <span>
              Tôi muốn nhận các ưu đãi và tin tức từ QAirline. Tôi đã đọc và hiểu
            </span>
          </div>

          <button style={{ background: "transparent", border: "2px solid #529246", color: "#529246", padding: "10px 50px", borderRadius: "8px", fontWeight: "bold", fontSize: "1.1rem", cursor: "pointer", transition: "all 0.3s" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#529246";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#529246";
            }}
          >Đăng ký</button>
        </div>
      </section>
    </div>
  );
}

export default Home;
