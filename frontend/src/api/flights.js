import api from "../shared/api/axios";

export const getAllFlights = async (page = 0, size = 10) => {
  const res = await api.get("/flight/search", {
    params: { page, size },
  });
  return res.data;
};


export const getFlightDetail = async (flightId) => {
  if (!flightId) {
    throw new Error("flightId is required");
  }
  const res = await api.get(`/flight/${flightId}`);
  return res.data;
};
