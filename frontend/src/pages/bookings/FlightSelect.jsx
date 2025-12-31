import logo from "../../assets/logo.svg";
import { useState } from "react";
// import planeLogo from "../../../assets/plane.svg"; // File does not exist, comment out to fix error

export default function FlightSelect() {
  const [activeDate, setActiveDate] = useState("25/10");

  const dates = [
    "22/10",
    "23/10",
    "24/10",
    "25/10",
    "26/10",
    "27/10",
    "28/10",
  ];

  const flights = [
    {
      id: 1,
      code: "EY 431",
      depart: "SGN 06:40",
      arrive: "13:30 HAN",
      duration: "1 điểm dừng, 24h 10m",
      priceEco: "595 USD",
      priceBiz: "2,260 USD",
    },
    {
      id: 2,
      code: "EY 431",
      depart: "SGN 06:40",
      arrive: "13:30 HAN",
      duration: "1 điểm dừng, 24h 10m",
      priceEco: "595 USD",
      priceBiz: "2,260 USD",
    },
    {
      id: 3,
      code: "EY 431",
      depart: "SGN 06:40",
      arrive: "13:30 HAN",
      duration: "1 điểm dừng, 24h 10m",
      priceEco: "595 USD",
      priceBiz: "2,260 USD",
    },
  ];

  return (
    <div className="bg-white min-h-screen w-full">

      {/* HEADER */}
      <div className="border-b py-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <img src={logo} alt="QAirline" className="w-[160px]" />

          <div className="flex items-center text-qa-green font-medium space-x-7">
            <span className="font-semibold">Chuyến bay</span>
            <span>Hành khách</span>
            <span>Ghế</span>
            <span>Hành lý</span>
            <span>Dịch vụ</span>
            <span>Thanh toán</span>
          </div>
        </div>
      </div>

      {/* TIMELINE DATES */}
      <div className="flex justify-center mt-6">
        <div className="flex items-center gap-3 text-center">
          {dates.map((d, idx) => (
            <div
              key={d}
              onClick={() => setActiveDate(d)}
              className={`
                px-7 py-2 rounded-xl cursor-pointer border text-sm
                ${
                  activeDate === d
                    ? "bg-qa-green text-white border-qa-green"
                    : "bg-white text-qa-green border-gray-300"
                }
              `}
            >
              {d}
              <div className="text-[13px] text-gray-500 mt-1">
                1,320,000 đ
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FILTER + OPTIONS */}
      <div className="max-w-[1200px] mx-auto flex items-center justify-between mt-10">
        <button className="w-[150px] h-[48px] border border-gray-400 rounded-full text-qa-green text-lg">
          Chuyến bay
        </button>

        <button className="w-[150px] h-[48px] border border-qa-green rounded-full text-qa-green text-lg">
          Lọc
        </button>

        <button className="w-[150px] h-[48px] border border-gray-400 rounded-full text-qa-green text-lg">
          Phổ thông
        </button>

        <button className="w-[150px] h-[48px] border border-gray-400 rounded-full text-qa-green text-lg">
          Thương gia
        </button>
      </div>

      {/* FLIGHT LIST */}
      <div className="max-w-[1200px] mx-auto mt-10 space-y-8 font-afacad">
        
        {flights.map((f) => (
          <div
            key={f.id}
            className="w-full border border-qa-green rounded-3xl p-6 flex items-center justify-between shadow-sm"
          >
            {/* Flight Info */}
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Etihad A380</span>

              <div className="flex items-center gap-4">
                <span className="text-[28px] font-semibold text-qa-green">{f.depart}</span>

                <span className="text-gray-500">✈</span>

                <span className="text-[28px] font-semibold text-qa-green">{f.arrive}</span>
              </div>

              <div className="text-gray-500 mt-1 text-sm">{f.duration} | Chi tiết</div>
            </div>

            {/* AIRLINE LOGO + CODE */}
            <div className="flex flex-col items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Etihad_Airways_Logo.svg"
                className="w-[70px] mb-2"
              />

              <div className="font-bold text-qa-green text-xl">{f.code}</div>
            </div>

            {/* PRICE ECO */}
            <div className="flex flex-col items-end">
              <span className="text-gray-600 text-sm">Chỉ từ</span>
              <span className="text-qa-green font-bold text-xl">{f.priceEco}</span>
              <button className="text-qa-green underline mt-2">Xem ▼</button>
            </div>

            {/* PRICE BIZ */}
            <div className="flex flex-col items-end">
              <span className="text-gray-600 text-sm">Chỉ từ</span>
              <span className="text-qa-green font-bold text-xl">{f.priceBiz}</span>
              <button className="text-qa-green underline mt-2">Xem ▼</button>
            </div>
          </div>
        ))}
      </div>

      {/* BUTTONS BOTTOM */}
      <div className="max-w-[1200px] mx-auto flex justify-between mt-10">
        <button className="px-10 py-3 border border-qa-green rounded-full text-qa-green">
          Quay lại
        </button>

        <button className="px-10 py-3 bg-qa-green text-white rounded-full hover:bg-green-700">
          Xem thêm
        </button>
      </div>

      {/* FOOTER */}
      <div className="bg-qa-green text-white mt-20 py-10">
        <div className="max-w-[1200px] mx-auto text-center space-y-2">
          <p>Liên hệ • Cam kết với khách hàng • Chính sách bảo mật</p>
          <p>Các điều khoản & điều kiện • Bản đồ sân bay</p>
          <p className="opacity-70 text-sm mt-3">
            © 2025 QAirline JSC — Trường Đại học Công nghệ, ĐHQGHN
          </p>
        </div>
      </div>

    </div>
  );
}
