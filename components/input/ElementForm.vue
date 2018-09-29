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
            @click="$emit('remElement', element)"
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
        @input="updateLi($event)" :placeholder="'line-item'"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import StringModal from "~/components/general/modals/StringModal.vue";
import LineItem from "~/components/input/LineItem.vue";

export default {
  components: {
    StringModal,
    LineItem
  },
  props: ["element"],
  data() {
    return {};
  },
  methods: {
    updateLi(o) {
      Vue.set(this.element.lineItems, o.index, o.value);

      let numEmpties = this.element.lineItems.filter(i => !i.length).length;
      if (!o.value.length && numEmpties > 1) {
        Vue.delete(this.element.lineItems, o.index);
      } else if (numEmpties == 0) {
        this.element.lineItems.push("");
      }
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
