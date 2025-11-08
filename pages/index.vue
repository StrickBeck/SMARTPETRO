<template>
  <div class="min-h-screen bg-[#0a0e17] text-[#00d9ff] p-5">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <header class="text-center mb-10 border-2 border-[#1a3a52] rounded-3xl p-8 bg-gradient-to-br from-[#0a0e17] to-[#0d1520] shadow-[0_0_30px_rgba(0,217,255,0.1)]">
        <h1 class="text-5xl font-bold tracking-[0.5em] mb-4 [text-shadow:_0_0_20px_rgba(0,217,255,0.5)]">
          SMARTPETRO
        </h1>
        
        <div class="w-20 h-20 border-4 border-[#00d9ff] rounded-full mx-auto my-5 relative flex items-center justify-center">
          <div class="absolute w-12 h-12 border-2 border-[#00d9ff] rounded-full"></div>
          <div class="absolute w-5 h-5 bg-[#00d9ff] rounded-full shadow-[0_0_20px_rgba(0,217,255,0.8)]"></div>
        </div>

        <div class="flex gap-5 justify-center mt-5">
          <button
            @click="currentLang = 'ru'"
            :class="[
              'bg-transparent border-2 px-8 py-3 rounded-xl cursor-pointer transition-all uppercase tracking-wider',
              currentLang === 'ru' 
                ? 'border-[#00d9ff] bg-[#00d9ff] text-[#0a0e17] shadow-[0_0_20px_rgba(0,217,255,0.5)]' 
                : 'border-[#1a3a52] text-[#00d9ff] hover:border-[#00d9ff]'
            ]"
          >
            Русский
          </button>
          <button
            @click="currentLang = 'kz'"
            :class="[
              'bg-transparent border-2 px-8 py-3 rounded-xl cursor-pointer transition-all uppercase tracking-wider',
              currentLang === 'kz' 
                ? 'border-[#00d9ff] bg-[#00d9ff] text-[#0a0e17] shadow-[0_0_20px_rgba(0,217,255,0.5)]' 
                : 'border-[#1a3a52] text-[#00d9ff] hover:border-[#00d9ff]'
            ]"
          >
            Қазақ тілі
          </button>
        </div>
      </header>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="bg-[#0d1520] border-2 border-[#1a3a52] rounded-2xl p-6 text-center transition-all hover:border-[#00d9ff] hover:shadow-[0_0_25px_rgba(0,217,255,0.3)] hover:-translate-y-1"
        >
          <div class="text-sm uppercase tracking-wider opacity-70">{{ stat.label }}</div>
          <div class="text-4xl font-bold my-3">{{ stat.value }}</div>
        </div>
      </div>

      <!-- Section Title -->
      <h2 class="text-3xl uppercase tracking-[0.25em] my-10 pl-4 border-l-4 border-[#00d9ff]">
        Последние новости
      </h2>

      <!-- News Grid -->
      <div class="grid gap-5 mb-10">
        <div
          v-for="news in newsItems"
          :key="news.id"
          class="bg-[#0d1520] border-2 border-[#1a3a52] rounded-2xl p-6 transition-all cursor-pointer hover:border-[#00d9ff] hover:shadow-[0_0_25px_rgba(0,217,255,0.2)]"
          @click="handleNewsClick(news)"
        >
          <!-- News Header -->
          <div class="flex justify-between items-center mb-4">
            <div class="flex items-center gap-3">
              <span
                :class="[
                  'px-4 py-1 rounded-full text-xs uppercase tracking-wider',
                  news.status === 'urgent' && 'bg-red-500/20 border border-red-500 text-red-400 animate-pulse',
                  news.status === 'active' && 'bg-yellow-500/20 border border-yellow-500 text-yellow-400',
                  news.status === 'resolved' && 'bg-green-500/20 border border-green-500 text-green-400'
                ]"
              >
                {{ news.statusText }}
              </span>
            </div>
            <div class="text-xs opacity-60">{{ news.date }}</div>
          </div>

          <!-- News Title -->
          <h3 class="text-xl font-bold mb-3">{{ news.title }}</h3>

          <!-- News Description -->
          <p class="opacity-80 leading-relaxed mb-4">{{ news.description }}</p>

          <!-- News Footer -->
          <div class="flex justify-between items-center pt-4 border-t border-[#1a3a52]">
            <div class="flex gap-1">
              <span
                v-for="i in 5"
                :key="i"
                :class="[
                  'text-yellow-400 text-lg',
                  i > news.priority && 'opacity-30'
                ]"
              >
                ★
              </span>
            </div>
            <div>{{ news.count }} {{ news.countLabel }}</div>
          </div>
        </div>
      </div>

      <!-- Mission Button -->
      <div class="text-center mt-10">
        <button
          class="bg-transparent border-2 border-[#00d9ff] text-[#00d9ff] px-10 py-4 rounded-xl text-lg uppercase tracking-wider transition-all hover:bg-[#00d9ff] hover:text-[#0a0e17] hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] hover:scale-105"
        >
          Получить миссию
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentLang = ref('ru')

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
/* Дополнительные кастомные стили если нужны */
</style>