<template>
  <BaseLayout>
    <h1 class="title">
      {{ asset.name }}
    </h1>

    <div class="card large">
      <div class="card-image">
        <figure class="image">
          <img
            :src="asset.image_url"
            alt="Image"
          >
        </figure>
      </div>
      <div class="card-content">
        <div class="media" />
        <div class="content">
          {{ asset.description }}
          <div class="background-icon">
            <span class="icon-twitter" />
          </div>
        </div>
      </div>
    </div>

    <h1 class="title is-5">
      Owned by:
    </h1>

    <AddressBox
      :ens-data="ensData"
      :ens-name="ensName"
      :eth-address="ethAddress"
      :eth-balance="ethBalance"
    />

    <!-- <pre>
      {{ asset }}
    </pre> -->
  </BaseLayout>
</template>

<script>

import AddressBox from '@/components/Utils/AddressBox.vue';
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import ens from '@/mixins/ens';
import nfts from '@/mixins/nfts';

export default {
  components: {
    BaseLayout,
    AddressBox,
  },
  mixins: [nfts, ens],
  data() {
    return {
      asset: undefined,

    };
  },

  async created() {
    console.log('Asd');
    console.log(this.$route.params);
    const { contractAddress, tokenId } = this.$route.params;
    console.log(contractAddress);
    console.log(tokenId);
    const asset = await this.getAsset(contractAddress, tokenId);
    console.log(asset);
    this.asset = asset;
    this.ethAddress = asset.owner.address;

    // let ethAddress;
    // if (ethRoute.includes('eth')) {
    //   console.log('probably a name');
    //   this.ensName = ethRoute;
    //   ethAddress = await this.ensResolve(ethRoute);
    // } else {
    //   ethAddress = ethRoute;
    // }
    // if (ethAddress) {
    //   this.ethAddress = ethAddress;
    //   this.getAssets(this.ethAddress);
    // } else {
    //   console.log('nope');
    //   this.$router.push('/');
  // }
  },

};
</script>

<style>

</style>
