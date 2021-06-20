<template>
  <div v-if="assets">
    <h1 class="title is-3">
      Domains and Names
    </h1>

    <b-table
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
    </b-table>
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
