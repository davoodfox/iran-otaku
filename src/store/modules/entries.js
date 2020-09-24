import EntriesService from "@/services/EntriesService.js";

const state = {
  allEntries: []
};

const mutations = {
  SET_ALL_ENTRIES(state, entries) {
    state.allEntries = entries;
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
  EDIT_ENTRY(state, { index, updates }) {
    state.allEntries[index].faTitle = updates.faTitle;
  }
};

const actions = {
  fetchAllEntries({ dispatch, commit }) {
    EntriesService.getAllEntries()
      .then(res => {
        commit("SET_ALL_ENTRIES", res.data);
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
  editEntry({ dispatch, commit, state }, { target, updates }) {
    var index;
    let oldName = target.faTitle;
    state.allEntries.forEach((entry, i) => {
      if (entry.id == target.id) {
        index = i;
      }
    });

    commit("EDIT_ENTRY", { index, updates });
    EntriesService.editEntry(state.allEntries[index])
      .then(res => {
        const notification = {
          type: "success",
          message: `${oldName} به ${res.data.faTitle} تغییر یافت.`
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
