import EntriesService from "@/services/EntriesService.js";

const state = {
  entry: {}
};

const mutations = {
  SET_ENTRY(state, response) {
    state.entry = response.data;
  }
};

const actions = {
  fetchEntry({ dispatch, commit }, id) {
    EntriesService.getEntry(id)
      .then(res => {
        commit("SET_ENTRY", res);
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: "مشکلی در ارتباط پیش آمد: " + error
        };
        dispatch("notification/add", notification, { root: true });
      });
  }
};

export default {
  name: "entry",
  namespaced: true,
  state,
  mutations,
  actions
};
