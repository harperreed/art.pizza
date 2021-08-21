<template>
  <div>
    <div
      v-if="assets"
      class="flex flex-wrap"
    >
      <div
        v-for="card in assets"
        :key="card.id"
        class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4"
      >
        <AssetCard
          v-if="card"
          :asset="card"
        />
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
