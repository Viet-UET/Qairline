import api from '../shared/api/axios';

export const getAirlines = async () => {
  const res = await api.get('/flight/airlines');
  return res.data;
};