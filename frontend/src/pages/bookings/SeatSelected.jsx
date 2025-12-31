import { useState } from "react";
import logo from "../../assets/logo.svg";

export default function SeatSelect() {
  // Fake seat map (3 rows × 6 seats)
  const seatLayout = [
    ["A1", "B1", "C1", "D1", "E1", "F1"],
    ["A2", "B2", "C2", "D2", "E2", "F2"],
    ["A3", "B3", "C3", "D3", "E3", "F3"],
  ];

  const [selectedSeat, setSelectedSeat] = useState(null);

  const selectSeat = (seat) => {
    setSelectedSeat(seat);
  };

  return (
    <div className="bg-white min-h-screen w-full font-afacad">

      {/* HEADER */}
      <div className="border-b py-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <img src={logo} alt="QAirline" className="w-[160px]" />

          <div className="flex items-center text-qa-green font-medium space-x-7 text-[18px]">
            <span>Chuyến bay</span>
            <span>Hành khách</span>
            <span className="font-semibold border-b-2 border-qa-green pb-1">Ghế</span>
            <span>Hành lý</span>
            <span>Dịch vụ</span>
            <span>Thanh toán</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-[1400px] mx-auto flex gap-10 mt-10">

        {/* LEFT SIDE – PLANE + SEATS */}
        <div className="flex-1 flex justify-center">
          <div className="relative">

            {/* PLANE SVG (giống hình mẫu) */}
            <img
              src="https://i.imgur.com/nXK5yga.png"
              alt="plane"
              className="w-[380px]"
            />

            {/* SEAT GRID OVERLAY */}
            <div className="absolute top-[230px] left-1/2 -translate-x-1/2">
              {seatLayout.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-4 my-3">
                  {row.map((seatId) => {
                    const isSelected = selectedSeat === seatId;
                    const isBooked = seatId === "C2" || seatId === "E1"; // random booked demo

                    return (
                      <button
                        key={seatId}
                        onClick={() => !isBooked && selectSeat(seatId)}
                        className={`
                          w-[38px] h-[38px] rounded-md transition
                          flex items-center justify-center text-[12px]
                          ${isBooked ? "bg-gray-200 cursor-not-allowed" : ""}
                          ${isSelected ? "bg-qa-green text-white" : ""}
                          ${!isSelected && !isBooked ? "bg-teal-200 hover:bg-teal-300" : ""}
                        `}
                      >
                        {seatId}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – FLIGHT INFO CARD */}
        <div className="w-[420px]">
          <div className="border rounded-2xl shadow-sm p-6">
            <h3 className="text-[20px] font-bold mb-4">Thông tin chuyến bay</h3>

            <div className="border rounded-xl p-4">
              <p className="font-semibold text-gray-700">QAirlines - Economy</p>
              <p className="text-gray-500 text-sm mb-3">VNA-258</p>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[18px] font-bold text-qa-green">SGN</p>
                  <p className="text-[14px] text-gray-600">07:45</p>
                  <p className="text-[13px] text-gray-400">T7, 05/02/2022</p>
                </div>

                <div className="text-gray-500 text-sm">1g 15p</div>

                <div>
                  <p className="text-[18px] font-bold text-qa-green">HAN</p>
                  <p className="text-[14px] text-gray-600">09:00</p>
                  <p className="text-[13px] text-gray-400">T7, 05/02/2022</p>
                </div>
              </div>

              {/* Booking Code */}
              <div className="mt-4">
                <div className="text-gray-700 mb-1 text-sm">Mã đặt chỗ</div>
                <div className="flex items-center justify-between border rounded-lg px-3 py-2 bg-[#F5F7FB]">
                  <span className="font-semibold">FDBUH6</span>
                  <button className="text-qa-green">📋</button>
                </div>
              </div>

              {/* Selected seat */}
              <div className="mt-4">
                <div className="text-gray-700 text-sm mb-1">Ghế đã chọn</div>
                <div className="border rounded-lg px-3 py-2 bg-[#F5F7FB] text-qa-green font-semibold text-[17px]">
                  {selectedSeat ? selectedSeat : "Chưa chọn"}
                </div>
              </div>
            </div>

            {/* CONTINUE BUTTON */}
            <button
              disabled={!selectedSeat}
              className={`
                w-full mt-6 py-3 rounded-xl text-white text-lg font-semibold
                ${selectedSeat ? "bg-qa-green hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}
              `}
            >
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
