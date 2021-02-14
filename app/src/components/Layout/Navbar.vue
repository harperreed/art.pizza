<template>
    <!-- START NAV -->
    <nav class="navbar">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item title" href="../">
                    🖼️⚈🍕
                </a>
                <span class="navbar-burger burger" data-target="navbarMenu">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </div>
            <div id="navbarMenu" class="navbar-menu">
                <div class="navbar-end">
                    <a class="navbar-item is-active">Home</a>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">Account</a>
                        <div class="navbar-dropdown">
                            <a class="navbar-item">Home</a>
                            <a class="navbar-item">Profile</a>
                            <a class="navbar-item">Settings</a>
                            <hr class="navbar-divider">
                            <div class="navbar-item">Logout</div>
                        </div>
                    </div>
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

</style>
