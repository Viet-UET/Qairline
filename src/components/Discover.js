import React, { useState } from "react";
import styles from "./Discover.module.css";
import { useNavigate } from "react-router-dom";

// Component layout chung
import Header from "./Header";

// IMPORT HÌNH ẢNH
import imgSagrada from "../Assets/sagrada_familia_1.png";
import imgLouvre from "../Assets/lourve.png";
import imgAngkor from "../Assets/angko_wat.png";
import imgMilan from "../Assets/milan.png";
import imgSarajevo from "../Assets/sarajevo.jpg";
import imgPisa from "../Assets/Leaning-tower-of-pisa.jpg";
import imgKyoto from "../Assets/kinkakuji-pagoda.jpg";
import imgIstanbul from "../Assets/Istanbul_0.png";
import imgGreatWall from "../Assets/great_wall.png";
import imgLatinBridge from "../Assets/latin_bridge.jpg";

import leftImage from "../Assets/interesting_place_left.png";
import rightImage from "../Assets/interesting_place_right.png";

function Discover() {
  const navigate = useNavigate();

  // --- DỮ LIỆU ĐỊA ĐIỂM (7 ITEMS) ---
  const places = [
    {
      id: 1,
      img: imgSagrada,
      name: "Sagrada Familia",
      address: "Barcelona, Tây Ban Nha",
      tags: ["Kiến trúc"],
      rating: "4.8",
      reviews: "1.2k",
      link: "/article/sagrada-familia",
    },
    {
      id: 2,
      img: imgLouvre,
      name: "Bảo tàng Louvre",
      address: "Paris, Pháp",
      tags: ["Văn hóa", "Nghệ thuật"],
      rating: "4.9",
      reviews: "2k",
      link: "/article/louvre",
    },
    {
      id: 3,
      img: imgAngkor,
      name: "Angkor Wat",
      address: "Xiêm Riệp, Campuchia",
      tags: ["Tâm linh"],
      rating: "4.6",
      reviews: "950",
      link: "/article/angkor-wat",
    },
    {
      id: 4,
      img: imgGreatWall,
      name: "Vạn Lý Trường Thành",
      address: "Bắc Kinh, Trung Quốc",
      tags: ["Lịch sử", "Di sản"],
      rating: "4.7",
      reviews: "1.7k",
      link: "/article/great-wall",
    },
    {
      id: 5,
      img: imgPisa,
      name: "Tháp nghiêng Pisa",
      address: "Tuscany, Ý",
      tags: ["Kiến trúc"],
      rating: "4.5",
      reviews: "3k",
      link: "/article/pisa",
    },
    {
      id: 6,
      img: imgLatinBridge,
      name: "Cầu Latin",
      address: "Sarajevo, Bosnia",
      tags: ["Lịch sử"],
      rating: "4.4",
      reviews: "500",
      link: "/discover/stories/sarajevo",
    },
    {
      id: 7,
      img: imgKyoto,
      name: "Chùa Vàng Kinkaku-ji",
      address: "Kyoto, Nhật Bản",
      tags: ["Văn hóa"],
      rating: "4.9",
      reviews: "1.5k",
      link: "/discover/stories/kyoto",
    },
    {
      id: 8,
      img: imgMilan,
      name: "Nhà thờ Đức Bà Milan",
      address: "Milan, Ý",
      tags: ["Kiến trúc", "Tôn giáo"],
      rating: "4.8",
      reviews: "2.3k",
      link: "/discover/stories/milan",
    },
  ];

  // --- LOGIC SLIDER (ĐÃ SỬA XOAY VÒNG) ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 4; // Hiển thị 4 thẻ cùng lúc
  const cardWidth = 322; // 302px width + 20px gap
  const maxIndex = places.length - itemsToShow;

  // Tiến: Nếu đến cuối thì quay về đầu (0)
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Lùi: Nếu đang ở đầu (0) thì nhảy xuống cuối
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  // --- NAVIGATION HANDLERS ---
  const handleViewMore = () => navigate("/discover/popular");
  const handleViewStories = () => navigate("/discover/stories");

  const goToLink = (link) => {
    // navigate(link);
    console.log("Navigating to:", link);
  };

  return (
    <div className={styles.discoverWrapper}>
      <Header />

      <main className={styles.container}>
        {/* --- 1. HERO SECTION (Giữ nguyên) --- */}
        <section className={styles.hero}>
          <div className={styles.heroLeft}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                Khám phá <br />
                những địa điểm du lịch <br />
                không thể bỏ lỡ
              </h1>
              <p className={styles.heroDesc}>
                Từ những bãi biển trắng muốt trải dài tại vùng Tuscany, cho đến
                những ngọn tháp cổ kính của thành phố Sarajevo. Hãy cùng
                chúng tôi khám phá những địa điểm du lịch nổi tiếng được đông
                đảo du khách và chuyên gia đánh giá cao nhé.
              </p>
            </div>
            <img
              src={leftImage}
              alt="Promo Left"
              className={styles.heroSmallImg}
            />
          </div>
          <div className={styles.heroRight}>
            <img
              src={rightImage}
              alt="Promo Right"
              className={styles.heroLargeImg}
            />
          </div>
        </section>

        {/* --- 2. POPULAR PLACES (SLIDER 4 THẺ) --- */}
        <section className={styles.popularSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerTitle}>
              <h2>Những địa điểm được yêu thích nhất</h2>
              <p>
                Từ những góc phố quen thuộc mà ai cũng muốn quay lại, đến những
                miền đất khiến du khách lỡ một lần là nhớ mãi - đây là những
                điểm đến chiếm trọn trái tim của hàng triệu người yêu du lịch
                trên khắp thế giới.
              </p>
            </div>
            <div className={styles.headerActions}>
              <button className={styles.btnMore} onClick={handleViewMore}>
                Tìm hiểu thêm
              </button>
              {/* Nút điều hướng Slider */}
              <button
                className={styles.btnNav}
                onClick={prevSlide}
                disabled={currentIndex === 0}
              >
                &lt;
              </button>
              <button
                className={styles.btnNav}
                onClick={nextSlide}
                disabled={currentIndex >= places.length - itemsToShow}
              >
                &gt;
              </button>
            </div>
          </div>

          {/* Cửa sổ hiển thị Slider */}
          <div className={styles.placesSliderWindow}>
            <div
              className={styles.placesSliderTrack}
              style={{
                transform: `translateX(-${currentIndex * cardWidth}px)`,
              }}
            >
              {places.map((place) => (
                <div
                  key={place.id}
                  className={styles.placeCard}
                  onClick={() => goToLink(place.link)}
                >
                  <img
                    src={place.img}
                    alt={place.name}
                    className={styles.placeImg}
                  />
                  <div className={styles.placeContent}>
                    <div className={styles.placeInfoCenter}>
                      <h3 className={styles.placeTitle}>{place.name}</h3>
                      <p className={styles.placeSub}>{place.address}</p>
                    </div>
                    <div className={styles.placeFooter}>
                      <div className={styles.tagsWrapper}>
                        {place.tags.map((tag, idx) => (
                          <span key={idx} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className={styles.rating}>
                        <span className={styles.starIcon}>★</span>
                        {place.rating} ({place.reviews})
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 3. STORIES SECTION (BỐ CỤC MỚI) --- */}
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
            {/* Bài lớn bên trái (Card style) */}
            <div
              className={styles.storyLarge}
              onClick={() => goToLink("/discover/stories/sarajevo")}
            >
              <img
                src={imgSarajevo}
                alt="Sarajevo"
                className={styles.storyLargeImg}
              />
              <div className={styles.storyLargeOverlay}>
                <p className={styles.author} style={{ color: "white" }}>
                  Annia Norwood
                </p>
                <h3 className={styles.storyLargeTitle}>
                  10 ngày dạo bước ở Sarajevo
                </h3>
                <p className={styles.storyLargeDesc}>
                  Cùng theo chân nữ blogger nổi tiếng Annia Norwood trên hành
                  trình khám phá những địa điểm không thể bỏ lỡ tại Sarajevo,
                  nơi giao thoa của các nền văn hóa Đông Tây.
                </p>
                <span className={styles.readMoreBtn} style={{ color: "white" }}>
                  Đọc tiếp &rarr;
                </span>
              </div>
            </div>

            {/* List bài nhỏ bên phải */}
            <div className={styles.storyList}>
              <div
                className={styles.storyItem}
                onClick={() => goToLink("/discover/stories/istanbul")}
              >
                <img
                  src={imgIstanbul}
                  alt="Istanbul"
                  className={styles.storyItemImg}
                />
                <div className={styles.storyInfo}>
                  <p className={styles.author}>Annia Norwood</p>
                  <h4 className={styles.storyItemTitle}>
                    Lang thang giữa linh hồn Istanbul
                  </h4>
                  <span className={styles.readMoreBtn}>Đọc tiếp &rarr;</span>
                </div>
              </div>

              <div
                className={styles.storyItem}
                onClick={() => goToLink("/discover/stories/santorini")}
              >
                <img
                  src={imgSagrada}
                  alt="Santorini"
                  className={styles.storyItemImg}
                />
                <div className={styles.storyInfo}>
                  <p className={styles.author}>Annia Norwood</p>
                  <h4 className={styles.storyItemTitle}>
                    Một mùa hè rực rỡ ở Santorini
                  </h4>
                  <span className={styles.readMoreBtn}>Đọc tiếp &rarr;</span>
                </div>
              </div>

              <div
                className={styles.storyItem}
                onClick={() => goToLink("/discover/stories/kyoto")}
              >
                <img
                  src={imgAngkor}
                  alt="Kyoto"
                  className={styles.storyItemImg}
                />
                <div className={styles.storyInfo}>
                  <p className={styles.author}>Annia Norwood</p>
                  <h4 className={styles.storyItemTitle}>
                    Kyoto: Giữa hương trà và tiếng chuông chùa
                  </h4>
                  <span className={styles.readMoreBtn}>Đọc tiếp &rarr;</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Discover;
