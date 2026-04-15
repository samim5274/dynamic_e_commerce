import axios from "axios";
import router from "../router";

/*
|--------------------------------------------------------------------------
| Base URLs (auto from env)
|--------------------------------------------------------------------------
*/

// export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
// export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.dynamicbazarmerchantbd.com/api";
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/*
|--------------------------------------------------------------------------
| Axios Instance
|--------------------------------------------------------------------------
*/

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { Accept: "application/json" },
  withCredentials: false,
});

/*
|--------------------------------------------------------------------------
| Token Interceptor
|--------------------------------------------------------------------------
*/

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/*
|--------------------------------------------------------------------------
| Global 401 handler // token invalid holei login route a redirect korbe
|--------------------------------------------------------------------------
*/

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    }
    return Promise.reject(err);
  }
);

/*
|--------------------------------------------------------------------------
| Image URL Helper (GLOBAL)
|--------------------------------------------------------------------------
| Example:
| makeImg("products/a.jpg")
| → http://localhost:8080/storage/products/a.jpg
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Image URL Helper (Optimized for Production)
|--------------------------------------------------------------------------
*/

export const makeImg = (path) => {
  if (!path) return "";

  if (/^https?:\/\//i.test(path)) return path;

  const base = import.meta.env.VITE_API_BASE_URL;

  if (!base) return "";

  const cleanBase = base.replace(/\/api\/?$/, "");
  const cleanPath = path.replace(/^\/+/, "");
  return `${cleanBase}/storage/${cleanPath}`;

  // return `${base.replace(/\/$/, "")}/storage/${path.replace(/^\/+/, "")}`;
}

// export const makeImg = (path) => {
//   if (!path) return "";

//   if (/^https?:\/\//i.test(path)) return path;

//   if (!API_BASE_URL) return "";
//   const base = API_BASE_URL.replace(/\/api\/?$/, "");

//   // const cleanPath = path.replace(/^\/+/, "").replace(/^storage\//, "");
//   const cleanPath = path.replace(/^\/+/, "");

//   return `${base}/storage/${cleanPath}`;
// };

export default api;
