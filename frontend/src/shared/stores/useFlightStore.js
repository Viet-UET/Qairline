import { create } from "zustand";

const useFlightStore = create((set) => ({
  isSeatModalOpen: false,
  selectedFlight: null,
  selectedClass: null,

  openSeatModal: (flight, seatClass) =>
    set({
      isSeatModalOpen: true,
      selectedFlight: flight,
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
