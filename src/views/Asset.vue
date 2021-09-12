<template>
  <BaseLayout>
    <div v-if="asset">
      <h1 class="text-3xl my-4">
        {{ asset.name }}
      </h1>
      <!-- <pre>
      {{ asset }}
      </pre> -->

      <AssetMedia :asset="asset" />
      <TraitBox :traits="asset.traits" />

      <h1
        v-if="asset.description"
        class="subhead"
      >
        Description:
      </h1>
      <p
        v-if="asset.description"
        class="block py-2"
      >
        {{ asset.description }}
      </p>

      <h1
        v-if="asset.asset_contract.description"
        class="subhead"
      >
        Contract Description:
      </h1>
      <p v-if="asset.asset_contract.description">
        {{ asset.asset_contract.description }}
      </p>

      <h1
        v-if="asset.asset_contract.description"
        class="subhead"
      >
        Stats:
      </h1>
      <StatsBox
        v-if="asset"
        :stats="asset.collection.stats"
      />

      <h1 class="subhead">
        Links:
      </h1>
      <div class="flex sm:ml-auto  w-full justify-start ">
        <a
          v-if="asset.asset_contract.external_link"
          :href="asset.asset_contract.external_link"
          target="_blank"
          class=" text-gray-500 mr-4"
        > External Link</a>
        <a
          v-if="raribleLink"
          :href="raribleLink"
          target="_blank"
          class=" text-gray-500 mr-4"
        > Rarible</a>
        <a
          v-if="asset.permalink"
          :href="asset.permalink"
          target="_blank"
          class=" text-gray-500 mr-4"
        > Opensea</a>
        <a
          v-if="etherscanLink"
          :href="etherscanLink"
          target="_blank"
          class=" text-gray-500 mr-4"
        > Etherscan</a>
      </div>

      <h1 class="subhead">
        Contract:
      </h1>
      <ContractBox
        v-if="asset"
        :contract="asset.asset_contract"
      />

      <div
        v-if="ethAddress"
      >
        <h1 class="subhead">
          Owned by:
        </h1>

        <AddressBox
          :eth-address="ethAddress"
        />
      </div>

      <div
        v-if="asset.top_ownerships"
      >
        <h1 class="subhead">
          Top Owners:
        </h1>
        <div
          v-for="owner in asset.top_ownerships"
          :key="owner.owner.address"
        >
          <AddressBox
            :eth-address="owner.owner.address"
          />
        </div>
      </div>

      <div
        v-if="asset.last_sale"
      >
        <h1 class="subhead">
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
        <h1 class="subhead">
          Created by:
        </h1>

        <AddressBox

          :eth-address="asset.creator.address"
        />
      </div>
    </div>
  </BaseLayout>
</template>

<script>

import ContractBox from '@/components/Utils/ContractBox.vue';
import AddressBox from '@/components/Utils/AddressBox.vue';
import StatsBox from '@/components/Utils/StatsBox.vue';
import TraitBox from '@/components/Utils/TraitBox.vue';
import AssetMedia from '@/components/Utils/AssetMedia.vue';
import BaseLayout from '@/components/Layout/BaseLayout.vue';

import nfts from '@/mixins/nfts';

export default {
  components: {
    BaseLayout,
    AddressBox,
    ContractBox,
    StatsBox,
    TraitBox,
    AssetMedia,
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
    raribleLink() {
      return `https://rarible.com/token/${this.asset.asset_contract.address}:${this.asset.token_id}?tab=details`;
    },
    etherscanLink() {
      return `https://etherscan.io/token/${this.asset.asset_contract.address}?a=${this.asset.token_id}`;
    },

  },
  title() {
    if (this.asset) {
      return `${this.asset.name}`;
    }
    return 'loading asset...';
  },

  async created() {
    const { contractAddress, tokenId } = this.$route.params;

    const asset = await this.getAsset(contractAddress, tokenId);
    console.log(asset);
    this.asset = asset;
    this.asset.collection.payment_tokens = [];
    if (asset.owner.address !== '0x0000000000000000000000000000000000000000') {
      this.ethAddress = asset.owner.address;
    }
    if (this.asset) {
      this.pageTitle = `${this.asset.name}`;
    }
  },

};
</script>

<style>
 .subhead{
   @apply text-xl my-2 font-semibold;
 }
</style>
