<template>
  <div class="flex items-center border-b border-b-2 border-teal py-2">
    <input
      class="font-sans font-thin text-2xl appearance-none bg-transparent border-none w-full text-grey-darker mr-3 py-1 px-2 leading-tight focus:outline-none"
      type="text"
      :placeholder="placeholder"
      v-model="text"
      @keypress.enter="onClick"
    />
    <TButtonPrimary @click.native="onClick">{{ buttonText }}</TButtonPrimary>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import TButtonPrimary from "~/components/TButtonPrimary.vue";

export default Vue.extend({
  name: "TInputWithButton",
  components: { TButtonPrimary },
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    buttonText: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    text: "",
  }),
  methods: {
    onClick() {
      this.$emit("click-button", this.text);
      this.text = "";
    },
  },
});
</script>
<style lang="css"></style>
