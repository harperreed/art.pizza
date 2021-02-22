<template>
  <!-- START NAV -->
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <router-link
          :to="{ name: 'home' }"
          class="navbar-item title"
        >
          🖼️&nbsp;⚈&nbsp;🍕
        </router-link>
        <span
          class="navbar-burger burger"
          data-target="navbarMenu"
        >
          <span />
          <span />
          <span />
        </span>
      </div>
      <div
        id="navbarMenu"
        class="navbar-menu"
      >
        <div class="navbar-end">
          <b-navbar-item
            tag="router-link"
            :to="{ name: 'home' }"
          >
            🏠 Home
          </b-navbar-item>
          <!-- <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">Account</a>
            <div class="navbar-dropdown">
              <b-navbar-item
                tag="router-link"
                :to="{ name: 'home' }"
              >
                🏠 Home
              </b-navbar-item>
              <b-navbar-item
                tag="router-link"
                :to="{ name: 'profile' }"
              >
                🧑‍🎤 Profile
              </b-navbar-item>
              <b-navbar-item
                tag="router-link"
                :to="{ name: 'settings' }"
              >
                ⚙️ Settings
              </b-navbar-item>
              <b-navbar-item
                tag="router-link"
                :to="{ name: 'home' }"
              >
                🍕 Pizza
              </b-navbar-item>
              <hr class="navbar-divider">
              <b-navbar-item
                tag="router-link"
                :to="{ name: 'home' }"
              >
                🔚 Logout
              </b-navbar-item>
            </div> -->
        </div>
      </div>
    </div>
    </div>
  </nav>
  <!-- END NAV -->
</template>

<script>
export default {

};
</script>

<style scoped>

</style>
