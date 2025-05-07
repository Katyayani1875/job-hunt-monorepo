// src/api/jobApi.js

import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// 🔍 Get autocomplete title suggestions
export const fetchSuggestions = async (query) => {
  if (!query) return []; // avoid unnecessary calls

  try {
    const response = await axios.get(`${API}/jobs/suggestions`, {
      params: { query },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};

// 📄 Fetch jobs based on filters (title, location, category)
export const fetchJobs = async ({ title, location, category }) => {
  try {
    const response = await axios.get(`${API}/jobs`, {
      params: { title, location, category },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};
