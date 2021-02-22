<template>
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
      <div class="content">
        {{ description }}
        <router-link
          :to="{ name: 'Asset', params: {contractAddress:asset.asset_contract.address, tokenId:asset.token_id}}"
          aria-label="reply"

          target="_blank"
        >
          <b-icon
            icon="currency-eth"
            size="is-small"
          />
        </router-link>
        <a

          aria-label="reply"

          target="_blank"
        >
          <b-icon
            icon="currency-eth"
            size="is-small"
          /></a>
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
