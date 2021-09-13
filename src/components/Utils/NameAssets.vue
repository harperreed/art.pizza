<template>
  <div v-if="assets">
    <h1 class="text-2xl my-4">
      Domains and Names
    </h1>

    <table class="table-auto  w-full ">
      <thead class=" align-right ">
        <tr>
          <th class="px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th class="px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider">
            Type
          </th>
          <th class="px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider">
            Views
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(asset,i) in assets"
          :key="i"
          class="hover:bg-gray-100 border-b border-t dark:hover:bg-gray-300 dark:hover:text-gray-900"
        >
          <td class="px-6 py-4 whitespace-nowrap">
            {{ asset.name }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ asset.asset_contract.name }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <router-link :to="{ name: 'Asset', params: {contractAddress:asset.asset_contract.address, tokenId:asset.token_id}}">
              More info
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- <b-table
      :data="assets"
      class="table  is-striped  is-hoverable is-fullwidth"
    >
      <b-table-column
        v-slot="props"
        label="Name"
      >
        <a
          v-if="props.row.external_link"
          :href="props.row.external_link"
          target="_blank"
        >{{ props.row.name }}</a>
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Type"
      >
        {{ props.row.asset_contract.name }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="View"
      >
        <router-link :to="{ name: 'Asset', params: {contractAddress:props.row.asset_contract.address, tokenId:props.row.token_id}}">
          More info
        </router-link>
      </b-table-column>
    </b-table> -->
  </div>
</template>

<script>

export default {
  components: {

  },
  props: {
    assets: {
      type: Array,
      default() {},
    },

  },
  computed: {

  },

};
</script>
