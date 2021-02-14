<template>
  <BaseLayout>
    <h1 class="title">Asset</h1>
    <div v-for="card in assets" v-bind:key="card.id" class="column is-4">

      <div class="card large">
        <div class="card-image">
          <figure class="image">
            <img :src="card.image_url" alt="Image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">


          </div>
          <div class="content">
            {{card.description}}
            <div class="background-icon"><span class="icon-twitter"></span></div>
          </div>
        </div>
      </div>
    </div>
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
