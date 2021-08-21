<template>
  <div
    v-if="show"
    class="border my-2 sm:m-4 shadow-xl rounded-xl p-2 "
  >
    <div>
      <!-- <pre>{{ asset }}</pre> -->
      <p
        class="font-semibold mb-2 "
      >
        {{ name }}
      </p>
      <router-link :to="{ name: 'Asset', params: {contractAddress:asset.asset_contract.address, tokenId:asset.token_id}}">
        <figure class="border bg-gray-200 ">
          <img
            v-if="asset.image_url"
            :src="asset.image_url"
            alt="Image"
            class="w-auto h-auto  "
          >
          <div
            v-else
            class="w-100 h-44 animate-pulse"
          />
        </figure>
      </router-link>
    </div>

    <div>
      <p class="sm:hidden">
        {{ description }}
      </p>
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
      return true;
    },
    name() {
      if ('name' in this.asset) {
        if (this.asset.name == null) {
          return this.asset.asset_contract.name;
        }
        return this.asset.name;
      }
      return 'No Name';
    },
    description() {
      const length = 50;
      let description = 'No Description';

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
