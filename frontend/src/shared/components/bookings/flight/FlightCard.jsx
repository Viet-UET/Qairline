import {
  PlaneTakeoff,
  Clock,
  BadgeCheck,
  Utensils,
  Wifi,
  Armchair,
  Glasses,
  Crown,
} from "lucide-react";

import useFlightStore from "../../../stores/useFlightStore";

/* ===== CLASS META ===== */
const CLASS_META = {
  Economy: {
    border: "border-green-300",
    bg: "bg-green-50",
    btn: "bg-green-600 hover:bg-green-700",
    perks: [
      { icon: <Utensils size={14} />, text: "Bữa ăn cơ bản" },
      { icon: <Armchair size={14} />, text: "Ghế tiêu chuẩn" },
    ],
  },
  Business: {
    border: "border-blue-300",
    bg: "bg-blue-50",
    btn: "bg-blue-600 hover:bg-blue-700",
    perks: [
      { icon: <Utensils size={14} />, text: "Đồ ăn cao cấp" },
      { icon: <Armchair size={14} />, text: "Ghế rộng rãi" },
      { icon: <Wifi size={14} />, text: "Wifi miễn phí" },
    ],
  },
  "First Class": {
    border: "border-purple-300",
    bg: "bg-purple-50",
    btn: "bg-purple-600 hover:bg-purple-700",
    perks: [
      { icon: <Crown size={14} />, text: "Dịch vụ VIP" },
      { icon: <Glasses size={14} />, text: "Ẩm thực cao cấp" },
      { icon: <BadgeCheck size={14} />, text: "Ưu tiên tối đa" },
    ],
  },
};

export default function FlightCard({ flight }) {
  const openSeatModal = useFlightStore((s) => s.openSeatModal);

  return (
    <div className="bg-white border border-[#D9D9D9] rounded-[28px] p-6 mb-8 font-afacad">

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-6 text-[14px] text-gray-500">
          <span className="flex items-center gap-2">
            ✈ Flight #{flight.flight_id}
          </span>
          <span className="flex items-center gap-2">
            🛩 Airplane ID: {flight.airplane_id ?? 19}
          </span>
        </div>

        <span className="px-4 py-1 rounded-full bg-[#F8F7F9] border border-[#D9D9D9] text-[13px] text-qa-green font-semibold">
          Scheduled
        </span>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-6 items-start">

        {/* LEFT: FLIGHT INFO */}
        <div className="border border-[#D9D9D9] rounded-2xl p-5">

          <div className="grid grid-cols-3 items-center">

            {/* FROM */}
            <div>
              <p className="text-[28px] font-bold text-qa-green">
                {flight.departure_time_from}
              </p>
              <p className="font-semibold">{flight.departure}</p>
              <p className="text-gray-500 text-[13px]">
                {flight.departure_date}
              </p>
            </div>

            {/* DURATION */}
            <div className="flex flex-col items-center text-gray-500 gap-1">
              <PlaneTakeoff size={18} />
              <div className="flex items-center gap-1 text-[13px]">
                <Clock size={13} />
                {flight.duration} phút
              </div>
            </div>

            {/* TO */}
            <div className="text-right">
              <p className="text-[28px] font-bold text-qa-green">
                {flight.departure_time_to}
              </p>
              <p className="font-semibold">{flight.destination}</p>
              <p className="text-gray-500 text-[13px]">
                {flight.arrival_date}
              </p>
            </div>
          </div>

          {/* AIRCRAFT INFO */}
          <div className="mt-4 flex items-center gap-4 bg-[#F8F7F9] border border-[#D9D9D9] rounded-xl p-3">
            <PlaneTakeoff size={20} className="text-qa-green" />
            <div>
              <p className="font-semibold text-qa-green">
                Boeing 747-400
              </p>
              <p className="text-gray-500 text-[13px]">
                {flight.total_seats ?? 116} seats
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: CLASS OPTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch h-full">
          {[
            {
              name: "Economy",
              price: flight.economy_price,
              seat: flight.economy_available,
            },
            {
              name: "Business",
              price: flight.business_price,
              seat: flight.business_available,
            },
            {
              name: "First Class",
              price: flight.first_class_price,
              seat: flight.first_class_available,
            },
          ].map((c) => {
            const meta = CLASS_META[c.name];

            return (
              <div
                key={c.name}
                className={`rounded-2xl border ${meta.border} ${meta.bg} p-5 flex flex-col h-full`}
              >
                {/* Header */}
                <div className="mb-3">
                  <p className="font-semibold text-[16px] text-qa-green mb-1">
                    {c.name}
                  </p>
                  <p className="text-[22px] font-bold">
                    {c.price.toLocaleString()} đ
                  </p>
                </div>

                {/* Meta */}
                <p className="text-[13px] text-gray-600 mb-4">
                  {c.seat} chỗ trống
                </p>

                {/* Features */}
                <ul className="space-y-2 text-[13px] text-gray-700">
                  {meta.perks.map((p, i) => (
                    <li key={i} className="flex items-center gap-2">
                      {p.icon} {p.text}
                    </li>
                  ))}
                </ul>

                {/* Action */}
                <button
                  onClick={() => openSeatModal(flight, c.name)}
                  className={`mt-auto h-[40px] text-white rounded-xl font-semibold transition ${meta.btn}`}
                >
                  Chọn
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
