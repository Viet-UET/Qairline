import React, { useMemo, useState } from "react";
import { Plus, Pencil, Plane, Clock, MapPin } from "lucide-react";

/* ================= MOCK DATA ================= */

const FLIGHT_STATUSES = ["Scheduled", "Completed", "Delayed", "Cancelled"];

const MOCK_FLIGHTS = [
  {
    id: "VN128",
    airplane: "Bombardier CRJ900",
    from: "Hue",
    to: "Phu Quoc",
    departTime: "18/12/2024 02:55",
    arriveTime: "18/12/2024 04:34",
    economy: 1515000,
    business: 4690000,
    firstClass: 9702000,
    status: "Completed",
  },
  {
    id: "VN166",
    airplane: "Embraer E190",
    from: "Ho Chi Minh City",
    to: "Can Tho",
    departTime: "18/12/2024 06:30",
    arriveTime: "18/12/2024 09:33",
    economy: 1583000,
    business: 3992000,
    firstClass: 9192000,
    status: "Scheduled",
  },
  {
    id: "VN249",
    airplane: "Boeing 787-9 Dreamliner",
    from: "Pleiku",
    to: "Vinh",
    departTime: "18/12/2024 13:35",
    arriveTime: "18/12/2024 15:09",
    economy: 1569000,
    business: 4102000,
    firstClass: 8531000,
    status: "Scheduled",
  },
];

/* ================= UTILS ================= */

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function StatusBadge({ status }) {
  const map = {
    Scheduled: "bg-blue-50 text-blue-700 border-blue-100",
    Completed: "bg-green-50 text-green-700 border-green-100",
    Delayed: "bg-yellow-50 text-yellow-700 border-yellow-100",
    Cancelled: "bg-red-50 text-red-700 border-red-100",
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

function Card({ title, icon: Icon, children, right }) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-gray-500" />}
          <h2 className="font-semibold">{title}</h2>
        </div>
        {right}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/* ================= PAGE ================= */

export default function AdminFlights() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");

  const filteredFlights = useMemo(() => {
    return MOCK_FLIGHTS.filter((f) => {
      const matchQ =
        !q ||
        f.id.toLowerCase().includes(q.toLowerCase()) ||
        f.from.toLowerCase().includes(q.toLowerCase()) ||
        f.to.toLowerCase().includes(q.toLowerCase());
      const matchStatus = status === "All" || f.status === status;
      return matchQ && matchStatus;
    });
  }, [q, status]);

  const stats = useMemo(() => {
    return {
      total: MOCK_FLIGHTS.length,
      completed: MOCK_FLIGHTS.filter((f) => f.status === "Completed").length,
      delayed: MOCK_FLIGHTS.filter((f) => f.status === "Delayed").length,
      cancelled: MOCK_FLIGHTS.filter((f) => f.status === "Cancelled").length,
      scheduled: MOCK_FLIGHTS.filter((f) => f.status === "Scheduled").length,
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Kpi label="Total flights" value={stats.total} />
        <Kpi label="Scheduled" value={stats.scheduled} color="blue" />
        <Kpi label="Completed" value={stats.completed} color="green" />
        <Kpi label="Delayed" value={stats.delayed} color="yellow" />
        <Kpi label="Cancelled" value={stats.cancelled} color="red" />
      </div>

      <Card
        title="Flight list"
        icon={Plane}
        right={
          <button className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm text-white">
            <Plus className="h-4 w-4" />
            Add flight
          </button>
        }
      >
        <div className="flex gap-3 mb-4">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search flight / route…"
            className="w-64 rounded-xl border px-4 py-2 text-sm"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border px-3 py-2 text-sm"
          >
            <option value="All">All status</option>
            {FLIGHT_STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="overflow-hidden rounded-xl border">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Flight</th>
                <th className="px-4 py-3 text-left">Route</th>
                <th className="px-4 py-3 text-left">Schedule</th>
                <th className="px-4 py-3 text-left">Prices</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredFlights.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold">{f.id}</td>
                  <td className="px-4 py-3">
                    <MapPin className="inline h-3 w-3" /> {f.from} → {f.to}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Clock className="inline h-3 w-3" /> {f.departTime}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    Eco: {f.economy.toLocaleString()}đ
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={f.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="h-9 w-9 border rounded-xl">
                      <Pencil className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

/* ================= KPI ================= */

function Kpi({ label, value, color = "gray" }) {
  const map = {
    gray: "bg-gray-50 text-gray-700",
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <div className={cx("rounded-2xl border p-4", map[color])}>
      <p className="text-sm font-medium">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}
