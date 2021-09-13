<template>
  <div
    class="bg-white dark:bg-black flex space-x-2 p-5 rounded-full justify-center items-center animate-pulse"
  >
    <div
      class="circle blue-circle"
    />
    <div
      class="circle green-circle"
    />
    <div
      class="circle red-circle"
    />
    <div
      class="circle gray-circle"
    />
    <div
      class="circle pink-circle"
    />
    <div
      class="circle yellow-circle"
    />
  </div>
</template>

<script>
export default {
  components: {},
  computed: {},
  methods: {},
};
</script>

<style scoped>

.circle{
  @apply p-2 w-6 h-6 rounded-full animate-bounce;
}

.blue-circle{
  @apply bg-blue-600;
  animation-delay: 0.1s;
}
.green-circle{
  @apply bg-green-600;
  animation-delay: 0.2s;
}
.red-circle{
  @apply bg-red-600;
  animation-delay: 0.3s;
}
.pink-circle{
  @apply bg-pink-600;
  animation-delay: 0.2s;
}
.yellow-circle{
  @apply bg-yellow-600;
  animation-delay: 0.1s;
}
.gray-circle{
  @apply bg-gray-600;
  animation-delay: 0.3s;
}
</style>
