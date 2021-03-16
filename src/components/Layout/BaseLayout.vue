<template>
  <div>
    <Navbar />

    <!-- Portfolio -->
    <section class="section">
      <div class="container">
        <slot />
      </div>
    </section>

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
