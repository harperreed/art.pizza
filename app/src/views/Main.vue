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

  /* Card start*/
  .card {
    overflow: hidden;
    background: ghostwhite;
    color: var(--bg);
  }

  .card.large {
    border-radius: 5px;
  }

  .title.no-padding {
    margin-bottom: 0 !important;
  }

</style>
