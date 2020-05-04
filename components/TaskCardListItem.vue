<template>
  <li class="flex bg-gray-200 w-full h-auto p-3 rounded-lg">
    <div class="flex-1">
      <div class="flex justify-between items-center bg-white rounded-lg h-full">
        <p class="flex-1 text-center font-sans text-2xl">{{ task.title }}</p>
        <p>{{ timeTakenText }}</p>
        <TButtonBase @click.native="finish">😋</TButtonBase>
        <TButtonBase @click.native="clickStart">🍅</TButtonBase>
      </div>
    </div>
  </li>
</template>
<script lang="ts">
import TButtonBase from "~/components/TButtonBase.vue";
import { Task } from "~/components/TaskCard.vue";
import Vue, { PropType } from "vue";
import { Utils } from "~/utils/utils";

export default Vue.extend({
  name: "TaskListItem",
  components: { TButtonBase },
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
  computed: {
    timeTakenText(): string {
      return Utils.secToText(this.task.timeTakenSec);
    },
  },
  methods: {
    clickStart(): void {
      this.$emit("start", this.task);
    },
    finish(): void {
      this.$emit("finish", this.task);
    },
  },
});
</script>
<style lang="css"></style>
