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
      placeholder="address (optional)"
    ></div>
    <hr>
    <line-item
      v-for="(o, i) in about.others" :key="i"
      :value="about.others[i]" :index="i"
      @input="updateAboutLineItems"
      :placeholder="'other'"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { mapMutations } from "vuex";

import LineItem from "~/components/input/LineItem.vue";

export default {
  props: ["about"],
  components: { LineItem },
  methods: mapMutations(["updateAboutLineItems"])
};
</script>

<style lang="scss" scoped>
input {
  margin-top: 2px;
  margin-bottom: 2px;
}
</style>
