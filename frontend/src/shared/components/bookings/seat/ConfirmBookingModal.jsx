export default function ConfirmBookingModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-[420px] p-6 space-y-4">
        <h3 className="text-lg font-semibold">
          Xác nhận đặt vé
        </h3>

        <p className="text-gray-600">
          Bạn có chắc chắn muốn đặt vé?
        </p>

        <p className="text-sm text-gray-500">
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
