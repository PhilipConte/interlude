<template>
  <div class="box">
    <div class="level">
      <div class="level-left"><div class="level-item">
        <h1 class="subtitle">{{ element.title }}</h1>
      </div></div>

      <div class="level-right"><div class="level-item">
        <string-modal label='edit title' color='is-info' v-on:return="updateTitle"/>
      </div></div>
    </div>
    <hr>
    
  </div>
</template>

<script>
import StringModal from '~/components/general/modals/StringModal.vue';

export default {
  components: {
    StringModal
  },
  props: ['element'],
  data() {
    return {
    };
  },
  methods: {
    updateTitle(newTitle) {
      this.element.title = newTitle;
    },
  },
}
</script>
