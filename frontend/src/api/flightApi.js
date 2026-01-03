import api from '../shared/api/axios';

export const searchFlights = async (params) => {
  const res = await api.get('/flight/search', { params });
  return res.data;
};
