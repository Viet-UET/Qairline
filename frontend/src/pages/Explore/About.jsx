import React, { useEffect, useState } from "react";

// TODO: Add correct image paths
import imgHero from "../../assets/images/home/flight_attendant_1.png";
import img2010 from "../../assets/images/promotions/Promo_1.png";
import img2015 from "../../assets/images/promotions/Promo_2.png";
import img2020 from "../../assets/images/home/plane.png";
import imgPostcardFront from "../../assets/images/home/postcard.png";
import imgPostcardBackLeft from "../../assets/images/home/flight_attendant_1.png";

const MILESTONES = [
  {
    year: "2010",
    title: "Khởi nguồn giấc mơ bay",
    desc: "QAirline được thành lập với một sứ mệnh giản dị nhưng đầy tham vọng: Kết nối mọi miền tổ quốc Việt Nam bằng những chuyến bay an toàn, giá cả hợp lý và chất lượng dịch vụ tận tâm.",
    img: img2010,
  },
  {
    year: "2015",
    title: "Vươn ra biển lớn",
    desc: "Đánh dấu cột mốc 5 năm, QAirline chính thức mở đường bay quốc tế đầu tiên đến Bangkok và Singapore, khẳng định vị thế trong khu vực.",
    img: img2015,
  },
  {
    year: "2018",
    title: "Kỷ nguyên số hóa",
    desc: "Ra mắt hệ thống đặt vé thông minh và ứng dụng di động Q-App, giúp hàng triệu khách hàng dễ dàng quản lý hành trình.",
    img: img2020, // Placeholder
  },
  {
    year: "2020",
    title: "Cam kết Xanh - Green Fly",
    desc: "Khởi động chiến dịch 'Tự động xanh vươn ra thế giới', loại bỏ nhựa dùng một lần và sử dụng máy bay NEO tiết kiệm nhiên liệu.",
    img: img2020,
  },
  {
    year: "2025",
    title: "Vững bước tương lai",
    desc: "Tự hào sở hữu đội bay hiện đại hơn 50 chiếc, mạng lưới bay phủ sóng 5 châu lục, là người bạn đồng hành tin cậy của bạn.",
    img: imgHero,
  },
];

function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-white text-gray-800 font-sans">
      <div className="relative w-full h-[450px] bg-cover bg-center flex items-center justify-center text-white text-center" style={{ backgroundImage: `url(${imgHero})` }}>
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="relative z-20 max-w-3xl px-4">
          <h1 className="text-5xl font-extrabold mb-5 shadow-text">Về QAirlines</h1>
          <p className="text-lg font-medium leading-relaxed shadow-text">Hành trình 15 năm sải cánh vươn cao, kết nối triệu trái tim.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-16">
        <section className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-qa-green mb-6 relative inline-block after:content-[''] after:block after:w-16 after:h-1 after:bg-green-500 after:mx-auto after:mt-2 after:rounded-full">Câu chuyện của chúng tôi</h2>
          <p className="text-lg leading-loose text-gray-600 text-justify">QAirlines không chỉ được xây dựng từ sắt thép và động cơ, mà được đúc kết từ khát vọng tự do và niềm đam mê chinh phục bầu trời. Từ những ngày đầu tiên đầy gian khó cho đến vị thế ngày hôm nay, mỗi chặng đường chúng tôi đi qua đều in đậm dấu ấn của sự nỗ lực không ngừng nghỉ và sự ủng hộ quý báu từ hàng triệu khách hàng. Hãy cùng chúng tôi nhìn lại hành trình đầy tự hào đó.</p>
        </section>

        <section className="flex flex-col md:flex-row gap-12 mb-24 bg-green-50/50 p-10 rounded-2xl border border-green-100">
          <div className="flex md:flex-col border-b-2 md:border-b-0 md:border-r-2 border-gray-300 pb-4 md:pb-0 md:pr-8 space-x-4 md:space-x-0 overflow-x-auto">
            {MILESTONES.map((item, index) => (
              <div key={index} className={`py-2 md:py-5 text-2xl font-bold whitespace-nowrap cursor-pointer relative transition-all duration-300 text-right pr-8 ${activeIndex === index ? 'text-qa-green text-3xl' : 'text-gray-400 hover:text-green-500'}`} onClick={() => setActiveIndex(index)}>
                {item.year}
                <span className={`absolute top-1/2 right-0 -translate-y-1/2 w-4 h-4 bg-white border-4 rounded-full transition-all duration-300 ${activeIndex === index ? 'border-qa-green scale-125' : 'border-gray-300'}`}></span>
              </div>
            ))}
          </div>
          <div className="flex-1 relative min-h-[400px]">
            {MILESTONES.map((item, index) => (
              <div key={index} className={`transition-opacity duration-500 ease-in-out ${activeIndex === index ? 'opacity-100' : 'opacity-0 absolute'}`}>
                <img src={item.img} alt={item.title} className="w-full h-80 object-cover rounded-2xl shadow-xl mb-6" />
                <div>
                  <h3 className="text-3xl font-bold text-qa-green mb-3">{item.title}</h3>
                  <p className="text-lg leading-relaxed text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col items-center justify-center py-20 bg-gray-100/70 perspective-1500">
            <h2 className="text-4xl font-bold text-qa-green mb-8 text-center">Lời tri ân từ trái tim</h2>
            <div className={`w-[700px] h-[450px] relative cursor-pointer transition-transform duration-1000 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
                {/* Front */}
                <div className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden border-8 border-white shadow-2xl">
                    <img src={imgPostcardFront} alt="Postcard Cover" className="w-full h-full object-cover" />
                </div>
                {/* Back */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-lg overflow-hidden border-8 border-white shadow-2xl bg-white flex">
                    <div className="flex-1 border-r border-gray-200">
                        <img src={imgPostcardBackLeft} alt="Our Team" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-[1.2] p-8 flex flex-col justify-center text-left">
                        <div className="text-xl font-bold text-qa-green mb-4">Thân gửi Quý khách,</div>
                        <div className="text-base leading-7 text-gray-700 mb-4 font-serif">
                            Cảm ơn bạn đã lựa chọn QAirlines cho hành trình của mình. Mỗi chuyến bay của bạn là động lực để chúng tôi nỗ lực hơn mỗi ngày.
                            <br/><br/>
                            Chúc bạn luôn có những chuyến đi an toàn, ngập tràn niềm vui và hạnh phúc!
                        </div>
                        <div className="mt-auto text-right text-xl font-bold text-green-600 font-cursive">Ban Lãnh Đạo QAirlines</div>
                    </div>
                </div>
            </div>
            <div className="mt-6 text-qa-green text-sm italic opacity-80 animate-bounce">(Nhấp vào tấm thiệp để lật mặt sau)</div>
        </section>
      </div>
    </div>
  );
}

export default About;
