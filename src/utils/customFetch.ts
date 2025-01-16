import axios from "axios";

const customFetch = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 5000, // 5 seconds
  
  baseURL: "https://hotel-booking-app-intern.onrender.com/api/v1",
  withCredentials: true,
});

export default customFetch;
