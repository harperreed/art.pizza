<template>
  <nav class="container mx-auto flex flex-wrap p-5 py-4 md:flex-row items-center max-w-screen-xl">
    <div class="  flex-grow flex items-center w-auto  block  ">
      <router-link
        class="text-3xl flex title-font font-medium items-center text-gray-900 dark:text-gray-100 mb-4 md:mb-0"
        :to="{ name: 'home' }"
      >
        🖼️&nbsp;.&nbsp;🍕
      </router-link>

      <span class="text-gray-500 dark:text-gray-200 text-lg md:visible invisible ml-4">A simple way to view NFTs</span>
    </div>
    <div class=" flex-grow flex items-center w-auto  block lg:hidden  justify-end">
      <button
        id="nav-toggle"
        class="flex items-center px-3 py-2 border rounded text-grey border-grey-dark hover:text-black hover:border-black"
      >
        <svg
          class="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div
      class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0"
    >
      <ul class="list-reset lg:flex justify-end flex-1 items-center md:mr-auto md:ml-4 md:py-1 md:pl-4  ">
        <li>
          <router-link
            class="inline-block py-2 px-2 no-underline hover:text-blue-900 "
            :to="{ name: 'home' }"
          >
            🏠 Home
          </router-link>
        </li>

        <li>
          <a
            href="https://artpizza.eth.link"
            class="inline-block py-2 px-2 no-underline hover:text-blue-900 "
            target="_blank"
          >
            🌐 IPFS
          </a>
        </li>
        <li>
          <a
            href="https://github.com/harperreed/art.pizza"
            class="inline-block py-2 px-2 no-underline hover:text-blue-900 "
            target="_blank"
          >
            💿 Github
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {

};
</script>

<style scoped>

</style>
