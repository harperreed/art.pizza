<template>
  <div v-if="assets">
    <h1 class="title is-4">
      {{ title }}
    </h1>
    <masonry
      :cols="{default: 3, 1000: 3, 700: 2, 400: 1}"
      :gutter="{default: '30px', 700: '15px'}"
    >
      <div
        v-for="card in assets"
        :key="card.id"
      >
        <AssetCard :asset="card" />
      </div>
    </masonry>
  </div>
</template>

<script>

import AssetCard from '@/components/Utils/AssetCard.vue';
import ens from '@/mixins/ens';
import nfts from '@/mixins/nfts';

import excitingNFTs from '@/exciting_nfts.json';

export default {
  components: {
    AssetCard,
  },

  mixins: [ens, nfts],
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
  computed: {
    assets() {
      // eslint-disable-next-line no-plusplus
      for (let i = excitingNFTs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [excitingNFTs[i], excitingNFTs[j]] = [excitingNFTs[j], excitingNFTs[i]];
      }
      return excitingNFTs.slice(0, this.num);
    },
  },

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
