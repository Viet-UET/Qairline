import React from "react";
import { Plus, Pencil } from "lucide-react";

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

function Card({ title, right, children }) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-sm mb-6">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB]">
        <h2 className="font-semibold text-gray-900">{title}</h2>
        {right}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/* ================= PAGE ================= */

export default function AdminAccounts() {
  return (
    <div className="space-y-6">
      {/* ================= ADMIN LIST ================= */}
      <Card
        title={`Admin List: ${ADMINS.length} admins`}
        right={
          <button className="inline-flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Plus className="h-4 w-4 text-blue-600" />
            Add Admin
          </button>
        }
      >
        <div className="overflow-hidden rounded-2xl border border-[#E5E7EB]">
          <table className="w-full">
            <thead className="bg-[#F3F4F6] text-xs text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">ID</th>
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Email</th>
                <th className="px-4 py-3 text-left font-semibold">
                  Phone number
                </th>
                <th className="px-4 py-3 text-right font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] bg-white">
              {ADMINS.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{a.id}</td>
                  <td className="px-4 py-3">{a.name}</td>
                  <td className="px-4 py-3">{a.email}</td>
                  <td className="px-4 py-3">{a.phone}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="inline-flex items-center gap-1 rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-sm hover:bg-gray-50">
                      <Pencil className="h-4 w-4" />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ================= USER LIST ================= */}
      <Card title={`User List: ${USERS.length} users`}>
        <div className="overflow-hidden rounded-2xl border border-[#E5E7EB]">
          <table className="w-full text-sm">
            <thead className="bg-[#F3F4F6] text-xs text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">ID</th>
                <th className="px-4 py-3 text-left font-semibold">
                  Full Name
                </th>
                <th className="px-4 py-3 text-left font-semibold">Email</th>
                <th className="px-4 py-3 text-left font-semibold">
                  Phone number
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Passport
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  ID Card
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Created at
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Updated at
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] bg-white">
              {USERS.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{u.id}</td>
                  <td className="px-4 py-3">{u.name}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">{u.phone}</td>
                  <td className="px-4 py-3">{u.passport}</td>
                  <td className="px-4 py-3">{u.idCard}</td>
                  <td className="px-4 py-3">{u.createdAt}</td>
                  <td className="px-4 py-3">{u.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
