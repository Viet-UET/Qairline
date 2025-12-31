import React, { useMemo, useState } from "react";
import {
  FileText,
  Filter,
  CreditCard,
  Users,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AdminLayout from "../layout/AdminLayout";

/* ================= MOCK DATA ================= */

const MOCK_BOOKINGS = [
  {
    id: 50,
    userId: 19,
    userName: "Minh Minh",
    seatType: "economy",
    flight: "VN123",
    date: "21/12/2024 18:42",
    price: 2358000,
    status: "paid",
  },
  {
    id: 49,
    userId: 19,
    userName: "Minh Minh",
    seatType: "economy",
    flight: "VN123",
    date: "21/12/2024 18:42",
    price: 2358000,
    status: "cancelled",
  },
  {
    id: 48,
    userId: 19,
    userName: "Minh Minh",
    seatType: "economy",
    flight: "VN156",
    date: "21/12/2024 18:41",
    price: 2042000,
    status: "booked",
  },
];

/* ================= UTILS ================= */

function cx(...c) {
  return c.filter(Boolean).join(" ");
}

function StatusBadge({ status }) {
  const map = {
    booked: "bg-green-50 text-green-700 border-green-100",
    paid: "bg-yellow-50 text-yellow-700 border-yellow-100",
    cancelled: "bg-red-50 text-red-700 border-red-100",
  };
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        map[status]
      )}
    >
      {status}
    </span>
  );
}

function Card({ title, icon: Icon, children }) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-[#E5E7EB]">
        {Icon && <Icon className="h-4 w-4 text-gray-500" />}
        <h2 className="font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/* ================= PAGE ================= */

export default function AdminBookings() {
  /* ======== METRICS ======== */
  const totalBookings = MOCK_BOOKINGS.length;
  const totalRevenue = MOCK_BOOKINGS
    .filter((b) => b.status === "paid")
    .reduce((s, b) => s + b.price, 0);

  const bookingByStatus = [
    { name: "booked", value: 22 },
    { name: "paid", value: 20 },
    { name: "cancelled", value: 8 },
  ];

  const revenueBySeat = [
    { name: "economy", value: 21700800 },
    { name: "business", value: 9384800 },
    { name: "first class", value: 14095615 },
  ];

  const bookingBySeat = [
    { name: "economy", value: 70 },
    { name: "business", value: 16 },
    { name: "first class", value: 14 },
  ];

  const bookingPerFlight = [
    { flight: "VN103", count: 2 },
    { flight: "VN106", count: 4 },
    { flight: "VN111", count: 3 },
    { flight: "VN118", count: 8 },
    { flight: "VN123", count: 6 },
    { flight: "VN137", count: 4 },
    { flight: "VN157", count: 11 },
  ];

  return (
    <AdminLayout title="Bookings" breadcrumb={["Operation", "Bookings"]}>
      {/* ================= TOP CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {/* Total bookings */}
        <Card title={`Total Bookings: ${totalBookings}`} icon={Users}>
          <PieChartBlock data={bookingByStatus} />
        </Card>

        {/* Revenue */}
        <Card
          title={`Total Revenue (Paid): ${totalRevenue.toLocaleString()} đ`}
          icon={CreditCard}
        >
          <BarChartBlock data={revenueBySeat} />
        </Card>

        {/* Bookings by seat */}
        <Card title="Bookings by Seat" icon={FileText}>
          <PieChartBlock data={bookingBySeat} />
        </Card>

        {/* Bookings per flight */}
        <Card title="Bookings per Flight" icon={Filter}>
          <BarChartBlock data={bookingPerFlight} xKey="flight" />
        </Card>
      </div>

      {/* ================= TABLE ================= */}
      <Card title="Booking List">
        <div className="overflow-hidden rounded-2xl border border-[#E5E7EB]">
          <table className="w-full">
            <thead className="bg-[#F8F7F9] text-xs text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Booking ID</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Seat</th>
                <th className="px-4 py-3 text-left">Flight</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E5E7EB] bg-white">
              {MOCK_BOOKINGS.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold">{b.id}</td>
                  <td className="px-4 py-3">
                    {b.userName}
                    <div className="text-xs text-gray-500">
                      User #{b.userId}
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize">{b.seatType}</td>
                  <td className="px-4 py-3">{b.flight}</td>
                  <td className="px-4 py-3 text-sm">{b.date}</td>
                  <td className="px-4 py-3">
                    {b.price.toLocaleString()} đ
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={b.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  );
}

/* ================= CHART BLOCKS ================= */

const COLORS = ["#10B981", "#F59E0B", "#EF4444"];

function PieChartBlock({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={80}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

function BarChartBlock({ data, xKey = "name" }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#10B981" />
      </BarChart>
    </ResponsiveContainer>
  );
}
