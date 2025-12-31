import { X } from "lucide-react";

export default function SeatSelected({ seats, onRemove }) {
  if (!seats || seats.length === 0) {
    return (
      <div className="flex items-center justify-center h-[120px] text-gray-500 text-sm">
        Chưa có ghế nào được chọn
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {seats.map((s) => (
        <div
          key={s.seat_id}
          className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#F8F7F9] border border-[#D9D9D9]"
        >
          <div>
            <p className="font-semibold text-gray-800">
              Ghế {s.seat_number}
            </p>
            <p className="text-xs text-gray-500">
              {Number(s.price).toLocaleString("vi-VN")} đ
            </p>
          </div>

          <button
            type="button"
            onClick={() => onRemove(s)}
            className="p-1 rounded-lg hover:bg-gray-200 transition"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
