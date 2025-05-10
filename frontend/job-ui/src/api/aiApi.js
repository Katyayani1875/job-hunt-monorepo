// src/api/aiApi.js
import axios from "axios";

const API_URL = "http://localhost:8000/api/ai"; // Or your backend base URL

export const analyzeResume = (data) =>
  axios.post(`${API_URL}/analyze-resume`, data, getAuthHeaders());

export const recommendJobs = (data) =>
  axios.post(`${API_URL}/recommend-jobs`, data, getAuthHeaders());

export const generateCoverLetter = (data) =>
  axios.post(`${API_URL}/generate-cover-letter`, data, getAuthHeaders());

export const smartJobPost = (data) =>
  axios.post(`${API_URL}/smart-job-post`, data, getAuthHeaders());

export const chatAssistant = (data) =>
  axios.post(`${API_URL}/chat`, data, getAuthHeaders());

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
}
