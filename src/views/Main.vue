<template>
  <BaseLayout>
    <div class="section-heading">
      <h3 class="title is-2">
        Art.Pizza
      </h3>
      <h4 class="subtitle is-5">
        Hi. Let's look at some NFTs!
      </h4>
    </div>
    <br>

    <MainSearch />
    <hr class="mx-4">

    <ExcitingNFTs />
    <hr class="mx-4">

    <ExcitingAddresses />
    <hr class="mx-4">

    <About />
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import MainSearch from '@/components/Utils/MainSearch.vue';
import ExcitingNFTs from '@/components/Utils/ExcitingNFTs.vue';
import ExcitingAddresses from '@/components/Utils/ExcitingAddresses.vue';
import About from '@/components/Utils/About.vue';

// import assets from '@/assets.json';

export default {
  components: {
    BaseLayout,
    MainSearch,
    ExcitingNFTs,
    ExcitingAddresses,
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
