import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Calendar, Users } from "lucide-react";

import logo from "../../shared/assets/logo.svg";
import bg from "../../shared/assets/bg-city-modern.jpg";

import FlightCard from "../../shared/components/bookings/flight/FlightCard";
import SeatModal from "../../shared/components/bookings/seat/SeatModal";
import { searchFlights } from "../../api/flightApi";

/* =========================
   ADAPTER
========================= */
function normalizeFlight(backendFlight) {
  return {
    id: backendFlight.id,
    flight_id: backendFlight.id,
    departure: backendFlight.origin || backendFlight.departure,
    destination: backendFlight.destination,
    departure_time_from: backendFlight.departureTime || backendFlight.departure_time_from,
    departure_time_to: backendFlight.arrivalTime || backendFlight.departure_time_to,
    departure_date: backendFlight.departureDate || backendFlight.departure_date,
    arrival_date: backendFlight.arrivalDate || backendFlight.arrival_date,
    duration: backendFlight.duration,
    airplane_id: backendFlight.aircraftId || backendFlight.airplane_id,
    // Add other fields as needed
  };
}

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
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalElements, setTotalElements] = useState(0);

  const { departure, destination, departure_time, amount } = useParams();

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {
          cityOrigin: departure,
          cityDestination: destination,
          departureDate: departure_time,
          page: 0,
          size: 10,
        };
        const data = await searchFlights(params);
        const normalized = data.content.map(normalizeFlight);
        setFlights(normalized);
        setTotalElements(data.totalElements);
      } catch (err) {
        console.error("Failed to search flights:", err);
        setError("Failed to load flights");
        setFlights([]);
        setTotalElements(0);
      } finally {
        setLoading(false);
      }
    };

    if (departure && destination && departure_time) {
      fetchFlights();
    } else {
      setLoading(false);
    }
  }, [departure, destination, departure_time, amount]);

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

          {loading && <p className="text-center text-gray-500">Đang tải chuyến bay...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && totalElements === 0 && <p className="text-center text-gray-500">Không tìm thấy chuyến bay phù hợp.</p>}

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
