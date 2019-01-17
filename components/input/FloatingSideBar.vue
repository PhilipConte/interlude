<template>
  <section class="section" id="results">
    <div class="box">
      <button class="button is-primary" @click="sendresume">
        Continue
      </button>
    </div>
    <div class="box">
      <string-modal label='add a section' @return="addSection"/>
      <hr>
      <ul v-if="sections.length">
        <li v-for="section in sections" :key="section.name">
          {{ section.name }}
        </li>
      </ul>
      <p v-else>↑ create your first section</p>
    </div>
  </section>
</template>

<script>
import { templateDriver } from "~/assets/js/templateFiller.js";
import { mapMutations } from "vuex";
import StringModal from "~/components/general/modals/StringModal.vue";

export default {
  components: { StringModal },
  props: ["sections"],
  methods: {
    ...mapMutations(["addSection"]),
    sendresume() {
      templateDriver("../testTemplate.txt", this.$store.state.resume);
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  position: fixed;
  right: 0;
  top: 10%;
}
</style>
