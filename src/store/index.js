import Vue from "vue";
import Vuex from "vuex";
import EntriesService from "@/services/EntriesService.js";
import jikanjs from "jikanjs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ids: [],
    entries: [],
    entriesCount: NaN,
    isLoading: false,
    query: "",
    results: []
  },
  mutations: {
    SET_IDS(state, entries) {
      entries.forEach(entry => {
        state.ids = [...state.ids, entry.id];
      });
    },
    SET_LOADING(state, stat) {
      state.isLoading = stat;
    },
    SET_ENTRIES_COUNT(state, count) {
      state.entriesCount = Number(count);
    },
    SET_RESULTS(state, response) {
      state.results = response.results;
    },
    SET_QUERY(state, query) {
      state.query = query;
    },
    SET_ENTRIES(state, entries) {
      entries.forEach(entry => {
        state.entries = [...state.entries, entry];
      });
    },
    ADD_ENTRY(state, entry) {
      state.entries = [...state.entries, entry];
      state.ids = [...state.ids, entry.id];
    },
    DELETE_ENTRY(state, targetId) {
      state.ids.forEach((id, index) => {
        if (id == targetId) {
          state.ids = [
            ...state.ids.slice(0, index),
            ...state.ids.slice(index + 1)
          ];
        }
      });
      state.entries.forEach((entry, index) => {
        if (entry.mal_id == targetId) {
          state.entries = [
            ...state.entries.slice(0, index),
            ...state.entries.slice(index + 1)
          ];
        }
      });
    },
    EDIT_ENTRY(state, { id, updates }) {
      console.log("id: " + id);
      let targetEntry = state.entries.find(entry => entry.id == id);
      console.log("entry" + targetEntry.faTitle);
      targetEntry.faTitle = updates.faTitle;
      EntriesService.editEntry(targetEntry).then(res => {
        console.log(res);
      });
    }
  },
  actions: {
    fetchResults({ commit }, query) {
      commit("SET_QUERY", query);
      commit("SET_LOADING", true);
      jikanjs
        .search("anime", query, [1])
        .then(res => {
          commit("SET_RESULTS", res);
          commit("SET_LOADING", false);
        })
        .catch(error => error);
    },
    fetchEntries({ state, commit }, { perPage, page }) {
      state.entries = [];
      EntriesService.getEntries(perPage, page).then(res => {
        commit("SET_ENTRIES_COUNT", res.headers["x-total-count"]);
        commit("SET_IDS", res.data);
        commit("SET_ENTRIES", res.data);
      });
    },
    addEntry({ commit }, entry) {
      commit("ADD_ENTRY", entry);
      EntriesService.addEntry(entry).then(() => {
        console.log(entry.faTitle + " اضافه شد.");
      });
    },
    deleteEntry({ commit }, id) {
      commit("DELETE_ENTRY", id);
      EntriesService.deleteEntry(id).then(() => {
        console.log(id + " Removed.");
      });
    },
    editEntry({ commit }, { id, updates }) {
      commit("EDIT_ENTRY", { id, updates });
    }
  },
  getters: {
    getEntryById: state => id => {
      return state.entries.find(entry => entry.id == id);
    }
  },
  modules: {}
});
