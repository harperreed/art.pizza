<template>
  <BaseLayout>
    <h1 class="title">
      {{ asset.name }}
    </h1>

    <div class="card large">
      <div class="card-image">
        <router-link :to="{ name: 'Asset', params: {contractAddress:asset.asset_contract.address, tokenId:asset.token_id}}">
          <figure class="image">
            <img
              :src="asset.image_url"
              alt="Image"
            >
          </figure>
        </router-link>
      </div>
      <div class="card-content">
        <div class="media" />
        <div class="content">
          {{ asset.description }}
          <a
            :href="asset.external_link"
            target="_blank"
          > <b-icon
            icon="open-in-new"
            size="is-small"
          />
          </a>
          <a
            :href="asset.permalink"
            target="_blank"
          > <b-icon
            icon="open-in-new"
            size="is-small"
          />
          </a>
          <div class="background-icon">
            <span class="icon-twitter" />
          </div>
        </div>
      </div>
    </div>

    <ContractBox
      :contract="asset.asset_contract"
    />

    <h1 class="title is-5">
      Owned by:
    </h1>

    <AddressBox
      :eth-address="ethAddress"
    />

    <div v-if="asset.creator">
      <h1 class="title is-5">
        Created by:
      </h1>

      <AddressBox

        :eth-address="asset.creator.address"
      />
    </div>
  </BaseLayout>
</template>

<script>

import ContractBox from '@/components/Utils/ContractBox.vue';
import AddressBox from '@/components/Utils/AddressBox.vue';
import BaseLayout from '@/components/Layout/BaseLayout.vue';

import nfts from '@/mixins/nfts';

export default {
  components: {
    BaseLayout,
    AddressBox,
    ContractBox,
  },
  mixins: [nfts],
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
