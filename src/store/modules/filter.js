import axios from "axios";

export default {
  state() {
    return {
      allProducts: [],
      filteredProducts: [],
      materials: [],
      selectedMaterial: "0",
    };
  },
  mutations: {
    setMaterials(state, materials) {
      state.materials = [...materials];
    },
    setAllProducts(state, products) {
      state.allProducts = products;
    },
    setFilteredProducts(state, products) {
      state.filteredProducts = products;
    },
    setSelectedMaterial(state, materialId) {
      state.selectedMaterial = materialId;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get("/items.json");
        commit("setAllProducts", response.data);
        commit("setFilteredProducts", response.data);
      } catch (error) {
        console.error("There was an error fetching the products:", error);
      }
    },
    fetchMaterials({ commit }) {
      fetch("materials.json")
        .then((response) => response.json())
        .then((data) => commit("setMaterials", data))
        .catch((error) => console.error("Fetching materials failed", error));
    },
    filterByMaterial({ commit, state }, materialId) {
      commit("setSelectedMaterial", materialId);
      if (materialId === "0") {
        commit("setFilteredProducts", state.allProducts);
      } else {
        const filtered = state.allProducts.filter(
          (product) => product.material.toString() === materialId
        );
        commit("setFilteredProducts", filtered);
      }
    },
  },
  getters: {
    allProducts: (state) => state.allProducts,
    filteredProducts: (state) => state.filteredProducts,
    materials: (state) => state.materials,
    selectedMaterial: (state) => state.selectedMaterial,
  },
};
