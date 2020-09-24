import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 10000
});

export default {
  getAllEntries() {
    return apiClient.get("entries");
  },
  getEntry(id) {
    return apiClient.get(`/entries/${id}`);
  },
  addEntry(entry) {
    return apiClient.post("/entries/", entry);
  },
  deleteEntry(id) {
    return apiClient.delete(`/entries/${id}`, { id: id });
  },
  editEntry(entry) {
    return apiClient.put(`/entries/${entry.id}`, entry);
  }
};
