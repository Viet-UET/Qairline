export default function ConfirmBookingModal({
  open,
  onClose,
  onConfirm,
  summary,
  totalPrice,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-[420px] p-6 space-y-4">
        <h3 className="text-lg font-semibold">
          Xác nhận đặt vé
        </h3>

        {/* SUMMARY */}
        {summary && (
          <div className="text-sm text-gray-700 space-y-1">
            <p>
              <strong>Hạng ghế:</strong> {summary.seatClass}
            </p>
            <p>
              <strong>Số ghế:</strong> {summary.seatCount}
            </p>
            <p>
              <strong>Giá mỗi ghế:</strong>{" "}
              {summary.seatPrice.toLocaleString("vi-VN")} ₫
            </p>
            {summary.serviceTotal > 0 && (
              <p>
                <strong>Dịch vụ thêm:</strong>{" "}
                {summary.serviceTotal.toLocaleString("vi-VN")} ₫
              </p>
            )}
            {summary.discountPercent > 0 && (
              <p className="text-green-600">
                <strong>Giảm giá:</strong> -{summary.discountPercent}%
              </p>
            )}
          </div>
        )}

        {/* TOTAL */}
        {typeof totalPrice === "number" && (
          <div className="border-t pt-3 mt-3 text-lg font-semibold flex justify-between">
            <span>Tổng cộng</span>
            <span>
              {totalPrice.toLocaleString("vi-VN")} ₫
            </span>
          </div>
        )}

        <p className="text-xs text-gray-500">
          Sau khi xác nhận, thông tin đặt vé sẽ không thể thay đổi.
        </p>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#D9D9D9] hover:bg-gray-100"
          >
            Hủy
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            Xác nhận đặt vé
          </button>
        </div>
      </div>
    </div>
  );
}
