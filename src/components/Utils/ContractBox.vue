<template>
  <div>
    <!-- <pre>
    {{ contract }}
    </pre> -->
    <div class="flex  items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 mb-4">
      <div class="flex flex-col shadow ">
        <router-link :to="{ name: 'Contract', params: {contractAddress:contract.address}}">
          <img
            :alt="ethAddress"
            class="w-24 h-auto rounded-md"
            :src="addressAvatar"
          >
        </router-link>
      </div>
      <div
        id="body"
        class="flex flex-col ml-5"
      >
        <h4
          id="name"
          class="text-lg font-semibold "
        >
          {{ contract.name }}
        </h4>
        <span

          class="text-sm"
        >
          <router-link :to="{ name: 'Contract', params: {contractAddress:contract.address}}">{{ ethAddress }}</router-link>
          <CopyPasteButton :value="contract.address" />
        </span>

        <span
          v-if="ethBalance"
          class="text-sm"
        > {{ ethBalance }} Ether </span>

        <div class="flex sm:ml-auto sm:mt-2 mt-2 w-full justify-start ">
          <a
            v-if="contract.external_link"
            :href="contract.external_link"

            target="_blank"

            class="text-xs text-gray-500 mr-4"
          >
            External Link</a>
          <a
            v-if="addressEtherscan"
            aria-label="etherscan"
            :href="addressEtherscan"
            target="_blank"
            class="text-xs text-gray-500 mr-4"
          >
            Etherscan</a>
          <a
            v-if="raribleLink"
            aria-label="rarible"
            :href="raribleLink"
            target="_blank"
            class="text-xs text-gray-500 mr-4"
          >
            Rarible</a>
          <a
            v-if="openseaLink"
            aria-label="opensea"
            :href="openseaLink"
            target="_blank"
            class="text-xs text-gray-500 mr-4"
          >
            Opensea</a>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="box">
    <article class="media">
      <div class="media-left">
        <router-link :to="{ name: 'Contract', params: {contractAddress:contract.address}}">
          <figure class="image is-64x64">
            <img
              v-if="addressAvatar"
              :src="addressAvatar"
              alt="Image"
            >
            <b-skeleton
              v-else
              width="64px"
              height="64px"
            />
          </figure>
        </router-link>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <strong v-if="contract.name">{{ contract.name }}</strong> {{ contract.symbol }}
            <br v-if="contract.name">
            <small>
              <a
                v-if="addressEtherscan"
                aria-label="reply"
                :href="addressEtherscan"
                target="_blank"
              >
                <b-icon
                  icon="currency-eth"
                  size="is-small"
                /></a>
              {{ contract.address }}
            </small>
            <br v-if="ethBalance">
            <span v-if="ethBalance"> {{ ethBalance }} Ether </span>
          </p>
          <p>
            {{ contract.description }}
            <br v-if="contract.description">
            <router-link
              :to="{ name: 'Contract', params: {contractAddress:contract.address}}"
              aria-label="reply"
            >
              <b-icon
                icon="open-in-new"
                size="is-small"
              />
              View Contract
            </router-link>
            <a
              :href="contract.external_link"
              target="_blank"
            >
              <b-icon
                icon="open-in-new"
                size="is-small"
              />
              Link
            </a>
          </p>
        </div>
      </div>
    </article>
  </div> -->
</template>

<script>

import web3 from '@/mixins/web3';

import CopyPasteButton from '@/components/Utils/CopyPasteButton.vue';

export default {
  components: {
    CopyPasteButton,
  },
  mixins: [web3],
  props: {
    contract: {
      type: Object,
      default() {},
    },

  },
  data() {
    return {
      ensName: undefined,
      ethBalance: undefined,
    };
  },

  computed: {
    ethAddress() {
      return this.contract.address;
    },
    addressAvatar() {
      return `https://effigy.im/a/${this.ethAddress}.svg`;
    },
    addressEtherscan() {
      if (this.contract) {
        return `https://etherscan.io/address/${this.contract.address}`;
      }
      return null;
    },
    raribleLink() {
      if (this.contract) {
        return `https://rarible.com/collection/${this.contract.address}?tabFilter[items][sort]=cheapest`;
      }
      return null;
    },
    openseaLink() {
      if ('collection' in this.contract) {
        if ('permalink' in this.contract.collection) {
          return `${this.contract.collection.permalink}`;
        }
      }
      return null;
    },

  },
  async created() {
    this.ethBalance = await this.getBalance(this.contract.payout_address);
  },

};
</script>
