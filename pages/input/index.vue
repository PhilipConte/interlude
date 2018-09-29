<template>
  <div>
    <section class="hero is-info">
      <div class="hero-body"><div class="container">
        <h1 class="title is-1">interlude</h1>
        <h1 class="subtitle is-1">input your resumé</h1>
      </div></div>
    </section>

    <div class="columns">
      <div class="column is-two-thirds">
          <h1 class="subtitle is-2">About You</h1>
          <about-you :about="resume.about"/>

          <h1 class="subtitle is-2">Your Sections</h1>
          <div>
            <draggable
              v-if="resume.sections.length"
              v-model="resume.sections" @start="drag=true" @end="drag=false"
            >
              <section-form
                v-for="section in resume.sections" :key="section.name"
                :section="section"
              />
            </draggable>
            <p v-else>create your first section →</p>
          </div>
      </div>

      <div class="column">
        <floating-side-bar
          :sections="resume.sections"
          @createSection="createSection"
          @sendresume="sendresume"
        />
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

import StringModal from "~/components/general/modals/StringModal.vue";

import SectionForm from "~/components/input/SectionForm.vue";
import AboutYou from "~/components/input/AboutYou.vue";
import FloatingSideBar from "~/components/input/FloatingSideBar.vue";

import {loadTextFile, multiTagFindAndReplace, plainTagFindAndReplace, templateDriver} from "~/assets/js/templateFilter.js";

export default {
  components: {
    draggable,
    StringModal,
    SectionForm,
    AboutYou,
    FloatingSideBar
  },
  data() {
    return {
      resume: {
        about: {
          name: "",
          email: "",
          phone: "",
          adress: "",
          others: [""]
        },
        sections: []
      }
    };
  },
  methods: {
    createSection(newSection) {
      this.resume.sections.push({ name: newSection, elements: [] });
    },
    sendresume() {
      templateDriver("../testTemplate.txt",this.resume);
      return;
    }
  }
};
</script>

<style lang="scss" scoped>
.is-two-thirds {
  padding-left: 30px;
}
</style>
