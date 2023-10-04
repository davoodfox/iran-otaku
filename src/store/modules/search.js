const state = {
  loading: false,
  query: "",
  results: []
};

const mutations = {
  SET_LOADING(state, stat) {
    state.loading = stat;
  },
  SET_RESULTS(state, response) {
    state.results = response;
  },
  SET_QUERY(state, query) {
    state.query = query;
  }
};

const actions = {
  async fetchResults({ commit, dispatch }, query) {
    commit("SET_QUERY", query);
    commit("SET_LOADING", true);
    try {
      const res = await fetch("https://api.jikan.moe/v4/anime?q=" + query);
      const data = await res.json();
      commit("SET_RESULTS", data.data);
      commit("SET_LOADING", false);
    } catch (error) {
      const notification = {
        type: "error",
        message: "مشکلی در ارتباط پیش آمد: " + error
      };
      dispatch("notification/add", notification, { root: true });
    }
  }
};

export default {
  namespaced: true,
  name: "search",
  state,
  mutations,
  actions
};
