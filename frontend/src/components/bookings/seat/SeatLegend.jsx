export default function SeatLegend() {
  return (
    <div className="flex items-center gap-8 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-blue-600" />
        Ghế trống
      </div>

      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-green-600" />
        Ghế đang chọn
      </div>

      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-gray-300" />
        Ghế đã bán
      </div>
    </div>
  );
}
