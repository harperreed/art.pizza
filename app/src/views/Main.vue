<template>
  <BaseLayout>
    <h1 class="title">Arts, man</h1>
  </BaseLayout>
</template>


<script>
  import BaseLayout from '@/components/Layout/BaseLayout.vue';

  import assets from '@/assets.json'


  export default {
    components: {
      BaseLayout
    },
    data: function () {
      return {
        assets: assets.assets
      };
    }


  }
</script>

<style>

</style>
