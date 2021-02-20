<template>
  <BaseLayout>
    <h1 class="title">
      Assets for <strong>{{ niceName }}</strong>
    </h1>
    <AddressBox
      :ens-data="ensData"
      :ens-name="ensName"
      :eth-address="ethAddress"
    />
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
    <div v-else>
      <h2 class="is-4 title">
        Loading assets
      </h2>
      <b-skeleton />
    </div>
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import AssetCard from '@/components/Utils/AssetCard.vue';
import AddressBox from '@/components/Utils/AddressBox.vue';
import ens from '@/mixins/ens';
import nfts from '@/mixins/nfts';

export default {
  components: {
    BaseLayout,
    AddressBox,
    AssetCard,
  },

  mixins: [ens, nfts],
  data() {
    return {
      assets: undefined,

    };
  },
  computed: {
    niceName() {
      if (this.ensName) {
        return this.ensName;
      }
      console.log(this.ethAddress);
      const length = 10;
      const part1 = this.ethAddress.substring(0, length);
      const part2 = this.ethAddress.substring(this.ethAddress.length - length, this.ethAddress.length);
      return `${part1}...${part2}`;
    },

  },

  async created() {
    const { ethAddress } = this.$route.params;
    if (ethAddress.includes('eth')) {
      console.log('probably a name');
      this.ensName = ethAddress;
      this.ethAddress = await this.ensResolve(ethAddress);
    } else {
      this.ethAddress = ethAddress;
    }

    this.getAssets(this.ethAddress);
  },

  title() {
    if (this.ethAddress) {
      return `NFTs for ${this.ethAddress}`;
    }

    return 'NFTs';
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
