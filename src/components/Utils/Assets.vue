<template>
  <div
    v-if="assets"
    class="md:masonry md:before:box-inherit md:after:box-inherit mb-8"
  >
    <div
      v-for="card in assets"
      :key="card.id"
      class="md:break-inside"
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
