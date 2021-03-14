<template>
  <div v-if="assets">
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

export default {
  components: {
    AssetCard,
  },
  props: {
    assets: {
      type: Array,
      default() {},
    },

  },
  computed: {

  },

};
</script>
