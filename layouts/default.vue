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
    <slot />
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