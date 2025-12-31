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
    { id: 4, img: imgSarajero, link: "/explore/news" }, // Updated link
    { id: 5, img: imgCamogli, link: "/camogli" },
    { id: 6, img: imgSagradaFamilia, link: "/explore/news" }, // Updated link
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

  // For now, the modal logic is kept but not implemented. 
  // The booking flow will be handled by the main app's logic.
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ origin: '', dest: '' });

  const openBookingModal = (from, to) => {
      setModalData({ origin: from, dest: to });
      // setIsModalOpen(true); // This would trigger a modal that doesn't exist in the new structure yet.
      console.log(`Trigger booking modal for: ${from} -> ${to}`);
  };

  return (
    <div className="bg-gray-50">
      {/* --- HERO SLIDER --- */}
      <section className="relative h-[500px] w-full">
        <button className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all" onClick={prevSlide}>
          &lt;
        </button>
        <button className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all" onClick={nextSlide}>
          &gt;
        </button>

        <div
          className="w-full h-full bg-cover bg-center transition-all duration-500 ease-in-out"
          style={{ backgroundImage: `url(${slides[currentSlide].img})` }}
        >
          <Link to={slides[currentSlide].link} className="absolute inset-0 flex items-end justify-start p-12 bg-gradient-to-t from-black/50 to-transparent">
            <button className="px-6 py-3 bg-qa-green text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-colors">Tìm hiểu thêm</button>
          </Link>
        </div>
      </section>

      <div className="-mt-24 mb-16 relative z-20">
        <FlightSearch />
      </div>

      {/* --- DAILY PROMOTIONS --- */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800">Khám phá khuyến mãi hàng ngày</h2>
        <p className="text-center text-gray-600 mt-2 mb-8">
          Tiết kiệm nhiều hơn khi đặt vé bay và khách sạn đến những điểm đến tuyệt vời.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Ticket Card 1 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-transform duration-300" onClick={() => openBookingModal("Hồ Chí Minh", "Bangkok")}>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-500">Thành phố Hồ Chí Minh đến</div>
                  <div className="text-2xl font-bold text-gray-800">Bangkok</div>
                </div>
                <div className="text-2xl font-bold text-qa-green">3,490,000<span className="text-base">đ</span></div>
              </div>
              <div className="mt-2 inline-block bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">Chỗ ngồi có hạn</div>
            </div>
            <div className="bg-gray-100 px-6 py-3 text-xs text-gray-600">
              <div className="font-semibold">30/11/2025 - 31/12/2025</div>
              <div>Hạn chót đăng ký: 23:59' ngày 22/11/2025</div>
            </div>
          </div>

          {/* Ticket Card 2 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-transform duration-300" onClick={() => openBookingModal("Hồ Chí Minh", "Hà Nội")}>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-500">Thành phố Hồ Chí Minh đến</div>
                  <div className="text-2xl font-bold text-gray-800">Hà Nội</div>
                </div>
                <div className="text-2xl font-bold text-qa-green">1,290,000<span className="text-base">đ</span></div>
              </div>
              <div className="mt-2 inline-block bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">Chỗ ngồi có hạn</div>
            </div>
            <div className="bg-gray-100 px-6 py-3 text-xs text-gray-600">
              <div className="font-semibold">18/11/2025 - 15/03/2026</div>
              <div>Hạn chót đăng ký: 23:59' ngày 22/10/2025</div>
            </div>
          </div>

          {/* CTA Card */}
          <Link to="/explore/promotions" className="bg-green-50 rounded-xl shadow-lg flex flex-col items-center justify-center text-center p-6 transform hover:-translate-y-1 transition-transform duration-300">
            <span className="text-4xl mb-2">✈️</span>
            <div className="font-bold text-gray-800">Bạn muốn xem thêm ưu đãi?</div>
            <button className="mt-4 px-5 py-2 bg-qa-green text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors">Xem tất cả các khuyến mãi</button>
          </Link>
        </div>
      </section>

      {/* --- SPECIAL OFFERS --- */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800">Ưu đãi đặc biệt</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white rounded-xl shadow-lg text-center p-6">
            <img src={imgStudent} alt="Sinh viên" className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800">Ưu đãi dành cho sinh viên</h3>
            <p className="text-gray-600 mt-2 text-sm">Giá vé giảm đến 20%, tăng giới hạn hành lý, WiFi miễn phí...</p>
            <a href="#" className="mt-4 inline-block text-qa-green font-semibold hover:underline">&gt;&gt; Tìm hiểu thêm</a>
          </div>
          <div className="bg-white rounded-xl shadow-lg text-center p-6">
            <img src={imgMember} alt="Hội viên" className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800">Đăng ký gói hội viên</h3>
            <p className="text-gray-600 mt-2 text-sm">Sử dụng quyền lợi đặc biệt của hội viên để giảm giá vé...</p>
            <a href="#" className="mt-4 inline-block text-qa-green font-semibold hover:underline">&gt;&gt; Tìm hiểu thêm</a>
          </div>
          <div className="bg-white rounded-xl shadow-lg text-center p-6">
            <img src={imgSponsor} alt="Nhà tài trợ" className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800">Ưu đãi từ nhà tài trợ</h3>
            <p className="text-gray-600 mt-2 text-sm">Mã giảm giá đặc biệt đến từ những quý nhà tài trợ hảo tâm...</p>
            <a href="#" className="mt-4 inline-block text-qa-green font-semibold hover:underline">&gt;&gt; Tìm hiểu thêm</a>
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER --- */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800">Đăng ký Q-eflight News</h2>
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <p className="text-center text-lg font-semibold text-gray-700">
            Đăng ký Q-eflight News để cập nhật các thông tin, ưu đãi mới nhất từ QAirlines.
          </p>
          <p className="text-center text-sm text-gray-500 mt-1">
            (Không bao gồm thông tin ưu đãi dành riêng cho gói hội viên "Long-Lân-Quy-Phụng")
          </p>
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <input type="email" placeholder="nhap_email@example.com" className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-qa-green outline-none" />
            <button className="px-8 py-3 bg-qa-green text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-colors">Đăng ký</button>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <input type="checkbox" id="newsletter-agree" className="h-4 w-4 text-qa-green focus:ring-green-500 border-gray-300 rounded" />
            <label htmlFor="newsletter-agree" className="ml-2 block text-sm text-gray-700">
              Tôi muốn nhận các ưu đãi và tin tức từ QAirline.
            </label>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
