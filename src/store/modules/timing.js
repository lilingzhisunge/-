const timing = {
  state: {
    jishi: false
  },
  mutations: {
    SET_JISHI: (state, jishi) => {
      state.jishi = jishi
    }
  },
  actions: {
    setJishi ({ commit }, type) {
      commit('SET_JISHI', type)
    }
  }
}

export default timing
