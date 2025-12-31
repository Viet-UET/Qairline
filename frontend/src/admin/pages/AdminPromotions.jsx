import React, { useState } from "react";
import { Pencil } from "lucide-react";

/* ================= MOCK DATA ================= */

const INITIAL_DISCOUNTS = [
  { id: 1, code: "VN100", percent: 70 },
  { id: 2, code: "SP20", percent: 20 },
  { id: 3, code: "TET40", percent: 40 },
  { id: 4, code: "VN25", percent: 25 },
];

/* ================= UI HELPERS ================= */

function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-sm mb-6">
      <div className="px-5 py-4 border-b border-[#E5E7EB]">
        <h2 className="font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/* ================= PAGE ================= */

export default function AdminPromotions() {
  const [discounts, setDiscounts] = useState(INITIAL_DISCOUNTS);
  const [code, setCode] = useState("");
  const [percent, setPercent] = useState("");

  function handleAddDiscount() {
    if (!code || percent === "") return;

    setDiscounts((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        code,
        percent: Number(percent),
      },
    ]);

    setCode("");
    setPercent("");
  }

  return (
    <div className="space-y-6">
      {/* ================= ADD DISCOUNT ================= */}
      <Card title="Add discount">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Discount code
            </label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter discount code"
              className="mt-2 w-full rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Discount percentage
            </label>
            <input
              type="number"
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
              placeholder="%"
              className="mt-2 w-full rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          <button
            onClick={handleAddDiscount}
            className="h-[42px] rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            Add discount
          </button>
        </div>
      </Card>

      {/* ================= DISCOUNT LIST ================= */}
      <Card title="Discount list">
        <div className="overflow-hidden rounded-2xl border border-[#E5E7EB]">
          <table className="w-full">
            <thead className="bg-[#F3F4F6] text-xs text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">ID</th>
                <th className="px-4 py-3 text-left font-semibold">
                  Discount code
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Discount percentage
                </th>
                <th className="px-4 py-3 text-right font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E5E7EB] bg-white">
              {discounts.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{d.id}</td>
                  <td className="px-4 py-3">{d.code}</td>
                  <td className="px-4 py-3">{d.percent.toFixed(2)}%</td>
                  <td className="px-4 py-3 text-right">
                    <button className="inline-flex items-center gap-1 rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-sm hover:bg-gray-50">
                      <Pencil className="h-4 w-4" />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}

              {discounts.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-10 text-center text-sm text-gray-500"
                  >
                    No discounts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
