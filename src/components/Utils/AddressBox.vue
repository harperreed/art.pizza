<template>
  <div>
    <div class="shadow-xl flex  items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 mb-4">
      <div class="flex flex-col shadow ">
        <router-link :to="{ name: 'Assets', params: {ethRoute:ethAddress}}">
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
          <span v-if="ensName">
            <router-link :to="{ name: 'Assets', params: {ethRoute:ethAddress}}">
              <strong v-if="ensName">{{ ensName }}</strong>
            </router-link>
            <small
              v-if="addressTwitterName"
              class="px-2"
            >{{ addressTwitterName }}</small>
          </span>
        </h4>
        <span

          class="text-sm"
        >
          <router-link :to="{ name: 'Assets', params: {ethRoute:ethAddress}}">{{ ethAddress }}</router-link>
        </span>

        <span
          v-if="ethBalance"
          class="text-sm"
        > {{ ethBalance }} Ether </span>
        <div class="flex sm:ml-auto sm:mt-2 mt-2 w-full justify-start ">
          <a
            v-if="addressEtherscan"
            aria-label="etherscan"
            :href="addressEtherscan"
            target="_blank"
            class="text-xs text-gray-500 mr-4"
          >
            Etherscan</a>
          <a
            v-if="addressOpensea"
            aria-label="opensea"
            :href="addressOpensea"
            target="_blank"
            class="text-xs text-gray-500 mr-4"
          >
            OpenSea</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import web3 from '@/mixins/web3';

export default {
  components: {},
  mixins: [web3],
  props: {
    ethAddress: {
      type: String,
      default: '',
    },

  },

  computed: {
    addressAvatar() {
      return `https://effigy.im/a/${this.ethAddress}.svg`;
    },
    addressEmail() {
      if (this.ensData) {
        if ('email' in this.ensData) {
          return `mailto:${this.ensData.email}`;
        }
      }
      return null;
    },
    addressGithubLink() {
      if (this.ensData) {
        if ('vnd.github' in this.ensData) {
          return `https://github.com/${this.ensData['vnd.github']}`;
        }
      }
      return null;
    },
    addressTwitterLink() {
      if (this.ensData) {
        if ('vnd.twitter' in this.ensData) {
          return `https://twitter.com/${this.ensData['vnd.twitter']}`;
        }
      }
      return null;
    },
    addressTwitterName() {
      if (this.ensData) {
        if ('vnd.twitter' in this.ensData) {
          if (this.ensData['vnd.twitter'].includes('@')) {
            return `${this.ensData['vnd.twitter']}`;
          }

          if (this.ensData['vnd.twitter'].includes('twitter.com')) {
            const username = this.ensData['vnd.twitter'].replace('twitter.com/', '').replace('https://', '').replace('http://', '');
            return `@${username}`;
          }

          return `@${this.ensData['vnd.twitter']}`;
        }
      }
      return null;
    },
    addressLink() {
      if (this.ensData) {
        if ('url' in this.ensData) {
          if (this.ensData.url.includes('http')) {
            return `${this.ensData.url}`;
          }
          return `https://${this.ensData.url}`;
        }
      }
      return null;
    },
    addressEtherscan() {
      if (this.ethAddress) {
        return `https://etherscan.io/address/${this.ethAddress}`;
      }
      return null;
    },
    addressOpensea() {
      if (this.ethAddress) {
        return `https://opensea.io/${this.ethAddress}`;
      }
      return null;
    },
  },
  async created() {
    if (!this.ensName) {
      this.ensName = await this.ensLookup(this.ethAddress);
    }
    this.ethBalance = await this.getBalance(this.ethAddress);
  },
};
</script>
