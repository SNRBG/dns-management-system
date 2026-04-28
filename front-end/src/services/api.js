import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth Service
export const authService = {
  register: (name, email, password, confirmPassword) =>
    api.post("/auth/register", { name, email, password, confirmPassword }),
  
  login: (email, password) =>
    api.post("/auth/login", { email, password }),
  
  getProfile: () =>
    api.get("/auth/profile"),
};

// DNS Service
export const dnsService = {
  createRecord: (domain, type, value, ttl, priority) =>
    api.post("/dns", { domain, type, value, ttl, priority }),
  
  getRecords: (domain, type) => {
    const params = {};
    if (domain) params.domain = domain;
    if (type) params.type = type;
    return api.get("/dns", { params });
  },
  
  getRecordById: (id) =>
    api.get(`/dns/${id}`),
  
  updateRecord: (id, { value, ttl, priority }) =>
    api.put(`/dns/${id}`, { value, ttl, priority }),
  
  deleteRecord: (id) =>
    api.delete(`/dns/${id}`),
};

export default api;
