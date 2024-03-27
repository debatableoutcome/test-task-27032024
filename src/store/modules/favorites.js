const state = () => ({
  items: JSON.parse(localStorage.getItem("favorites")) || [],
});

const getters = {
  favorites: (state) => state.items,
};

const actions = {
  toggleItemInFavorites({ commit }, product) {
    commit("toggleFavorite", product);
  },
};

const mutations = {
  toggleFavorite(state, product) {
    const index = state.items.findIndex((p) => p.id === product.id);
    if (index === -1) {
      state.items.push(product);
      console.log(state.items);
    } else {
      state.items.splice(index, 1);
      console.log(state.items);
    }
    localStorage.setItem("favorites", JSON.stringify(state.items));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
