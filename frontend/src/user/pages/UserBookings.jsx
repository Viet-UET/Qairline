import {
  PlaneTakeoff,
  Clock,
  Ticket,
  CreditCard,
  Trash2,
} from "lucide-react";

const MOCK_BOOKINGS = [
  {
    id: 49,
    flightCode: "VN123",
    aircraft: "Airbus A330-200",
    seatClass: "Economy",
    seat: "14F",
    from: "Hue",
    to: "Da Nang",
    departTime: "08:20",
    arriveTime: "11:15",
    date: "04/01/2025",
    service: "Hành lý dưới 5kg",
    price: 2358000,
  },
  {
    id: 50,
    flightCode: "VN123",
    aircraft: "Airbus A330-200",
    seatClass: "Economy",
    seat: "13F",
    from: "Hue",
    to: "Da Nang",
    departTime: "08:20",
    arriveTime: "11:15",
    date: "04/01/2025",
    service: "Hành lý dưới 5kg",
    price: 2358000,
  },
  {
    id: 47,
    flightCode: "VN156",
    aircraft: "Boeing 747-400",
    seatClass: "Economy",
    seat: "10D",
    from: "Da Nang",
    to: "Hue",
    departTime: "07:50",
    arriveTime: "09:49",
    date: "21/12/2024",
    service: "Hành lý dưới 5kg",
    price: 2042000,
  },
];

export default function UserBooking() {
  return (
    <div className="min-h-screen bg-[#F8F7F9]">
      {/* PAGE HEADER */}
      <div className="bg-gradient-to-r from-qa-green to-green-600 text-white">
        <div className="max-w-[1300px] mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Ticket />
            <h1 className="text-2xl font-bold">Lịch sử đặt vé</h1>
          </div>
          <p className="opacity-90">
            Quản lý và theo dõi các vé máy bay của bạn
          </p>

          <div className="mt-4 text-sm flex gap-6">
            <span>Tổng số vé: {MOCK_BOOKINGS.length}</span>
            <span>Trang hiện tại: 1 / 1</span>
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="max-w-[1300px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_BOOKINGS.map((b) => (
            <BookingCard key={b.id} booking={b} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BookingCard({ booking }) {
  return (
    <div className="bg-white border border-[#D9D9D9] rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      {/* TOP */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-gray-500">Mã đặt vé</p>
          <p className="font-semibold text-lg">#{booking.id}</p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
          Đã đặt
        </span>
      </div>

      {/* FLIGHT */}
      <div className="flex items-center gap-3 mb-4">
        <PlaneTakeoff className="text-qa-green" />
        <div>
          <p className="font-semibold">
            {booking.flightCode} · {booking.aircraft}
          </p>
          <div className="flex gap-2 mt-1">
            <span className="px-2 py-0.5 text-xs rounded-full bg-blue-50 text-blue-700">
              {booking.seatClass}
            </span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700">
              Ghế {booking.seat}
            </span>
          </div>
        </div>
      </div>

      {/* ROUTE */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-gray-500">{booking.from}</p>
          <p className="text-lg font-semibold">{booking.departTime}</p>
          <p className="text-xs text-gray-400">{booking.date}</p>
        </div>

        <Clock className="text-gray-400" />

        <div className="text-right">
          <p className="text-sm text-gray-500">{booking.to}</p>
          <p className="text-lg font-semibold">{booking.arriveTime}</p>
          <p className="text-xs text-gray-400">{booking.date}</p>
        </div>
      </div>

      {/* SERVICE */}
      <div className="bg-[#F8F7F9] border border-[#E5E7EB] rounded-xl px-4 py-2 text-sm mb-4">
        Dịch vụ: <span className="font-medium">{booking.service}</span>
      </div>

      {/* PRICE */}
      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between">
          <span>Giá vé</span>
          <span>{booking.price.toLocaleString()} đ</span>
        </div>
        <div className="flex justify-between">
          <span>Phí dịch vụ</span>
          <span>0 đ</span>
        </div>
        <div className="flex justify-between font-semibold text-qa-green text-base">
          <span>Tổng tiền</span>
          <span>{booking.price.toLocaleString()} đ</span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 h-[40px] rounded-xl border border-red-300 text-red-600 hover:bg-red-50 transition text-sm font-medium">
          <Trash2 size={16} />
          Hủy vé
        </button>

        <button className="flex-1 flex items-center justify-center gap-2 h-[40px] rounded-xl bg-qa-green text-white hover:bg-green-700 transition text-sm font-medium">
          <CreditCard size={16} />
          Thanh toán
        </button>
      </div>
    </div>
  );
}
