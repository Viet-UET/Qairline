import api from "./axios";

// -----------------------------
// LOGIN
// -----------------------------
export function loginUser(data) {
  return api.post("/auth/login", data);
}

// -----------------------------
// REGISTER
// -----------------------------
export function registerUser(data) {
  return api.post("/auth/register", data);
}

// -----------------------------
// LOGOUT
// -----------------------------
export function logoutUser(token) {
  return api.post(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

// -----------------------------
// (OPTIONAL) VERIFY EMAIL CODE
// -----------------------------
export function verifyCode(email, code) {
  return api.post("/auth/verify", { email, code });
}

// -----------------------------
// (OPTIONAL) SEND EMAIL CODE
// -----------------------------
export function sendVerifyEmail(email) {
  return api.post("/auth/send-code", { email });
}
