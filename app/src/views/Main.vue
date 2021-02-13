<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="section">
        <div class="columns">
          <div class="column has-text-centered">
            <h1 class="title" style="color: ghostwhite;">Bulma Card Layout Template</h1><br>
          </div>
        </div>
        <div id="app" class="row columns is-multiline">


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
        </div>
      </div>
    </div>
    <Footer />
  </div>

</template>

<script>
  import Navbar from '@/components/Layout/Navbar.vue'
  import Footer from '@/components/Layout/Footer.vue'

  import assets from '@/assets.json'

  export default {
    components: {
      Footer,
      Navbar
    },
    data: function () {
      return {
        assets: assets.assets
      };
    }


  }
</script>

<style>
  :root {
    --bg: #071e36;
    --card-bg: #041221;
  }

  body {
    background: var(--bg);
  }

  .box {
    background: var(--card-bg);
  }


  input::placeholder {
    color: antiquewhite;
  }



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


  .fa {
    color: ghostwhite;
    margin: 10px
  }
</style>