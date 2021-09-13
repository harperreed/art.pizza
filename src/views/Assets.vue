<template>
  <BaseLayout>
    <div v-if="ethAddress">
      <h1 class="text-3xl mb-4">
        Assets for <strong><span class="bg-yellow-100 dark:bg-gray-200 dark:text-black px-2">{{ niceName }}</span></strong>
      </h1>
      <AddressBox
        :eth-address="ethAddress"
      />
      <Assets :assets="assets" />
      <NameAssets :assets="nameAssets" />
    </div>
    <div
      v-if="loadingAssets"
    >
      <h1
        v-if="!notFound"
        class="text-3xl my-4 animate-pulse"
      >
        loading assets for <span class="bg-yellow-100">{{ niceName }}</span> !
      </h1>
      <Loader />
    </div>
    <div v-if="notFound">
      <h1

        class="text-3xl my-4"
      >
        Nothing found for <span class="bg-yellow-100">{{ niceName }}</span> !
      </h1>
      <h1 class="text-2xl my-4">
        Invalid ethereum address or ENS name
      </h1>
      <h1 class="text-2xl my-4">
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
import Loader from '@/components/Utils/Loader.vue';

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
    Loader,
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
    loadingAssets() {
      if (this.assets === undefined && this.nameAssets === undefined) {
        return true;
      }
      return false;
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
