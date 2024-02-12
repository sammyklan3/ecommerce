// axiosInstance.js
import axios from 'axios';

const BASE_URL = 'http://200.134.155.78:3000/';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // You can add other configuration options here
});