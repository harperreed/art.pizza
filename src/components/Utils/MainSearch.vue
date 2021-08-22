<template>
  <form @submit.prevent="enterAddress">
    <div class="bg-white flex items-center border shadow-lg rounded-lg">
      <input
        id="search"
        v-model="address"
        class="rounded-l-full w-full py-4 px-6 text-lg text-gray-700 leading-tight focus:outline-none"
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
