<template>
  <BaseLayout>
    <h1 class="title">
      {{ asset.name }}
    </h1>
    <!-- <pre>
      {{ asset }}
      </pre> -->

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
          <div class="field is-grouped is-grouped-multiline is-pulled-right">
            <div
              v-for="trait in asset.traits"
              :key="trait.trait_type"
              class="control"
            >
              <div class="tags has-addons">
                <span class="tag is-dark">{{ trait.trait_type }}</span>
                <span class="tag is-info">{{ trait.value }}</span>
              </div>
            </div>
          </div>

          <p class="block">
            {{ asset.description }}
          </p>

          {{ asset.created_date | moment("dddd, MMMM Do YYYY") }}
          <a
            v-if="asset.external_link"
            :href="asset.external_link"
            target="_blank"
          > External Link <b-icon
            icon="open-in-new"
            size="is-small"
          />
          </a>
          <a
            v-if="asset.permalink"
            :href="asset.permalink"
            target="_blank"
          > Opensea <b-icon
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

    <div
      v-if="ethAddress"
      class="block"
    >
      <h1 class="title is-5">
        Owned by:
      </h1>

      <AddressBox
        :eth-address="ethAddress"
      />
    </div>

    <div
      v-if="asset.top_ownerships"
      class="block"
    >
      <h1 class="title is-5">
        Top Owners:
      </h1>
      <div
        v-for="owner in asset.top_ownerships"
        :key="owner.owner.address"
      >
        <AddressBox
          :eth-address="owner.owner.address"
        /> <br>
      </div>
    </div>

    <div
      v-if="asset.last_sale"
      class="block"
    >
      <h1 class="title is-5">
        Last sale by:
      </h1>

      <AddressBox
        :eth-address="asset.last_sale.transaction.from_account.address"
      />
    </div>

    <div
      v-if="asset.creator"
      class="block"
    >
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

  computed: {
    edition() {
      const index = this.asset.traits.findIndex((p) => p.trait_type === 'edition number');
      return this.asset.traits[index];
    },
    initialPrice() {
      const index = this.asset.traits.findIndex((p) => p.trait_type === 'initial price');
      return this.asset.traits[index];
    },
    royalty() {
      const index = this.asset.traits.findIndex((p) => p.trait_type === 'royalty percentage');
      return this.asset.traits[index];
    },

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
    this.asset.collection.payment_tokens = [];
    if (asset.owner.address !== '0x0000000000000000000000000000000000000000') {
      this.ethAddress = asset.owner.address;
    }

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