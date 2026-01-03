import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Calendar, Users } from "lucide-react";

import logo from "../../shared/assets/logo.svg";
import bg from "../../shared/assets/bg-city-modern.jpg";

import FlightCard from "../../shared/components/bookings/flight/FlightCard";
import SeatModal from "../../shared/components/bookings/seat/SeatModal";
import { searchFlights } from "../../api/flightApi";

/* =========================
   BỎ DẤU TIẾNG VIỆT
========================= */
function removeVietnameseTones(str) {
  if (!str) return '';
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D');
  return str;
}

/* =========================
   ADAPTER
========================= */
function normalizeFlight(backendFlight) {
  const departureDate = new Date(backendFlight.departureTime);

  const arrivalDate = backendFlight.arrivalTime
    ? new Date(backendFlight.arrivalTime)
    : new Date(departureDate.getTime() + 2 * 60 * 60 * 1000);

  const durationMs = arrivalDate - departureDate;
  const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
  const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  const duration = `${durationHours}h ${durationMinutes}m`;

  return {
    id: backendFlight.flightInstanceId,
    flight_id: backendFlight.flightInstanceId,
    flight_number: backendFlight.flightNumber,
    airline_name: backendFlight.airlineName,

    departure: `${backendFlight.originCity} – ${backendFlight.originAirportCode}`,
    destination: `${backendFlight.destinationCity} – ${backendFlight.destinationAirportCode}`,

    departure_time_from: departureDate.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    departure_time_to: arrivalDate.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }),

    departure_date: departureDate.toLocaleDateString("en-GB"),
    arrival_date: arrivalDate.toLocaleDateString("en-GB"),
    duration,

    airplane_id: backendFlight.flightNumber,
    aircraftModel: backendFlight.airlineName,

    total_seats: 150,

    /* ⭐ QUAN TRỌNG: shape đúng FlightCard */
    seatAvailability: (backendFlight.seatClassPrices || []).map(s => ({
      seatClassName: s.seatClass,   // 👈 ĐÚNG KEY
      price: s.price,               // 👈 NUMBER
      availableSeats: 25,           // mock tạm
    })),
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
      const timeoutId = setTimeout(() => {
        console.error('⏱️ Request timeout after 30 seconds!');
        setError('Yêu cầu quá lâu. Vui lòng thử lại.');
        setLoading(false);
      }, 30000);

      try {
        setLoading(true);
        setError(null);
        
        console.log('🚀 Fetching flights...');
        console.log('📤 URL Params from route (có dấu):', { departure, destination, departure_time, amount });
        
        // BỎ DẤU trước khi gửi lên backend
        const departureNoDiacritics = removeVietnameseTones(departure);
        const destinationNoDiacritics = removeVietnameseTones(destination);
        
        const params = {
          cityOrigin: departureNoDiacritics,      // "Ha Noi"
          cityDestination: destinationNoDiacritics, // "Ho Chi Minh"
          departureDate: departure_time,
          page: 0,
          size: 10
        };
        
        console.log('🌐 API Request params (không dấu):', params);
        
        const data = await searchFlights(params);
        
        console.log('✅ API Response:', data);
        console.log('✅ Response content length:', data?.content?.length);
        
        if (!data || !data.content) {
          throw new Error('Invalid response format - missing content array');
        }
        
        const normalized = data.content.map(normalizeFlight);
        console.log('✅ Normalized flights:', normalized.length, 'items');
        
        setFlights(normalized);
        setTotalElements(data.totalElements);
        
        clearTimeout(timeoutId);
        console.log('🎉 Fetch completed successfully!');
        
      } catch (err) {
        clearTimeout(timeoutId);
        console.error('❌ Fetch error:', err);
        console.error('❌ Error message:', err.message);
        console.error('❌ Error response:', err.response?.data);
        console.error('❌ Error status:', err.response?.status);
        setError('Không thể tải dữ liệu chuyến bay. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    if (departure && destination && departure_time) {
      fetchFlights();
    } else {
      console.warn('⚠️ Missing required params:', { departure, destination, departure_time });
      setLoading(false);
    }
  }, [departure, destination, departure_time]);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat py-16"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <SeatModal />

      <div className="mx-auto w-full max-w-[1300px] px-6">
        <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-[36px] px-10 py-12">
          <div className="flex justify-center mb-10">
            <img
              src={logo}
              alt="QAirline"
              className="w-[260px] h-auto object-contain"
            />
          </div>

          <SearchSummary
            departure={departure}
            destination={destination}
            date={departure_time}
            amount={amount}
            isRoundTrip={false}
          />

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