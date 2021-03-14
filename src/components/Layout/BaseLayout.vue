<template>
  <section class="container">
    <slot name="container">
      <div class="columns is-multiline">
        <div class="column is-8 is-offset-2 register">
          <div class="columns">
            <div class="column menu">
              <Navbar />
            </div>
          </div>
          <slot name="columns">
            <div class="columns">
              <div class="column body">
                <slot />
              </div>
            </div>
          </slot>
        </div>
        <Footer />
      </div>
    </slot>
  </section>
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
  :root {
    --brandColor: hsl(166, 67%, 51%);
    --background: rgb(247, 247, 247);
    --textDark: hsla(0, 0%, 0%, 0.66);
    --textLight: hsla(0, 0%, 0%, 0.33);
  }

  body {
    background: var(--background);

    color: var(--textDark);
  }

  .field:not(:last-child) {
    margin-bottom: 1rem;
  }

  .register {
    margin-top: 2rem;
    background: white;
    border-radius: 15px;
  }

  .menu {
    padding-top: .5rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .body,
  .left,
  .right {
    padding: 2rem;
  }

</style>
