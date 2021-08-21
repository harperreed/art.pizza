<template>
  <div>
    <div
      v-if="assets"
      class="flex flex-row flex-grow flex-wrap  justify-center mx-auto mt-2"
    >
      <div
        v-for="card in assets"
        :key="card.id"
        class="sm:max-w-max md:max-w-xs lg:max-w-xs m-1 sm:m-2"
      >
        <AssetCard :asset="card" />
      </div>

      <!-- <masonry
        :cols="{default: 3, 1000: 3, 800: 2, 700: 1}"
        :gutter="{default: '30px', 700: '15px'}"
      >      </masonry> -->
    </div>
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
