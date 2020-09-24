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
    state.allEntries = [...state.allEntries, entry];
  },
  DELETE_ENTRY(state, targetId) {
    state.allEntries.forEach((entry, index) => {
      if (entry.mal_id == targetId) {
        state.allEntries = [
          ...state.allEntries.slice(0, index),
          ...state.allEntries.slice(index + 1)
        ];
      }
    });
  },
  EDIT_ENTRY(state, { targetEntry, updates }) {
    targetEntry.faTitle = updates.faTitle;
  }
};

const actions = {
  fetchEntries({ dispatch, state, commit }, { perPage, page }) {
    state.entries = [];
    EntriesService.getEntries(perPage, page)
      .then(res => {
        commit("SET_ENTRIES_COUNT", res.headers["x-total-count"]);
        commit("SET_ENTRIES", res.data);
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: "مشکلی در ارتباط پیش آمد: " + error
        };
        dispatch("notification/add", notification, { root: true });
      });
  },
  fetchAllEntries({ dispatch, commit }) {
    EntriesService.getAllEntries()
      .then(res => {
        commit("SET_ALL_ENTRIES", res.data);
        const notification = {
          type: "success",
          message: "لیست انیمه‌ها به روز است."
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: "مشکلی در ارتباط پیش آمد: " + error
        };
        dispatch("notification/add", notification, { root: true });
      });
  },
  addEntry({ dispatch, commit }, entry) {
    EntriesService.addEntry(entry)
      .then(() => {
        commit("ADD_ENTRY", entry);
        const notification = {
          type: "success",
          message: entry.faTitle + " اضافه شد."
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: "مشکلی در ارتباط پیش آمد: " + error
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },
  deleteEntry({ dispatch, commit }, id) {
    EntriesService.deleteEntry(id)
      .then(() => {
        commit("DELETE_ENTRY", id);
        const notification = {
          type: "success",
          message: id + " Removed."
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: "مشکلی در ارتباط پیش آمد: " + error
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },
  editEntry({ dispatch, commit }, { id, updates }) {
    let targetEntry = state.entries.find(entry => entry.id == id);
    EntriesService.editEntry(targetEntry)
      .then(() => {
        commit("EDIT_ENTRY", { targetEntry, updates });
        const notification = {
          type: "success",
          message: "تغییرات اعمال شد"
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: "مشکلی در ارتباط پیش آمد: " + error
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  }
};

const getters = {
  ids: state => {
    return state.allEntries.map(entry => entry.id);
  }
};

export default {
  name: "entries",
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
