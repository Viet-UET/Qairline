import { X } from "lucide-react";

export default function DiscountCode({
  code,
  discount,
  onApply,
  onRemove,
}) {
  return (
    <div className="bg-white border border-[#D9D9D9] rounded-2xl p-4 space-y-3">
      <h4 className="font-semibold">Mã giảm giá</h4>

      {!discount ? (
        <div className="flex gap-2">
          <input
            placeholder="Nhập mã giảm giá"
            value={code}
            onChange={(e) => onApply(e.target.value, false)}
            className="flex-1 h-10 px-3 rounded-xl border border-[#D9D9D9] focus:ring-2 focus:ring-qa-green outline-none"
          />
          <button
            onClick={() => onApply(code, true)}
            className="px-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Áp dụng
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          <div className="text-green-700 font-semibold">
            {discount.code} – Giảm {discount.percent}%
          </div>
          <button onClick={onRemove}>
            <X size={16} className="text-green-700 hover:text-green-900" />
          </button>
        </div>
      )}
    </div>
  );
}
