import React, { useState } from "react";
import styles from "./Home.module.css";
import Header from "./Header";

import FlightSearch from "./FlightSearch"; // Import component mới

// IMPORT HÌNH ẢNH (Thay bằng ảnh thật trong Assets)
import imgAdelaide from "../Assets/Adelaide.png"; // Ảnh Adelaide
import imgTuscany from "../Assets/Tuscany.png"; // Ảnh Tuscany
import imgMali from "../Assets/Mali.png"; // Ảnh Mali
import imgSarajero from "../Assets/Sarajevo.png"; // Ảnh Sarajevo
import imgCamogli from "../Assets/Camogli.png"; // Ảnh Camogli
import imgSagradaFamilia from "../Assets/Sagrada_Familia.png"; // Ảnh Sagrada Familia

import imgStudent from "../Assets/student_discount.png"; // Ảnh ưu đãi sinh viên
import imgMember from "../Assets/membership.png"; // Ảnh gói hội viên
import imgSponsor from "../Assets/sponsors.png"; // Ảnh nhà tài trợ

function Home() {
  // State quản lý slide hiện tại
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dữ liệu cho Slider (Hero)
  const slides = [
    {
      id: 1,
      img: imgAdelaide,
      link: "/adelaide",
    },
    {
      id: 2,
      img: imgTuscany,
      link: "/tuscany",
    },
    {
      id: 3,
      img: imgMali,
      link: "/mali",
    },
    {
      id: 4,
      img: imgSarajero,
      link: "/sarajevo",
    },
    {
      id: 5,
      img: imgCamogli,
      link: "/camogli",
    },
    {
      id: 6,
      img: imgSagradaFamilia,
      link: "/article/sagrada-familia",
    },
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
        <button
          className={`${styles.navArrow} ${styles.prevBtn}`}
          onClick={prevSlide}
        >
          &lt;
        </button>
        <button
          className={`${styles.navArrow} ${styles.nextBtn}`}
          onClick={nextSlide}
        >
          &gt;
        </button>

        {/* Render Slide hiện tại */}
        <div
          className={styles.slide}
          style={{ backgroundImage: `url(${slides[currentSlide].img})` }}
          onClick={() => (window.location.href = slides[currentSlide].link)} // Chuyển trang khi click vào ảnh
        >
          {/* Hộp nội dung xanh bên trái */}
          <div className={styles.heroOverlay}>
            <button className={styles.heroBtn}>Tìm hiểu thêm</button>
          </div>
        </div>
      </section>

      <div
        style={{
          marginTop: "-100px",
          marginBottom: "60px",
          position: "relative",
          zIndex: 100,
        }}
      >
        <FlightSearch />
      </div>

      {/* --- 3. KHUYẾN MÃI HÀNG NGÀY --- */}
      <section className={styles.sectionWrapper}>
        <h2 className={styles.sectionTitle}>Khám phá khuyến mãi hàng ngày</h2>
        <p className={styles.sectionSub}>
          Tiết kiệm nhiều hơn khi đặt vé bay và khách sạn đến những điểm đến
          tuyệt vời.
        </p>

        <div className={styles.promoGrid}>
          {/* Card Vé 1 */}
          <div className={styles.ticketCard}>
            <div className={styles.route}>Thành phố Hồ Chí Minh đến</div>
            <div className={styles.destination}>
              Bangkok{" "}
              <span style={{ fontSize: "0.8rem", color: "orange" }}>
                (Thái Lan)
              </span>
            </div>
            <span
              style={{
                background: "orange",
                color: "white",
                fontSize: "0.7rem",
                padding: "2px 5px",
                borderRadius: "3px",
              }}
            >
              Chỗ ngồi có hạn
            </span>
            <div style={{ marginTop: "10px", textAlign: "right" }}>
              <span className={styles.price}>
                3,490,000<sup>đ</sup>
              </span>
            </div>
            <span className={styles.dateInfo}>30/11/2025 - 31/12/2025</span>
            <div
              style={{ borderTop: "1px dashed #ddd", margin: "10px 0" }}
            ></div>
            <span className={styles.status}>
              Hạn chót đăng ký: 23h59 ngày 22/11/2025
            </span>
          </div>

          {/* Card Vé 2 */}
          <div className={styles.ticketCard}>
            <div className={styles.route}>Thành phố Hồ Chí Minh đến</div>
            <div className={styles.destination}>Hà Nội</div>
            <div style={{ marginTop: "33px", textAlign: "right" }}>
              <span className={styles.price} style={{ color: "#e65100" }}>
                1,290,000<sup>đ</sup>
              </span>
            </div>
            <span className={styles.dateInfo}>18/11/2025 - 15/03/2026</span>
            <div
              style={{ borderTop: "1px dashed #ddd", margin: "10px 0" }}
            ></div>
            <span className={styles.status}>
              Hạn chót đăng ký: 23h59 ngày 22/10/2025
            </span>
          </div>

          {/* Card CTA */}
          <div className={styles.ctaCard}>
            <span style={{ fontSize: "2rem", marginBottom: "10px" }}>✈️</span>
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
            <p className={styles.offerDesc}>
              Giá vé giảm đến 20%, tăng giới hạn hành lý, WiFi miễn phí và hơn
              thế nữa.
            </p>
            <a href="#" className={styles.offerLink}>
              &gt;&gt; Tìm hiểu thêm
            </a>
          </div>
          {/* Offer 2 */}
          <div className={styles.offerCard}>
            <img src={imgMember} alt="Hội viên" className={styles.offerImg} />
            <h3 className={styles.offerTitle}>Đăng ký gói hội viên</h3>
            <p className={styles.offerDesc}>
              Sử dụng quyền lợi đặc biệt của hội viên để giảm giá vé, nâng cấp
              hạng ghế.
            </p>
            <a href="#" className={styles.offerLink}>
              &gt;&gt; Tìm hiểu thêm
            </a>
          </div>
          {/* Offer 3 */}
          <div className={styles.offerCard}>
            <img
              src={imgSponsor}
              alt="Nhà tài trợ"
              className={styles.offerImg}
            />
            <h3 className={styles.offerTitle}>Ưu đãi từ nhà tài trợ</h3>
            <p className={styles.offerDesc}>
              Mã giảm giá đặc biệt đến từ những quý nhà tài trợ hảo tâm của
              QAirline.
            </p>
            <a href="#" className={styles.offerLink}>
              &gt;&gt; Tìm hiểu thêm
            </a>
          </div>
        </div>
      </section>

      {/* --- 5. NEWSLETTER --- */}
      <section className={styles.newsletterSection}>
        <h2 className={styles.sectionTitle}>Đăng ký Q-eflight News</h2>

        <div className={styles.newsletterBox}>
          <p className={styles.newsTitle} style={{ fontSize: "1rem" }}>
            Đăng ký Q-eflight News để cập nhật các thông tin, ưu đãi mới nhất từ
            QAirline.
          </p>
          <p className={styles.newsSub}>
            (Không bao gồm thông tin ưu đãi dành riêng cho gói hội viên
            "Long-Lân-Quy-Phụng")
          </p>

          <div className={styles.formRow}>
            <input
              type="text"
              placeholder="Khách Thư Điện Tử"
              className={styles.newsInput}
            />
            <input
              type="text"
              placeholder="Ngôn ngữ: Tiếng Việt"
              className={styles.newsInput}
            />
            <input
              type="text"
              placeholder="Thành phố Khởi hành Ưu Tiên"
              className={styles.newsInput}
            />
          </div>

          <div className={styles.checkboxRow}>
            <input type="checkbox" />
            <span>
              Tôi muốn nhận các ưu đãi và tin tức từ QAirline. Tôi đã đọc và
              hiểu.
            </span>
          </div>

          <button className={styles.subscribeBtn}>Đăng ký</button>
        </div>
      </section>
    </div>
  );
}

export default Home;
