<template>
  <div class="column is-8 is-offset-2">
    <br>
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <router-link :to="{ name: 'home' }">
            <b-icon
              icon="twitter"
              size="is-small"
            />
          </router-link>
                    &emsp;
          <router-link :to="{ name: 'home' }">
            <span class="icon">
              🥺
            </span>
          </router-link>
                    &emsp;
          <router-link :to="{ name: 'home' }">
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
          &copy; Arts, man. All Rights Reserved.
        </small>
      </div>
    </nav>
  </div>
</template>

<style scoped>

</style>
