import React, { useState } from "react";
import { Plus, Pencil, X } from "lucide-react";
import SuccessToast from "../components/SuccessToast";

/* ================= MOCK DATA ================= */

const ADMINS = [
  {
    id: 1,
    name: "Le Tuan Kiet",
    email: "kiet@admin.com",
    phone: "0903432548",
  },
  {
    id: 2,
    name: "Nguyen Quang Minh",
    email: "minh@admin.com",
    phone: "0987654322",
  },
  {
    id: 3,
    name: "Nguyen Trung Nguyen",
    email: "nguyen@admin.com",
    phone: "012345612",
  },
];

const USERS = [
  {
    id: 1,
    name: "Bui Khanh",
    email: "khanh@example.com",
    phone: "0903322114",
    passport: "123465",
    idCard: "001016",
    createdAt: "17/12/2024, 21:24",
    updatedAt: "17/12/2024, 21:24",
  },
  {
    id: 2,
    name: "Nguyen Minh",
    email: "minh@email.com",
    phone: "0123478327",
    passport: "123912",
    idCard: "123999",
    createdAt: "19/12/2024, 13:00",
    updatedAt: "19/12/2024, 13:00",
  },
  {
    id: 3,
    name: "Tran Binh",
    email: "binh@example.com",
    phone: "0987213443",
    passport: "923450",
    idCard: "003304",
    createdAt: "19/12/2024, 13:51",
    updatedAt: "19/12/2024, 13:51",
  },
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

export default function AdminAccounts() {
  const [admins, setAdmins] = useState(ADMINS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form state for Add Admin
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPhone, setAdminPhone] = useState("");

  const resetForm = () => {
    setAdminName("");
    setAdminEmail("");
    setAdminPhone("");
  };

  const handleAddAdmin = () => {
    if (!adminName || !adminEmail || !adminPhone) return;

    const newAdmin = {
      id: admins.length + 1,
      name: adminName,
      email: adminEmail,
      phone: adminPhone,
    };

    setAdmins(prev => [...prev, newAdmin]);
    setShowAddModal(false);
    setShowSuccess(true);
    resetForm();
  };

  return (
    <>
      <SuccessToast
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        text="Successfully"
      />

      <div className="space-y-6">
        {/* ================= ADMIN LIST ================= */}
        <Card
          title={`Admins (${admins.length})`}
          right={
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
            >
              <Plus className="h-4 w-4" />
              Add admin
            </button>
          }
        >
          <div className="overflow-hidden rounded-xl border">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Phone number</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{a.id}</td>
                    <td className="px-4 py-3">{a.name}</td>
                    <td className="px-4 py-3">{a.email}</td>
                    <td className="px-4 py-3">{a.phone}</td>
                    <td className="px-4 py-3 text-right">
                      <button className="h-9 w-9 border rounded-xl hover:bg-gray-50 flex items-center justify-center">
                        <Pencil className="h-4 w-4 text-gray-700" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* ================= USER LIST ================= */}
        <Card title={`Users (${USERS.length})`}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50 text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Full name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Phone number</th>
                  <th className="px-4 py-3 text-left">Passport</th>
                  <th className="px-4 py-3 text-left">ID card</th>
                  <th className="px-4 py-3 text-left">Created at</th>
                  <th className="px-4 py-3 text-left">Updated at</th>
                </tr>
              </thead>
              <tbody>
                {USERS.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{u.id}</td>
                    <td className="px-4 py-3">{u.name}</td>
                    <td className="px-4 py-3 truncate max-w-[200px]" title={u.email}>
                      {u.email}
                    </td>
                    <td className="px-4 py-3">{u.phone}</td>
                    <td className="px-4 py-3">{u.passport}</td>
                    <td className="px-4 py-3">{u.idCard}</td>
                    <td className="px-4 py-3 text-gray-500">{u.createdAt}</td>
                    <td className="px-4 py-3 text-gray-500">{u.updatedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Add Admin Modal */}
        {showAddModal && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowAddModal(false)}></div>
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[85vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Add new admin</h2>
                    <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Full name
                      </label>
                      <input
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                        placeholder="e.g. Nguyen Van A"
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        placeholder="e.g. admin@qairline.com"
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Phone number
                      </label>
                      <input
                        value={adminPhone}
                        onChange={(e) => setAdminPhone(e.target.value)}
                        placeholder="e.g. 0901234567"
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      />
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
                        onClick={handleAddAdmin}
                        disabled={!adminName || !adminEmail || !adminPhone}
                        className="inline-flex items-center justify-center rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        Add admin
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
