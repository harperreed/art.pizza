<template>
  <BaseLayout>
    <div>
      <h3 class="text-3xl mb-4">
        Art.Pizza
      </h3>
      <h3 class="text-2xl mb-4">
        Hi. Let's look at some NFTs!
      </h3>
    </div>
    <br>

    <MainSearch />

    <ExcitingNFTs />

    <ExcitingAddresses />

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
