<template>
<div class="control">
  <input
  type="text" class="input"
  :placeholder="placeholder +' (optional)'"
  v-bind="$attrs"
  v-bind:value="value"
  v-on="listeners"
></div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ["value", "index", "placeholder"],
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: event =>
          this.$emit("input", { value: event.target.value, index: this.index })
      };
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
