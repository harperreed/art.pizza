<template>
  <div>
    <img
      v-if="asset.image_url"
      :src="asset.image_url"
      class="w-full border dark:border-gray-600 rounded"
    >
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    asset: {
      type: Object,
      default() {},
    },

  },

};
</script>
