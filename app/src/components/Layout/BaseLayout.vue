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
    min-height: 80vh;
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

  .left {
    border-right: 5px solid var(--background);
  }

  .left .title {
    font-weight: 800;
    letter-spacing: -2px;
  }

  .left .colored {
    color: var(--brandColor);
    font-weight: 500;
    margin-top: 1rem !important;
    letter-spacing: -1px;
  }

  .left p {
    color: var(--textLight);
    font-size: 1.15rem;
  }

  .right .title {
    font-weight: 800;
    letter-spacing: -1px;
  }

  .right .description {
    margin-top: 1rem;
    margin-bottom: 1rem !important;
    color: var(--textLight);
    font-size: 1.15rem;
  }

  .right small {
    color: var(--textLight);
  }

  input {
    font-size: 1rem;
  }

  input:focus {
    border-color: var(--brandColor) !important;
    box-shadow: 0 0 0 1px var(--brandColor) !important;
  }

  .fab,
  .fas {
    color: var(--textLight);
    margin-right: 1rem;
  }
</style>
