import React, { useEffect, useState } from "react";

// TODO: Add correct image paths
import imgHero from "../../shared/assets/images/home/flight_attendant_1.png";
import img2010 from "../../shared/assets/images/promotions/Promo_1.png";
import img2015 from "../../shared/assets/images/promotions/Promo_2.png";
import img2020 from "../../shared/assets/images/home/plane.png";
import imgPostcardFront from "../../shared/assets/images/home/postcard.png";
import imgPostcardBackLeft from "../../shared/assets/images/home/flight_attendant_1.png";

const MILESTONES = [
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
    img: img2020,
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

function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="w-full bg-white font-afacad text-[#333] pb-[80px]">
      {/* HERO BANNER */}
      <div
        className="relative w-full h-[450px] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-center text-white mt-[60px] mb-[60px]"
        style={{ backgroundImage: `url(${imgHero})` }}
      >
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="relative z-20 max-w-[800px] px-[20px]">
          <h1 className="text-[3.5rem] font-extrabold mb-[20px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">Về QAirlines</h1>
          <p className="text-[1.2rem] font-medium leading-relaxed">
            Hành trình 15 năm sải cánh vươn cao, kết nối triệu trái tim.
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-[20px]">
        {/* INTRO */}
        <section className="text-center mb-[80px] max-w-[850px] mx-auto">
          <h2 className="text-[2.5rem] text-[#004D40] font-bold mb-[30px] relative inline-block after:content-[''] after:block after:w-[60px] after:h-[4px] after:bg-[#529246] after:mx-auto after:mt-[10px] after:rounded-[2px]">Câu chuyện của chúng tôi</h2>
          <p className="text-[1.1rem] leading-[1.8] text-[#555] text-justify">
            QAirlines không chỉ được xây dựng từ sắt thép và động cơ, mà được đúc kết từ khát vọng tự do và niềm đam mê chinh phục bầu trời. Từ những ngày đầu tiên đầy gian khó cho đến vị thế ngày hôm nay, mỗi chặng đường chúng tôi đi qua đều in đậm dấu ấn của sự nỗ lực không ngừng nghỉ và sự ủng hộ quý báu từ hàng triệu khách hàng. Hãy cùng chúng tôi nhìn lại hành trình đầy tự hào đó.
          </p>
        </section>

        {/* TIMELINE */}
        <section className="flex gap-[50px] mb-[100px] bg-[#f9fcf9] p-[40px] rounded-[20px] border border-[#e0f2f1]">
          <div className="flex-[0_0_150px] flex flex-col gap-0 relative border-r-[3px] border-[#ddd]">
            {MILESTONES.map((item, index) => (
              <div
                key={index}
                className={`py-[20px] text-[1.5rem] font-bold text-[#aaa] cursor-pointer relative transition-all duration-300 text-right pr-[30px] hover:text-[#529246] ${activeIndex === index ? 'text-[#004D40] text-[2rem]' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                {item.year}
                <span className={`absolute top-1/2 right-[-11px] -translate-y-1/2 w-[16px] h-[16px] bg-white border-[3px] border-[#ddd] rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-[#529246] border-[#529246] w-[20px] h-[20px] right-[-13px]' : ''}`}></span>
              </div>
            ))}
          </div>
          <div className="flex-1 relative min-h-[400px]">
            {MILESTONES.map((item, index) => (
              <div key={index} className={`transition-opacity duration-500 ease-in-out ${activeIndex === index ? 'opacity-100' : 'opacity-0 absolute'}`}>
                <img src={item.img} alt={item.title} className="w-full h-[350px] object-cover rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] mb-[25px]" />
                <div>
                  <h3 className="text-[2rem] text-[#004D40] mb-[15px]">{item.title}</h3>
                  <p className="text-[1.1rem] leading-[1.6] text-[#555]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* POSTCARD SECTION */}
        <section className="flex flex-col items-center py-[80px] px-[20px] bg-[#f0f7f4]">
          <h2 className="text-[3rem] text-[#004D40] font-bold mb-[40px] text-center">
            Lời tri ân từ trái tim
          </h2>

          {/* Perspective */}
          <div className="perspective-[1500px]">
            {/* Card */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className={`relative w-[700px] h-[450px] cursor-pointer transition-transform duration-1000
        [transform-style:preserve-3d]
        ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
            >
              {/* FRONT */}
              <div className="absolute inset-0 bg-white border-[10px] border-white overflow-hidden
                      [backface-visibility:hidden]">
                <img
                  src={imgPostcardFront}
                  alt="Postcard Front"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* BACK */}
              <div className="absolute inset-0 bg-white border-[10px] border-white flex
                      [transform:rotateY(180deg)]
                      [backface-visibility:hidden]">
                {/* Left image */}
                <div className="flex-1 overflow-hidden border-r border-[#ddd]">
                  <img
                    src={imgPostcardBackLeft}
                    alt="Our Team"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right text */}
                <div className="flex-[1.2] p-[30px] flex flex-col justify-center text-left">
                  <div className="text-[1.3rem] font-bold text-[#004D40] mb-[20px]">
                    Thân gửi Quý khách,
                  </div>

                  <div className="text-[1.05rem] leading-[30px] text-[#333] mb-[20px]">
                    Cảm ơn bạn đã lựa chọn QAirlines cho hành trình của mình.
                    Mỗi chuyến bay của bạn là động lực để chúng tôi nỗ lực hơn mỗi ngày.
                    <br /><br />
                    Chúc bạn luôn có những chuyến đi an toàn, ngập tràn niềm vui và hạnh phúc!
                  </div>

                  <div className="mt-auto text-right text-[1.4rem] font-bold text-[#529246]">
                    Ban Lãnh Đạo QAirlines
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[30px] text-[#004D40] text-[0.9rem] italic opacity-70 animate-bounce">
            (Nhấp vào tấm thiệp để lật mặt sau)
          </div>
        </section>

      </div>
    </div>
  );
}

export default About;