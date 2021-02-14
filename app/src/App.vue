<template>
  <router-view :key="routeKey()" />
</template>

<script>


export default {
  name: 'App',
  components: {

  },
  methods: {
    routeKey() {
      return this.$route.fullPath.slice(0, this.$route.fullPath.indexOf('#')).toString();
    },
  },
}
</script>

<style>

</style>
