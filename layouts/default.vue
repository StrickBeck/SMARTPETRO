<template>
  <!-- Header -->
  <header class="flex flex-row items-center w-full relative bg-[#0a0e17] border-b-2 border-[#1a3a52] max-sm:justify-between h-24 shadow-[0_0_20px_rgba(0,217,255,0.2)]">
    <div class="basis-1/4 items-center justify-start px-8 min-w-40 max-sm:basis-auto"> 
      <p class="text-[#00d9ff] text-2xl font-bold tracking-[0.3em] [text-shadow:_0_0_15px_rgba(0,217,255,0.6)]">SMARTPETRO</p>    
    </div>
    <div class="basis-1/4 max-sm:basis-auto"></div>
    
    <!-- Desktop Navigation -->
    <nav class="hidden sm:flex basis-1/2 text-[#00d9ff] flex-row items-center justify-end px-8 gap-2">
      <NuxtLink 
        to="/" 
        class="my-auto px-5 py-2 h-12 flex items-center border-2 border-transparent rounded-lg hover:border-[#00d9ff] hover:bg-[#00d9ff] hover:text-[#0a0e17] transition-all duration-300 uppercase tracking-wider text-sm hover:shadow-[0_0_15px_rgba(0,217,255,0.4)]"
      >
        Главная
      </NuxtLink>
      
      <!-- Services Dropdown -->
      <div class="relative group">
        <div 
          class="my-auto px-5 py-2 h-12 flex items-center border-2 border-transparent rounded-lg hover:border-[#00d9ff] hover:bg-[#00d9ff] hover:text-[#0a0e17] cursor-pointer transition-all duration-300 uppercase tracking-wider text-sm hover:shadow-[0_0_15px_rgba(0,217,255,0.4)]" 
          @click="switch_submenu"
        >
          Услуги
        </div>
        <div 
          class="flex flex-col absolute top-full left-0 bg-[#0d1520] border-2 border-[#1a3a52] text-[#00d9ff] w-56 shadow-[0_0_25px_rgba(0,217,255,0.3)] z-50 transition-all duration-300 rounded-lg overflow-hidden mt-2" 
          :class="submenu ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'"
        > 
          <NuxtLink 
            to="/report" 
            class="px-4 py-3 border-b-2 border-[#1a3a52] hover:bg-[#00d9ff] hover:text-[#0a0e17] transition-all duration-200 uppercase tracking-wider text-sm"
          >
            Репорт
          </NuxtLink>
          <NuxtLink 
            to="/complaint" 
            class="px-4 py-3 border-b-2 border-[#1a3a52] hover:bg-[#00d9ff] hover:text-[#0a0e17] transition-all duration-200 uppercase tracking-wider text-sm"
          >
            Жалоба
          </NuxtLink>
          <NuxtLink 
            to="/Map" 
            class="px-4 py-3 hover:bg-[#00d9ff] hover:text-[#0a0e17] transition-all duration-200 uppercase tracking-wider text-sm"
          >
            Карта
          </NuxtLink>
        </div>
      </div>
      
      <NuxtLink 
        to="/login" 
        class="my-auto px-5 py-2 h-12 flex items-center border-2 border-transparent rounded-lg hover:border-[#00d9ff] hover:bg-[#00d9ff] hover:text-[#0a0e17] transition-all duration-300 uppercase tracking-wider text-sm hover:shadow-[0_0_15px_rgba(0,217,255,0.4)]"
      >
        Вход
      </NuxtLink>
      <NuxtLink 
        to="/profile" 
        class="my-auto px-5 py-2 h-12 flex items-center border-2 border-[#00d9ff] bg-transparent rounded-lg hover:bg-[#00d9ff] hover:text-[#0a0e17] transition-all duration-300 uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(0,217,255,0.3)] hover:shadow-[0_0_20px_rgba(0,217,255,0.5)]"
      >
        Профиль
      </NuxtLink>
    </nav>

    <!-- Mobile Navigation -->
    <nav 
      class="sm:hidden flex flex-col absolute top-full left-0 w-full bg-[#0d1520] border-b-2 border-[#1a3a52] text-[#00d9ff] z-50 transition-all duration-300 shadow-[0_10px_25px_rgba(0,217,255,0.2)]"
      :class="burger ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'"
    >
      <NuxtLink 
        to="/" 
        class="w-full p-4 border-b-2 border-[#1a3a52] hover:bg-[#00d9ff] hover:text-[#0a0e17] text-center transition-all duration-200 uppercase tracking-wider"
        @click="burger = false"
      >
        Главная
      </NuxtLink>
      
      <!-- Mobile Services Accordion -->
      <div class="w-full border-b-2 border-[#1a3a52]">
        <div 
          class="w-full p-4 hover:bg-[#00d9ff] hover:text-[#0a0e17] text-center cursor-pointer transition-all duration-200 uppercase tracking-wider"
          @click="switch_submenu"
        >
          Услуги
        </div>
        <div 
          class="bg-[#0a0e17] transition-all duration-300 overflow-hidden"
          :class="submenu ? 'max-h-48' : 'max-h-0'"
        >
          <NuxtLink 
            to="/report" 
            class="block w-full p-4 border-b-2 border-[#1a3a52] hover:bg-[#00d9ff] hover:text-[#0a0e17] text-center transition-all duration-200 uppercase tracking-wider text-sm"
            @click="burger = false"
          >
            Репорт
          </NuxtLink>
          <NuxtLink 
            to="/complaint" 
            class="block w-full p-4 border-b-2 border-[#1a3a52] hover:bg-[#00d9ff] hover:text-[#0a0e17] text-center transition-all duration-200 uppercase tracking-wider text-sm"
            @click="burger = false"
          >
            Жалоба
          </NuxtLink>
          <NuxtLink 
            to="/Map" 
            class="block w-full p-4 hover:bg-[#00d9ff] hover:text-[#0a0e17] text-center transition-all duration-200 uppercase tracking-wider text-sm"
            @click="burger = false"
          >
            Карта
          </NuxtLink>
        </div>
      </div>
      
      <NuxtLink 
        to="/login" 
        class="w-full p-4 border-b-2 border-[#1a3a52] hover:bg-[#00d9ff] hover:text-[#0a0e17] text-center transition-all duration-200 uppercase tracking-wider"
        @click="burger = false"
      >
        Вход
      </NuxtLink>
      <NuxtLink 
        to="/profile" 
        class="w-full p-4 border-b-2 border-[#1a3a52] hover:bg-[#00d9ff] hover:text-[#0a0e17] text-center transition-all duration-200 uppercase tracking-wider"
        @click="burger = false"
      >
        Профиль
      </NuxtLink>
    </nav>

    <!-- Mobile Hamburger Button -->
    <div 
      class="sm:hidden flex flex-col mr-8 justify-between items-center w-8 h-6 cursor-pointer" 
      @click="switch_burger"
    >
      <span 
        class="h-[3px] w-full bg-[#00d9ff] transition-all duration-300 rounded-full shadow-[0_0_5px_rgba(0,217,255,0.6)]"
        :class="burger ? 'rotate-45 translate-y-[9px]' : ''"
      ></span>
      <span 
        class="h-[3px] w-full bg-[#00d9ff] transition-all duration-300 rounded-full shadow-[0_0_5px_rgba(0,217,255,0.6)]"
        :class="burger ? 'opacity-0' : ''"
      ></span>
      <span 
        class="h-[3px] w-full bg-[#00d9ff] transition-all duration-300 rounded-full shadow-[0_0_5px_rgba(0,217,255,0.6)]"
        :class="burger ? '-rotate-45 -translate-y-[9px]' : ''"
      ></span>
    </div>
  </header>
    
  <!-- Main Content -->
  <main class="min-h-screen bg-[#0a0e17] text-[#00d9ff] p-5">
    <div class="max-w-7xl mx-auto">
      <!-- Hero Section with Animated Circle -->
      <div class="text-center mb-10 border-2 border-[#1a3a52] rounded-3xl p-8 bg-gradient-to-br from-[#0a0e17] to-[#0d1520] shadow-[0_0_30px_rgba(0,217,255,0.1)]">
        <h1 class="text-5xl font-bold tracking-[0.3em] mb-6 [text-shadow:_0_0_20px_rgba(0,217,255,0.5)]">
          ПАНЕЛЬ SMARTPETRO
        </h1>
        
        <div class="w-24 h-24 border-4 border-[#00d9ff] rounded-full mx-auto my-6 relative flex items-center justify-center animate-pulse">
          <div class="absolute w-16 h-16 border-2 border-[#00d9ff] rounded-full"></div>
          <div class="absolute w-6 h-6 bg-[#00d9ff] rounded-full shadow-[0_0_20px_rgba(0,217,255,0.8)]"></div>
        </div>

        <p class="text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
          Платформа для помощи народу. Отправляйте жалобы, следите за их решением и делайте город лучше вместе.
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="bg-[#0d1520] border-2 border-[#1a3a52] rounded-2xl p-6 text-center transition-all hover:border-[#00d9ff] hover:shadow-[0_0_25px_rgba(0,217,255,0.3)] hover:-translate-y-1 cursor-pointer group"
        >
          <div class="text-sm uppercase tracking-wider opacity-70 mb-2">{{ stat.label }}</div>
          <div class="text-4xl font-bold my-3 group-hover:scale-110 transition-transform duration-300">{{ stat.value }}</div>
          <div class="h-1 w-0 bg-[#00d9ff] mx-auto transition-all duration-300 group-hover:w-full rounded-full"></div>
        </div>
      </div>

      <!-- Section Title -->
      <h2 class="text-3xl uppercase tracking-[0.25em] my-10 pl-4 border-l-4 border-[#00d9ff] flex items-center gap-3">
        <span class="inline-block w-3 h-3 bg-[#00d9ff] rounded-full animate-pulse"></span>
        Последние новости
      </h2>

      <!-- News Grid -->
      <div class="grid gap-5 mb-10">
        <div
          v-for="news in newsItems"
          :key="news.id"
          class="bg-[#0d1520] border-2 border-[#1a3a52] rounded-2xl p-6 transition-all cursor-pointer hover:border-[#00d9ff] hover:shadow-[0_0_25px_rgba(0,217,255,0.2)] hover:scale-[1.01]"
          @click="handleNewsClick(news)"
        >
          <!-- News Header -->
          <div class="flex justify-between items-center mb-4 flex-wrap gap-2">
            <div class="flex items-center gap-3">
              <span
                :class="[
                  'px-4 py-1 rounded-full text-xs uppercase tracking-wider font-semibold',
                  news.status === 'urgent' && 'bg-red-500/20 border border-red-500 text-red-400 animate-pulse',
                  news.status === 'active' && 'bg-yellow-500/20 border border-yellow-500 text-yellow-400',
                  news.status === 'resolved' && 'bg-green-500/20 border border-green-500 text-green-400'
                ]"
              >
                {{ news.statusText }}
              </span>
            </div>
            <div class="text-xs opacity-60 flex items-center gap-2">
              <span class="inline-block w-2 h-2 bg-[#00d9ff] rounded-full"></span>
              {{ news.date }}
            </div>
          </div>

          <!-- News Title -->
          <h3 class="text-xl font-bold mb-3 hover:text-white transition-colors">{{ news.title }}</h3>

          <!-- News Description -->
          <p class="opacity-80 leading-relaxed mb-4">{{ news.description }}</p>

          <!-- News Footer -->
          <div class="flex justify-between items-center pt-4 border-t border-[#1a3a52]">
            <div class="flex gap-1">
              <span
                v-for="i in 5"
                :key="i"
                :class="[
                  'text-yellow-400 text-lg transition-all duration-200',
                  i <= news.priority ? 'opacity-100 scale-100' : 'opacity-30 scale-90'
                ]"
              >
                ★
              </span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <span class="w-2 h-2 bg-[#00d9ff] rounded-full"></span>
              <span class="font-semibold">{{ news.count }}</span>
              <span class="opacity-70">{{ news.countLabel }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Mission Button -->
      <div class="text-center mt-10 mb-10">
        <button
          class="bg-transparent border-2 border-[#00d9ff] text-[#00d9ff] px-12 py-4 rounded-xl text-lg uppercase tracking-wider transition-all hover:bg-[#00d9ff] hover:text-[#0a0e17] hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] hover:scale-105 active:scale-95 font-bold relative overflow-hidden group"
        >
          <span class="relative z-10">Получить миссию</span>
          <span class="absolute inset-0 bg-gradient-to-r from-transparent via-[#00d9ff] to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></span>
        </button>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="flex flex-col sm:flex-row w-full bg-[#0a0e17] border-t-2 border-[#1a3a52] items-center justify-between px-8 py-6 gap-4 shadow-[0_-5px_20px_rgba(0,217,255,0.1)]">
    <div class="text-[#00d9ff] text-sm opacity-70">
      © 2025 SMARTPETRO. Все права защищены.
    </div>
    <div class="flex gap-4">
      <a href="#" class="text-[#00d9ff] hover:text-white transition-colors duration-200 text-sm uppercase tracking-wider hover:underline">О нас</a>
      <a href="#" class="text-[#00d9ff] hover:text-white transition-colors duration-200 text-sm uppercase tracking-wider hover:underline">Контакты</a>
      <a href="#" class="text-[#00d9ff] hover:text-white transition-colors duration-200 text-sm uppercase tracking-wider hover:underline">Политика</a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useHead } from '#app'
import { ref } from 'vue'

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
})

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

const stats = [
  { label: 'Активных миссий', value: '47' },
  { label: 'Решено проблем', value: '312' },
  { label: 'Помогли людям', value: '1,847' },
  { label: 'Активных героев', value: '89' }
]

const newsItems = [
  {
    id: 1,
    status: 'urgent',
    statusText: 'Срочно',
    date: '07.11.2025',
    title: 'Отключение воды в 5-ом микрорайоне',
    description: 'Жители 5-го микрорайона третий день без водоснабжения. Коммунальные службы не реагируют на звонки. Требуется срочное вмешательство.',
    priority: 5,
    count: 154,
    countLabel: 'жалобы'
  },
  {
    id: 2,
    status: 'active',
    statusText: 'В работе',
    date: '06.11.2025',
    title: 'Ямы на проспекте Аль-Фараби',
    description: 'Опасные ямы на главной магистрали города создают угрозу безопасности. Уже зафиксировано несколько ДТП. Начаты работы по ремонту.',
    priority: 4,
    count: 89,
    countLabel: 'жалоб'
  },
  {
    id: 3,
    status: 'resolved',
    statusText: 'Решено',
    date: '05.11.2025',
    title: 'Восстановлено освещение в парке "Жастар"',
    description: 'Благодаря вашим обращениям в парке "Жастар" полностью восстановлено освещение. Теперь вечерние прогулки стали безопаснее!',
    priority: 3,
    count: 67,
    countLabel: 'благодарностей'
  },
  {
    id: 4,
    status: 'active',
    statusText: 'В работе',
    date: '04.11.2025',
    title: 'Проблема с мусором у школы №23',
    description: 'Переполненные контейнеры возле школы №23 не вывозятся неделю. Запах распространяется на детскую площадку. Связались с компанией-подрядчиком.',
    priority: 3,
    count: 43,
    countLabel: 'жалобы'
  },
  {
    id: 5,
    status: 'urgent',
    statusText: 'Срочно',
    date: '08.11.2025',
    title: 'Нет отопления в домах на ул. Кенесары',
    description: 'При температуре -15°C жители домов 45-52 по ул. Кенесары остались без отопления. В квартирах с детьми критическая ситуация. Нужна немедленная помощь!',
    priority: 5,
    count: 201,
    countLabel: 'жалоба'
  }
]

const handleNewsClick = (news: any) => {
  console.log('News clicked:', news)
  // Здесь можно добавить навигацию или открытие модального окна
}
</script>

<style scoped>
/* Дополнительные кастомные анимации */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>