<template>
  <BaseLayout>
    <div v-if="ethAddress">
      <h1 class="title">
        Assets for <strong><span class="has-background-warning-light">{{ niceName }}</span></strong>
      </h1>
      <AddressBox
        :eth-address="ethAddress"
      />
      <Assets :assets="assets" />
      <NameAssets :assets="nameAssets" />
    </div>
    <div v-else>
      <h1
        v-if="!notFound"
        class="title is-3"
      >
        loading assets for <span class="has-background-warning-light">{{ niceName }}</span> !
      </h1>
    </div>
    <div v-if="notFound">
      <h1

        class="title is-3"
      >
        Nothing found for <span class="has-background-warning-light">{{ niceName }}</span> !
      </h1>
      <h1 class="title is-5">
        Invalid ethereum address or ENS name
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

import MainSearch from '@/components/Utils/MainSearch.vue';
import AddressBox from '@/components/Utils/AddressBox.vue';
import Assets from '@/components/Utils/Assets.vue';
import NameAssets from '@/components/Utils/NameAssets.vue';

import ExcitingNFTs from '@/components/Utils/ExcitingNFTs.vue';
import web3 from '@/mixins/web3';
import nfts from '@/mixins/nfts';

export default {
  components: {
    BaseLayout,
    AddressBox,
    Assets,
    NameAssets,
    MainSearch,
    ExcitingNFTs,
  },

  mixins: [web3, nfts],
  data() {
    return {
      assets: undefined,
      ethAddress: undefined,
      notFound: false,
    };
  },
  computed: {
    niceName() {
      const { ethRoute } = this.$route.params;
      if (this.ensName) {
        return this.ensName;
      }
      console.log(this.ethAddress);
      if (this.ethAddress) {
        const length = 10;
        const part1 = this.ethAddress.substring(0, length);
        const part2 = this.ethAddress.substring(this.ethAddress.length - length, this.ethAddress.length);
        return `${part1}...${part2}`;
      }
      return ethRoute;
    },

  },

  async created() {
    const { ethRoute } = this.$route.params;

    let ethAddress;
    if (ethRoute.includes('eth')) {
      console.log('probably a name');
      this.ensName = ethRoute;
      ethAddress = await this.ensResolve(ethRoute);
      this.pageTitle = `NFTs for ${this.ensName}`;
    } else {
      ethAddress = ethRoute;
    }
    if (ethAddress && this.isAddress(ethAddress)) {
      this.ethAddress = ethAddress;
      this.getAssets(this.ethAddress);
    } else {
      console.log('nope');
      this.ethAddress = undefined;
      this.assets = undefined;
      this.notFound = true;
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
