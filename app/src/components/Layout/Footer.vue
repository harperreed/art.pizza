<template>
   <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <div class="soc">
            <a href="#"><i class="fa fa-github-alt fa-lg" aria-hidden="true"></i></a>
            <a href="#"><i class="fa fa-youtube fa-lg" aria-hidden="true"></i></a>
            <a href="#"><i class="fa fa-facebook fa-lg" aria-hidden="true"></i></a>
            <a href="#"><i class="fa fa-twitter fa-lg" aria-hidden="true"></i></a>
          </div>
          <p>
            <strong>Bulma</strong> by <a href="http://jgthms.com">Jeremy Thomas</a>.
            The source code is licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. <br>
          </p>
        </div>
      </div>
    </footer>
</template>

<style scoped>
.footer {
  background: var(--card-bg);
  color: ghostwhite;
}

.footer p,
strong {
  color: ghostwhite
}

.footer a:hover {
  color: crimson;
}

.fa {
  color: ghostwhite;
  margin: 10px
}

</style>