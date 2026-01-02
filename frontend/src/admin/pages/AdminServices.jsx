import React, { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Settings,
} from "lucide-react";
import SuccessToast from "../components/SuccessToast";

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

function formatVND(value) {
  return `${value.toLocaleString()} VND`;
}

/* ================= PAGE ================= */

export default function AdminServices() {
  const [services, setServices] = useState(INITIAL_SERVICES);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
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

  const openEditModal = (service) => {
    setEditingService(service);
    setName(service.name);
    setPrice(service.price.toString());
    setShowEditModal(true);
  };

  function resetForm() {
    if (editingService) {
      // Reset to original service data for edit mode
      setName(editingService.name);
      setPrice(editingService.price.toString());
    } else {
      // Reset to empty for add mode
      setName("");
      setPrice("");
    }
  }

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

  function handleEditService() {
    if (!name || price === "" || !editingService) return;

    setServices((prev) =>
      prev.map((s) =>
        s.id === editingService.id
          ? { ...s, name, price: Number(price) }
          : s
      )
    );

    setName("");
    setPrice("");
    setEditingService(null);
  }

  function handleDeleteService(id) {
    setServices((prev) => prev.filter((s) => s.id !== id));
  }

  const rowPad = "py-2";
  const rowText = "text-xs";

  return (
    <div className="space-y-6">
      <SuccessToast open={showSuccess} onClose={() => setShowSuccess(false)} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Services</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          <Plus className="h-4 w-4" />
          Add Service
        </button>
      </div>

      {/* Service List */}
      <Card
        title={`Services (${services.length})`}
        icon={Settings}
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
                    Service name
                  </th>
                  <th className="text-left font-semibold px-4 py-3">
                    Service price
                  </th>
                  <th className="text-right font-semibold px-4 py-3">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E5E7EB] bg-white">
                {services.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className={cx("px-4", rowPad, rowText)}>
                      <span className="text-xs text-gray-500">{s.id}</span>
                    </td>
                    <td className={cx("px-4", rowPad, rowText)}>
                      <span className="font-semibold text-gray-900">{s.name}</span>
                    </td>

                    <td className={cx("px-4", rowPad, rowText)}>
                      {formatVND(s.price)}
                    </td>

                    <td className={cx("px-4", rowPad, rowText)}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(s)}
                          className="h-9 w-9 rounded-xl border border-[#E5E7EB] bg-white hover:bg-gray-50 flex items-center justify-center"
                        >
                          <Pencil className="h-4 w-4 text-gray-700" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(s.id)}
                          className="h-9 w-9 rounded-xl border border-red-200 bg-white hover:bg-red-50 flex items-center justify-center"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {services.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-10 text-center text-sm text-gray-500"
                    >
                      No services found.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Add Service Modal */}
      {showAddModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowAddModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[85vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Add new service</h2>
                  <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Service name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter service name"
                      className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Service price
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="VND"
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
                        handleAddService();
                        setShowAddModal(false);
                        setShowSuccess(true);
                      }}
                      disabled={!name || price === ""}
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

      {/* Edit Service Modal */}
      {showEditModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowEditModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[85vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Edit service</h2>
                  <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Service name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter service name"
                      className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Service price
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="VND"
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
                        handleEditService();
                        setShowEditModal(false);
                        setShowSuccess(true);
                      }}
                      disabled={!name || price === ""}
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
