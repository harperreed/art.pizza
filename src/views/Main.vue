<template>
  <BaseLayout>
    <h1 class="title is-3">
      Hi. Let's look at art!
    </h1>
    <MainSearch />

    <hr>
    <ExcitingNFTs />
    <hr>

    <About />
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import MainSearch from '@/components/Utils/MainSearch.vue';
import ExcitingNFTs from '@/components/Utils/ExcitingNFTs.vue';
import About from '@/components/Utils/About.vue';

// import assets from '@/assets.json';

export default {
  components: {
    BaseLayout,
    MainSearch,
    ExcitingNFTs,
    About,
  },

  title: 'Hi',

  // data() {
  //   return {
  //     assets: assets.assets,
  //   };
  // },
};
</script>

<style></style>
