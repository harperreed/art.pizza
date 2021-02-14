<template>
  <BaseLayout>

    <p class="block">
      This page is not found. maybe it has been ejected into space?
    </p>
  </BaseLayout>
</template>

<script>
  import BaseLayout from '@/components/Layout/BaseLayout.vue';

  export default {
    components: {
      BaseLayout,
    },
    mounted() {
      this.$store.dispatch('sendAnalyticsPage', 'notFound');
    },
  };
</script>

<style>
</style>
