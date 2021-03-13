<template>
  <form @submit.prevent="enterAddress">
    <b-field
      grouped
      label="Eth address or an ENS domain"
    >
      <b-input
        v-model="address"
        placeholder="pizza.eth"
        expanded
        size="is-large"
        icon="currency-eth"
      />
      <p class="control">
        <b-button
          label="Go"
          size="is-large"
          type="is-light"

          @click="enterAddress"
        />
      </p>
    </b-field>
  </form>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      address: '',
    };
  },

  computed: {},
  methods: {
    enterAddress() {
      if (this.address) {
        console.log("let's search");
        this.$router.push({ name: 'Assets', params: { ethRoute: this.address } });
      }
    },
  },
};
</script>
