<template>
  <div class="group cursor-help inline-block relative ml-2 ">
    <div class="hidden group-hover:block absolute  z-10 w-36 text-center bottom-full left-1/2 transform -translate-x-1/2">
      <div class="relative mx-2 ">
        <div class="bg-black text-white text-xs rounded py-1 px-4 right-0 bottom-full mb-2">
          Copy to clipboard
          <svg
            class="absolute h-3 w-full left-0 top-full"
            viewBox="0 0 255 255"
          ><polygon points="0,0 127.5,127.5 255,0" /></svg>
        </div>
      </div>
    </div>

    <button
      v-clipboard:copy="value"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
      class="group-hover:bg-gray-200 "
    >
      ✂️
    </button>
  </div>
</template>

<script>

export default {
  components: {

  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    onCopy(text) {
      // this.$toast.open({
      //   message: `Copied to clipboard: ${text}`,
      //   type: 'is-success',
      //   duration: 1000,
      // });
      console.log('copied', text);
    },
    onError(err) {
      // this.$toast.open({
      //   message: `Error: ${err.message}`,
      //   type: 'is-danger',
      //   duration: 1000,
      // });
      console.log('error', err);
    },
  },

};
</script>

<style scoped>
  .tooltip{

  }
</style>
