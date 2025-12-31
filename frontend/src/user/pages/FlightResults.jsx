import { useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Calendar, Users } from "lucide-react";

import logo from "../../shared/assets/logo.svg";
import bg from "../../shared/assets/bg-city-modern.jpg";

import FlightCard from "../../shared/components/bookings/flight/FlightCard";
import SeatModal from "../../shared/components/bookings/seat/SeatModal";

/* =========================
   SEARCH SUMMARY
========================= */
const InfoBox = ({ icon: Icon, label, value }) => (
  <div className="bg-[#F8F7F9] border border-[#D9D9D9] rounded-2xl px-5 py-4 flex gap-3 items-center">
    <div className="text-qa-green">
      <Icon size={20} />
    </div>
    <div className="min-w-0">
      <p className="text-[14px] text-gray-500">{label}</p>
      <p className="text-[18px] text-qa-green font-semibold truncate">
        {value || "—"}
      </p>
    </div>
  </div>
);

const SearchSummary = ({ departure, destination, date, amount, isRoundTrip }) => {
  const pax = Math.max(1, Number(amount) || 1);

  return (
    <div className="bg-white border border-[#D9D9D9] rounded-[32px] p-8 shadow-sm mb-10 font-afacad">
      <span className="inline-flex items-center mb-4 px-4 py-1.5 rounded-full bg-[#F8F7F9] border border-[#D9D9D9] text-qa-green text-[14px] font-semibold">
        {isRoundTrip ? "Chuyến bay khứ hồi" : "Chuyến bay một chiều"}
      </span>

      <h1 className="text-[32px] text-qa-green font-audiowide leading-tight mb-8">
        Kết quả tìm kiếm
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <InfoBox icon={MapPin} label="Từ" value={departure} />
        <InfoBox icon={MapPin} label="Đến" value={destination} />
        <InfoBox icon={Calendar} label="Ngày đi" value={date} />
        <InfoBox icon={Users} label="Hành khách" value={`${pax} người`} />
      </div>
    </div>
  );
};

export default function FlightResults() {
  // Demo data (giữ như bạn đang làm). Khi nối API, chỉ cần setFlights(data).
  const [flights] = useState([
    {
      flight_id: 1,
      departure: "SGN",
      destination: "HAN",
      departure_time_from: "07:45",
      departure_time_to: "09:00",
      departure_date: "2025-12-31",
      arrival_date: "2025-12-31",
      duration: 75,
      economy_price: 1200000,
      business_price: 2500000,
      first_class_price: 4000000,
      economy_available: 12,
      business_available: 4,
      first_class_available: 2,
      airplane_id: 19,
      airplane_model: "Boeing 747-400",
      total_seats: 116,
      status: "Scheduled",
    },
    {
      flight_id: 2,
      departure: "SGN",
      destination: "DAD",
      departure_time_from: "10:30",
      departure_time_to: "12:00",
      departure_date: "2025-12-31",
      arrival_date: "2025-12-31",
      duration: 90,
      economy_price: 900000,
      business_price: 2000000,
      first_class_price: 3500000,
      economy_available: 20,
      business_available: 6,
      first_class_available: 0,
      airplane_id: 22,
      airplane_model: "Airbus A321",
      total_seats: 184,
      status: "Scheduled",
    },
  ]);

  const { departure, destination, departure_time, amount } = useParams();

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat py-16"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <SeatModal />

      <div className="mx-auto w-full max-w-[1300px] px-6">
        <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-[36px] px-10 py-12">
          {/* LOGO */}
          <div className="flex justify-center mb-10">
            <img
              src={logo}
              alt="QAirline"
              className="w-[260px] h-auto object-contain"
            />
          </div>

          {/* SEARCH INFO */}
          <SearchSummary
            departure={departure}
            destination={destination}
            date={departure_time}
            amount={amount}
            isRoundTrip={false}
          />

          {/* FLIGHT LIST */}
          <h2 className="text-[24px] text-qa-green font-semibold mb-6 font-afacad">
            Các chuyến bay
          </h2>

          <div className="space-y-8">
            {flights.map((f) => (
              <FlightCard key={f.flight_id} flight={f} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
