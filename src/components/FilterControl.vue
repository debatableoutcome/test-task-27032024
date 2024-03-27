<template>
  <div class="filter-control">
    <p class="filter-control__title">{{ title }}</p>
    <select
      class="filter-control__select"
      v-model="selectedValue"
      @change="onFilterChange"
    >
      <option value="0">Не выбрано</option>
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "FilterControl",
  props: {
    title: String,
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
    filterType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedValue: "0",
    };
  },
  methods: {
    onFilterChange() {
      this.$emit("filtered", {
        type: this.filterType,
        value: this.selectedValue,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.filter-control {
  width: 288px;
  height: 80px;
  &__title {
    padding-left: 12px;
    color: #4f4f4f;
  }

  &__select {
    padding-left: 10px;
    background-color: #f2f2f2;
    border: none;
    width: 100%;
    height: 40px;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
  @media (max-width: 640px) {
    width: 100%;

    &:first-child {
      margin-bottom: 20px;
    }
  }
}
</style>
