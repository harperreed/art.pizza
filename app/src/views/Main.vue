<template>
  <BaseLayout>
    <h1 class="title is-3">
      Hi. Let's look at art!
    </h1>

    <b-field label="Eth address or an ENS domain">
      <b-input
        v-model="name"
        placeholder="pizza.eth"
        size="is-large"
        icon="currency-eth"
      />
    </b-field>
    <hr>
    <h1 class="title is-4">
      Check out these pieces
    </h1>

    <hr>
    <h1 class="title is-3">
      About art.pizza
    </h1>
    <p class="block">
      I wanted a simple way to view an eth addresses NFTs and assets. Mostly my own addresses and assets.
      I really wanted to show people my NFTs and my weird assets without sending people to opensea.
      This is a very simple app using some web3 components and the opensea api.
    </p>
    <p class="block">
      If you have ideas on how to make this better or worse (lol) send me a note on twitter (<a
        href="https://twitter.com/harper"
        target="_blank"
      >@harper</a>).
    </p>
    <p class="block">
      <strong>Yay!</strong> <br>
      - <a
        href="https://twitter.com/harper"
        target="_blank"
      >@harper</a> / <router-link :to="{ name: 'Assets', params: {ethRoute: 'harper.eth'} }">
        harper.eth
      </router-link>
    </p>
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/components/Layout/BaseLayout.vue';

// import assets from '@/assets.json';

export default {
  components: {
    BaseLayout,
  },
  title: 'Hi',
  // data() {
  //   return {
  //     assets: assets.assets,
  //   };
  // },
};
</script>

<style></style>
