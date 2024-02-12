// axiosInstance.js
import axios from 'axios';

const BASE_URL = 'https://ecommerce-backend-xkso.onrender.com:3000/';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // You can add other configuration options here
});
