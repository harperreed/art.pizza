<template>
  <div class="container">
    <b-navbar>
      <template #brand>
        <b-navbar-item
          tag="router-link"
          class="navbar-item title"
          :to="{ name: 'home' }"
        >
          🖼️&nbsp;⚈&nbsp;🍕
        </b-navbar-item>
      </template>

      <template #end>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'home' }"
        >
          🏠 Home
        </b-navbar-item>
        <b-navbar-item
          tag="a"
          href="https://artpizza.eth.link"
          target="_blank"
        >
          🌐 IPFS
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>

</style>
