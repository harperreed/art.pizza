<template>
  <div>
    <h1 class="text-3xl my-4">
      About art.pizza
    </h1>
    <p class="block py-4">
      I wanted a simple way to view an eth addresses NFTs and assets. Mostly my own addresses and assets.
      I really wanted to show people my NFTs and my weird assets without sending people to opensea.
      This is a very simple app using some web3 components and the opensea api.
    </p>
    <p class="block py-4">
      If you have ideas on how to make this better or worse (lol) send me a note on twitter (<a
        href="https://twitter.com/harper"
        target="_blank"
      >@harper</a>).
    </p>
    <p class="block py-4">
      <strong>Yay!</strong> <br>
      - <a
        href="https://twitter.com/harper"
        target="_blank"
      >@harper</a> / <router-link :to="{ name: 'Assets', params: {ethRoute: 'harper.eth'} }">
        harper.eth
      </router-link>
    </p>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {},
  methods: {},
};
</script>
