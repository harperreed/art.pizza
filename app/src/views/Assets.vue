<template>
  <BaseLayout>
    <h1 class="title">
      {{ ensName }}
    </h1>
    <div v-if="assets">
      <div
        v-for="card in assets"
        :key="card.id"
        class="column is-4"
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

export default {
  components: {
    BaseLayout,
  },

  mixins: [ens],
  data() {
    return {
      assets: undefined,
      ensName: undefined,
      ethAddress: undefined,
    };
  },
  computed: {

  },
  watch: {
    async ethAddress(address) {
      this.ensName = await this.ensLookup(address);
    },
  },

  async created() {
    const { ethAddress } = this.$route.params;
    this.ethAddress = ethAddress;
    this.getAssets();
  },
  methods: {
    async getAssets() {
      const assetsUrl = `/api/assets/${this.ethAddress}`;
      const assetsResponse = await axios.get(assetsUrl);
      this.assets = assetsResponse.data;
    },

  },
  title() {
    return this.ensName;
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
