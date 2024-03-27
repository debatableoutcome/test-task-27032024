const state = () => ({
  items: JSON.parse(localStorage.getItem("cart")) || [],
});

const getters = {
  cart: (state) => state.items,
};

const actions = {
  toggleItemInCart({ commit }, product) {
    commit("toggleCart", product);
  },
};

const mutations = {
  toggleCart(state, product) {
    const index = state.items.findIndex((p) => p.id === product.id);
    if (index === -1) {
      state.items.push(product);
      console.log(state.items);
    } else {
      state.items.splice(index, 1);
      console.log(state.items);
    }
    localStorage.setItem("cart", JSON.stringify(state.items));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
