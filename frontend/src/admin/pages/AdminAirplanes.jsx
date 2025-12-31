import React, { useMemo, useState } from "react";
import { Plus, Pencil } from "lucide-react";
import AdminLayout from "../layout/AdminLayout";

/* ================= MOCK DATA ================= */

const MOCK_AIRPLANES = [
  { id: 1, model: "Boeing 737-800", manufacturer: "Boeing", seats: 180 },
  { id: 2, model: "Airbus A320", manufacturer: "Airbus", seats: 180 },
  { id: 3, model: "Boeing 777-300ER", manufacturer: "Boeing", seats: 200 },
  { id: 4, model: "Airbus A350-900", manufacturer: "Airbus", seats: 125 },
  { id: 5, model: "Boeing 787-9 Dreamliner", manufacturer: "Boeing", seats: 190 },
  { id: 6, model: "Embraer E190", manufacturer: "Embraer", seats: 100 },
  { id: 7, model: "Bombardier CRJ900", manufacturer: "Bombardier", seats: 76 },
  { id: 8, model: "Airbus A330-300", manufacturer: "Airbus", seats: 177 },
];

/* ================= UI UTILS ================= */

function cx(...c) {
  return c.filter(Boolean).join(" ");
}

function Card({ title, right, children }) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB]">
        <h2 className="font-semibold text-gray-900">{title}</h2>
        {right}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/* ================= PAGE ================= */

export default function AdminAirplanes() {
  const [airplanes, setAirplanes] = useState(MOCK_AIRPLANES);

  const [model, setModel] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [seats, setSeats] = useState("");

  function handleAdd() {
    if (!model || !manufacturer || !seats) return;

    setAirplanes((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        model,
        manufacturer,
        seats: Number(seats),
      },
    ]);

    setModel("");
    setManufacturer("");
    setSeats("");
  }

  return (
    <AdminLayout title="Airplanes" breadcrumb={["Operation", "Airplanes"]}>
      {/* ================= ADD FORM ================= */}
      <div className="mb-6">
        <Card
          title="Enter airplane data"
          right={
            <button
              onClick={handleAdd}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add airplane
            </button>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Model
              </label>
              <input
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Boeing 737-800"
                className="mt-2 w-full rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Manufacturer
              </label>
              <input
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
                placeholder="Boeing"
                className="mt-2 w-full rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Total seats
              </label>
              <input
                type="number"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                placeholder="180"
                className="mt-2 w-full rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* ================= TABLE ================= */}
      <Card
        title="Airplane List"
        right={
          <div className="text-sm text-gray-500">
            Total airplanes:{" "}
            <span className="font-semibold text-gray-900">
              {airplanes.length}
            </span>
          </div>
        }
      >
        <div className="overflow-hidden rounded-2xl border border-[#E5E7EB]">
          <table className="w-full">
            <thead className="bg-[#F3F4F6] text-xs text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">ID</th>
                <th className="px-4 py-3 text-left font-semibold">Model</th>
                <th className="px-4 py-3 text-left font-semibold">
                  Manufacturer
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Total seats
                </th>
                <th className="px-4 py-3 text-right font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E5E7EB] bg-white">
              {airplanes.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{a.id}</td>
                  <td className="px-4 py-3">{a.model}</td>
                  <td className="px-4 py-3">{a.manufacturer}</td>
                  <td className="px-4 py-3">{a.seats}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="inline-flex items-center gap-1 rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                      <Pencil className="h-4 w-4" />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}

              {airplanes.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-sm text-gray-500"
                  >
                    No airplanes found.
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
