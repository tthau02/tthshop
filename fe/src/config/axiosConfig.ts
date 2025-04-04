import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (
      token &&
      !config.url?.includes("/auth/google") &&
      !config.url?.includes("/signin")
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization; // Xóa Authorization nếu không có token hoặc là endpoint auth
    }

    // Xử lý Content-Type cho FormData
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"]; // Để browser tự đặt Content-Type cho FormData
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor cho response (tuỳ chọn, để xử lý lỗi tập trung)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    }
    return Promise.reject(error);
  }
);

export default instance;
