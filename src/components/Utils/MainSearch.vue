<template>
  <form @submit.prevent="enterAddress">
    <span class="m-2 text-md text-gray-600 dark:text-gray-100">Search for a wallet address or ENS domain</span>
    <div class="bg-white dark:bg-gray-700 flex items-center border dark:border-gray-600 shadow-lg rounded-lg">
      <input
        id="search"
        v-model="address"
        class="rounded-l-full w-full py-4 px-6 text-lg dark:bg-gray-700 dark:text-gray-100 text-gray-700 leading-tight focus:outline-none"
        type="text"
        placeholder="pizza.eth"
      >

      <div class="p-4">
        <button
          class="bg-blue-500 text-white  p-2 hover:bg-blue-400 focus:outline-none rounded items-center justify-center"
          @click="enterAddress"
        >
          Search
        </button>
      </div>
    </div>

    <p class="control">
      <button
        label="Go"
        size="is-large"
        type="is-light"
      />
    </p>
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
