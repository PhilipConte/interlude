<template>
  <div class="box">
    <div class="control"><input
      type="text" class="input"
      v-model="about.name"
      placeholder="name"
    ></div>
    <div class="control"><input
      type="text" class="input"
      v-model="about.email"
      placeholder="email (optional)"
    ></div>
    <div class="control"><input
      type="text" class="input"
      v-model="about.phone"
      placeholder="phone # (optional)"
    ></div>
    <div class="control"><input
      type="text" class="input"
      v-model="about.address"
      placeholder="address (optional"
    ></div>
    <hr>
    <line-item
      v-for="(o, i) in about.others" :key="i"
      :value="about.others[i]" :index="i"
      @input="updateOther($event)"
      :placeholder="'other'"
    />
  </div>
</template>

<script>
import Vue from "vue";

import LineItem from "~/components/input/LineItem.vue";

export default {
  props: ["about"],
  components: { LineItem },
  methods: {
    updateOther(o) {
      Vue.set(this.about.others, o.index, o.value);

      let numEmpties = this.about.others.filter(i => !i.length).length;
      if (!o.value.length && numEmpties > 1) {
        Vue.delete(this.about.others, o.index);
      } else if (numEmpties == 0) {
        this.about.others.push("");
      }
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
