import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import logo from "../../shared/assets/logo.svg";
import bg from "../../shared/assets/bg-city-modern.jpg";

import { getAllFlights } from "../../api/flights";

/* =========================
   ADAPTER
========================= */
function normalizeFlight(backendFlight) {
  const seatPrices = Array.isArray(backendFlight.seatClassPrices) ? backendFlight.seatClassPrices : [];
  const minPrice = seatPrices.length > 0 ? Math.min(...seatPrices.map(p => p.price)) : 0;

  const departureTime = backendFlight.departureTime
    ? new Date(backendFlight.departureTime).toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    : "—";

  const arrivalTime = backendFlight.arrivalTime
    ? new Date(backendFlight.arrivalTime).toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    : "—";

  return {
    id: backendFlight.flightInstanceId,
    code: backendFlight.flightNumber,
    airline: backendFlight.airlineName,
    departure: `${backendFlight.originCity} (${backendFlight.originAirportCode})`,
    destination: `${backendFlight.destinationCity} (${backendFlight.destinationAirportCode})`,
    departureTime,
    arrivalTime,
    minPrice,
    status: backendFlight.status || 'scheduled', // Assume backend provides status
  };
}

/* =========================
   STATUS STYLES
========================= */
const statusStyle = {
  completed: "bg-green-100 text-green-700",
  delayed: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-600",
  scheduled: "bg-blue-100 text-blue-600",
};

/* =========================
   PAGINATION
========================= */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#D9D9D9] hover:bg-[#F8F7F9] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={16} />
        Trang trước
      </button>
      <span className="text-gray-600">
        Trang {currentPage + 1} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#D9D9D9] hover:bg-[#F8F7F9] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Trang sau
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default function AllFlights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllFlights(currentPage, 10);
        const normalized = data.content.map(normalizeFlight);
        setFlights(normalized);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Failed to load all flights:", err);
        setError("Failed to load flights");
        setFlights([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat py-16"
      style={{ backgroundImage: `url(${bg})` }}
    >
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

          {/* TITLE */}
          <h1 className="text-[32px] text-qa-green font-audiowide leading-tight mb-8 text-center">
            Tất cả chuyến bay
          </h1>

          {/* FLIGHT LIST */}
          <h2 className="text-[24px] text-qa-green font-semibold mb-6 font-afacad">
            Các chuyến bay
          </h2>

          {loading && <p className="text-center text-gray-500">Đang tải chuyến bay...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && flights.length === 0 && <p className="text-center text-gray-500">Hiện chưa có chuyến bay nào</p>}

          {!loading && !error && flights.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3 text-left">Mã chuyến</th>
                    <th className="px-4 py-3">Điểm đi</th>
                    <th className="px-4 py-3">Điểm đến</th>
                    <th className="px-4 py-3">Khởi hành</th>
                    <th className="px-4 py-3">Hạ cánh</th>
                    <th className="px-4 py-3">Hãng bay</th>
                    <th className="px-4 py-3">Giá</th>
                    <th className="px-4 py-3">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {flights.map((f) => (
                    <tr
                      key={f.id}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 font-medium">{f.code}</td>
                      <td className="px-4 py-3">{f.departure}</td>
                      <td className="px-4 py-3">{f.destination}</td>
                      <td className="px-4 py-3">{f.departureTime}</td>
                      <td className="px-4 py-3">{f.arrivalTime}</td>
                      <td className="px-4 py-3">{f.airline}</td>
                      <td className="px-4 py-3 font-medium">
                        {f.minPrice.toLocaleString('vi-VN')} VND
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${statusStyle[f.status]}`}
                        >
                          {f.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* PAGINATION */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
