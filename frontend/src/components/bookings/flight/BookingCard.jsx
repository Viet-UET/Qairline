// src/components/bookings/BookingCard.jsx
import { Plane, Clock, XCircle, CreditCard } from "lucide-react";

export default function BookingCard({ booking }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm w-[360px]">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm text-gray-500">Mã đặt vé</p>
          <p className="font-semibold text-gray-900">#{booking.code}</p>
        </div>
        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
          {booking.status}
        </span>
      </div>

      {/* FLIGHT */}
      <div className="flex items-center gap-2 text-qa-green font-medium mb-2">
        <Plane size={16} />
        {booking.flightCode} · {booking.aircraft}
      </div>

      {/* ROUTE */}
      <div className="flex justify-between text-sm mb-3">
        <div>
          <p className="text-gray-500">{booking.from}</p>
          <p className="font-semibold">{booking.departTime}</p>
          <p className="text-xs text-gray-400">{booking.date}</p>
        </div>

        <Clock size={16} className="text-gray-400 mt-4" />

        <div className="text-right">
          <p className="text-gray-500">{booking.to}</p>
          <p className="font-semibold">{booking.arriveTime}</p>
          <p className="text-xs text-gray-400">{booking.date}</p>
        </div>
      </div>

      {/* SERVICES */}
      <div className="bg-gray-50 rounded-lg p-2 text-sm mb-3">
        Dịch vụ: {booking.service}
      </div>

      {/* PRICE */}
      <div className="flex justify-between text-sm mb-4">
        <span className="text-gray-500">Tổng tiền</span>
        <span className="font-semibold text-qa-green">
          {booking.total.toLocaleString()} đ
        </span>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 border border-red-300 text-red-600 rounded-lg py-2 hover:bg-red-50">
          <XCircle size={16} />
          Hủy vé
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-qa-green text-white rounded-lg py-2 hover:bg-green-700">
          <CreditCard size={16} />
          Thanh toán
        </button>
      </div>
    </div>
  );
}
    