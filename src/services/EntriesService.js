import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/entries",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 10000
});

export default {
  getEntries() {
    return apiClient.get("/all");
  },
  getEntry(id) {
    return apiClient.get(`/entry/${id}`);
  },
  addEntry(entry) {
    return apiClient.post("/entry", entry);
  },
  deleteEntry(id) {
    return apiClient.delete("/entry", id);
  },
  editEntry({ id, updates }) {
    return apiClient.put("/entry", { id, updates });
  }
};
