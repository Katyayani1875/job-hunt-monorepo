// src/utils/axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // ✅ change if needed
});

// ✅ STEP 2: Token add karo har request ke sath
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // 👈 ye token login ke baad save hua hoga
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
