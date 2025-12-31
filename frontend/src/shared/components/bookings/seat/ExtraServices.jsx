export default function ExtraServices({ services, onChange }) {
  return (
    <div className="space-y-3 text-sm">
      {services.map((s) => (
        <label
          key={s.id}
          className="flex items-center justify-between gap-3 p-3 rounded-xl border border-[#D9D9D9]"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={s.checked}
              onChange={() => onChange(s.id)}
              className="w-4 h-4"
            />
            <span className="font-medium text-gray-800">
              {s.label}
            </span>
          </div>

          <span className="px-3 py-1 rounded-full bg-[#F8F7F9] border border-[#D9D9D9] text-gray-700">
            {Number(s.price).toLocaleString("vi-VN")} đ
          </span>
        </label>
      ))}
    </div>
  );
}
