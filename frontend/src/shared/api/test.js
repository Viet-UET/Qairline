import axios from "./axios";

const testAPI = {
  ping: async () => {
    try {
      const res = await axios.get("/api/auth/ping");
      console.log(">> Backend response:", res.data);
      return res.data;
    } catch (error) {
      console.error(">> Backend error:", error);
      return null;
    }
  },
};

export default testAPI;
