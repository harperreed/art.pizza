<template>
  <div v-if="assets">
    <h1 class="title is-4">
      Awesome NFTs
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
import web3 from '@/mixins/web3';

import assets from '@/assets.json';

console.log(assets);
export default {
  components: {
    AssetCard,
  },

  mixins: [web3],
  data() {
    return {
      assets: assets.assets,

    };
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
