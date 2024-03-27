import { createStore } from "vuex";
import sort from "./modules/sort";
import filter from "./modules/filter";
import favorites from "./modules/favorites";
import cart from "./modules/cart";

export default createStore({
  modules: {
    sort,
    filter,
    favorites,
    cart,
  },
});
