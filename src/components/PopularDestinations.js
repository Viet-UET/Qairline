import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PopularDestinations.module.css";
import Header from "./Header";
import Footer from "./Footer";

// IMPORT HÌNH ẢNH
import imgSagrada from "../Assets/sagrada_familia_1.png";
import imgLouvre from "../Assets/lourve.png";
import imgAngkor from "../Assets/angko_wat.png";
import imgMilan from "../Assets/milan.png";
import imgSarajevo from "../Assets/sarajevo.jpg";
import imgPisa from "../Assets/Leaning-tower-of-pisa.jpg";
import imgKyoto from "../Assets/kinkakuji-pagoda.jpg";
import imgGreatWall from "../Assets/great_wall.png";
import imgLatinBridge from "../Assets/latin_bridge.jpg";
import imgNull from "../Assets/null_island.png"; // Placeholder cho các địa điểm chưa có ảnh

function PopularDestinations() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- DỮ LIỆU ĐỊA ĐIỂM ---
  // 8 Điểm đầu tiên: Lấy từ trang Discover (Ưu tiên thông tin của Discover)
  // 4 Điểm sau: Lấy từ Popular cũ để đủ số lượng test nút Xem thêm
  const allDestinations = [
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
      link: "/place/great-wall",
    },
    {
      id: 5,
      img: imgPisa,
      name: "Tháp nghiêng Pisa",
      address: "Tuscany, Ý",
      tags: ["Kiến trúc"],
      rating: "4.5",
      reviews: "3k",
      link: "/place/pisa",
    },
    {
      id: 6,
      img: imgLatinBridge, // Ưu tiên ảnh từ Discover
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
      link: "/place/kyoto",
    },
    {
      id: 8,
      img: imgMilan,
      name: "Nhà thờ Đức Bà Milan",
      address: "Milan, Ý",
      tags: ["Kiến trúc", "Tôn giáo"],
      rating: "4.8",
      reviews: "2.3k",
      link: "/place/milan",
    },
    // --- CÁC ĐIỂM BỔ SUNG TỪ FILE CŨ (Để test Load More) ---
    {
      id: 9,
      img: imgNull, // Thay ảnh thật sau
      name: "Machu Picchu",
      address: "Cusco Region, Peru",
      tags: ["Cổ đại", "Kiến trúc"],
      rating: "4.8",
      reviews: "1.5k",
      link: "/place/machu-picchu",
    },
    {
      id: 10,
      img: imgNull, // Thay ảnh thật sau
      name: "Vịnh Hạ Long",
      address: "Quảng Ninh, Việt Nam",
      tags: ["Tự nhiên", "Nghỉ dưỡng"],
      rating: "4.6",
      reviews: "950",
      link: "/place/halong",
    },
    {
      id: 11,
      img: imgNull, // Thay ảnh thật sau
      name: "Tháp Eiffel",
      address: "Paris, Pháp",
      tags: ["Lịch sử", "Kiến trúc"],
      rating: "4.7",
      reviews: "780",
      link: "/place/eiffel",
    },
    {
      id: 12,
      img: imgNull, // Thay ảnh thật sau
      name: "Taj Mahal",
      address: "Agra, Ấn Độ",
      tags: ["Lịch sử", "Kiến trúc"],
      rating: "4.8",
      reviews: "1.5k",
      link: "/place/taj-mahal",
    },
  ];

  // State quản lý số lượng thẻ hiển thị
  const [visibleCount, setVisibleCount] = useState(8);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link to="/discover" className={styles.breadcrumbLink}>
            Khám phá
          </Link>
          <span>&gt;</span>
          <Link to="/discover/popular" className={styles.breadcrumbLink}>
            <strong>Những địa điểm được yêu thích nhất</strong>
          </Link>
        </div>

        {/* Header Title (Style giống Interesting Stories) */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Những địa điểm được yêu thích nhất</h1>
          <p className={styles.pageDesc}>
            Từ những góc phố quen thuộc mà ai cũng muốn quay lại, đến những miền
            đất khiến du khách lỡ một lần là nhớ mãi - đây là những điểm đến
            chiếm trọn trái tim của hàng triệu người yêu du lịch trên khắp thế
            giới.
          </p>
        </div>

        {/* Grid Danh sách địa điểm */}
        <div className={styles.placesGrid}>
          {allDestinations.slice(0, visibleCount).map((place) => (
            <Link key={place.id} to={place.link} className={styles.placeCard}>
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
            </Link>
          ))}
        </div>

        {/* Nút Xem thêm */}
        {visibleCount < allDestinations.length && (
          <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
            Xem thêm
          </button>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default PopularDestinations;