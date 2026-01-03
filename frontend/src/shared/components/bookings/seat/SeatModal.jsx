import { useEffect, useState } from "react";
import { X } from "lucide-react";
import useFlightStore from "../../../stores/useFlightStore";
import { generateFakeSeats } from "../../../utils/fakeSeats";

import SeatMap from "./SeatMap";
import SeatSelected from "./SeatSelected";
import ExtraServices from "./ExtraServices";
import DiscountCode from "./DiscountCode";
import ConfirmBookingModal from "./ConfirmBookingModal";

export default function SeatModal() {
  const isOpen = useFlightStore((s) => s.isSeatModalOpen);
  const selectedFlight = useFlightStore((s) => s.selectedFlight);
  const selectedClass = useFlightStore((s) => s.selectedClass);
  const closeSeatModal = useFlightStore((s) => s.closeSeatModal);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);

  /* ===== EXTRA SERVICES ===== */
  const [services, setServices] = useState([
    { id: "luggage_5", label: "Hành lý dưới 5kg", price: 0, checked: true },
    { id: "luggage_10", label: "Hành lý từ 5kg đến 10kg", price: 100000, checked: false },
    { id: "luggage_20", label: "Hành lý trên 10kg", price: 400000, checked: false },
  ]);

  /* ===== DISCOUNT ===== */
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(null);

  useEffect(() => {
    setSelectedSeats([]);
    setConfirmOpen(false);
  }, [selectedFlight, selectedClass]);

  if (!isOpen) return null;

  const passengerCount = selectedFlight?.passengerCount ?? 2;

  /* ===== FAKE SEATS ===== */
  const seats = generateFakeSeats(
    selectedClass === "First Class"
      ? { rows: 4, cols: ["A", "C", "D", "F"], seatClass: "First Class" }
      : selectedClass === "Business"
      ? { rows: 6, cols: ["A", "B", "C", "D"], seatClass: "Business" }
      : selectedClass === "Premium Economy"
      ? { rows: 10, cols: ["A", "B", "C", "D", "E", "F"], seatClass: "Premium Economy" }
      : { rows: 12, cols: ["A", "B", "C", "D", "E", "F"], seatClass: "Economy" }
  );

  /* ===== SEAT LOGIC ===== */
  const handleSeatSelect = (seat) => {
    setSelectedSeats((prev) => {
      const exists = prev.some((s) => s.seat_id === seat.seat_id);
      if (exists) return prev.filter((s) => s.seat_id !== seat.seat_id);
      if (prev.length >= passengerCount) return prev;
      return [...prev, seat];
    });
  };

  const handleRemoveSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.filter((s) => s.seat_id !== seat.seat_id)
    );
  };

  /* ===== SERVICES ===== */
  const toggleService = (id) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, checked: !s.checked } : s
      )
    );
  };

  /* ===== COUPON ===== */
  const applyCoupon = (code, submit) => {
    setCouponCode(code);
    if (submit && code === "VN100") {
      setDiscount({ code: "VN100", percent: 50 });
    }
  };

  const removeCoupon = () => {
    setCouponCode("");
    setDiscount(null);
  };

  /* ===== CONFIRM ===== */
  const handleConfirmBooking = () => {
    console.log("BOOKING CONFIRMED", {
      seats: selectedSeats,
      services,
      discount,
    });
    setConfirmOpen(false);
    closeSeatModal();
  };

  return (
    <>
      {/* BACKDROP */}
      <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="w-full max-w-[1200px] bg-white rounded-[24px] shadow-2xl border border-[#D9D9D9] overflow-hidden">

          {/* HEADER */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">
              Chọn ghế – {selectedClass}
            </h3>
            <button onClick={closeSeatModal}>
              <X size={18} />
            </button>
          </div>

          {/* BODY */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* LEFT */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-4">
                <p className="font-semibold">
                  Số lượng hành khách: {passengerCount}
                </p>
                <p className="text-sm text-gray-600">
                  Đã chọn {selectedSeats.length}/{passengerCount} ghế
                </p>
              </div>

              <SeatMap
                seats={seats}
                selectedSeats={selectedSeats}
                onSeatSelect={handleSeatSelect}
                maxSeats={passengerCount}
              />
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white border border-[#D9D9D9] rounded-2xl p-4">
                <h4 className="font-semibold mb-3">Ghế đã chọn</h4>
                <SeatSelected
                  seats={selectedSeats}
                  onRemove={handleRemoveSeat}
                />
              </div>

              <div className="bg-white border border-[#D9D9D9] rounded-2xl p-4">
                <h4 className="font-semibold mb-3">Dịch vụ thêm</h4>
                <ExtraServices
                  services={services}
                  onChange={toggleService}
                />
              </div>

              <DiscountCode
                code={couponCode}
                discount={discount}
                onApply={applyCoupon}
                onRemove={removeCoupon}
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-between items-center px-6 py-4 border-t bg-[#F8F7F9]">
            <button
              onClick={closeSeatModal}
              className="px-6 py-2 rounded-xl border border-red-300 text-red-600 font-semibold hover:bg-red-50 transition"
            >
              Hủy
            </button>

            <button
              disabled={selectedSeats.length === 0}
              onClick={() => setConfirmOpen(true)}
              className="px-6 py-2 rounded-xl bg-qa-green text-white font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              Xác nhận {selectedSeats.length}/{passengerCount} ghế
            </button>
          </div>
        </div>
      </div>

      {/* CONFIRM MODAL */}
      <ConfirmBookingModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmBooking}
      />
    </>
  );
}
