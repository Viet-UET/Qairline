import axios from "axios";

const api = axios.create({
  // Prefer env override; fall back to deployed backend host so FE works even when dev proxy isn't used
  baseURL: import.meta.env.VITE_API_URL || "https://api.sbltsena.me/api",
  withCredentials: true, // giúp gửi cookie nếu backend dùng OAuth2
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
