<template>
  <ProductItem
    v-for="product in filteredProducts"
    :key="product.id"
    :product="product"
  />
</template>

<script>
import { mapGetters } from "vuex";
import ProductItem from "@/components/ProductItem.vue";
export default {
  name: "ProductsDisplay",
  components: {
    ProductItem,
  },
  computed: {
    ...mapGetters(["filteredProducts"]),
  },
};
</script>
