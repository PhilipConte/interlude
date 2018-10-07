<template>
  <div class="panel">
    <p class="panel-heading">{{ element.title }}</p>

    <div class="panel-block">
      <div class="level">
        <div class="level-left"><div class="level-item">
          <div class="control"><input
            type="text" class="input"
            v-model="element.subTitle"
            placeholder="subtitle (optional)"
          ></div>
        </div></div>

        <div class="level-right"><div class="level-item right-align">
            <div class="control"><input
              type="text" class="input"
              v-model="element.Location"
              placeholder="Location (optional)"
            ></div>
            <div class="control"><input
              type="text" class="input"
              v-model="element.date"
              placeholder="Date(s) (optional)"
            ></div>
          </div></div>
      </div>
    </div>

    <div class="panel-block">
      <div class="level"><div class="level-left">
        <div class="level-item">
          <button
            class="button is-danger"
            @click="removeElement({section: section, element: element})"
          >
            delete
          </button>
        </div>
        <div class="level-item">
          <string-modal
            label='edit title' color='is-info'
            v-on:return="element.title = $event"
          />
        </div>
      </div></div>
    </div>

    <div class="panel-block" v-for="(li, index) in element.lineItems" :key="index">
      <line-item
        :value="element.lineItems[index]" :index="index"
        :placeholder="'line-item'"
        @input="updateLi($event)"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapMutations } from "vuex";

import StringModal from "~/components/general/modals/StringModal.vue";
import LineItem from "~/components/input/LineItem.vue";

export default {
  components: {
    StringModal,
    LineItem
  },
  props: ["section", "element"],
  methods: {
    ...mapMutations(["removeElement", "updateElementLineItems"]),
    updateLi(o) {
      this.updateElementLineItems({ list: this.element.lineItems, ...o });
    }
  }
};
</script>

<style lang="scss" scoped>
.right-align {
  display: flex;
  flex-direction: column;
}
input {
  margin-top: 2px;
  margin-bottom: 2px;
}
.level {
  width: 100%;
}
</style>
