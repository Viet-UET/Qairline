import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import bg from "../../shared/assets/bg-city-modern.jpg";
import logo from "../../shared/assets/logo.svg";
import { getAllFlights } from "../../api/flights";

function normalizeFlight(backendFlight) {
  let departureTime = "—";
  let arrivalTime = "—";

  try {
    if (backendFlight.departureTime) {
      const deptDate = new Date(backendFlight.departureTime);
      if (!isNaN(deptDate.getTime())) {
        departureTime = deptDate.toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    }

    if (backendFlight.arrivalTime) {
      const arrDate = new Date(backendFlight.arrivalTime);
      if (!isNaN(arrDate.getTime())) {
        arrivalTime = arrDate.toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    }
  } catch (e) {
    console.error("Date parsing error:", e);
  }

  const date = backendFlight.departureTime
    ? new Date(backendFlight.departureTime).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "—";

  const route = `${backendFlight.originCity || "—"} → ${backendFlight.destinationCity || "—"}`;
  const airports = `${backendFlight.originAirportCode || "—"} → ${backendFlight.destinationAirportCode || "—"}`;

  return {
    id: backendFlight.id,
    flightNumber: backendFlight.flightNumber || "—",
    route,
    airports,
    departureTime,
    arrivalTime,
    date,
    airline: backendFlight.airlineName || "—",
  };
}

const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-6 mt-8">
      <button
        disabled={page === 0}
        onClick={() => onChange(page - 1)}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={18} />
        <span className="font-medium">Trang trước</span>
      </button>

      <div className="px-4 py-2 bg-qa-green text-white rounded-lg font-medium">
        {page + 1} / {totalPages}
      </div>

      <button
        disabled={page >= totalPages - 1}
        onClick={() => onChange(page + 1)}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <span className="font-medium">Trang sau</span>
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default function AllFlights() {
  const [flights, setFlights] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        const res = await getAllFlights(page, 10);
        console.log("=== API Response ===");
        console.log("Full response:", res);
        console.log("First flight:", res.content?.[0]);
        console.log("arrivalTime:", res.content?.[0]?.arrivalTime);
        console.log("==================");
        
        const normalized = res.content.map(normalizeFlight);
        setFlights(normalized);
        setTotalPages(res.totalPages);
      } catch (e) {
        console.error("Load flights failed:", e);
        setFlights([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [page]);

  return (
    <div
      className="min-h-screen bg-cover bg-center py-16"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl px-12 py-10">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="QAirline" className="w-[220px]" />
          </div>

          <h1 className="text-3xl text-qa-green text-center font-bold mb-8">
            Tất cả chuyến bay
          </h1>

          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block w-12 h-12 border-4 border-qa-green border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 mt-4">Đang tải dữ liệu…</p>
            </div>
          ) : flights.length === 0 ? (
            <p className="text-center text-gray-500 py-16">Không có chuyến bay nào</p>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-qa-green to-emerald-600 text-white">
                  <tr>
                    <th className="px-5 py-4 text-center font-semibold">STT</th>
                    <th className="px-5 py-4 text-left font-semibold">Chuyến bay</th>
                    <th className="px-5 py-4 text-left font-semibold">Tuyến bay</th>
                    <th className="px-5 py-4 text-center font-semibold">Giờ khởi hành</th>
                    <th className="px-5 py-4 text-center font-semibold">Ngày bay</th>
                    <th className="px-5 py-4 text-left font-semibold">Hãng bay</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-100">
                  {flights.map((f, index) => (
                    <tr
                      key={f.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-5 py-4 text-center text-gray-600">
                        {page * 10 + index + 1}
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-bold text-qa-green text-lg">{f.flightNumber}</div>
                        <div className="text-xs text-gray-500">{f.airports}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-medium text-gray-800">{f.route}</div>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <div className="font-semibold text-gray-900">{f.departureTime}</div>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <div className="text-gray-700">{f.date}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-medium text-gray-800">{f.airline}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}