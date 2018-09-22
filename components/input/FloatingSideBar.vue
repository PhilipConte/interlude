<template>
  <section class="section" id="results">
    <div class="box">
      <button class="button is-primary" @click="$emit('sendresume')">
        Continue
      </button>
    </div>
    <div class="box">
      <string-modal label='add a section' v-on:return="createSection"/>
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
import StringModal from '~/components/general/modals/StringModal.vue';

export default {
  components: {
    StringModal,
  },
  props: ['sections'],
  methods: {
    createSection(newSection) {
      this.$emit('createSection', newSection)
    },
  }
}
</script>

<style lang="scss" scoped>
section {
  position: fixed;
  right: 0;
  top: 10%;
}
</style>
