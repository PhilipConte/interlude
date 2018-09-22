<template>
  <div class="box">
      <div class="level">
        <div class="level-left"><div class="level-item">
          <h1 class="subtitle">{{ section.name }}</h1>
        </div></div>

        <div class="level-right">
          <div class="level-item">
            <string-modal
              label='edit name'
              color='is-info'
              v-on:return="section.name = $event"
            />
          </div>
          <div class="level-item">
            <string-modal label='add an element' v-on:return="createElement"/>
          </div>
        </div>
      </div>

      <hr>

        <template v-if="section.elements.length">
          <draggable
            v-model="section.elements" @start="drag=true" @end="drag=false"
          >
            <element-form v-for="element in section.elements" :key="element.title"
              :element="element"
            />
          </draggable>
        </template>
        <p v-else align="center">create your first element ↑</p>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import StringModal from "~/components/general/modals/StringModal.vue";
import ElementForm from "~/components/input/ElementForm.vue";

export default {
  components: {
    draggable,
    StringModal,
    ElementForm
  },
  props: ["section"],
  data() {
    return {};
  },
  methods: {
    createElement(element) {
      this.section.elements.push({
        title: element,
        subTitle: "",
        location: "",
        date: "",
        lineItems: [""]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
li {
  margin: 10px 0;
}
</style>
