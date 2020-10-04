import axios from "axios";

const headers = {
  "cache-control": "no-cache",
  Accept: "application/json",
  "Content-Type": "application/json"
};

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/entries",
  withCredentials: false,
  headers: headers,
  timeout: 10000
});

export default {
  getEntries() {
    return apiClient.get("/all");
  },
  getEntry(id) {
    return apiClient.get(`/entry/${id}`);
  },
  addEntry({ entry, token }) {
    return apiClient.post("/entry", entry, {
      headers: { "auth-token": token }
    });
  },
  deleteEntry(id) {
    return apiClient.delete("/entry", id);
  },
  editEntry({ id, updates, token }) {
    return apiClient.put(
      "/entry",
      { id, updates },
      { headers: { "auth-token": token } }
    );
  }
};
