import React from "react";
import styles from "./Discover.module.css";
import { useNavigate } from "react-router-dom";

// Component layout chung
import Header from "./Header";
import Footer from "./Footer";

// IMPORT HÌNH ẢNH (Thay thế bằng file thật của bạn)
// Lưu ý: Dùng đúng tên file trong folder Assets của bạn
import imgSagrada from "../Assets/sagrada_familia_1.png";
import imgLouvre from "../Assets/lourve.png";
import imgAngkor from "../Assets/angko_wat.png";
import imgMilan from "../Assets/milan.png";

// Ảnh minh họa cho Hero (Dùng tạm ảnh có sẵn nếu thiếu)
const imgHeroLeft = imgSagrada; // Ảnh Amsterdam (Góc dưới trái)
const imgHeroTall = imgAngkor; // Ảnh Angkor Wat (Dọc phải)
const imgHeroTop = imgMilan; // Ảnh Chùa (Trên phải)
const imgHeroBot = imgLouvre; // Ảnh Núi (Dưới phải)

function Discover() {
  const navigate = useNavigate(); // 2. Khởi tạo hook điều hướng

  // Hàm xử lý khi bấm nút
  const handleViewMore = () => {
    navigate("/discover/popular"); // Chuyển hướng đến đường dẫn đã khai báo ở Bước 1
  };

  const handleViewStories = () => {
    navigate("/discover/stories");
  };

  const handleViewSarajevo = () => {
    navigate("/discover/stories/sarajevo");
  }

  return (
    <div className={styles.discoverWrapper}>
      <Header />

      <main className={styles.container}>
        {/* --- 1. HERO SECTION --- */}
        <section className={styles.heroSection}>
          {/* CỘT TRÁI */}
          <div className={styles.heroLeft}>
            <div>
              <h1 className={styles.heroTitle}>
                Khám phá <br />
                những địa điểm du lịch <br />
                không thể bỏ lỡ
              </h1>
              <p className={styles.heroDesc}>
                Từ những bãi biển trắng muốt trải dài tại vùng Tuscany, cho đến
                những ngọn tháp cổ kính của thành phố Sarajevo; từ những cung
                đường đi bộ ngoạn mục của Trung Khánh... Hãy cùng khám phá!
              </p>
            </div>
            <img
              src={imgHeroLeft}
              alt="Amsterdam"
              className={styles.heroLeftImg}
            />
          </div>

          {/* CỘT PHẢI (Grid ảnh) */}
          <div className={styles.heroRight}>
            {/* 2 Ảnh nhỏ bên trái của cụm phải */}
            <img
              src={imgHeroTop}
              alt="Pagoda"
              className={styles.heroSmallTop}
            />
            <img
              src={imgHeroBot}
              alt="Mountain"
              className={styles.heroSmallBottom}
            />

            {/* Ảnh dọc bên phải của cụm phải */}
            <img
              src={imgHeroTall}
              alt="Angkor"
              className={styles.heroTallImg}
            />
          </div>
        </section>

        {/* --- 2. POPULAR PLACES --- */}
        <section className={styles.popularSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerTitle}>
              <h2>Những địa điểm được yêu thích nhất</h2>
              <p>
                Từ những góc phố quen thuộc mà ai cũng muốn quay lại, đến những
                miền đất khiến du khách lỡ một lần là nhớ mãi.
              </p>
            </div>
            <div className={styles.headerActions}>
              <button
                button
                className={styles.btnMore}
                onClick={handleViewMore}
              >
                Tìm hiểu thêm
              </button>
              <button className={styles.btnNav}>&lt;</button>
              <button className={styles.btnNav}>&gt;</button>
            </div>
          </div>

          <div className={styles.placesGrid}>
            {/* Card 1 */}
            <div className={styles.placeCard}>
              <img src={imgSagrada} alt="Sagrada" className={styles.placeImg} />
              <div className={styles.placeContent}>
                <h3 className={styles.placeTitle}>Sagrada Familia</h3>
                <p className={styles.placeSub}>Barcelona, Tây Ban Nha</p>
                <div className={styles.placeFooter}>
                  <span className={styles.tag}>Kiến trúc</span>
                  <span className={styles.rating}>⭐ 4.8 (1.2k)</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className={styles.placeCard}>
              <img src={imgLouvre} alt="Louvre" className={styles.placeImg} />
              <div className={styles.placeContent}>
                <h3 className={styles.placeTitle}>Bảo tàng Louvre</h3>
                <p className={styles.placeSub}>Paris, Pháp</p>
                <div className={styles.placeFooter}>
                  <span className={styles.tag}>Văn hóa</span>
                  <span className={styles.rating}>⭐ 4.9 (2k)</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className={styles.placeCard}>
              <img src={imgAngkor} alt="Angkor" className={styles.placeImg} />
              <div className={styles.placeContent}>
                <h3 className={styles.placeTitle}>Angkor Wat</h3>
                <p className={styles.placeSub}>Xiêm Riệp, Campuchia</p>
                <div className={styles.placeFooter}>
                  <span className={styles.tag}>Tâm linh</span>
                  <span className={styles.rating}>⭐ 4.6 (950)</span>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className={styles.placeCard}>
              <img src={imgMilan} alt="China" className={styles.placeImg} />
              <div className={styles.placeContent}>
                <h3 className={styles.placeTitle}>Vạn Lý Trường Thành</h3>
                <p className={styles.placeSub}>Bắc Kinh, Trung Quốc</p>
                <div className={styles.placeFooter}>
                  <span className={styles.tag}>Lịch sử</span>
                  <span className={styles.rating}>⭐ 4.7 (1.7k)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 3. STORIES SECTION --- */}
        <section className={styles.storiesSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerTitle}>
              <h2>Những câu chuyện kỳ thú</h2>
              <p>
                Mỗi hành trình là một câu chuyện - có khi là cuộc gặp gỡ tình
                cờ, có khi là khoảnh khắc khiến ta đổi thay mãi mãi.
              </p>
            </div>
            <div className={styles.headerActions}>
              <button className={styles.btnMore} onClick={handleViewStories}>
                Tìm hiểu thêm
              </button>
            </div>
          </div>

          <div className={styles.storiesGrid}>
            {/* Bài lớn bên trái */}
            <div className={styles.storyLarge}>
              <img
                src={imgHeroLeft}
                alt="Sarajevo"
                className={styles.storyLargeImg}
              />
              <div>
                <p className={styles.author}>Annia Norwood</p>
                <h3 className={styles.storyLargeTitle}>
                  10 ngày dạo bước ở Sarajevo
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#666",
                    marginBottom: "10px",
                  }}
                >
                  Cùng theo chân nữ blogger nổi tiếng Annia Norwood trên hành
                  trình khám phá những địa điểm không thể bỏ lỡ tại Sarajevo...
                </p>
                <a href="#" className={styles.readLink} onClick={handleViewSarajevo}>
                  &gt;&gt; Đọc tiếp
                </a>
              </div>
            </div>

            {/* List bài nhỏ bên phải */}
            <div className={styles.storyList}>
              <div className={styles.storyItem}>
                <img
                  src={imgMilan}
                  alt="Istanbul"
                  className={styles.storyItemImg}
                />
                <div className={styles.storyInfo}>
                  <p className={styles.author}>Annia Norwood</p>
                  <h4 className={styles.storyItemTitle}>
                    Lang thang giữa linh hồn Istanbul
                  </h4>
                  <a href="#" className={styles.readLink}>
                    &gt;&gt; Đọc tiếp
                  </a>
                </div>
              </div>

              <div className={styles.storyItem}>
                <img
                  src={imgSagrada}
                  alt="Santorini"
                  className={styles.storyItemImg}
                />
                <div className={styles.storyInfo}>
                  <p className={styles.author}>Annia Norwood</p>
                  <h4 className={styles.storyItemTitle}>
                    Một mùa hè ở Santorini
                  </h4>
                  <a href="#" className={styles.readLink}>
                    &gt;&gt; Đọc tiếp
                  </a>
                </div>
              </div>

              <div className={styles.storyItem}>
                <img
                  src={imgAngkor}
                  alt="Kyoto"
                  className={styles.storyItemImg}
                />
                <div className={styles.storyInfo}>
                  <p className={styles.author}>Annia Norwood</p>
                  <h4 className={styles.storyItemTitle}>
                    Kyoto: Giữa hương trà và tiếng chuông
                  </h4>
                  <a href="#" className={styles.readLink}>
                    &gt;&gt; Đọc tiếp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Discover;
