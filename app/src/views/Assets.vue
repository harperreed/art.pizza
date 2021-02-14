<template>
  <BaseLayout>
    <h1 class="title">Assets</h1>
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
  const axios = require('axios').default;
  import BaseLayout from '@/components/Layout/BaseLayout.vue';




  export default {
    components: {
      BaseLayout
    },
    data: function () {
      return {
        assets: []
      };
    },
    async mounted() {
      this.getAssets();
    },
    methods: {
      async getAssets() {
        const {
          ethAddress
        } = this.$route.params;
        const assetsUrl = `/api/assets/${ethAddress}`;
        console.log(assetsUrl)
        const resp = await axios.get(assetsUrl);
        console.log(resp);
      }
    }


  }
</script>

<style>

</style>
