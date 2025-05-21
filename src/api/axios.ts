import axios from 'axios';

export const apiClient = axios.create({
  // Base URL of API
  baseURL: 'http://localhost:3001',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});