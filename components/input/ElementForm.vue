<template>
  <div class="box">
    <div class="level">
      <div class="level-left"><div class="level-item">
        <h1 class="subtitle">{{ element.title }}</h1>
      </div></div>

      <div class="level-right">
        <div class="level-item">
          <string-modal label='edit title' color='is-info' v-on:return="element.title = $event"/>
        </div>
        <div class="level-item right-align">
            <div class="control">
              <input
                type="text" class="input"
                v-model="element.Location"
                placeholder="Location (optional)"
              >
            </div>
            <div class="control">
              <input
                type="text" class="input"
                v-model="element.date"
                placeholder="Date(s) (optional)"
              >
            </div>
        </div>
      </div>
    </div>
    <hr>

    <div class="control">
      <input
        type="text" class="input two-thirds"
        v-model="element.subTitle"
        placeholder="subtitle (optional)"
      >
    </div>
    <div class="columns"><div class="column">
      <line-item
        v-for="(li, index) in element.lineItems"
        v-bind:value="element.lineItems[index]" :key="index" :index="index"
        v-on:input="updateLi($event)"
      />
    </div></div>
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
    updateLi: function(o) {
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
.two-thirds {
  max-width: 75%;
}
.right-align {
  display: flex;
  flex-direction: column;
}
input {
  margin-top: 2px;
  margin-bottom: 2px;
}
</style>
