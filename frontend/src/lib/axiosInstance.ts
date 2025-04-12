import axios from "axios";
import useJwtToken from "../hook/useJwtToken";

const { getJwtToken } = useJwtToken();

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getJwtToken()
  },
  withCredentials: true,
});
