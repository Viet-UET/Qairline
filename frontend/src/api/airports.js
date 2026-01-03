import api from '../shared/api/axios';

export const getAirports = async () => {
  try {
    const res = await api.get('/airports');
    console.log('API Response:', res);
    console.log('Response data:', res.data);

    // Handle different response shapes
    let airports = [];
    if (Array.isArray(res.data)) {
      airports = res.data;
    } else if (res.data && Array.isArray(res.data.data)) {
      airports = res.data.data;
    } else if (res.data && Array.isArray(res.data.airports)) {
      airports = res.data.airports;
    } else {
      console.warn('Unexpected response shape:', res.data);
      airports = [];
    }

    console.log('Parsed airports:', airports);
    return airports;
  } catch (error) {
    console.error('Error fetching airports:', error);
    throw error;
  }
};