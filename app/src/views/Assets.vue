<template>
  <BaseLayout>
    <h1 class="title">
      {{ ensName }}
    </h1>
    <div v-if="assets">
      <masonry
        :cols="{default: 4, 1000: 3, 700: 2, 400: 1}"
        :gutter="{default: '30px', 700: '15px'}"
      >
        <div
          v-for="card in assets"
          :key="card.id"
        >
          <div class="card large">
            <div class="card-image">
              <figure class="image">
                <img
                  :src="card.image_url"
                  alt="Image"
                >
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                {{ card.description }}
                <div class="background-icon">
                  <span class="icon-twitter" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </masonry>
    </div>
    <div v-else>
      <h2 class="is-4 title">
        Loading assets
      </h2>
      <b-skeleton />
    </div>
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import ens from '@/mixins/ens';

const axios = require('axios').default;

const assetsJson = require('@/assets.json');

export default {
  components: {
    BaseLayout,
  },

  mixins: [ens],
  data() {
    return {
      assets: undefined,
      ensName: '',
      ethAddress: '',
    };
  },
  computed: {

  },
  watch: {
    async ethAddress(address) {
      if (!this.ensName) {
        this.ensName = await this.ensLookup(address);
      }
    },
  },

  async created() {
    const { ethAddress } = this.$route.params;
    if (ethAddress.includes('eth')) {
      console.log('probably a name');
      this.ensName = ethAddress;
      this.ethAddress = await this.addressLookup(ethAddress);
    } else {
      this.ethAddress = ethAddress;
    }

    this.getAssets();
  },
  methods: {
    async getAssets() {
      const assetsUrl = `/api/assets/${this.ethAddress}`;
      try {
        const assetsResponse = await axios.get(assetsUrl);
        this.assets = assetsResponse.data;
      } catch (error) {
        this.assets = assetsJson.assets;
        console.log(error);
      }
    },

  },
  title() {
    if (this.ethAddress) {
      return `NFTs for ${this.ethAddress}`;
    }

    return 'NFTs';
  },
};
</script>

<style>
/* Card start*/
.card {
  overflow: hidden;
  background: ghostwhite;
  color: var(--bg);
}

.card.large {
  border-radius: 5px;
}

.title.no-padding {
  margin-bottom: 0 !important;
}
</style>
