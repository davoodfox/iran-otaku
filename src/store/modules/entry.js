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
  fetchEntry({ commit }, id) {
    EntriesService.getEntry(id).then(res => {
      commit("SET_ENTRY", res);
    });
  }
};

export default {
  name: "entry",
  state,
  mutations,
  actions
};
