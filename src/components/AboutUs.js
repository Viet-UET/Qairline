import React, { useEffect, useState } from "react";
import styles from "./AboutUs.module.css";
import Header from "./Header";
import Footer from "./Footer";

// IMPORT ẢNH
import imgHero from "../Assets/flight_attendant_1.png";
import img2010 from "../Assets/Promo_1.png";
import img2015 from "../Assets/Promo_2.png";
import img2020 from "../Assets/plane.png";
import img2025 from "../Assets/plane.png";

// Ảnh mới cho Postcard
import imgPostcardFront from "../Assets/postcard.png"; // Dùng ảnh bạn gửi hoặc ảnh phi công/tiếp viên
import logoStamp from "../Assets/logo.png"; // Dùng logo làm tem
import imgPostcardBackLeft from "../Assets/flight_attendant_1.png"; // Ảnh mặt sau bên trái (Tạm dùng ảnh máy bay, bạn có thể thay)

const MILESTONES = [
  // ... (Giữ nguyên dữ liệu cũ)
  {
    year: "2010",
    title: "Khởi nguồn giấc mơ bay",
    desc: "QAirline được thành lập với một sứ mệnh giản dị nhưng đầy tham vọng: Kết nối mọi miền tổ quốc Việt Nam bằng những chuyến bay an toàn, giá cả hợp lý và chất lượng dịch vụ tận tâm. Chúng tôi bắt đầu chỉ với 3 chiếc máy bay và niềm tin mãnh liệt vào tương lai.",
    img: img2010,
  },
  {
    year: "2015",
    title: "Vươn ra biển lớn",
    desc: "Đánh dấu cột mốc 5 năm, QAirline chính thức mở đường bay quốc tế đầu tiên đến Bangkok và Singapore. Đây là bước ngoặt khẳng định vị thế của hãng trong khu vực, mang hình ảnh hiếu khách của Việt Nam đến với bạn bè quốc tế.",
    img: img2015,
  },
  {
    year: "2018",
    title: "Kỷ nguyên số hóa",
    desc: "Nắm bắt xu hướng công nghệ 4.0, QAirline ra mắt hệ thống đặt vé thông minh và ứng dụng di động Q-App. Việc này giúp hàng triệu khách hàng tiết kiệm thời gian, dễ dàng quản lý hành trình chỉ với vài cú chạm.",
    img: img2025,
  },
  {
    year: "2020",
    title: "Cam kết Xanh - Green Fly",
    desc: "Trước những thách thức về môi trường, QAirline khởi động chiến dịch 'Tự động xanh vươn ra thế giới'. Chúng tôi bắt đầu loại bỏ nhựa dùng một lần trên chuyến bay và nhập khẩu dòng máy bay NEO tiết kiệm 20% nhiên liệu.",
    img: img2020,
  },
  {
    year: "2025",
    title: "Vững bước tương lai",
    desc: "Hôm nay, QAirline tự hào sở hữu đội bay hiện đại hơn 50 chiếc, mạng lưới bay phủ sóng 5 châu lục. Chúng tôi không chỉ là một hãng hàng không, mà là người bạn đồng hành tin cậy trong mọi hành trình đoàn viên và khám phá của bạn.",
    img: imgHero,
  },
];

function AboutUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={styles.container}>
      <Header />

      {/* HERO BANNER (Giữ nguyên) */}
      <div
        className={styles.heroBanner}
        style={{ backgroundImage: `url(${imgHero})` }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.mainTitle}>Về QAirlines</h1>
          <p className={styles.subTitle}>
            Hành trình 15 năm sải cánh vươn cao, kết nối triệu trái tim.
          </p>
        </div>
      </div>

      <div className={styles.wrapper}>
        {/* INTRO (Giữ nguyên) */}
        <section className={styles.introSection}>
          <h2 className={styles.sectionTitle}>Câu chuyện của chúng tôi</h2>
          <p className={styles.introText}>
            QAirlines không chỉ được xây dựng từ sắt thép và động cơ, mà được
            đúc kết từ khát vọng tự do và niềm đam mê chinh phục bầu trời. Từ
            những ngày đầu tiên đầy gian khó cho đến vị thế ngày hôm nay, mỗi
            chặng đường chúng tôi đi qua đều in đậm dấu ấn của sự nỗ lực không
            ngừng nghỉ và sự ủng hộ quý báu từ hàng triệu khách hàng. Hãy cùng
            chúng tôi nhìn lại hành trình đầy tự hào đó.
          </p>
        </section>

        {/* TIMELINE (Giữ nguyên) */}
        <section className={styles.timelineContainer}>
          <div className={styles.timelineNav}>
            {MILESTONES.map((item, index) => (
              <div
                key={index}
                className={`${styles.yearItem} ${
                  index === activeIndex ? styles.active : ""
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {item.year}
              </div>
            ))}
          </div>
          <div className={styles.timelineDisplay}>
            {MILESTONES.map((item, index) => {
              if (index !== activeIndex) return null;
              return (
                <div key={index} className={styles.displayCard}>
                  <img
                    src={item.img}
                    alt={item.title}
                    className={styles.displayImage}
                  />
                  <div className={styles.displayText}>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- POSTCARD SECTION (SỬA ĐỔI) --- */}
        <section className={styles.postcardSection}>
          {/* Tiêu đề đã được đưa ra ngoài */}
          <h2 className={styles.postcardSectionTitle}>
            Lời tri ân từ trái tim
          </h2>

          <div
            className={`${styles.postcardWrapper} ${
              isFlipped ? styles.flipped : ""
            }`}
            onClick={handleCardClick}
          >
            <div className={styles.postcardInner}>
              {/* --- MẶT TRƯỚC: CHỈ CÓ ẢNH --- */}
              <div className={styles.postcardFront}>
                <img
                  src={imgPostcardFront}
                  alt="Postcard Cover"
                  className={styles.frontImage}
                />
              </div>

              {/* --- MẶT SAU: 2 CỘT --- */}
              <div className={styles.postcardBack}>
                {/* Cột Trái: Hình ảnh */}
                <div className={styles.backLeftImg}>
                  <img
                    src={imgPostcardBackLeft}
                    alt="Our Team"
                    className={styles.backSideImage}
                  />
                </div>

                {/* Cột Phải: Lời chúc */}
                <div className={styles.backRightText}>
                  <div className={styles.greeting}>Thân gửi Quý khách,</div>
                  <div className={styles.messageBody}>
                    Cảm ơn bạn đã lựa chọn QAirlines cho hành trình của mình.
                    Mỗi chuyến bay của bạn là động lực để chúng tôi nỗ lực hơn
                    mỗi ngày.
                    <br />
                    <br />
                    Chúc bạn luôn có những chuyến đi an toàn, ngập tràn niềm vui
                    và hạnh phúc!
                  </div>
                  <div className={styles.signature}>Ban Lãnh Đạo QAirlines</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.instructionText}>
            (Nhấp vào tấm thiệp để lật mặt sau)
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
