<template>
  <BaseLayout>
    <div v-if="ethAddress">
      <h1 class="title">
        Assets for <strong><span class="has-background-warning-light">{{ niceName }}</span></strong>
      </h1>
      <AddressBox
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
    </div>
    <div v-else>
      <h1 class="title is-3">
        No assets found for <span class="has-background-warning-light">{{ niceName }}</span> !
      </h1>
      <h1 class="title is-4">
        Try again?
      </h1>
      <MainSearch class="block" />

      <ExcitingNFTs
        :num="3"
        title="Or click on one of these..."
      />
    </div>
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import AssetCard from '@/components/Utils/AssetCard.vue';
import MainSearch from '@/components/Utils/MainSearch.vue';
import AddressBox from '@/components/Utils/AddressBox.vue';

import ExcitingNFTs from '@/components/Utils/ExcitingNFTs.vue';
import ens from '@/mixins/ens';
import nfts from '@/mixins/nfts';

export default {
  components: {
    BaseLayout,
    AddressBox,
    AssetCard,
    MainSearch,
    ExcitingNFTs,
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
    console.log('Asd');
    console.log(this.$route.params);
    const { ethRoute } = this.$route.params;
    console.log(ethRoute);
    let ethAddress;
    if (ethRoute.includes('eth')) {
      console.log('probably a name');
      this.ensName = ethRoute;
      ethAddress = await this.ensResolve(ethRoute);
    } else {
      ethAddress = ethRoute;
    }
    if (ethAddress) {
      this.ethAddress = ethAddress;
      this.getAssets(this.ethAddress);
    } else {
      console.log('nope');
      this.ethAddress = undefined;
      this.assets = undefined;
      // this.$router.push('/');
    }
  },

  title() {
    if ('ethRoute' in this.$route.params) {
      return `NFTs for ${this.$route.params.ethRoute}`;
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
