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
        <floating-side-bar
          :sections="sections"
          v-on:createSection="createSection"
          v-on:sendresume="sendresume"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StringModal from '~/components/general/modals/StringModal.vue';

import SectionFormList from '~/components/input/SectionFormList.vue';
import FloatingSideBar from '~/components/input/FloatingSideBar.vue';

import {} from '~/assets/js/templateFilter.js'

export default {
  components: {
    StringModal,
    SectionFormList,
    FloatingSideBar,
  },
  data() {
    return {
      sections: [],
    };
  },
  methods: {
    createSection(newSection) {
      this.sections.push({ name: newSection, elements: [] });
    },
    sendresume() {
      return
    }
  },
};
</script>
