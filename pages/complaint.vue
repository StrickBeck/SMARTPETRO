<template >
<main class="flex flex-col justify-start items-center w-full h-full mt-10 space-y-4">
    <div class="w-96 h-24 border-blue-300 border-4 rounded-sm text-center text-align">
        <h1 class="text-2xl font-bold mt-4"></h1>
    </div>
    <div class="basis-1/4">
        <button class="rightsidebutton" @click="chooseLanguage = 'Kaz'">Қазақ тілі</button>
        <button class="rightsidebutton" @click="chooseLanguage = 'Rus'">Руский</button>
    </div>
    <div class="basis-3/4 items-center justify-starts px-8 min-w-40 max-sm:basis-auto">
    </div>
    <button>ok</button>
</main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';

const chooseLanguage = ref<string>('Kaz');

</script>

<style scoped>
.rightsidebutton
{
    @apply bg-blue-600 text-white font-bold py-2 px-4 rounded m-2 border-2 border-blue-800 hover:bg-blue-800 hover:border-blue-600 transition-colors duration-200;
}
</style>