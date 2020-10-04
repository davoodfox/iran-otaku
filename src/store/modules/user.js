import AuthService from "@/services/AuthService.js";

const state = {
  user: null,
  token: null
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
    // localStorage.setItem("jwt-token", JSON.stringify({ ...data.token }));
  },
  SET_TOKEN(state, token) {
    state.token = token;
  }
};

const actions = {
  register({ commit }, credentials) {
    AuthService.register(credentials).then(({ data }) => {
      commit("SET_USER", data);
    });
  },
  login({ commit }, credentials) {
    AuthService.login(credentials).then(({ data }) => {
      commit("SET_USER", data.user);
      commit("SET_TOKEN", data.token);
    });
  }
};

const getters = {
  isLoggedIn: state => !!state.token
};

export default {
  name: "user",
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
