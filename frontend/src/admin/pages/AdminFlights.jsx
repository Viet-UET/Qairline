import React, { useMemo, useState } from "react";
import { Plus, Pencil, Plane, Clock, MapPin, X } from "lucide-react";
import SuccessToast from "../components/SuccessToast";
import { getSeatClasses } from "../../api/seatClasses";

/* ================= MOCK DATA ================= */

const FLIGHT_STATUSES = ["Scheduled", "Completed", "Delayed", "Cancelled"];

const AIRPORTS = [
  { city: "Hà Nội", code: "HAN" },
  { city: "Hồ Chí Minh", code: "SGN" },
  { city: "Đà Nẵng", code: "DAD" },
  { city: "Nha Trang", code: "CXR" },
  { city: "Phú Quốc", code: "PQC" },
  { city: "Huế", code: "HUI" },
  { city: "Đà Lạt", code: "DLI" },
  { city: "Hải Phòng", code: "HPH" },
  { city: "Cần Thơ", code: "VCA" },
  { city: "Bangkok", code: "BKK" },
  { city: "Singapore", code: "SIN" },
  { city: "Seoul", code: "ICN" },
  { city: "Tokyo", code: "NRT" },
];

const AIRPLANES = [
  { id: "VN-A320-001", model: "Airbus A320" },
  { id: "VN-A321-002", model: "Airbus A321" },
  { id: "VN-A350-003", model: "Airbus A350" },
  { id: "VN-B787-004", model: "Boeing 787-9 Dreamliner" },
  { id: "VN-B777-005", model: "Boeing 777-300ER" },
  { id: "VN-E190-006", model: "Embraer E190" },
  { id: "VN-CRJ9-007", model: "Bombardier CRJ900" },
];

const INITIAL_FLIGHTS = [
  {
    id: "VN128",
    airplane: "Bombardier CRJ900",
    from: "Hue",
    to: "Phu Quoc",
    departTime: "18/12/2024 02:55",
    arriveTime: "18/12/2024 04:34",
    economy: 1515000,
    premium: 2000000,
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
    premium: 2100000,
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
    premium: 2000000,
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
  const [flights, setFlights] = useState(INITIAL_FLIGHTS);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingFlight, setEditingFlight] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastAction, setLastAction] = useState(""); // "add" or "edit"
  const [seatClasses, setSeatClasses] = useState([]);

  useEffect(() => {
    const fetchSeatClasses = async () => {
      try {
        const data = await getSeatClasses();
        setSeatClasses(data);
      } catch (err) {
        console.error("Failed to fetch seat classes:", err);
        setSeatClasses([]);
      }
    };
    fetchSeatClasses();
  }, []);

  const priceMap = {
    "Economy": "economy",
    "Premium Economy": "premium",
    "Business": "business",
    "First Class": "firstClass"
  };

  // Form state
  const [flightCode, setFlightCode] = useState("");
  const [airplaneId, setAirplaneId] = useState("");
  const [fromAirport, setFromAirport] = useState("");
  const [toAirport, setToAirport] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [departTime, setDepartTime] = useState("");
  const [arriveDate, setArriveDate] = useState("");
  const [arriveTime, setArriveTime] = useState("");
  const [economyPrice, setEconomyPrice] = useState("");
  const [premiumPrice, setPremiumPrice] = useState("");
  const [businessPrice, setBusinessPrice] = useState("");
  const [firstClassPrice, setFirstClassPrice] = useState("");
  const [flightStatus, setFlightStatus] = useState("Scheduled");

  const resetForm = () => {
    setFlightCode("");
    setAirplaneId("");
    setFromAirport("");
    setToAirport("");
    setDepartDate("");
    setDepartTime("");
    setArriveDate("");
    setArriveTime("");
    setEconomyPrice("");
    setPremiumPrice("");
    setBusinessPrice("");
    setFirstClassPrice("");
    setFlightStatus("Scheduled");
  };

  const populateFormWithFlight = (flight) => {
    setFlightCode(flight.id);
    // Find airplane ID from model
    const airplane = AIRPLANES.find(a => a.model === flight.airplane);
    setAirplaneId(airplane ? airplane.id : "");
    // Find airport codes from city names
    const fromAirport = AIRPORTS.find(a => a.city === flight.from);
    const toAirport = AIRPORTS.find(a => a.city === flight.to);
    setFromAirport(fromAirport ? fromAirport.code : "");
    setToAirport(toAirport ? toAirport.code : "");
    // Parse dates and times from the formatted strings
    const [departDateStr, departTimeStr] = flight.departTime.split(' ');
    const [arriveDateStr, arriveTimeStr] = flight.arriveTime.split(' ');
    setDepartDate(departDateStr);
    setDepartTime(departTimeStr);
    setArriveDate(arriveDateStr);
    setArriveTime(arriveTimeStr);
    setEconomyPrice(flight.economy.toString());
    setPremiumPrice(flight.premium.toString());
    setBusinessPrice(flight.business.toString());
    setFirstClassPrice(flight.firstClass.toString());
    setFlightStatus(flight.status);
  };

  const handleEditFlight = (flight) => {
    setEditingFlight(flight);
    populateFormWithFlight(flight);
    setShowEditModal(true);
  };

  const handleAddFlight = () => {
    // Validation
    if (!flightCode || !airplaneId || !fromAirport || !toAirport || !departDate || !departTime || !arriveDate || !arriveTime || !economyPrice || !premiumPrice || !businessPrice || !firstClassPrice) {
      return;
    }

    // Check if departure and destination are different
    if (fromAirport === toAirport) {
      return;
    }

    // Check if flight code is unique
    if (flights.some(f => f.id === flightCode)) {
      return;
    }

    // Check if arrival is after departure
    const departDateTime = new Date(`${departDate}T${departTime}`);
    const arriveDateTime = new Date(`${arriveDate}T${arriveTime}`);
    if (arriveDateTime <= departDateTime) {
      return;
    }

    // Check if prices are positive
    if (Number(economyPrice) <= 0 || Number(premiumPrice) <= 0 || Number(businessPrice) <= 0 || Number(firstClassPrice) <= 0) {
      return;
    }

    const fromCity = AIRPORTS.find(a => a.code === fromAirport)?.city || fromAirport;
    const toCity = AIRPORTS.find(a => a.code === toAirport)?.city || toAirport;
    const airplane = AIRPLANES.find(a => a.id === airplaneId)?.model || airplaneId;

    const newFlight = {
      id: flightCode,
      airplane: airplane,
      from: fromCity,
      to: toCity,
      departTime: `${departDate} ${departTime}`,
      arriveTime: `${arriveDate} ${arriveTime}`,
      economy: Number(economyPrice),
      premium: Number(premiumPrice),
      business: Number(businessPrice),
      firstClass: Number(firstClassPrice),
      status: flightStatus,
    };

    setFlights(prev => [...prev, newFlight]);
    setShowAddModal(false);
    setLastAction("add");
    setShowSuccess(true);
    resetForm();
  };

  const handleSaveEdit = () => {
    // Validation
    if (!flightCode || !airplaneId || !fromAirport || !toAirport || !departDate || !departTime || !arriveDate || !arriveTime || !economyPrice || !premiumPrice || !businessPrice || !firstClassPrice) {
      return;
    }

    // Check if departure and destination are different
    if (fromAirport === toAirport) {
      return;
    }

    // Check if arrival is after departure
    const departDateTime = new Date(`${departDate}T${departTime}`);
    const arriveDateTime = new Date(`${arriveDate}T${arriveTime}`);
    if (arriveDateTime <= departDateTime) {
      return;
    }

    // Check if prices are positive
    if (Number(economyPrice) <= 0 || Number(premiumPrice) <= 0 || Number(businessPrice) <= 0 || Number(firstClassPrice) <= 0) {
      return;
    }

    const fromCity = AIRPORTS.find(a => a.code === fromAirport)?.city || fromAirport;
    const toCity = AIRPORTS.find(a => a.code === toAirport)?.city || toAirport;
    const airplane = AIRPLANES.find(a => a.id === airplaneId)?.model || airplaneId;

    const updatedFlight = {
      id: flightCode,
      airplane: airplane,
      from: fromCity,
      to: toCity,
      departTime: `${departDate} ${departTime}`,
      arriveTime: `${arriveDate} ${arriveTime}`,
      economy: Number(economyPrice),
      premium: Number(premiumPrice),
      business: Number(businessPrice),
      firstClass: Number(firstClassPrice),
      status: flightStatus,
    };

    setFlights(prev => prev.map(f => f.id === editingFlight.id ? updatedFlight : f));
    setShowEditModal(false);
    setLastAction("edit");
    setShowSuccess(true);
    resetForm();
    setEditingFlight(null);
  };

  const filteredFlights = useMemo(() => {
    return flights.filter((f) => {
      const matchQ =
        !q ||
        f.id.toLowerCase().includes(q.toLowerCase()) ||
        f.from.toLowerCase().includes(q.toLowerCase()) ||
        f.to.toLowerCase().includes(q.toLowerCase());
      const matchStatus = status === "All" || f.status === status;
      return matchQ && matchStatus;
    });
  }, [flights, q, status]);

  const stats = useMemo(() => {
    return {
      total: flights.length,
      completed: flights.filter((f) => f.status === "Completed").length,
      delayed: flights.filter((f) => f.status === "Delayed").length,
      cancelled: flights.filter((f) => f.status === "Cancelled").length,
      scheduled: flights.filter((f) => f.status === "Scheduled").length,
    };
  }, [flights]);

  return (
    <>
      <SuccessToast
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        text={lastAction === "edit" ? "Successfully updated" : "Successfully"}
      />

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
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
          >
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
                    {seatClasses.map(c => {
                      const key = priceMap[c.name];
                      return `${c.name}: ${f[key] ? f[key].toLocaleString() : '—'}đ`;
                    }).join(', ')}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={f.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button 
                      onClick={() => handleEditFlight(f)}
                      className="h-9 w-9 border rounded-xl hover:bg-gray-50 flex items-center justify-center"
                    >
                      <Pencil className="h-4 w-4 text-gray-700" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Flight Modal */}
      {showAddModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowAddModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-[900px] max-h-[90vh] overflow-y-auto">
              <div className="p-10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-semibold">Add new flight</h2>
                  <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Row 1: Flight number + Airplane ID */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Flight number
                      </label>
                      <input
                        value={flightCode}
                        onChange={(e) => setFlightCode(e.target.value)}
                        placeholder="e.g. VN128"
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Airplane ID
                      </label>
                      <select
                        value={airplaneId}
                        onChange={(e) => setAirplaneId(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      >
                        <option value="">Select airplane</option>
                        {AIRPLANES.map((airplane) => (
                          <option key={airplane.id} value={airplane.id}>
                            {airplane.id} - {airplane.model}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Departure + Destination */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Departure
                      </label>
                      <select
                        value={fromAirport}
                        onChange={(e) => setFromAirport(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      >
                        <option value="">Select departure airport</option>
                        {AIRPORTS.map((airport) => (
                          <option key={airport.code} value={airport.code}>
                            {airport.city} ({airport.code})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Destination
                      </label>
                      <select
                        value={toAirport}
                        onChange={(e) => setToAirport(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      >
                        <option value="">Select destination airport</option>
                        {AIRPORTS.map((airport) => (
                          <option key={airport.code} value={airport.code}>
                            {airport.city} ({airport.code})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Departure date + time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Departure date
                      </label>
                      <input
                        type="date"
                        value={departDate}
                        onChange={(e) => setDepartDate(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Departure time
                      </label>
                      <input
                        type="time"
                        value={departTime}
                        onChange={(e) => setDepartTime(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      />
                    </div>
                  </div>

                  {/* Row 4: Arrival date + time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Arrival date
                      </label>
                      <input
                        type="date"
                        value={arriveDate}
                        onChange={(e) => setArriveDate(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Arrival time
                      </label>
                      <input
                        type="time"
                        value={arriveTime}
                        onChange={(e) => setArriveTime(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      />
                    </div>
                  </div>

                  {/* Row 5: Prices */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Economy price (VND)
                      </label>
                      <input
                        type="number"
                        value={economyPrice}
                        onChange={(e) => setEconomyPrice(e.target.value)}
                        placeholder="e.g. 1500000"
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Premium Economy price (VND)
                      </label>
                      <input
                        type="number"
                        value={premiumPrice}
                        onChange={(e) => setPremiumPrice(e.target.value)}
                        placeholder="e.g. 2000000"
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Business price (VND)
                      </label>
                      <input
                        type="number"
                        value={businessPrice}
                        onChange={(e) => setBusinessPrice(e.target.value)}
                        placeholder="e.g. 3000000"
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        First-class price (VND)
                      </label>
                      <input
                        type="number"
                        value={firstClassPrice}
                        onChange={(e) => setFirstClassPrice(e.target.value)}
                        placeholder="e.g. 6000000"
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-8 border-t border-gray-200">
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
                      onClick={handleAddFlight}
                      disabled={!flightCode || !airplaneId || !fromAirport || !toAirport || !departDate || !departTime || !arriveDate || !arriveTime || !economyPrice || !premiumPrice || !businessPrice || !firstClassPrice}
                      className="inline-flex items-center justify-center rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Add flight
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit Flight Modal */}
      {showEditModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowEditModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-[900px] max-h-[90vh] overflow-y-auto">
              <div className="p-10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-semibold">Edit flight</h2>
                  <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Row 1: Flight number + Airplane ID */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Flight number
                      </label>
                      <input
                        value={flightCode}
                        readOnly
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-gray-50 px-4 py-2.5 text-sm outline-none cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Airplane ID
                      </label>
                      <select
                        value={airplaneId}
                        onChange={(e) => setAirplaneId(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      >
                        <option value="">Select airplane</option>
                        {AIRPLANES.map((airplane) => (
                          <option key={airplane.id} value={airplane.id}>
                            {airplane.id} - {airplane.model}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Departure + Destination */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Departure
                      </label>
                      <select
                        value={fromAirport}
                        onChange={(e) => setFromAirport(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      >
                        <option value="">Select departure airport</option>
                        {AIRPORTS.map((airport) => (
                          <option key={airport.code} value={airport.code}>
                            {airport.city} ({airport.code})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Destination
                      </label>
                      <select
                        value={toAirport}
                        onChange={(e) => setToAirport(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      >
                        <option value="">Select destination airport</option>
                        {AIRPORTS.map((airport) => (
                          <option key={airport.code} value={airport.code}>
                            {airport.city} ({airport.code})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Departure date + time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Departure date
                      </label>
                      <input
                        type="date"
                        value={departDate}
                        onChange={(e) => setDepartDate(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Departure time
                      </label>
                      <input
                        type="time"
                        value={departTime}
                        onChange={(e) => setDepartTime(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      />
                    </div>
                  </div>

                  {/* Row 4: Arrival date + time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Arrival date
                      </label>
                      <input
                        type="date"
                        value={arriveDate}
                        onChange={(e) => setArriveDate(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Arrival time
                      </label>
                      <input
                        type="time"
                        value={arriveTime}
                        onChange={(e) => setArriveTime(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      />
                    </div>
                  </div>

                  {/* Row 5: Prices */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Economy price (VND)
                      </label>
                      <input
                        type="number"
                        value={economyPrice}
                        onChange={(e) => setEconomyPrice(e.target.value)}
                        placeholder="e.g. 1500000"
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Premium Economy price (VND)
                      </label>
                      <input
                        type="number"
                        value={premiumPrice}
                        onChange={(e) => setPremiumPrice(e.target.value)}
                        placeholder="e.g. 2000000"
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Business price (VND)
                      </label>
                      <input
                        type="number"
                        value={businessPrice}
                        onChange={(e) => setBusinessPrice(e.target.value)}
                        placeholder="e.g. 3000000"
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        First-class price (VND)
                      </label>
                      <input
                        type="number"
                        value={firstClassPrice}
                        onChange={(e) => setFirstClassPrice(e.target.value)}
                        placeholder="e.g. 6000000"
                        className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-200"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-8 border-t border-gray-200">
                    <button
                      onClick={() => {
                        resetForm();
                        setShowEditModal(false);
                        setEditingFlight(null);
                      }}
                      className="inline-flex items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      disabled={!flightCode || !airplaneId || !fromAirport || !toAirport || !departDate || !departTime || !arriveDate || !arriveTime || !economyPrice || !premiumPrice || !businessPrice || !firstClassPrice}
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
