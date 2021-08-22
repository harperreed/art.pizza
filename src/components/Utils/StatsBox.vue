<template>
  <div>
    <div class="flex flex-wrap w-full justify-center">
      <div class="stat">
        <div class="top">
          {{ stats.num_owners }}
        </div>
        <div class="bottom">
          Num Owners
        </div>
      </div>
      <div class="stat">
        <div class="top">
          {{ averatePrice }}
        </div>
        <div class="bottom">
          Average Price
        </div>
      </div>
      <div class="stat">
        <div class="top">
          {{ stats.floor_price }}
        </div>
        <div class="bottom">
          Floor Price
        </div>
      </div>
      <div class="stat">
        <div class="top">
          {{ marketCap }}
        </div>
        <div class="bottom">
          Market Cap
        </div>
      </div>
      <div class="stat">
        <div class="top">
          {{ stats.total_sales }}
        </div>
        <div class="bottom">
          Total Sales
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
    stats: {
      type: Object,
      default() {},
    },

  },
  computed: {
    averatePrice() {
      return Math.round((this.stats.average_price + Number.EPSILON) * 100) / 100;
    },
    marketCap() {
      return Math.round((this.stats.market_cap + Number.EPSILON) * 100) / 100;
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
