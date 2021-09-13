<template>
  <div class="container max-w-screen-lg mx-auto dark:text-white dark:bg-black">
    <Navbar />

    <!-- Portfolio -->
    <div class="p-5 py-4">
      <slot />
    </div>

    <Footer />
  </div>
</template>

<script>

import Navbar from '@/components/Layout/Navbar.vue';
import Footer from '@/components/Layout/Footer.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  computed: {

  },
  created() {

  },
};
</script>
<style>

body{
  @apply bg-white dark:bg-black;

}
</style>
