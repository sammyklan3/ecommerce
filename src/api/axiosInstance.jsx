// axiosInstance.js
import axios from 'axios';

const BASE_URL = 'http://ecommerce-backend-xkso.onrender.com/';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // You can add other configuration options here
});
