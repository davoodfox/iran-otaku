import jikanjs from "jikanjs";

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
    state.results = response.results;
  },
  SET_QUERY(state, query) {
    state.query = query;
  }
};

const actions = {
  fetchResults({ commit, dispatch }, query) {
    commit("SET_QUERY", query);
    commit("SET_LOADING", true);
    jikanjs
      .search("anime", query, [1])
      .then(res => {
        commit("SET_RESULTS", res);
        commit("SET_LOADING", false);
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
  namespaced: true,
  name: "search",
  state,
  mutations,
  actions
};
