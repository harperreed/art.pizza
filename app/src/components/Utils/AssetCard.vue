<template>
  <div class="card large">
    <div class="card-image">
      <figure class="image">
        <img
          :src="asset.image_url"
          alt="Image"
        >
      </figure>
    </div>
    <div class="card-content">
      <div class="content">
        {{ description }}
        <div class="background-icon">
          <a

            aria-label="reply"

            target="_blank"
          >
            <b-icon
              icon="currency-eth"
              size="is-small"
            /></a>
          <a

            aria-label="reply"

            target="_blank"
          >
            <b-icon
              icon="currency-eth"
              size="is-small"
            /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {

  },
  props: {
    asset: {
      type: Object,
      default() {},
    },

  },
  computed: {
    description() {
      const length = 50;
      if (this.asset.description.length > length) {
        return `${this.asset.description.substring(0, length)}...`;
      }
      return this.asset.description;
    },

  },

};
</script>
