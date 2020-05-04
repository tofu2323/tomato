<template>
  <div class="bg-pink-200 w-full h-auto p-3 rounded-lg">
    <div class="flex">
      <div class="flex-1">
        <div
          class="flex justify-between items-center bg-white rounded-lg h-full"
        >
          <p class="flex-1 text-center font-sans text-2xl">{{ task.title }}</p>
          <TButtonBase @click.native="finish">😋</TButtonBase>
          <TButtonBase @click.native="stop">🍅</TButtonBase>
        </div>
      </div>
    </div>
    <div class="w-full mt-3">
      <div class="mx-auto text-center text-2xl bg-white rounded-lg">
        ⏰👩‍🍳 {{ timeTakenText }} 👨‍🍳⏰
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import THeading2 from "~/components/THeading2.vue";
import Vue, { PropType } from "vue";
import { Task } from "~/components/TaskCard.vue";
import TButtonBase from "~/components/TButtonBase.vue";
import { Utils } from "~/utils/utils";

export default Vue.extend({
  name: "TaskCardCurrentTask",
  components: { TButtonBase, THeading2 },
  data: () => ({
    totalSeconds: 0,
    __interval: null as NodeJS.Timeout | null,
  }),
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
  methods: {
    stopInterval(): void {
      if (!this.__interval) {
        return;
      }
      clearInterval(this.__interval);
      this.__interval = null;
    },
    startCount(initialSeconds: number): void {
      this.stopInterval();
      this.totalSeconds = initialSeconds;
      this.__interval = setInterval(() => {
        ++this.totalSeconds;
      }, 1000);
    },
    finish(): void {
      this.stopInterval();
      this.$emit("finish");
    },
    stop(): void {
      this.stopInterval();
      this.$emit("stop");
    },
  },
  computed: {
    timeTakenText(): string {
      return Utils.secToText(this.totalSeconds);
    },
  },
  watch: {
    task(): void {
      this.startCount(this.task.timeTakenSec);
    },
  },
  mounted(): void {
    this.startCount(this.task.timeTakenSec);
  },
  beforeDestroy(): void {
    this.stopInterval();
  },
});
</script>
