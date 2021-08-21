<template>
  <div
    v-if="show"
    class="border"
  >
    <div
      v-if="asset.image_url"
    >
      <router-link :to="{ name: 'Asset', params: {contractAddress:asset.asset_contract.address, tokenId:asset.token_id}}">
        <figure>
          <img
            :src="asset.image_url"
            alt="Image"
          >
        </figure>
      </router-link>
    </div>
    <div>
      <div>
        {{ description }}
        <router-link
          :to="{ name: 'Asset', params: {contractAddress:asset.asset_contract.address, tokenId:asset.token_id}}"
          aria-label="reply"

          target="_blank"
        >
          Etherscan
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {

  },
  props: {
    asset: {
      type: Object,
      default() {},
    },
  },
  computed: {
    show() {
      if (this.asset.name === null) {
        return false;
      }
      return true;
    },
    description() {
      const length = 50;

      if ('description' in this.asset) {
        if (this.asset.description == null) {
          return '';
        }
        if (this.asset.description.length > length) {
          return `${this.asset.description.substring(0, length)}...`;
        }
        return this.asset.description;
      }

      return '';
    },

  },

};
</script>
