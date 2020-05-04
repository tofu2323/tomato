<template>
  <div class="bg-pink-100 min-h-screen relative block">
    <nav>
      <TContainer>
        <h1
          class="flex-1 font-sans font-thin text-center text-6xl text-gray-900"
        >
          <a href="/">
            🍅Tomato🍅
          </a>
        </h1>
      </TContainer>
    </nav>
    <main>
      <nuxt />
    </main>
    <footer></footer>
  </div>
</template>

<style></style>
<script>
import TContainer from "../components/TContainer";

export default {
  components: { TContainer },
};
</script>
