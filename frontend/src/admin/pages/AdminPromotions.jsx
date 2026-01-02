import React, { useState } from "react";
import { Plus, Filter, Pencil, Trash2, X } from "lucide-react";
import SuccessToast from "../components/SuccessToast";

/* ================= MOCK DATA ================= */

const INITIAL_DISCOUNTS = [
  { id: 1, code: "VN100", percent: 70 },
  { id: 2, code: "SP20", percent: 20 },
  { id: 3, code: "TET40", percent: 40 },
  { id: 4, code: "VN25", percent: 25 },
];

/* ================= UI HELPERS ================= */

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

/* ================= PAGE ================= */

export default function AdminPromotions() {
  const [discounts, setDiscounts] = useState(INITIAL_DISCOUNTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showRemoveSuccess, setShowRemoveSuccess] = useState(false);

  // Form state
  const [code, setCode] = useState("");
  const [percent, setPercent] = useState("");

  const resetForm = () => {
    if (editingDiscount) {
      setCode(editingDiscount.code);
      setPercent(editingDiscount.percent.toString());
    } else {
      setCode("");
      setPercent("");
    }
  };

  const openEditModal = (discount) => {
    setEditingDiscount(discount);
    setCode(discount.code);
    setPercent(discount.percent.toString());
    setShowEditModal(true);
  };

  const handleAddDiscount = () => {
    if (!code || percent === "") return;

    if (editingDiscount) {
      // Edit mode
      setDiscounts(prev => prev.map(d =>
        d.id === editingDiscount.id
          ? { ...d, code, percent: Number(percent) }
          : d
      ));
      setShowEditModal(false);
      setEditingDiscount(null);
    } else {
      // Add mode
      setDiscounts(prev => [
        ...prev,
        {
          id: Math.max(...prev.map(d => d.id), 0) + 1,
          code,
          percent: Number(percent),
        },
      ]);
      setShowAddModal(false);
    }

    setShowSuccess(true);
    resetForm();
  };

  const handleDeleteDiscount = (id) => {
    setDiscounts(prev => prev.filter(d => d.id !== id));
    setShowRemoveSuccess(true);
  };

  return (
    <div className="space-y-6">
      <SuccessToast
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        text="Successfully"
      />
      <SuccessToast
        open={showRemoveSuccess}
        onClose={() => setShowRemoveSuccess(false)}
        text="Remove successful"
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Discounts</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          <Plus className="h-4 w-4" />
          Add Discount
        </button>
      </div>

      {/* Discount List */}
      <Card
        title={`Discounts (${discounts.length})`}
        icon={Filter}
      >
        <div className="rounded-2xl border border-[#E5E7EB]">
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full min-w-full">
              <thead className="bg-[#F8F7F9] text-xs text-gray-600 sticky top-0">
                <tr className="border-b border-[#E5E7EB]">
                  <th className="text-left font-semibold px-4 py-3">ID</th>
                  <th className="text-left font-semibold px-4 py-3">Discount code</th>
                  <th className="text-left font-semibold px-4 py-3">Discount percentage</th>
                  <th className="text-left font-semibold px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E5E7EB] bg-white">
                {discounts.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-xs">{d.id}</td>
                    <td className="px-4 py-2 text-xs">{d.code}</td>
                    <td className="px-4 py-2 text-xs">{d.percent}%</td>
                    <td className="px-4 py-2 text-xs">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(d)}
                          className="h-9 w-9 rounded-xl border border-[#E5E7EB] bg-white hover:bg-gray-50 flex items-center justify-center"
                        >
                          <Pencil className="h-4 w-4 text-gray-700" />
                        </button>
                        <button
                          onClick={() => handleDeleteDiscount(d.id)}
                          className="h-9 w-9 rounded-xl border border-red-200 bg-white hover:bg-red-50 flex items-center justify-center"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
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
        </div>
      </Card>

      {/* Add Discount Modal */}
      {showAddModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowAddModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[85vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Add new discount</h2>
                  <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Discount code
                    </label>
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter discount code"
                      className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Discount percentage
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="number"
                        value={percent}
                        onChange={(e) => setPercent(e.target.value)}
                        placeholder="0"
                        className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 pr-8 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => {
                        resetForm();
                        setShowAddModal(false);
                      }}
                      className="inline-flex items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddDiscount}
                      disabled={!code || percent === ""}
                      className="inline-flex items-center justify-center rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Add discount
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit Discount Modal */}
      {showEditModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowEditModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[85vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Edit discount</h2>
                  <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Discount code
                    </label>
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter discount code"
                      className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Discount percentage
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="number"
                        value={percent}
                        onChange={(e) => setPercent(e.target.value)}
                        placeholder="0"
                        className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 pr-8 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => {
                        resetForm();
                        setShowEditModal(false);
                        setEditingDiscount(null);
                      }}
                      className="inline-flex items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddDiscount}
                      disabled={!code || percent === ""}
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
