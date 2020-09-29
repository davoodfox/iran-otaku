import EntriesService from "@/services/EntriesService.js";

const state = {
  entry: {}
};

const mutations = {
  SET_ENTRY(state, data) {
    state.entry = data;
  }
};

const actions = {
  fetchEntry({ commit }, id) {
    EntriesService.getEntry(id).then(({ data }) => {
      console.log(data);
      commit("SET_ENTRY", data);
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
