export default {
  state() {
    return {
      priceOptions: [
        { id: "1", name: "по убыванию" },
        { id: "2", name: "по возрастанию" },
      ],
    };
  },
  mutations: {
    setFilteredProducts(state, products) {
      state.filteredProducts = products;
    },
  },
  actions: {
    sortProducts({ commit, rootState }, { type, value }) {
      let products =
        rootState.filter.selectedMaterial === "0"
          ? [...rootState.filter.allProducts]
          : [...rootState.filter.filteredProducts];

      if (type === "price") {
        products.sort((a, b) =>
          value === "1"
            ? b.price.current_price - a.price.current_price
            : a.price.current_price - b.price.current_price
        );
        commit("setFilteredProducts", products);
      }
    },
  },
  getters: {
    priceOptions: (state) => state.priceOptions,
  },
};
