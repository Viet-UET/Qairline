import { create } from "zustand";

const useFlightStore = create((set) => ({
  isSeatModalOpen: false,
  selectedFlight: null,
  selectedClass: null,

  openSeatModal: (flight, seatClass) =>
    set({
      isSeatModalOpen: true,

      selectedFlight: flight
        ? {
            flight_id: flight.flight_id,
            flight_number: flight.flight_number,
            aircraftModel: flight.aircraftModel,
            seatAvailability: Array.isArray(flight.seatAvailability)
              ? flight.seatAvailability
              : [],
            passengerCount: flight.passengerCount ?? 1,
          }
        : null,

      selectedClass: seatClass,
    }),

  closeSeatModal: () =>
    set({
      isSeatModalOpen: false,
      selectedFlight: null,
      selectedClass: null,
    }),
}));

export default useFlightStore;
