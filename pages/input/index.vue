<template>
  <div>
    <section class="hero is-info">
      <div class="hero-body"><div class="container">
        <h1 class="title is-1">interlude</h1>
        <h1 class="subtitle is-1">Input your resumé</h1>
      </div></div>
    </section>

    <div class="columns">
      <div class="column is-two-thirds">
        <section class="section">
          <section-form-list :sections="sections"/>
        </section>
      </div>

      <div class="column">
        <section class="section" id="results">
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
      </div>
    </div>
  </div>
</template>

<script>
import SectionFormList from '~/components/input/SectionFormList.vue';
import StringModal from '~/components/general/modals/StringModal.vue';

export default {
  components: {
    SectionFormList,
    StringModal
  },
  data() {
    return {
      sections: [],
      temp: '',
    };
  },
  methods: {
    createSection(section) {
      this.sections.push({ name: section, elements: [] });
    },
  },
};
</script>

<style lang="scss">
#results {
  position: fixed;
  right: 0;
  top: 10%;
}
</style>
