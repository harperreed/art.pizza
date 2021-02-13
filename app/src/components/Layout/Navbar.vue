<template>
   <!-- START NAV -->
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="#">
            <img src="https://cdn.emk.dev/templates/bulma-logo-light.png" alt="Logo">
          </a>
          <span class="navbar-burger burger" data-target="navbarMenu">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenu" class="navbar-menu">
          <div class="navbar-end">
            <a class="navbar-item is-active">
              Home
            </a>
            <a class="navbar-item">
              Examples
            </a>
            <a class="navbar-item">
              Features
            </a>
            <a class="navbar-item">
              Team
            </a>
            <a class="navbar-item">
              Archives
            </a>
            <a class="navbar-item">
              Help
            </a>
          </div>
        </div>
      </div>
    </nav>
    <!-- END NAV -->
</template>

<script>
export default {
  
}
</script>

<style scoped>
.navbar {
  background: var(--card-bg);
}

.navbar-item {
  color: ghostwhite;
}
</style>