import api from '../shared/api/axios';

export const getSeatClasses = async () => {
  const res = await api.get('/flight/seat-classes');
  return res.data;
};