<template>
  <TButtonBase class="bg-red-500 hover:bg-red-600">
    <slot />
  </TButtonBase>
</template>
<script lang="ts">
import TButtonBase from "~/components/TButtonBase.vue";

export default {
  name: "TButtonPrimary",
  components: { TButtonBase },
};
</script>
<style lang="css"></style>
