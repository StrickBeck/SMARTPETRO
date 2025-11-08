<template>
  <header class="flex flex-row items-center w-full relative bg-black border-b-2 border-gray-400 max-sm:justify-between max-sm:relative h-24">
    <div class="basis-1/4 items-center justify-starts px-8 min-w-40 max-sm:basis-auto"> 
      <p class="text-white text-center italic w-[70px]">Chance</p>    
    </div>
    <div class="basis-1/4 max-sm:basis-auto"></div>
    
    <!-- Desktop Navigation -->
    <nav class="hidden sm:flex basis-1/2 text-white flex-row items-center justify-end px-8 gap-4">
      <NuxtLink to="/" class="my-auto p-2 h-12 hover:bg-gray-500 hover:text-white transition-colors duration-200">Home</NuxtLink>
      
      <!-- Services Dropdown -->
      <div class="relative group">
        <div class="my-auto p-2 hover:bg-gray-500 hover:text-white cursor-pointer transition-colors duration-200" @click="switch_submenu">
          Services
        </div>
        <div class="flex flex-col absolute top-full left-0 bg-white text-black w-56 text-center shadow-lg z-50 transition-all duration-200" 
             :class="submenu ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'"> 
          <NuxtLink to="/report" class="my-auto p-2 border-b-2 border-gray-300 hover:bg-gray-500 hover:text-white transition-colors duration-200">Report</NuxtLink>
          <NuxtLink to="/complaint" class="my-auto p-2 border-b-2 border-gray-300 hover:bg-gray-500 hover:text-white transition-colors duration-200">Complaint</NuxtLink>
          <NuxtLink to="/Map" class="my-auto p-2 hover:bg-gray-500 hover:text-white transition-colors duration-200">Map</NuxtLink>
        </div>
      </div>
      
      <NuxtLink to="/login" class="my-auto p-2 hover:bg-gray-500 hover:text-white transition-colors duration-200">LogIn</NuxtLink>
      <NuxtLink to="/profile" class="my-auto p-2 hover:bg-gray-500 hover:text-white transition-colors duration-200">Profile</NuxtLink>
    </nav>

    <!-- Mobile Navigation -->
    <nav class="sm:hidden flex flex-col absolute top-full left-0 w-full bg-white text-black z-50 transition-all duration-300"
         :class="burger ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'">
      <NuxtLink to="/" class="w-full p-4 border-b-2 border-gray-300 hover:bg-gray-500 hover:text-white text-center transition-colors duration-200"
                @click="burger = false">Home</NuxtLink>
      
      <!-- Mobile Services Accordion -->
      <div class="w-full border-b-2 border-gray-300">
        <div class="w-full p-4 hover:bg-gray-500 hover:text-white text-center cursor-pointer transition-colors duration-200"
             @click="switch_submenu">
          Services
        </div>
        <div class="bg-gray-100 transition-all duration-300 overflow-hidden"
             :class="submenu ? 'max-h-48' : 'max-h-0'">
          <NuxtLink to="/report" class="block w-full p-4 border-b-2 border-gray-300 hover:bg-gray-500 hover:text-white text-center transition-colors duration-200"
                    @click="burger = false">Report</NuxtLink>
          <NuxtLink to="/complaint" class="block w-full p-4 border-b-2 border-gray-300 hover:bg-gray-500 hover:text-white text-center transition-colors duration-200"
                    @click="burger = false">Complaint</NuxtLink>
          <NuxtLink to="/Map" class="block w-full p-4 hover:bg-gray-500 hover:text-white text-center transition-colors duration-200"
                    @click="burger = false">Map</NuxtLink>
        </div>
      </div>
      
      <NuxtLink to="/login" class="w-full p-4 border-b-2 border-gray-300 hover:bg-gray-500 hover:text-white text-center transition-colors duration-200"
                @click="burger = false">LogIn</NuxtLink>
      <NuxtLink to="/profile" class="w-full p-4 border-b-2 border-gray-300 hover:bg-gray-500 hover:text-white text-center transition-colors duration-200"
                @click="burger = false">Profile</NuxtLink>
    </nav>

    <!-- Mobile Hamburger Button -->
    <div class="sm:hidden flex flex-col mr-8 justify-between items-center w-8 h-6 cursor-pointer" 
         @click="switch_burger">
      <span class="h-[3px] w-full bg-blue-800 transition-all duration-300"
            :class="burger ? 'rotate-45 translate-y-[9px]' : ''"></span>
      <span class="h-[3px] w-full bg-blue-800 transition-all duration-300"
            :class="burger ? 'opacity-0' : ''"></span>
      <span class="h-[3px] w-full bg-blue-800 transition-all duration-300"
            :class="burger ? '-rotate-45 -translate-y-[9px]' : ''"></span>
    </div>
  </header>
    
  <main class="p-5 flex bg-black bg-cover min-h-screen text-white">    
    <slot />
  </main>

  <footer class="flex flex-row w-full bg-black border-t-2 border-gray-400 items-center justify-center px-4 py-2 gap-4">
  </footer>
</template>

<script setup lang="ts">
import { useHead } from '#app';
import { ref } from 'vue';

useHead({
  script: [
    {
      async: true,
      src: 'https://www.googletagmanager.com/gtag/js?id=G-K2NYFMRNR9',
    },
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-K2NYFMRNR9');
      `,
      type: 'text/javascript',
    },
  ],
  __dangerouslyDisableSanitizersByTagID: {
    gtag: ['innerHTML'],
  },
});

const burger = ref<boolean>(false)
const submenu = ref<boolean>(false)

const switch_burger = () => {
  burger.value = !burger.value
  if (!burger.value) {
    submenu.value = false
  }
}

const switch_submenu = () => {
  submenu.value = !submenu.value
}
</script>