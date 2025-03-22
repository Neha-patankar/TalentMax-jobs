// src/app/service/Api.js

import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// Auth service for login
export const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed. Please check your credentials." };
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
  }
};

// If you need registerCandidate, you can still export it separately
export const registerCandidate = {
  registerCandidate: async (candidateData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, candidateData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to register candidate" };
    }
  }
};
