<template>
<div class="control">
  <input
  type="text" class="input two-thirds"
  placeholder="line-item (optional)"
  v-bind="$attrs"
  v-bind:value="value"
  v-on="inputListeners"
></div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ["value", "index"],
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
  max-width: 75%;
  margin-top: 2px;
  margin-bottom: 2px;
}
</style>
