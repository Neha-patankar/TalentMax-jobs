
// src/app/service/Api.js - Add this login function to your existing API service

import axios from "axios";

const API_BASE_URL = "httplocalhost:5000/api";

// Existing candidate service
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

// New auth service for login
export const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      
      // You can store the authentication token in localStorage if your API returns one
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed. Please check your credentials." };
    }
  },
  
  logout: () => {
    // Remove token from localStorage when logging out
    localStorage.removeItem('token');
  }
};

export default {  registerCandidate, authService };
