const state = {
  perPage: 20,
  page: 1
};

const mutations = {
  SET_PAGE(state, page) {
    state.page = Number(page);
  }
};

const actions = {
  setPage({ commit }, page) {
    commit("SET_PAGE", page);
  }
};

const getters = {
  chunk: (state, getters, rootState) => {
    return rootState.entries.entries.slice(
      (state.page - 1) * state.perPage,
      state.page * state.perPage
    );
  },
  count: (state, getters, rootState) => {
    return rootState.entries.entries.length;
  }
};

export default {
  name: "list",
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
