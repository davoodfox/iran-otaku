import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/user",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 10000
});

export default {
  register(credentials) {
    return apiClient.post("/register", credentials);
  },
  login(credentials) {
    return apiClient.post("/login", credentials);
  }
};
