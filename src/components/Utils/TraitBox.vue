<template>
  <div>
    <div class="flex flex-wrap mb-4">
      <div
        v-for="trait in traits"
        :key="trait.trait_type"
      >
        <div class="flex  text-xs items-center px-2 my-2">
          <div class="bg-gray-700 text-gray-200 px-2 py-1 rounded-l-md">
            {{ trait.trait_type }}
          </div>
          <div class="bg-blue-200 text-blue-700 px-2 py-1 rounded-r">
            {{ trait.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import web3 from '@/mixins/web3';

export default {
  components: {},
  mixins: [web3],
  props: {
    traits: {
      type: Object,
      default() {},
    },

  },

};
</script>

<style scoped>
.stat{
@apply flex-1 border mx-2 my-2 rounded-lg shadow-lg;
}

.top{
@apply text-3xl mx-auto  w-auto p-4 text-center
}

.bottom{
  @apply text-xs mx-auto bg-gray-200   w-auto py-4 text-center
}

</style>
