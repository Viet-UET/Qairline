import React, { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Plane,
} from "lucide-react";
import SuccessToast from "../components/SuccessToast";

/* ================= MOCK DATA ================= */

const MOCK_AIRPLANES = [
  { id: 1, model: "Boeing 737-800", manufacturer: "Boeing", seats: 180, author: "Admin", createdAt: "2024-12-15" },
  { id: 2, model: "Airbus A320", manufacturer: "Airbus", seats: 180, author: "Admin", createdAt: "2024-12-14" },
  { id: 3, model: "Boeing 777-300ER", manufacturer: "Boeing", seats: 200, author: "Admin", createdAt: "2024-12-13" },
  { id: 4, model: "Airbus A350-900", manufacturer: "Airbus", seats: 125, author: "Admin", createdAt: "2024-12-12" },
  { id: 5, model: "Boeing 787-9 Dreamliner", manufacturer: "Boeing", seats: 190, author: "Admin", createdAt: "2024-12-11" },
  { id: 6, model: "Embraer E190", manufacturer: "Embraer", seats: 100, author: "Admin", createdAt: "2024-12-10" },
  { id: 7, model: "Bombardier CRJ900", manufacturer: "Bombardier", seats: 76, author: "Admin", createdAt: "2024-12-09" },
  { id: 8, model: "Airbus A330-300", manufacturer: "Airbus", seats: 177, author: "Admin", createdAt: "2024-12-08" },
];

/* ================= UI UTILS ================= */

function cx(...c) {
  return c.filter(Boolean).join(" ");
}

function Card({ title, icon: Icon, children, right }) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2 min-w-0">
          {Icon ? <Icon className="h-4 w-4 text-gray-500" /> : null}
          <h2 className="font-semibold text-gray-900 truncate">{title}</h2>
        </div>
        {right}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export default function AdminAirplanes() {
  const [airplanes, setAirplanes] = useState(MOCK_AIRPLANES);

  const [model, setModel] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [seats, setSeats] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAirplane, setEditingAirplane] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Close modal on Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && (showAddModal || showEditModal)) {
        setShowAddModal(false);
        setShowEditModal(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showAddModal, showEditModal]);

  const openEditModal = (airplane) => {
    setEditingAirplane(airplane);
    setModel(airplane.model);
    setManufacturer(airplane.manufacturer);
    setSeats(airplane.seats.toString());
    setShowEditModal(true);
  };

  function resetForm() {
    if (editingAirplane) {
      // Reset to original airplane data for edit mode
      setModel(editingAirplane.model);
      setManufacturer(editingAirplane.manufacturer);
      setSeats(editingAirplane.seats.toString());
    } else {
      // Reset to empty for add mode
      setModel("");
      setManufacturer("");
      setSeats("");
    }
  }

  function handleAdd() {
    if (!model || !manufacturer || !seats) return;

    setAirplanes((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        model,
        manufacturer,
        seats: Number(seats),
        author: "Admin",
        createdAt: new Date().toISOString().split('T')[0],
      },
    ]);

    setModel("");
    setManufacturer("");
    setSeats("");
  }

  function handleEdit() {
    if (!model || !manufacturer || !seats || !editingAirplane) return;

    setAirplanes((prev) =>
      prev.map((a) =>
        a.id === editingAirplane.id
          ? { ...a, model, manufacturer, seats: Number(seats) }
          : a
      )
    );

    setModel("");
    setManufacturer("");
    setSeats("");
    setEditingAirplane(null);
  }

  function handleDelete(id) {
    setAirplanes((prev) => prev.filter((a) => a.id !== id));
  }

  const rowPad = "py-2";
  const rowText = "text-xs";

  return (
    <div className="space-y-6">
      <SuccessToast open={showSuccess} onClose={() => setShowSuccess(false)} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Airplanes</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          <Plus className="h-4 w-4" />
          Add Airplane
        </button>
      </div>

      {/* Airplane List */}
      <Card
        title={`Airplanes (${airplanes.length})`}
        icon={Plane}
      >
        {/* Table */}
        <div className="rounded-2xl border border-[#E5E7EB]">
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full min-w-full">
              <thead className="bg-[#F8F7F9] text-xs text-gray-600 sticky top-0">
                <tr className="border-b border-[#E5E7EB]">
                  <th className="text-left font-semibold px-4 py-3">
                    ID
                  </th>
                  <th className="text-left font-semibold px-4 py-3">
                    Model
                  </th>
                  <th className="text-left font-semibold px-4 py-3">
                    Manufacturer
                  </th>
                  <th className="text-left font-semibold px-4 py-3">
                    Total seats
                  </th>
                  <th className="text-right font-semibold px-4 py-3">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E5E7EB] bg-white">
                {airplanes.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className={cx("px-4", rowPad, rowText)}>
                      <span className="text-xs text-gray-500">{a.id}</span>
                    </td>
                    <td className={cx("px-4", rowPad, rowText)}>
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 h-9 w-9 rounded-xl border border-[#E5E7EB] bg-white flex items-center justify-center">
                          <Plane className="h-4 w-4 text-gray-500" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-900 truncate">
                            {a.model}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className={cx("px-4", rowPad, rowText)}>
                      {a.manufacturer}
                    </td>

                    <td className={cx("px-4", rowPad, rowText)}>
                      {a.seats} seats
                    </td>

                    <td className={cx("px-4", rowPad, rowText)}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(a)}
                          className="h-9 w-9 rounded-xl border border-[#E5E7EB] bg-white hover:bg-gray-50 flex items-center justify-center"
                        >
                          <Pencil className="h-4 w-4 text-gray-700" />
                        </button>
                        <button
                          onClick={() => handleDelete(a.id)}
                          className="h-9 w-9 rounded-xl border border-red-200 bg-white hover:bg-red-50 flex items-center justify-center"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {airplanes.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-sm text-gray-500"
                    >
                      No airplanes found.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Add Airplane Modal */}
      {showAddModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowAddModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[85vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Add new airplane</h2>
                  <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Model
                    </label>
                    <input
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="Boeing 737-800"
                      className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
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
                      className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
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
                      className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => { resetForm(); setShowAddModal(false); }}
                      className="inline-flex items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => {
                        handleAdd();
                        setShowAddModal(false);
                        setShowSuccess(true);
                      }}
                      disabled={!model || !manufacturer || !seats}
                      className="inline-flex items-center justify-center rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit Airplane Modal */}
      {showEditModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowEditModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[85vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Edit airplane</h2>
                  <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Model
                    </label>
                    <input
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="Boeing 737-800"
                      className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
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
                      className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
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
                      className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => resetForm()}
                      className="inline-flex items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => {
                        handleEdit();
                        setShowEditModal(false);
                        setShowSuccess(true);
                      }}
                      disabled={!model || !manufacturer || !seats}
                      className="inline-flex items-center justify-center rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
