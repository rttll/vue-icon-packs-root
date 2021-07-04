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
    packs: [],
  },
  mutations: {
    setIcon(state, payload) {
      if (!payload) {
        state.icon = defaultIcon;
        return;
      }
      state.icon = payload.icon;
    },
    setPacks(state, payload) {
      state.packs = payload.packs;
    },
  },
  actions: {
    setIcon({ commit }, payload) {
      commit('setIcon', payload);
    },
    setPacks({ commit }, payload) {
      commit('setPacks', payload);
    },
  },
};
