<template>
  <div class="product-item">
    <span class="product-item__sale" v-if="product.price.old_price"
      >Скидка</span
    >
    <div class="product-item__img-container">
      <img
        :src="require(`@/assets/${product.image.url}`)"
        alt="{{ product.name }}"
      />
    </div>
    <div class="product-item__info-container">
      <div class="product-item__info-container__upper">
        {{ product.code || " " }}
      </div>

      <div class="product-item__info-container__middle">{{ product.name }}</div>
      <div class="product-item__info-container__lower">
        <div class="product-item__info-container__lower-left">
          <div class="product-item__price">
            <span
              v-if="product.price.old_price"
              class="product-item__price-old"
            >
              {{ Math.floor(product.price.old_price) }}₽
            </span>
            <span class="product-item__price-current"
              >{{ Math.floor(product.price.current_price) }}₽</span
            >
          </div>
        </div>
        <div class="product-item__info-container__lower-right">
          <div class="product-item__buttons">
            <button @click="toggleCart(product)">
              <img
                :src="
                  isInCart
                    ? require('@/assets/img/check-mark-checked.svg')
                    : require('@/assets/img/cart.svg')
                "
                alt="Cart"
              />
            </button>
            <button @click="toggleFavorite(product)">
              <img
                :src="
                  isFavorite
                    ? require('@/assets/img/heart-checked.svg')
                    : require('@/assets/img/heart.svg')
                "
                alt="Favorite"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: {
    product: Object,
  },
  computed: {
    ...mapState({
      cartItems: (state) => state.cart.items,
      favoriteItems: (state) => state.favorites.items,
    }),
    isInCart() {
      return this.cartItems.some((item) => item.id === this.product.id);
    },
    isFavorite() {
      return this.favoriteItems.some((item) => item.id === this.product.id);
    },
  },

  methods: {
    ...mapActions("cart", ["toggleItemInCart"]),
    ...mapActions("favorites", ["toggleItemInFavorites"]),
    toggleCart(product) {
      this.$store.dispatch("cart/toggleItemInCart", product);
    },
    toggleFavorite(product) {
      this.$store.dispatch("favorites/toggleItemInFavorites", product);
    },
  },
};
</script>

<style lang="scss">
.product-item {
  position: relative;
  box-shadow: 0 1px 1px rgba(113, 113, 113, 0.1);

  max-width: 100%;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #eeeeee;

  @media (min-width: 1025px) {
    flex: 0 1 calc(25% - 20px);
  }

  @media (max-width: 1024px) {
    flex: 0 1 calc(33.333% - 20px);
  }

  @media (max-width: 768px) {
    flex: 0 1 calc(50% - 20px);
  }

  @media (max-width: 480px) {
    flex: 0 1 100%;
  }

  &__sale {
    width: 81px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    background-color: #ff0000;
    color: white;
    font-size: 14px;
    font-weight: 700;
    position: absolute;
    top: 10px;
    left: 0;
  }

  &__img-container {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-width: 80%;
      height: auto;
    }
  }

  &__info-container {
    padding: 0 10px;

    &__upper,
    &__middle {
      padding-bottom: 10px;
      min-height: 20px;
    }
    &__upper {
      color: #888888;
    }

    &__lower {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &-left {
        & .product-item__price {
          &-old {
            text-decoration: line-through;
            color: #888888;
          }

          &-current {
            font-weight: bold;
            margin-left: 5px;
          }
        }
      }

      &-right {
        .product-item__buttons {
          button {
            background: none;
            border: none;
            cursor: pointer;

            img {
              width: 24px;
              height: 24px;
            }
          }
        }
      }
    }
  }
}
</style>
