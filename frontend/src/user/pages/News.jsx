import React, { useState } from "react";
import { Link } from "react-router-dom";

// IMPORT HÌNH ẢNH
import imgSagrada from "../../shared/assets/images/home/sagrada_familia_1.png";
import imgLouvre from "../../shared/assets/images/home/lourve.png";
import imgAngkor from "../../shared/assets/images/home/angko_wat.png";
import imgMilan from "../../shared/assets/images/home/milan.png";
import imgSarajevo from "../../shared/assets/images/home/sarajevo.jpg";
import imgPisa from "../../shared/assets/images/home/Leaning-tower-of-pisa.jpg";
import imgKyoto from "../../shared/assets/images/home/kinkakuji-pagoda.jpg";
import imgIstanbul from "../../shared/assets/images/home/Istanbul_0.png";
import imgGreatWall from "../../shared/assets/images/home/great_wall.png";
import imgLatinBridge from "../../shared/assets/images/home/latin_bridge.jpg";

import leftImage from "../../shared/assets/images/home/interesting_place_left.png";
import rightImage from "../../shared/assets/images/home/interesting_place_right.png";

function News() {
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
  const handleViewMore = () => console.log("Navigate to popular destinations");
  const handleViewStories = () => console.log("Navigate to stories");

  const goToLink = (link) => {
    console.log("Navigating to:", link);
  };

  return (
    <div className="w-full bg-[#fcfcfc] font-['Afacad'] text-[#333]">

      <div className="max-w-[1265px] mx-auto px-5 py-[40px_20px_40px_20px]">
        {/* --- 1. HERO SECTION --- */}
        <section className="flex gap-10 justify-center items-end mb-20">
          <div className="w-[737px] flex flex-col justify-between gap-8">
            <div>
              <h1 className="text-6xl font-bold text-[#004D40] mb-5 leading-tight">
                Khám phá <br />
                những địa điểm du lịch <br />
                không thể bỏ lỡ
              </h1>
              <p className="text-xl text-[#529246] leading-relaxed max-w-[90%]">
                Từ những bãi biển trắng muốt trải dài tại vùng Tuscany, cho đến
                những ngọn tháp cổ kính của thành phố Sarajevo. Hãy cùng
                chúng tôi khám phá những địa điểm du lịch nổi tiếng được đông
                đảo du khách và chuyên gia đánh giá cao nhé.
              </p>
            </div>
            <img
              src={leftImage}
              alt="Promo Left"
              className="w-full h-[365px] object-cover rounded-[24px]"
            />
          </div>
          <div className="w-[488px] h-auto flex-shrink-0">
            <img
              src={rightImage}
              alt="Promo Right"
              className="w-full h-full object-cover rounded-[24px]"
            />
          </div>
        </section>

        {/* --- 2. POPULAR PLACES (SLIDER 4 THẺ) --- */}
        <section className="mb-20">
          <div className="flex justify-between items-end mb-10 border-b border-[#eee] pb-4">
            <div>
              <h2 className="text-5xl font-bold text-[#004D40] mb-2.5">Những địa điểm được yêu thích nhất</h2>
              <p className="text-xl text-[#529246] m-0 max-w-[700px]">
                Từ những góc phố quen thuộc mà ai cũng muốn quay lại, đến những
                miền đất khiến du khách lỡ một lần là nhớ mãi - đây là những
                điểm đến chiếm trọn trái tim của hàng triệu người yêu du lịch
                trên khắp thế giới.
              </p>
            </div>
            <div className="flex gap-2.5 items-center">
              <button className="px-5 py-2 rounded-[20px] border border-[#004D40] bg-transparent text-[#004D40] font-semibold cursor-pointer text-sm whitespace-nowrap transition-all hover:bg-[#004D40] hover:text-white" onClick={handleViewMore}>
                Tìm hiểu thêm
              </button>
              {/* Nút điều hướng Slider */}
              <button
                className="w-10 h-10 rounded-full border border-[#ccc] bg-white flex items-center justify-center cursor-pointer text-[#004D40] text-xl transition-all hover:bg-[#004D40] hover:text-white hover:border-[#004D40]"
                onClick={prevSlide}
                disabled={currentIndex === 0}
              >
                &lt;
              </button>
              <button
                className="w-10 h-10 rounded-full border border-[#ccc] bg-white flex items-center justify-center cursor-pointer text-[#004D40] text-xl transition-all hover:bg-[#004D40] hover:text-white hover:border-[#004D40]"
                onClick={nextSlide}
                disabled={currentIndex >= places.length - itemsToShow}
              >
                &gt;
              </button>
            </div>
          </div>

          {/* Cửa sổ hiển thị Slider */}
          <div className="overflow-hidden w-full">
            <div
              className="flex gap-5 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * cardWidth}px)`,
              }}
            >
              {places.map((place) => (
                <div
                  key={place.id}
                  className="w-[302px] h-[513px] flex-shrink-0 bg-white rounded-[16px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] border border-[#eee] p-2.5 box-border flex flex-col cursor-pointer transition-all hover:border-[#529246]"
                  onClick={() => goToLink(place.link)}
                >
                  <img
                    src={place.img}
                    alt={place.name}
                    className="w-[280px] h-[371px] object-cover rounded-[12px] mb-4"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-[#004D40] m-0">{place.name}</h3>
                      <p className="text-lg text-[#529246] m-0">{place.address}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2.5 pt-2.5 border-t border-dashed border-[#eee]">
                      <div className="flex gap-1">
                        {place.tags.map((tag, idx) => (
                          <span key={idx} className="text-xs font-semibold text-[#F57F17] bg-[#FFF9C4] border border-[#FBC02D] px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm font-bold text-[#333] flex items-center gap-1">
                        <span className="text-[#FBC02D]">★</span>
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
        <section className="mb-20">
          <div className="flex justify-between items-end mb-10 border-b border-[#eee] pb-4">
            <div>
              <h2 className="text-5xl font-bold text-[#004D40] mb-2.5">Những câu chuyện kỳ thú</h2>
              <p className="text-xl text-[#529246] m-0 max-w-[700px]">
                Mỗi hành trình là một câu chuyện - có khi là cuộc gặp gỡ tình
                cờ, có khi là khoảnh khắc khiến ta đổi thay mãi mãi.
              </p>
            </div>
            <div className="flex gap-2.5 items-center">
              <button className="px-5 py-2 rounded-[20px] border border-[#004D40] bg-transparent text-[#004D40] font-semibold cursor-pointer text-sm whitespace-nowrap transition-all hover:bg-[#004D40] hover:text-white" onClick={handleViewStories}>
                Tìm hiểu thêm
              </button>
            </div>
          </div>

          <div className="grid grid-cols-[1.2fr_0.8fr] gap-10 mb-20">
            {/* Bài lớn bên trái (Card style) */}
            <div
              className="relative rounded-[16px] overflow-hidden cursor-pointer shadow-[0_5px_20px_rgba(0,0,0,0.1)] h-[400px]"
              onClick={() => goToLink("/discover/stories/sarajevo")}
            >
              <img
                src={imgSarajevo}
                alt="Sarajevo"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                <p className="text-sm font-semibold text-white mb-1 uppercase tracking-wider">Annia Norwood</p>
                <h3 className="text-3xl font-bold text-white mb-2.5">
                  10 ngày dạo bước ở Sarajevo
                </h3>
                <p className="text-lg text-white opacity-90 mb-4 line-clamp-2">
                  Cùng theo chân nữ blogger nổi tiếng Annia Norwood trên hành
                  trình khám phá những địa điểm không thể bỏ lỡ tại Sarajevo,
                  nơi giao thoa của các nền văn hóa Đông Tây.
                </p>
                <span className="text-white font-bold underline">Đọc tiếp →</span>
              </div>
            </div>

            {/* List bài nhỏ bên phải */}
            <div className="flex flex-col justify-between gap-5">
              <div
                className="flex items-center gap-5 bg-white p-4 rounded-[12px] shadow-[0_2px_10px_rgba(0,0,0,0.05)] cursor-pointer border border-transparent transition-all hover:border-[#529246] hover:translate-x-1"
                onClick={() => goToLink("/discover/stories/istanbul")}
              >
                <img
                  src={imgIstanbul}
                  alt="Istanbul"
                  className="w-[90px] h-[90px] object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#006D5B] mb-1 uppercase tracking-wider">Annia Norwood</p>
                  <h4 className="text-xl font-bold text-[#333] m-0 mb-1.5 leading-tight">
                    Lang thang giữa linh hồn Istanbul
                  </h4>
                  <span className="text-sm text-[#529246] font-bold underline">Đọc tiếp →</span>
                </div>
              </div>

              <div
                className="flex items-center gap-5 bg-white p-4 rounded-[12px] shadow-[0_2px_10px_rgba(0,0,0,0.05)] cursor-pointer border border-transparent transition-all hover:border-[#529246] hover:translate-x-1"
                onClick={() => goToLink("/discover/stories/santorini")}
              >
                <img
                  src={imgSagrada}
                  alt="Santorini"
                  className="w-[90px] h-[90px] object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#006D5B] mb-1 uppercase tracking-wider">Annia Norwood</p>
                  <h4 className="text-xl font-bold text-[#333] m-0 mb-1.5 leading-tight">
                    Một mùa hè rực rỡ ở Santorini
                  </h4>
                  <span className="text-sm text-[#529246] font-bold underline">Đọc tiếp →</span>
                </div>
              </div>

              <div
                className="flex items-center gap-5 bg-white p-4 rounded-[12px] shadow-[0_2px_10px_rgba(0,0,0,0.05)] cursor-pointer border border-transparent transition-all hover:border-[#529246] hover:translate-x-1"
                onClick={() => goToLink("/discover/stories/kyoto")}
              >
                <img
                  src={imgAngkor}
                  alt="Kyoto"
                  className="w-[90px] h-[90px] object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#006D5B] mb-1 uppercase tracking-wider">Annia Norwood</p>
                  <h4 className="text-xl font-bold text-[#333] m-0 mb-1.5 leading-tight">
                    Kyoto: Giữa hương trà và tiếng chuông chùa
                  </h4>
                  <span className="text-sm text-[#529246] font-bold underline">Đọc tiếp →</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default News;
