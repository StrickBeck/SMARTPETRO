<template>
  <div class="min-h-screen bg-[#0a0e1a] text-white px-4 sm:px-6 md:px-8 py-6">
    <!-- Page Title -->
    <h1 class="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 tracking-wider text-center sm:text-left">
      РЕПОРТЫ
    </h1>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
      <div class="bg-[#1a2332] border border-cyan-900/30 rounded-lg p-4 sm:p-6 text-center sm:text-left">
        <div class="text-cyan-500 text-xs sm:text-sm mb-1 uppercase">Отправлено репортов</div>
        <div class="text-4xl sm:text-5xl font-bold text-cyan-400">{{ totalReports }}</div>
      </div>

      <div class="bg-[#1a2332] border border-cyan-900/30 rounded-lg p-4 sm:p-6 text-center sm:text-left">
        <div class="text-cyan-500 text-xs sm:text-sm mb-1 uppercase">Новые задачи</div>
        <div class="text-4xl sm:text-5xl font-bold text-purple-400">{{ newReports }}</div>
      </div>

      <div class="bg-[#1a2332] border border-cyan-900/30 rounded-lg p-4 sm:p-6 text-center sm:text-left">
        <div class="text-cyan-500 text-xs sm:text-sm mb-1 uppercase">Срочные</div>
        <div class="text-4xl sm:text-5xl font-bold text-red-400">{{ urgentReports }}</div>
      </div>

      <div class="bg-[#1a2332] border border-cyan-900/30 rounded-lg p-4 sm:p-6 text-center sm:text-left">
        <div class="text-cyan-500 text-xs sm:text-sm mb-1 uppercase">Вклад в сообщество</div>
        <div class="text-3xl sm:text-5xl font-bold text-cyan-400 flex justify-center sm:justify-start items-center">
          <span class="text-2xl sm:text-3xl mr-2">★</span> 345 
          <span class="text-sm sm:text-base ml-1 font-normal">очков</span>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
      <div class="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
        <span class="text-gray-400 uppercase tracking-wider text-xs sm:text-sm">Фильтры:</span>
        <button 
          v-for="status in statusOptions"
          :key="status.value"
          class="px-4 py-2 text-xs sm:text-sm rounded font-medium transition"
          :class="selectedStatus === status.value 
            ? status.activeClass 
            : status.defaultClass"
          @click="selectedStatus = status.value"
        >
          {{ status.label }}
        </button>
      </div>

      <div class="flex justify-center sm:justify-end gap-2 sm:gap-4">
        <span class="text-gray-400 uppercase tracking-wider text-xs sm:text-sm">Сортировка:</span>
        <button class="bg-[#1a2332] border border-cyan-900/30 text-cyan-400 px-4 sm:px-6 py-2 rounded text-xs sm:text-sm hover:bg-cyan-900/20 transition">
          ПО ДАТЕ (НОВЫЕ ПЕРВЫЕ)
        </button>
      </div>
    </div>

    <!-- Reports List -->
    <div class="bg-[#0f1621] border border-cyan-900/30 rounded-lg p-4 sm:p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 text-center sm:text-left">
        <h2 class="text-xl sm:text-2xl font-bold text-cyan-400 tracking-wider mb-2 sm:mb-0">
          СПИСОК РЕПОРТОВ 
          <span class="text-xs sm:text-sm text-gray-400 ml-1 sm:ml-2">
            ({{ filteredReports.length }} из {{ totalReports }})
          </span>
        </h2>
        <span class="text-cyan-500 text-xs sm:text-sm">07.11.2024</span>
      </div>

      <div class="space-y-3 sm:space-y-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">            
          <div 
            class="style-report" 
            v-for="(report, index) in paginatedReports" 
            :key="report.id"
            :class="getReportCardClass(report)"
          >
            <div class="style-photo" :class="getPhotoClass(report)">
              <div v-if="report.status === 'Новый'" class="w-full h-full flex items-center justify-center bg-purple-900/20">
                <span class="text-xl sm:text-2xl">🆕</span>
              </div>
              <div v-else-if="report.status === 'Срочно'" class="w-full h-full flex items-center justify-center bg-red-900/20">
                <span class="text-xl sm:text-2xl">🔥</span>
              </div>
            </div>
            <div class="flex-1">
              <h3 class="font-medium mb-1 sm:mb-2 text-sm sm:text-base" :class="getStatusColorClass(report.status)">
                {{ report.title }}
              </h3>
              <div class="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                <span class="text-gray-400">{{ report.date }}</span>
                <span :class="['flex items-center gap-1', getStatusColorClass(report.status)]">
                  {{ report.status }} 
                  <span :class="['w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full', getStatusDotClass(report.status)]"></span>
                </span>
              </div>

              <p v-if="report.description" class="text-gray-400 text-xs sm:text-sm mt-2">{{ report.description }}</p>

              <!-- Progress Bar -->
              <div v-if="report.progress" class="mt-3">
                <div class="flex justify-between text-[10px] sm:text-xs text-gray-400 mb-1">
                  <span>Прогресс</span>
                  <span>{{ report.progress }}%</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-1.5 sm:h-2">
                  <div 
                    class="bg-yellow-400 h-1.5 sm:h-2 rounded-full transition-all duration-500"
                    :style="{ width: report.progress + '%' }"
                  ></div>
                </div>
              </div>

              <!-- Tags -->
              <div v-if="report.tags && report.tags.length" class="flex flex-wrap gap-1 mt-2">
                <span 
                  v-for="tag in report.tags" 
                  :key="tag"
                  class="text-[10px] sm:text-xs bg-cyan-900/30 text-cyan-300 px-2 py-1 rounded"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- New / Urgent Badges -->
              <div v-if="report.status === 'Новый'" class="mt-3">
                <span class="bg-purple-500 text-white text-[10px] sm:text-xs px-3 py-1 rounded-full animate-pulse">
                  🆕 НОВАЯ ЗАДАЧА
                </span>
              </div>
              <div v-if="report.status === 'Срочно'" class="absolute top-2 right-2">
                <span class="bg-red-500 text-white text-[10px] sm:text-xs px-2 py-1 rounded-full animate-pulse">
                  🔥 СРОЧНО
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredReports.length === 0" class="text-center py-12">
          <div class="text-5xl sm:text-6xl mb-3">📝</div>
          <h3 class="text-lg sm:text-xl text-gray-400 mb-2">Нет репортов</h3>
          <p class="text-gray-500 text-sm sm:text-base">Для выбранного фильтра репорты не найдены</p>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mt-6 sm:mt-8">
        <button 
          @click="prevPage"
          :disabled="currentPage === 1"
          class="text-cyan-400 hover:text-cyan-300 transition disabled:text-gray-600 text-sm"
        >
          «
        </button>
        <button 
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="[
            'w-8 h-8 sm:w-10 sm:h-10 rounded font-medium transition text-sm sm:text-base',
            currentPage === page 
              ? 'bg-cyan-400 text-[#0a0e1a]' 
              : 'text-cyan-400 hover:text-cyan-300'
          ]"
        >
          {{ page }}
        </button>
        <button 
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="text-cyan-400 hover:text-cyan-300 transition disabled:text-gray-600 text-sm"
        >
          »
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useReports } from '@/composables/useReports'

const {
  selectedStatus,
  currentPage,
  filteredReports,
  paginatedReports,
  totalReports,
  newReports,
  urgentReports,
  totalPages,
  getStatusColorClass,
  getStatusDotClass,
  getReportCardClass,
  getPhotoClass,
  nextPage,
  prevPage,
} = useReports()

// Список фильтров (для компактности)
const statusOptions = [
  { label: 'ВСЕ', value: 'all', activeClass: 'bg-cyan-400 text-[#0a0e1a]', defaultClass: 'bg-[#1a2332] border border-cyan-900/30 text-cyan-400 hover:bg-cyan-900/20' },
  { label: 'НОВЫЕ', value: 'Новый', activeClass: 'bg-purple-400 text-white', defaultClass: 'bg-[#1a2332] border border-purple-900/30 text-purple-400 hover:bg-purple-900/20' },
  { label: 'СРОЧНО', value: 'Срочно', activeClass: 'bg-red-400 text-white', defaultClass: 'bg-[#1a2332] border border-red-900/30 text-red-400 hover:bg-red-900/20' },
  { label: 'РЕШЕНО', value: 'Решено', activeClass: 'bg-cyan-400 text-[#0a0e1a]', defaultClass: 'bg-[#1a2332] border border-cyan-900/30 text-cyan-400 hover:bg-cyan-900/20' },
  { label: 'В ПРОЦЕССЕ', value: 'В процессе', activeClass: 'bg-cyan-400 text-[#0a0e1a]', defaultClass: 'bg-[#1a2332] border border-cyan-900/30 text-cyan-400 hover:bg-cyan-900/20' },
]
</script>

<style scoped>
.style-report {
  @apply bg-[#1a2332] border border-cyan-900/30 rounded-lg p-3 sm:p-4 flex items-start sm:items-center gap-3 sm:gap-4 hover:bg-cyan-900/10 transition cursor-pointer relative;
}
.style-photo {
  @apply w-20 h-20 sm:w-24 sm:h-24 rounded bg-gray-700 flex-shrink-0 overflow-hidden;
}
</style>
