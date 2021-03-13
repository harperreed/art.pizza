<template>
  <div class="column is-8 is-offset-2">
    <br>
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <a
            href="https://twitter.com/harper"
            target="_blank"
          >
            <b-icon
              icon="twitter"
              size="is-small"
            />
          </a>
                    &emsp;
          <router-link :to="{ name: 'home' }">
            <span class="icon">
              🥺
            </span>
          </router-link>
                    &emsp;
          <router-link :to="{ name: 'Assets', params: {ethRoute: 'harper.eth'} }">
            <span class="icon">
              🍕
            </span>
          </router-link>
                    &emsp;
        </div>
      </div>
      <div class="level-right">
        <small
          class="level-item"
          style="color: var(--textLight)"
        >
          Made on a random saturday. Fun, right.
        </small>
      </div>
    </nav>
  </div>
</template>

<style scoped>

</style>
