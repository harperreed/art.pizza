<template>
  <div v-if="assets">
    <h1 class="text-3xl my-4">
      {{ title }}
    </h1>
    <Assets
      v-if="assets"
      :assets="assets"
    />
    <div v-else>
      loading
    </div>
  </div>
</template>

<script>

import Assets from '@/components/Utils/Assets.vue';

import nfts from '@/mixins/nfts';

import excitingNFTs from '@/exciting_nfts.json';

export default {
  components: {
    Assets,
  },

  mixins: [nfts],
  props: {
    num: {
      type: Number,
      default: 9,
    },
    title: {
      type: String,
      default: 'Awesome NFTs!',
    },
  },
  data() {
    return {
      assets: [],
    };
  },
  async created() {
    console.log(excitingNFTs);
    let currentIndex = excitingNFTs.length; let
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      [excitingNFTs[currentIndex], excitingNFTs[randomIndex]] = [
        excitingNFTs[randomIndex], excitingNFTs[currentIndex]];
    }

    this.assets = await this.getExcitingAssets(excitingNFTs.slice(0, 10));
  },
  // computed: {
  //   assets() {
  //     const assets = this.getExcitingAssets(excitingNFTs);
  //     return assets;

  //     // eslint-disable-next-line no-plusplus
  //     // for (let i = excitingNFTs.length - 1; i > 0; i--) {
  //     //   const j = Math.floor(Math.random() * (i + 1));
  //     //   [excitingNFTs[i], excitingNFTs[j]] = [excitingNFTs[j], excitingNFTs[i]];
  //     // }
  //     // return excitingNFTs.slice(0, this.num);
  //   },
  // },

};
</script>

<style>
/* Card start*/
.card {

  margin-bottom: 30px;
}

.card.large {
  border-radius: 5px;
}

.title.no-padding {
  margin-bottom: 0 !important;
}
</style>
