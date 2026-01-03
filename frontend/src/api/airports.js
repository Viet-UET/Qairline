import api from '../shared/api/axios';

export const getAirports = async () => {
  const res = await api.get('/flight/airports');
  return res.data;
};