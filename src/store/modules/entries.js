import EntriesService from "@/services/EntriesService.js";

const state = {
  allEntries: [],
  entries: [],
  entriesCount: NaN
};

const mutations = {
  SET_ALL_ENTRIES(state, entries) {
    state.allEntries = entries;
  },

  SET_ENTRIES_COUNT(state, count) {
    state.entriesCount = Number(count);
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
};

const actions = {
  fetchEntries({ state, commit }, { perPage, page }) {
    state.entries = [];
    EntriesService.getEntries(perPage, page).then(res => {
      commit("SET_ENTRIES_COUNT", res.headers["x-total-count"]);
      commit("SET_ENTRIES", res.data);
    });
  },
  fetchAllEntries({ commit }) {
    EntriesService.getAllEntries().then(res => {
      commit("SET_ALL_ENTRIES", res.data);
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
};

const getters = {
  ids: state => {
    return state.allEntries.map(entry => entry.id);
  }
};

export default {
  name: "entries",
  state,
  mutations,
  actions,
  getters
};
