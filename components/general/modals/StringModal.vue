<template>
  <div>
    <div class="modal" :class="{'is-active': active}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <form
            v-on:submit.prevent="$validator.validateAll(); doSubmit();"
          >
            <div class="field">
              <label class="label">{{ label }}</label>
              <div class="control">
                <input
                  name="text"
                  v-model="text"
                  v-validate="'required|min:1'"
                  v-bind:class="{'is-danger': errors.has('text')}"
                  class="input"
                  type="text"
                  placeholder="your text here..."
                >
              </div>
              <p class="help is-danger" v-show="errors.has('text')">
                {{ errors.first('text') }}
              </p>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button v-bind:disabled="errors.any()" class="button is-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="active = false"
      >
      </button>
    </div>
    <button
      class="button"
      :class="color"
      @click="active = true"
    >
      {{ label }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    'label': {},
    'color': { default: 'is-primary' },
  },
  data() {
    return {
      active: false,
      text: "",
    };
  },
  methods: {
    doSubmit() {
      this.$emit('return', this.text);
      this.active = false;
      this.text = "";
    },
  },
}
</script>
