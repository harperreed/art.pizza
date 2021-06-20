<template>
  <div class="box">
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
  </div>
</template>

<script>

import web3 from '@/mixins/web3';

export default {
  components: {},
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

  },
  async created() {
    this.ethBalance = await this.getBalance(this.contract.payout_address);
  },
};
</script>
