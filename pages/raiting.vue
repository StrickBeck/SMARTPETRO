<template>
  <div class="min-h-screen bg-[#0a0e17] text-white p-4 sm:p-5">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <header
        class="text-center mb-8 sm:mb-10 border-2 border-[#1a3a52] rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0a0e17] to-[#0d1520] shadow-[0_0_30px_rgba(0,217,255,0.1)]"
      >
        <h1
          class="text-3xl sm:text-5xl font-bold tracking-[0.3em] sm:tracking-[0.5em] mb-4 text-[#00d9ff] [text-shadow:_0_0_20px_rgba(0,217,255,0.5)]"
        >
          SMARTPETRO
        </h1>

        <div
          class="w-16 h-16 sm:w-20 sm:h-20 border-4 border-[#00d9ff] rounded-full mx-auto my-4 relative flex items-center justify-center"
        >
          <div class="absolute w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#00d9ff] rounded-full"></div>
          <div class="absolute w-4 h-4 sm:w-5 sm:h-5 bg-[#00d9ff] rounded-full shadow-[0_0_20px_rgba(0,217,255,0.8)]"></div>
        </div>

        <h2 class="text-xl sm:text-3xl text-[#00d9ff] mb-3 sm:mb-4">
          РЕЙТИНГ КОМПАНИЙ
        </h2>
        <p class="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto px-2">
          Рейтинг компаний основан на эффективности решения проблем,
          скорости реагирования и отзывах граждан
        </p>
      </header>

      <!-- Stats Overview -->
      <div
        class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-8 sm:mb-10"
      >
        <div
          class="bg-[#0d1520] border-2 border-[#1a3a52] rounded-2xl p-4 sm:p-6 text-center transition-all hover:border-[#00d9ff] hover:shadow-[0_0_25px_rgba(0,217,255,0.3)]"
        >
          <div class="text-xs sm:text-sm uppercase opacity-70">
            Всего компаний
          </div>
          <div class="text-2xl sm:text-4xl font-bold my-2 sm:my-3 text-[#00d9ff]">
            {{ totalCompanies }}
          </div>
        </div>

        <div
          class="bg-[#0d1520] border-2 border-[#1a3a52] rounded-2xl p-4 sm:p-6 text-center transition-all hover:border-[#00ff88] hover:shadow-[0_0_25px_rgba(0,255,136,0.3)]"
        >
          <div class="text-xs sm:text-sm uppercase opacity-70">
            Высокий рейтинг
          </div>
          <div class="text-2xl sm:text-4xl font-bold my-2 sm:my-3 text-[#00ff88]">
            {{ highRatedCompanies }}
          </div>
        </div>

        <div
          class="bg-[#0d1520] border-2 border-[#1a3a52] rounded-2xl p-4 sm:p-6 text-center transition-all hover:border-[#ffaa00] hover:shadow-[0_0_25px_rgba(255,170,0,0.3)]"
        >
          <div class="text-xs sm:text-sm uppercase opacity-70">
            Средний рейтинг
          </div>
          <div class="text-2xl sm:text-4xl font-bold my-2 sm:my-3 text-[#ffaa00]">
            {{ mediumRatedCompanies }}
          </div>
        </div>

        <div
          class="bg-[#0d1520] border-2 border-[#1a3a52] rounded-2xl p-4 sm:p-6 text-center transition-all hover:border-[#ff4444] hover:shadow-[0_0_25px_rgba(255,68,68,0.3)]"
        >
          <div class="text-xs sm:text-sm uppercase opacity-70">
            Низкий рейтинг
          </div>
          <div class="text-2xl sm:text-4xl font-bold my-2 sm:my-3 text-[#ff4444]">
            {{ lowRatedCompanies }}
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div
        class="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8"
      >
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Поиск компании..."
            class="w-full bg-[#0d1520] border-2 border-[#1a3a52] text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl focus:outline-none focus:border-[#00d9ff] transition-all pr-10 sm:pr-12 text-sm sm:text-base"
          />
        </div>

        <div
          class="flex gap-3 sm:gap-4 items-center flex-wrap justify-between sm:justify-start"
        >
          <select
            v-model="selectedCategory"
            class="bg-[#0d1520] border-2 border-[#1a3a52] text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl focus:outline-none focus:border-[#00d9ff] transition-all text-sm sm:text-base w-full sm:w-auto"
          >
            <option value="all">Все категории</option>
            <option value="ЖКХ">ЖКХ</option>
            <option value="Транспорт">Транспорт</option>
            <option value="Энергетика">Энергетика</option>
            <option value="Строительство">Строительство</option>
            <option value="Благоустройство">Благоустройство</option>
          </select>

          <select
            v-model="sortBy"
            class="bg-[#0d1520] border-2 border-[#1a3a52] text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl focus:outline-none focus:border-[#00d9ff] transition-all text-sm sm:text-base w-full sm:w-auto"
          >
            <option value="rating-desc">По рейтингу (убыв.)</option>
            <option value="rating-asc">По рейтингу (возр.)</option>
            <option value="problems-desc">По количеству проблем</option>
            <option value="solved-desc">По решенным проблемам</option>
            <option value="name-asc">По названию (А-Я)</option>
          </select>
        </div>
      </div>

      <!-- Companies List -->
      <div class="space-y-4">
        <div
          v-for="company in filteredCompanies"
          :key="company.id"
          class="bg-[#0d1520] border-2 border-[#1a3a52] rounded-2xl p-4 sm:p-6 transition-all hover:border-[#00d9ff] hover:shadow-[0_0_25px_rgba(0,217,255,0.2)] cursor-pointer"
          @click="selectCompany(company)"
        >
          <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div class="flex items-center gap-3 sm:gap-6">
              <div
                class="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white/10 flex items-center justify-center border-2 border-white/20 flex-shrink-0"
              >
                <span class="text-lg sm:text-xl">{{ company.emoji }}</span>
              </div>
              <div>
                <h3 class="text-lg sm:text-xl font-bold mb-1">{{ company.name }}</h3>
                <div class="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-400">
                  <span class="bg-[#00d9ff]/20 text-[#00d9ff] px-2 py-1 rounded-full">
                    {{ company.category }}
                  </span>
                  <span>{{ company.region }}</span>
                </div>
              </div>
            </div>

            <div class="flex-1 text-right sm:text-right">
              <span
                class="text-lg sm:text-xl font-bold"
                :class="getRatingColorClass(company.rating)"
              >
                {{ company.rating.toFixed(1) }}
              </span>
              <div class="text-xs text-gray-400">
                {{ company.reviews }} отзывов
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div
          v-if="filteredCompanies.length === 0"
          class="text-center py-12 border-2 border-[#1a3a52] rounded-2xl"
        >
          <div class="text-5xl mb-4 opacity-50">🏢</div>
          <h3 class="text-lg opacity-70 mb-2">Компании не найдены</h3>
          <p class="opacity-50 text-sm">
            Попробуйте изменить параметры поиска или фильтрации
          </p>
        </div>
      </div>

      <!-- Modal -->
      <div
        v-if="selectedCompany"
        class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2 sm:p-4"
      >
        <div
          class="bg-[#0d1520] border-2 border-[#00d9ff] rounded-2xl p-4 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto"
        >
          <div class="flex justify-between items-start mb-4 sm:mb-6">
            <div class="flex items-center gap-3 sm:gap-4">
              <div
                class="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white/10 flex items-center justify-center border-2 border-white/20"
              >
                <span class="text-xl sm:text-2xl">{{ selectedCompany.emoji }}</span>
              </div>
              <div>
                <h3 class="text-xl sm:text-2xl font-bold text-[#00d9ff]">
                  {{ selectedCompany.name }}
                </h3>
                <p class="text-gray-400 text-xs sm:text-sm">
                  {{ selectedCompany.category }} • {{ selectedCompany.region }}
                </p>
              </div>
            </div>
            <button
              @click="selectedCompany = null"
              class="text-gray-400 hover:text-white text-xl sm:text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Улучшенная мобильная типографика */
@media (max-width: 640px) {
  h1, h2, h3 {
    line-height: 1.2;
  }
  input, select {
    font-size: 14px !important;
  }
}
</style>


<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

interface Company {
  id: number
  position: number
  name: string
  category: string
  region: string
  rating: number
  totalProblems: number
  solvedProblems: number
  inProgress: number
  efficiency: number
  reviews: number
  emoji: string
  recentReviews: Review[]
}

interface Review {
  id: number
  author: string
  rating: number
  text: string
  date: string
}

// Реактивные данные
const searchQuery = ref('')
const selectedCategory = ref('all')
const sortBy = ref('rating-desc')
const selectedCompany = ref<Company | null>(null)

// Данные компаний
const companies = reactive<Company[]>([
  {
    id: 1,
    position: 1,
    name: 'Петропавловск-Жылу',
    category: 'ЖКХ',
    region: 'Петропавловск',
    rating: 4.8,
    totalProblems: 156,
    solvedProblems: 148,
    inProgress: 8,
    efficiency: 95,
    reviews: 89,
    emoji: '🏢',
    recentReviews: [
      { id: 1, author: 'Алия К.', rating: 5, text: 'Очень быстро отреагировали на проблему с отоплением. Спасибо!', date: '05.11.2024' },
      { id: 2, author: 'Марат С.', rating: 4, text: 'Хорошая работа, но можно было бы быстрее.', date: '03.11.2024' }
    ]
  },
  {
    id: 2,
    position: 2,
    name: 'Казахстанские Железные Дороги',
    category: 'Транспорт',
    region: 'По всей стране',
    rating: 4.6,
    totalProblems: 234,
    solvedProblems: 218,
    inProgress: 16,
    efficiency: 93,
    reviews: 156,
    emoji: '🚆',
    recentReviews: [
      { id: 1, author: 'Дамир Ж.', rating: 5, text: 'Отличный сервис, проблемы решаются оперативно.', date: '06.11.2024' }
    ]
  },
  {
    id: 3,
    position: 3,
    name: 'KEGOC',
    category: 'Энергетика',
    region: 'По всей стране',
    rating: 4.5,
    totalProblems: 189,
    solvedProblems: 175,
    inProgress: 14,
    efficiency: 92,
    reviews: 112,
    emoji: '⚡',
    recentReviews: [
      { id: 1, author: 'Гульнара Т.', rating: 4, text: 'Хорошая компания, но есть куда расти.', date: '04.11.2024' }
    ]
  },
  {
    id: 4,
    position: 4,
    name: 'Петропавловск ЛЭС',
    category: 'Энергетика',
    region: 'Петропавловск',
    rating: 4.3,
    totalProblems: 167,
    solvedProblems: 152,
    inProgress: 15,
    efficiency: 91,
    reviews: 78,
    emoji: '💡',
    recentReviews: []
  },
  {
    id: 5,
    position: 5,
    name: 'Спецавтохозяйство',
    category: 'Благоустройство',
    region: 'Петропавловск',
    rating: 4.2,
    totalProblems: 198,
    solvedProblems: 178,
    inProgress: 20,
    efficiency: 90,
    reviews: 94,
    emoji: '🚛',
    recentReviews: []
  },
  {
    id: 6,
    position: 6,
    name: 'Петропавловск Су Арнасы',
    category: 'ЖКХ',
    region: 'Петропавловск',
    rating: 4.0,
    totalProblems: 145,
    solvedProblems: 128,
    inProgress: 17,
    efficiency: 88,
    reviews: 67,
    emoji: '💧',
    recentReviews: []
  },
  {
    id: 7,
    position: 7,
    name: 'КазАвтоЖол',
    category: 'Транспорт',
    region: 'По всей стране',
    rating: 3.8,
    totalProblems: 276,
    solvedProblems: 234,
    inProgress: 42,
    efficiency: 85,
    reviews: 134,
    emoji: '🛣️',
    recentReviews: []
  },
  {
    id: 8,
    position: 8,
    name: 'BI Group',
    category: 'Строительство',
    region: 'По всей стране',
    rating: 3.5,
    totalProblems: 89,
    solvedProblems: 72,
    inProgress: 17,
    efficiency: 81,
    reviews: 45,
    emoji: '🏗️',
    recentReviews: []
  }
])

// Computed properties
const filteredCompanies = computed(() => {
  let filtered = companies.filter(company => 
    company.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    company.category.toLowerCase().includes(searchQuery.value.toLowerCase())
  )

  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(company => company.category === selectedCategory.value)
  }

  // Сортировка
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'rating-desc': return b.rating - a.rating
      case 'rating-asc': return a.rating - b.rating
      case 'problems-desc': return b.totalProblems - a.totalProblems
      case 'solved-desc': return b.solvedProblems - a.solvedProblems
      case 'name-asc': return a.name.localeCompare(b.name)
      default: return b.rating - a.rating
    }
  })

  return filtered
})

const topCompanies = computed(() => filteredCompanies.value.slice(0, 3))
const totalCompanies = computed(() => companies.length)
const highRatedCompanies = computed(() => companies.filter(c => c.rating >= 4.0).length)
const mediumRatedCompanies = computed(() => companies.filter(c => c.rating >= 3.0 && c.rating < 4.0).length)
const lowRatedCompanies = computed(() => companies.filter(c => c.rating < 3.0).length)

// Методы
const getTopCompanyClass = (index: number): string => {
  switch (index) {
    case 0: return 'from-yellow-500/20 to-yellow-600/10 border-yellow-500'
    case 1: return 'from-gray-400/20 to-gray-500/10 border-gray-400'
    case 2: return 'from-orange-500/20 to-orange-600/10 border-orange-500'
    default: return 'from-[#00d9ff]/20 to-[#00d9ff]/10 border-[#00d9ff]'
  }
}

const getRatingColorClass = (rating: number): string => {
  if (rating >= 4.0) return 'text-[#00ff88]'
  if (rating >= 3.0) return 'text-[#ffaa00]'
  return 'text-[#ff4444]'
}

const getEfficiencyColorClass = (efficiency: number): string => {
  if (efficiency >= 90) return 'bg-[#00ff88]'
  if (efficiency >= 70) return 'bg-[#ffaa00]'
  return 'bg-[#ff4444]'
}

const getReviewBorderClass = (rating: number): string => {
  if (rating >= 4) return 'border-[#00ff88]'
  if (rating >= 3) return 'border-[#ffaa00]'
  return 'border-[#ff4444]'
}

const selectCompany = (company: Company) => {
  selectedCompany.value = company
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>