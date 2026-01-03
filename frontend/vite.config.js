// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],

//   server: {
//     port: 3000,                // FE chạy tại localhost:3000
//     open: true,
//     strictPort: true,

//     proxy: {
//       "/api": {
//         target: "http://localhost:8080", // ⚠️ Backend Spring Boot
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },

//   define: {
//     "process.env": process.env,
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,      // FE chạy tại localhost:3000
    open: true,
    strictPort: true,
    // ❌ BỎ proxy hoàn toàn
  },

  define: {
    "process.env": process.env,
  },
});
