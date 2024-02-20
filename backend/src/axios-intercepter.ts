import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.HOTELS_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "X-RapidAPI-Key": "27cbd4bae9msha8020da4767c0d5p1e970fjsn68dce74e8b2c",
    "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
  },
});

export default axiosInstance;
