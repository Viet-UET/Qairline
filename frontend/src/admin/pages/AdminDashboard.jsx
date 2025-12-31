import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Plane, Ticket, DollarSign, Users } from "lucide-react";

/* ================= RECENT BOOKINGS ================= */

const RECENT_BOOKINGS = [
  {
    id: "BK202401",
    customer: "Nguyễn Văn A",
    flight: "VN128",
    route: "Hà Nội → TP.HCM",
    date: "18/12/2024",
    amount: 2490000,
    status: "Completed",
  },
  {
    id: "BK202402",
    customer: "Trần Thị B",
    flight: "VN166",
    route: "TP.HCM → Cần Thơ",
    date: "18/12/2024",
    amount: 1890000,
    status: "Scheduled",
  },
  {
    id: "BK202403",
    customer: "Lê Hoàng C",
    flight: "VN249",
    route: "Đà Nẵng → Hà Nội",
    date: "17/12/2024",
    amount: 3290000,
    status: "Cancelled",
  },
];

/* ================= KPI DATA ================= */

const KPI_DATA = [
  { label: "Total Flights", value: 128, icon: Plane, color: "green" },
  { label: "Total Bookings", value: 2430, icon: Ticket, color: "blue" },
  { label: "Revenue (VND)", value: "12.4B", icon: DollarSign, color: "yellow" },
  { label: "Active Users", value: 1280, icon: Users, color: "purple" },
];

/* ================= CHART DATA ================= */

const BOOKING_BY_DAY = [
  { day: "Mon", bookings: 120, revenue: 180 },
  { day: "Tue", bookings: 150, revenue: 210 },
  { day: "Wed", bookings: 90, revenue: 160 },
  { day: "Thu", bookings: 180, revenue: 260 },
  { day: "Fri", bookings: 240, revenue: 390 },
  { day: "Sat", bookings: 300, revenue: 520 },
  { day: "Sun", bookings: 210, revenue: 340 },
];

const SEAT_DATA = [
  { name: "Economy", value: 70 },
  { name: "Business", value: 18 },
  { name: "First Class", value: 12 },
];

const PIE_COLORS = ["#16a34a", "#f59e0b", "#dc2626"];

/* ================= UI HELPERS ================= */

function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
      <div className="px-5 py-4 border-b border-[#E5E7EB]">
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function KpiCard({ label, value, icon: Icon, color }) {
  const colorMap = {
    green: "bg-green-50 text-green-700",
    blue: "bg-blue-50 text-blue-700",
    yellow: "bg-yellow-50 text-yellow-700",
    purple: "bg-purple-50 text-purple-700",
  };

  return (
    <div
      className={`rounded-2xl border border-[#E5E7EB] p-5 ${colorMap[color]}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{label}</p>
          <p className="mt-1 text-2xl font-bold">{value}</p>
        </div>
        <Icon className="h-6 w-6 opacity-70" />
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    Completed: "bg-green-50 text-green-700 border-green-200",
    Scheduled: "bg-blue-50 text-blue-700 border-blue-200",
    Cancelled: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${map[status]}`}
    >
      {status}
    </span>
  );
}

/* ================= PAGE ================= */

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_DATA.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Bookings (Last 7 days)">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BOOKING_BY_DAY}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#16a34a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Revenue trend (Billion VND)">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={BOOKING_BY_DAY}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Seat distribution">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SEAT_DATA}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {SEAT_DATA.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent bookings */}
      <Card title="Recent bookings">
        <div className="overflow-hidden rounded-xl border border-[#E5E7EB]">
          <table className="w-full text-sm">
            <thead className="bg-[#F8F7F9] text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Booking ID</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Route</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E5E7EB] bg-white">
              {RECENT_BOOKINGS.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{b.id}</td>
                  <td className="px-4 py-3">{b.customer}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{b.route}</div>
                    <div className="text-xs text-gray-500">{b.flight}</div>
                  </td>
                  <td className="px-4 py-3">{b.date}</td>
                  <td className="px-4 py-3 font-semibold">
                    {b.amount.toLocaleString()} đ
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
    </div>
  );
}
