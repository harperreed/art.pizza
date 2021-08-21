<template>
  <div class="container lg:container-lg mx-auto">
    <Navbar />

    <!-- Portfolio -->
    <div class="p-5 py-4">
      <slot />
    </div>

    <Footer />
  </div>
</template>

<script>
import {
  mapGetters,
} from 'vuex';
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
    ...mapGetters(['splashy']),
  },
  created() {

  },
};
</script>
<style>

</style>
