<template>
  <div
    v-if="show"
    class="border my-2 shadow-xl rounded-xl p-2 mb-6"
  >
    <p
      class="font-semibold mb-2 "
    >
      {{ name }}
    </p>
    <router-link :to="{ name: 'Asset', params: {contractAddress:asset.asset_contract.address, tokenId:asset.token_id}}">
      <img
        v-if="asset.image_url"
        :src="asset.image_url"
        class="w-auto h-auto mx-auto"
        width="100%"
      >
      <div
        v-else
        class="w-100 h-44 animate-pulse"
      />
    </router-link>

    <p>
      {{ description }}
    </p>
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
      return true;
    },
    name() {
      let name = 'No Name';
      const length = 20;
      if ('name' in this.asset) {
        if (this.asset.name == null) {
          name = this.asset.asset_contract.name;
        }
        name = this.asset.name;
      }

      if (name.length > length) {
        name = `${name.substring(0, length)}...`;
      }
      return name;
    },
    description() {
      const length = 50;
      let description = null;

      if ('description' in this.asset) {
        if (this.asset.description == null) {
          description = this.asset.asset_contract.description;
        }

        if (description.length > length) {
          description = `${description.substring(0, length)}...`;
        }
        return description;
      }

      return description;
    },

  },

};
</script>
