const defaultIcon = {
  id: null,
  lib: {
    id: null,
    name: null,
  },
};

export default {
  state: {
    icon: defaultIcon,
  },
  mutations: {
    setIcon(state, payload) {
      if (!payload) {
        state.icon = defaultIcon;
        return;
      }
      state.icon = payload.icon;
    },
  },
  actions: {
    setIcon({ commit }, payload) {
      commit('setIcon', payload);
    },
  },
};
