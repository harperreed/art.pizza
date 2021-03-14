<template>
  <div v-if="assets">
    <h1 class="title is-4">
      {{ title }}
    </h1>
    <div
      v-for="address in addresses"
      :key="address.address"
    >
      <AddressBox
        :eth-address="address.address"
      />
      <div class="block" />
    </div>
  </div>
</template>

<script>

import AddressBox from '@/components/Utils/AddressBox.vue';

import web3 from '@/mixins/web3';

import excitingAddresses from '@/exciting_addresses.json';

export default {
  components: {
    AddressBox,
  },

  mixins: [web3],
  props: {
    num: {
      type: Number,
      default: 9,
    },
    title: {
      type: String,
      default: 'Fun Addresses to check out!',
    },
  },
  data() {
    return {
      assets: [],
    };
  },
  computed: {
    addresses() {
      return excitingAddresses;
    },
  },
  async created() {
    console.log('Asd');
    console.log(excitingAddresses);
    // this.assets = await this.getExcitingAssets(excitingNFTs);
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
