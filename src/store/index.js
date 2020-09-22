import Vue from "vue";
import Vuex from "vuex";
import EntriesService from "@/services/EntriesService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ids: [],
    entries: [],
    isLoading: false
  },
  mutations: {
    SET_IDS(state, entry) {
      state.ids = [...state.ids, entry.id];
    },
    SET_LOADING(state, stat) {
      state.isLoading = stat;
    },
    FETCH_ENTRIES(state, res) {
      state.entries = [...state.entries, res];
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
    fetchEntries({ state, commit }) {
      state.entries = [];
      EntriesService.getEntries().then(res => {
        res.data.forEach(entry => {
          commit("SET_IDS", entry);
          commit("FETCH_ENTRIES", entry);
        });
      });
    },
    setLoading({ commit }, stat) {
      commit("SET_LOADING", stat);
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
  modules: {}
});
