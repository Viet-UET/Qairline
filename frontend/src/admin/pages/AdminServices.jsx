import React, { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import AdminLayout from "../layout/AdminLayout";

/* ================= MOCK DATA ================= */

const INITIAL_SERVICES = [
  {
    id: 1,
    name: "Luggage under 5kg",
    price: 0,
  },
  {
    id: 2,
    name: "Luggage from 5kg to 10kg",
    price: 100000,
  },
  {
    id: 3,
    name: "Luggage from 10kg",
    price: 400000,
  },
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

function formatVND(value) {
  return `${value.toLocaleString()} VND`;
}

/* ================= PAGE ================= */

export default function AdminServices() {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  function handleAddService() {
    if (!name || price === "") return;

    setServices((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name,
        price: Number(price),
      },
    ]);

    setName("");
    setPrice("");
  }

  return (
    <AdminLayout title="Service" breadcrumb={["Service"]}>
      {/* ================= ADD SERVICE ================= */}
      <Card title="Add service">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Service name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter service name"
              className="mt-2 w-full rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Service price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="VND"
              className="mt-2 w-full rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          <button
            onClick={handleAddService}
            className="h-[42px] rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            Add service
          </button>
        </div>
      </Card>

      {/* ================= SERVICE LIST ================= */}
      <Card title="Service List">
        <div className="overflow-hidden rounded-2xl border border-[#E5E7EB]">
          <table className="w-full">
            <thead className="bg-[#F3F4F6] text-xs text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">ID</th>
                <th className="px-4 py-3 text-left font-semibold">
                  Service name
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Service price
                </th>
                <th className="px-4 py-3 text-right font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E5E7EB] bg-white">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{s.id}</td>
                  <td className="px-4 py-3">{s.name}</td>
                  <td className="px-4 py-3">
                    {formatVND(s.price)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="inline-flex items-center gap-1 rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-sm hover:bg-gray-50">
                      <Pencil className="h-4 w-4" />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}

              {services.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-10 text-center text-sm text-gray-500"
                  >
                    No services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  );
}
