<template>
  <div>
    <ul v-if="sections.length">
      <li v-for="section in sections" :key="section.name">
        <section-form :section="section"/>
      </li>
    </ul>
    <p v-else>create your first section →</p>
  </div>
</template>

<script>
import SectionForm from '~/components/input/SectionForm.vue'

export default {
  components: {
    SectionForm,
  },
  props: ['sections'],
  data() {
    return {
    };
  },
  methods: {
  },
}
</script>

