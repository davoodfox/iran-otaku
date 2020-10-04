import EntriesService from "@/services/EntriesService.js";

const state = {
  entries: []
};

const mutations = {
  SET_ENTRIES(state, entries) {
    state.entries = entries;
  },

  ADD_ENTRY(state, entry) {
    state.entries = [...state.entries, entry];
  },
  DELETE_ENTRY(state, targetId) {
    state.entries.forEach((entry, index) => {
      if (entry.mal_id == targetId) {
        state.entries = [
          ...state.entries.slice(0, index),
          ...state.entries.slice(index + 1)
        ];
      }
    });
  },
  EDIT_ENTRY(state, { index, updates }) {
    state.entries[index].faTitle = updates.faTitle;
  }
};

const actions = {
  fetchEntries({ dispatch, commit }) {
    EntriesService.getEntries()
      .then(res => {
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
  addEntry({ dispatch, commit, rootState }, entry) {
    const token = rootState.user.token;
    EntriesService.addEntry({ entry, token })
      .then(res => {
        console.log(res);
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
  editEntry({ dispatch, commit, state, rootState }, { id, updates }) {
    const token = rootState.user.token;
    EntriesService.editEntry({ id, updates, token })
      .then(({ data }) => {
        let index;
        let oldName;
        state.entries.forEach((entry, i) => {
          if (entry.id == id) {
            index = i;
            oldName = entry.faTitle;
          }
        });
        commit("EDIT_ENTRY", { index, updates });
        const notification = {
          type: "success",
          message: `${oldName} به ${data.faTitle} تغییر یافت.`
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
    return state.entries.map(entry => entry.id);
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
