<template>
  <div class="bg-pink-100 h-screen">
    <main>
      <div class="mx-auto w-auto text-center">
        <p>{{ statusCode }}</p>
        <p>{{ message }}</p>
      </div>
    </main>
  </div>
</template>

<style></style>
<script>
import TContainer from "../components/TContainer";

export default {
  components: { TContainer },
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500;
    },
    message() {
      return (
        {
          404: "ページが見つかりませんでした",
        }[this.statusCode] || "Error"
      );
    },
  },
  head() {
    return {
      title: this.message,
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
        },
      ],
    };
  },
};
</script>
