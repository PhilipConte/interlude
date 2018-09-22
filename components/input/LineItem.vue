<template>
<div class="control">
  <input
  type="text" class="input"
  :placeholder="placeholder +' (optional)'"
  v-bind="$attrs"
  v-bind:value="value"
  v-on="inputListeners"
></div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ["value", "index", "placeholder",],
  computed: {
    inputListeners() {
      var vm = this;
      return Object.assign({}, this.$listeners, {
        input(event) {
          vm.$emit("input", { value: event.target.value, index: vm.index });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
input {
  margin-top: 2px;
  margin-bottom: 2px;
}
</style>
