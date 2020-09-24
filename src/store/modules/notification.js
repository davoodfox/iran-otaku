const state = {
  notifications: []
};
let nextId = 1;
const mutations = {
  PUSH(state, notification) {
    state.notifications = [
      ...state.notifications,
      { ...notification, id: nextId++ }
    ];
  },
  DELETE(state, targetNotification) {
    state.notifications.forEach((notification, index) => {
      if (notification.id == targetNotification.id) {
        state.notifications = [
          ...state.notifications.slice(0, index),
          ...state.notifications.slice(index + 1)
        ];
      }
    });
  }
};

const actions = {
  add({ commit }, notification) {
    commit("PUSH", notification);
  },
  remove({ commit }, notification) {
    commit("DELETE", notification);
  }
};

export default {
  namespaced: true,
  name: "notification",
  state,
  mutations,
  actions
};
