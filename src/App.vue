<template>
  <router-view :key="routeKey()" />
</template>

<script>

export default {
  name: 'ArtDotPizza',
  title: 'welcome',
  components: {

  },
  methods: {
    routeKey() {
      return this.$route.fullPath.slice(0, this.$route.fullPath.indexOf('#')).toString();
    },
  },
};
</script>

<style>

</style>
