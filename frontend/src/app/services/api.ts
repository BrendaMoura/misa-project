import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000/v1",
  withCredentials: true,
});

export default api;
