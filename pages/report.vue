<template>
  <div class="min-h-screen bg-[#0a0e1a] text-white p-8">
    <!-- Page Title -->
    <h1 class="text-4xl font-bold mb-8 tracking-wider">РЕПОРТЫ</h1>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      <div class="bg-[#1a2332] border border-cyan-900/30 rounded-lg p-6">
        <div class="text-cyan-500 text-sm mb-2 uppercase">Отправлено репортов</div>
        <div class="text-5xl font-bold text-cyan-400">{{ totalReports }}</div>
      </div>

      <div class="bg-[#1a2332] border border-cyan-900/30 rounded-lg p-6">
        <div class="text-cyan-500 text-sm mb-2 uppercase">Новые задачи</div>
        <div class="text-5xl font-bold text-purple-400">{{ newReports }}</div>
      </div>

      <div class="bg-[#1a2332] border border-cyan-900/30 rounded-lg p-6">
        <div class="text-cyan-500 text-sm mb-2 uppercase">Срочные</div>
        <div class="text-5xl font-bold text-red-400">{{ urgentReports }}</div>
      </div>

      <div class="bg-[#1a2332] border border-cyan-900/30 rounded-lg p-6">
        <div class="text-cyan-500 text-sm mb-2 uppercase">Вклад в сообщество</div>
        <div class="text-5xl font-bold text-cyan-400 flex items-center">
          <span class="text-3xl mr-2">★</span> 345 <span class="text-base ml-2 font-normal">очков</span>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
      <div class="flex items-center gap-4 flex-wrap">
        <span class="text-gray-400 uppercase tracking-wider">Фильтры:</span>
        <button 
          class="px-6 py-2 rounded font-medium transition"
          :class="selectedStatus === 'all' 
            ? 'bg-cyan-400 text-[#0a0e1a]' 
            : 'bg-[#1a2332] border border-cyan-900/30 text-cyan-400 hover:bg-cyan-900/20'"
          @click="selectedStatus = 'all'"
        >
          ВСЕ
        </button>
        <button 
          class="px-6 py-2 rounded font-medium transition"
          :class="selectedStatus === 'Новый' 
            ? 'bg-purple-400 text-white' 
            : 'bg-[#1a2332] border border-purple-900/30 text-purple-400 hover:bg-purple-900/20'"
          @click="selectedStatus = 'Новый'"
        >
          НОВЫЕ
        </button>
        <button 
          class="px-6 py-2 rounded font-medium transition"
          :class="selectedStatus === 'Срочно' 
            ? 'bg-red-400 text-white' 
            : 'bg-[#1a2332] border border-red-900/30 text-red-400 hover:bg-red-900/20'"
          @click="selectedStatus = 'Срочно'"
        >
          СРОЧНО
        </button>
        <button 
          class="px-6 py-2 rounded font-medium transition"
          :class="selectedStatus === 'Решено' 
            ? 'bg-cyan-400 text-[#0a0e1a]' 
            : 'bg-[#1a2332] border border-cyan-900/30 text-cyan-400 hover:bg-cyan-900/20'"
          @click="selectedStatus = 'Решено'"
        >
          РЕШЕНО
        </button>
        <button 
          class="px-6 py-2 rounded font-medium transition"
          :class="selectedStatus === 'В процессе' 
            ? 'bg-cyan-400 text-[#0a0e1a]' 
            : 'bg-[#1a2332] border border-cyan-900/30 text-cyan-400 hover:bg-cyan-900/20'"
          @click="selectedStatus = 'В процессе'"
        >
          В ПРОЦЕССЕ
        </button>
      </div>

      <div class="flex items-center gap-4">
        <span class="text-gray-400 uppercase tracking-wider">Сортировка:</span>
        <button class="bg-[#1a2332] border border-cyan-900/30 text-cyan-400 px-6 py-2 rounded hover:bg-cyan-900/20 transition">
          ПО ДАТЕ (НОВЫЕ ПЕРВЫЕ)
        </button>
      </div>
    </div>

    <!-- Reports List -->
    <div class="bg-[#0f1621] border border-cyan-900/30 rounded-lg p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-cyan-400 tracking-wider">
          СПИСОК РЕПОРТОВ 
          <span class="text-sm text-gray-400 ml-2">
            ({{ filteredReports.length }} из {{ totalReports }})
          </span>
        </h2>
        <span class="text-cyan-500 text-sm">07.11.2024</span>
      </div>

      <div class="space-y-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">            
          <div class="style-report" 
               v-for="(report, index) in paginatedReports" 
               :key="report.id"
               :class="getReportCardClass(report)">
            <div class="style-photo" :class="getPhotoClass(report)">
              <div v-if="report.status === 'Новый'" class="w-full h-full flex items-center justify-center bg-purple-900/20">
                <span class="text-2xl">🆕</span>
              </div>
              <div v-else-if="report.status === 'Срочно'" class="w-full h-full flex items-center justify-center bg-red-900/20">
                <span class="text-2xl">🔥</span>
              </div>
            </div>
            <div class="flex-1">
              <h3 class="font-medium mb-2" :class="getStatusColorClass(report.status)">{{ report.title }}</h3>
              <div class="flex items-center gap-4 text-sm">
                <span class="text-gray-400">{{ report.date }}</span>
                <span :class="['flex items-center gap-2', getStatusColorClass(report.status)]">
                  {{ report.status }} 
                  <span :class="['w-3 h-3 rounded-full', getStatusDotClass(report.status)]"></span>
                </span>
              </div>
              <p v-if="report.description" class="text-gray-400 text-sm mt-2">{{ report.description }}</p>
              
              <!-- Progress Bar -->
              <div v-if="report.progress" class="mt-3">
                <div class="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Прогресс</span>
                  <span>{{ report.progress }}%</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    class="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                    :style="{ width: report.progress + '%' }"
                  ></div>
                </div>
              </div>
              
              <!-- Tags -->
              <div v-if="report.tags && report.tags.length" class="flex flex-wrap gap-1 mt-2">
                <span 
                  v-for="tag in report.tags" 
                  :key="tag"
                  class="text-xs bg-cyan-900/30 text-cyan-300 px-2 py-1 rounded"
                >
                  {{ tag }}
                </span>
              </div>
              
              <!-- New Badge -->
              <div v-if="report.status === 'Новый'" class="mt-3">
                <span class="bg-purple-500 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                  🆕 НОВАЯ ЗАДАЧА
                </span>
              </div>
            </div>
            <!-- Urgent Badge -->
            <div v-if="report.status === 'Срочно'" class="absolute top-2 right-2">
              <span class="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                🔥 СРОЧНО
              </span>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredReports.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">📝</div>
          <h3 class="text-xl text-gray-400 mb-2">Нет репортов</h3>
          <p class="text-gray-500">Для выбранного фильтра репорты не найдены</p>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-center gap-4 mt-8">
        <button 
          @click="prevPage"
          :disabled="currentPage === 1"
          class="text-cyan-400 hover:text-cyan-300 transition disabled:text-gray-600"
        >
          «
        </button>
        <button 
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="[
            'w-10 h-10 rounded font-medium transition',
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
          class="text-cyan-400 hover:text-cyan-300 transition disabled:text-gray-600"
        >
          »
        </button>
      </div>
    </div>

    <!-- Decorative Star -->
    <div class="fixed bottom-8 right-8 text-cyan-400 text-6xl opacity-30 pointer-events-none">✦</div>
  </div>
</template>

<script setup lang="ts">
import { useReports } from '@/composables/useReports'

const {
  selectedStatus,
  searchQuery,
  currentPage,
  filteredReports,
  paginatedReports,
  totalReports,
  newReports,
  solvedReports,
  urgentReports,
  totalPages,
  getStatusColorClass,
  getStatusDotClass,
  getReportCardClass,
  getPhotoClass,
  formatDate,
  nextPage,
  prevPage,
  addReport,
  updateReport,
  deleteReport
} = useReports()
</script>

<style scoped>
.style-report {
  @apply bg-[#1a2332] border border-cyan-900/30 rounded-lg p-4 flex items-center gap-4 hover:bg-cyan-900/10 transition cursor-pointer relative;
}
.style-photo {
  @apply w-24 h-24 rounded bg-gray-700 flex-shrink-0 overflow-hidden;
}
</style>