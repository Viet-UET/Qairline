// src/pages/User/BookingHistory.jsx
export default function BookingHistory() {
  const history = [
    {
      code: "VN156",
      from: "Da Nang",
      to: "Hue",
      depart: "07:50 21/12/2024",
      arrive: "09:49 21/12/2024",
      aircraft: "Boeing 747-400",
      seatClass: "Economy",
      price: 2042000,
      status: "completed",
    },
    {
      code: "VN129",
      from: "Phu Quoc",
      to: "Hue",
      depart: "07:55 19/12/2024",
      arrive: "09:44 19/12/2024",
      aircraft: "Airbus A320",
      seatClass: "Business",
      price: 4690000,
      status: "delayed",
    },
  ];

  const statusStyle = {
    completed: "bg-green-100 text-green-700",
    delayed: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-600",
    scheduled: "bg-blue-100 text-blue-600",
  };

  return (
    <div className="max-w-[1300px] mx-auto px-6 py-8">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-qa-green">
          Lịch sử đặt vé
        </h1>
        <p className="text-gray-500">
          Theo dõi các chuyến bay bạn đã đặt trước đây
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Mã chuyến</th>
              <th className="px-4 py-3">Điểm đi</th>
              <th className="px-4 py-3">Điểm đến</th>
              <th className="px-4 py-3">Khởi hành</th>
              <th className="px-4 py-3">Hạ cánh</th>
              <th className="px-4 py-3">Máy bay</th>
              <th className="px-4 py-3">Hạng</th>
              <th className="px-4 py-3">Giá</th>
              <th className="px-4 py-3">Trạng thái</th>
            </tr>
          </thead>

          <tbody>
            {history.map((b, i) => (
              <tr
                key={i}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium">{b.code}</td>
                <td className="px-4 py-3">{b.from}</td>
                <td className="px-4 py-3">{b.to}</td>
                <td className="px-4 py-3">{b.depart}</td>
                <td className="px-4 py-3">{b.arrive}</td>
                <td className="px-4 py-3">{b.aircraft}</td>
                <td className="px-4 py-3">{b.seatClass}</td>
                <td className="px-4 py-3 font-medium">
                  {b.price.toLocaleString()} đ
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${statusStyle[b.status]}`}
                  >
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
