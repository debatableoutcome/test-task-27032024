<template>
  <div id="app">
    <main class="catalogue">
      <div class="catalogue__top-bar">
        <header>
          <div class="catalogue__breadcrumbs">
            <a href="#">Главная</a>
            <span>/</span>
            <a href="#">Системы хранения</a>
            <span>/</span>
            <a href="#" class="active">Комплекты стеллажных систем</a>
          </div>
          <h1 class="catalogue__title">Комплекты стеллажных систем</h1>
        </header>
        <section class="catalogue__filters">
          <FilterControl
            title="Сортировать по:"
            filter-type="price"
            :options="priceOptions"
            @filtered="handleFiltering"
          />
          <FilterControl
            title="Материал"
            filter-type="material"
            :options="materialsOptions"
            @filtered="handleFiltering"
          />
        </section>
      </div>
      <section class="catalogue__display">
        <ProductsDisplay :products="filteredProducts" />
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ProductsDisplay from "./components/ProductsDisplay.vue";
import FilterControl from "./components/FilterControl.vue";

export default {
  name: "App",
  components: {
    ProductsDisplay,
    FilterControl,
  },
  computed: {
    ...mapGetters([
      "allProducts",
      "filteredProducts",
      "materials",
      "priceOptions",
    ]),
    filteredProducts() {
      return this.products;
    },
    materialsOptions() {
      return this.materials.map((material) => ({
        id: material.id.toString(),
        name: material.name,
      }));
    },
  },
  methods: {
    ...mapActions([
      "fetchProducts",
      "fetchMaterials",
      "sortProducts",
      "filterByMaterial",
    ]),
    ...mapMutations(["setProducts", "setMaterials", "setSelectedMaterial"]),
    handleFiltering(filteredData) {
      if (filteredData.type === "material") {
        this.filterByMaterial(filteredData.value);
      } else if (filteredData.type === "price") {
        this.sortProducts(filteredData);
      }
    },
  },
  mounted() {
    this.fetchMaterials();
    this.fetchProducts();
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/fonts.scss";
@import "@/assets/scss/style.scss";

#app {
  background-color: rgb(255, 255, 255);
  max-width: 1920px;
  margin: 0 auto;
}
.catalogue {
  &__breadcrumbs {
    margin: 32px 0;
    color: #828282;
    font-size: 16px;
    line-height: 20px;

    a {
      font-size: 16px;
      line-height: 16px;
      color: #828282;
      letter-spacing: 0.05em;

      &.active {
        color: #000;
      }
    }

    span {
      margin: 0 15px;
    }
  }

  &__title {
    font-size: 36px;
    font-weight: 600;
    line-height: 48px;
  }

  &__display {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 50px;
    margin-bottom: 100px;
  }

  &__filters {
    display: flex;
    justify-content: flex-start;
    gap: 30px;
    margin: 60px 0;
  }
}

@media (max-width: 1024px) {
  .catalogue__display {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .catalogue__filters {
    flex-direction: column;
    width: 100%;
  }

  .catalogue__display {
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
}
</style>
