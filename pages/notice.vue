<template>
  <div class="min-h-screen bg-[#0a0e1a] text-white p-4 sm:p-6 md:p-8">
    <div class="flex flex-col md:flex-row gap-6 md:gap-8">
      
      <!-- Sidebar / Filters -->
      <aside class="w-full md:w-80 space-y-6">
        <h1 class="text-3xl md:text-4xl font-bold tracking-wider text-cyan-400 text-center md:text-left">
          УВЕДОМЛЕНИЯ
        </h1>

        <!-- Фильтры -->
        <div class="grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
          <button 
            v-for="filter in filters"
            :key="filter.value"
            class="filter-btn"
            :class="selectedFilter === filter.value ? 'active' : ''"
            @click="selectedFilter = filter.value"
          >
            {{ filter.label }}
          </button>
        </div>

        <!-- Статус -->
        <div class="grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
          <button 
            v-for="status in statuses"
            :key="status.value"
            class="filter-btn"
            :class="selectedStatus === status.value ? 'active' : ''"
            @click="selectedStatus = status.value"
          >
            {{ status.label }}
          </button>
        </div>

        <!-- Действия -->
        <div class="space-y-2 text-sm uppercase tracking-wider text-center md:text-left">
          <button 
            @click="markAllAsRead"
            class="text-cyan-400 hover:text-cyan-300 transition w-full"
          >
            Отметить все как прочитанные
          </button>
          <button 
            @click="clearAllNotifications"
            class="text-red-400 hover:text-red-300 transition w-full"
          >
            Очистить все
          </button>
        </div>

        <!-- Сортировка -->
        <button 
          @click="toggleSortOrder"
          class="w-full bg-[#1a2332] border border-cyan-900/30 text-cyan-400 px-6 py-2 rounded hover:bg-cyan-900/20 transition"
        >
          По дате {{ sortOrder === 'desc' ? '▼' : '▲' }}
        </button>

        <!-- Статистика -->
        <div class="pt-4 border-t border-cyan-900/30 text-sm space-y-1 text-center md:text-left">
          <div class="text-gray-400">Всего: {{ totalNotifications }}</div>
          <div class="text-cyan-400">Новые: {{ unreadNotifications }}</div>
          <div class="text-green-400">Прочитанные: {{ readNotifications }}</div>
        </div>
      </aside>

      <!-- Notifications List -->
      <section class="flex-1">
        <div class="bg-[#0f1621] border border-cyan-900/30 rounded-lg p-4 sm:p-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 class="text-xl sm:text-2xl font-bold text-cyan-400 tracking-wider mb-2 sm:mb-0">
              Список уведомлений
            </h2>
            <span class="text-cyan-500 text-sm">{{ currentDate }}</span>
          </div>

          <!-- Список -->
          <div v-if="filteredNotifications.length" class="space-y-4">
            <article 
              v-for="n in filteredNotifications"
              :key="n.id"
              class="notification-card"
              :class="{ 'highlight': n.isNew }"
            >
              <div class="flex gap-4 flex-1">
                <div class="text-cyan-400 text-2xl mt-1">{{ n.isNew ? '🔔' : '🔕' }}</div>
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-1">
                    <h3 class="text-cyan-400 font-medium">{{ n.title }}</h3>
                    <span v-if="n.isNew" class="badge">Новое</span>
                  </div>
                  <p class="text-gray-400 text-sm">{{ n.description }}</p>
                  <div class="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>ID: {{ n.id }}</span>
                    <span>Тип: {{ n.type }}</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <button 
                  class="read-toggle"
                  :class="n.read ? 'read' : 'unread'"
                  @click="toggleReadStatus(n.id)"
                >
                  {{ n.read ? '✓' : '' }}
                </button>
                <span class="text-gray-400 text-xs">{{ n.date }}</span>
                <button 
                  @click="handleAction(n)"
                  class="action-btn"
                >
                  {{ getActionText(n.type) }}
                </button>
                <button 
                  @click="deleteNotification(n.id)"
                  class="delete-btn"
                >
                  ×
                </button>
              </div>
            </article>
          </div>

          <!-- Пусто -->
          <div v-else class="text-center py-12">
            <div class="text-5xl mb-3 text-gray-600">🔕</div>
            <h3 class="text-lg text-gray-400 mb-1">Уведомлений нет</h3>
            <p class="text-gray-500 text-sm">Здесь появятся новые уведомления</p>
          </div>

          <!-- Пагинация -->
          <div class="flex items-center justify-center gap-3 mt-6 text-sm">
            <button @click="prevPage" :disabled="currentPage === 1" class="page-btn">«</button>
            <button 
              v-for="page in visiblePages"
              :key="page"
              @click="currentPage = page"
              class="page-num"
              :class="{ active: currentPage === page }"
            >
              {{ page }}
            </button>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="page-btn">»</button>
          </div>
        </div>
      </section>
    </div>

    <!-- Декор -->
    <div class="fixed bottom-4 right-4 text-cyan-400 text-5xl opacity-20 pointer-events-none">✦</div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const selectedFilter = ref('all')
const selectedStatus = ref('all')
const sortOrder = ref('desc')
const currentPage = ref(1)
const itemsPerPage = 5

const filters = [
  { value: 'all', label: 'Все' },
  { value: 'new', label: 'Новые' }
]

const statuses = [
  { value: 'all', label: 'Все' },
  { value: 'read', label: 'Прочитанные' }
]

const notifications = reactive([
  { id: 1, title: 'Ваш отчет выполнен', description: 'Проблема решена', type: 'report_completed', date: '10.11.2024', read: true, isNew: false },
  { id: 2, title: 'Новая миссия доступна', description: 'Посадите деревья в парке', type: 'new_mission', date: '10.11.2024', read: true, isNew: false },
  { id: 3, title: 'Получены бонусы', description: 'Бонус: +50 очков', type: 'bonus_received', date: '09.11.2024', read: false, isNew: true },
  { id: 4, title: 'Жалоба принята', description: 'Жалоба №2266 на рассмотрении', type: 'complaint_accepted', date: '09.11.2024', read: false, isNew: true },
  { id: 5, title: 'Новое сообщение', description: 'От администратора', type: 'new_message', date: '08.11.2024', read: false, isNew: true }
])

const filteredNotifications = computed(() => {
  let list = notifications.slice()

  if (selectedStatus.value === 'read') list = list.filter(n => n.read)
  if (selectedFilter.value === 'new') list = list.filter(n => n.isNew)

  list.sort((a, b) => {
    const dA = new Date(a.date.split('.').reverse().join('-'))
    const dB = new Date(b.date.split('.').reverse().join('-'))
    return sortOrder.value === 'desc' ? dB - dA : dA - dB
  })

  const start = (currentPage.value - 1) * itemsPerPage
  return list.slice(start, start + itemsPerPage)
})

const totalNotifications = computed(() => notifications.length)
const unreadNotifications = computed(() => notifications.filter(n => !n.read).length)
const readNotifications = computed(() => notifications.filter(n => n.read).length)
const totalPages = computed(() => Math.ceil(notifications.length / itemsPerPage))
const visiblePages = computed(() => Array.from({ length: totalPages.value }, (_, i) => i + 1))
const currentDate = computed(() => new Date().toLocaleDateString('ru-RU'))

function toggleReadStatus(id) {
  const n = notifications.find(n => n.id === id)
  if (n) { n.read = !n.read; if (n.read) n.isNew = false }
}

const markAllAsRead = () => notifications.forEach(n => (n.read = true, n.isNew = false))
const clearAllNotifications = () => notifications.splice(0)
const deleteNotification = id => notifications.splice(notifications.findIndex(n => n.id === id), 1)
const toggleSortOrder = () => (sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc')
const nextPage = () => currentPage.value < totalPages.value && currentPage.value++
const prevPage = () => currentPage.value > 1 && currentPage.value--

function handleAction(n) {
  const actions = {
    report_completed: 'Переход к отчету',
    new_mission: 'Принятие миссии',
    bonus_received: 'Просмотр бонусов',
    complaint_accepted: 'Просмотр жалобы',
    new_message: 'Переход к сообщениям'
  }
  alert(actions[n.type] || 'Действие')
  if (!n.read) toggleReadStatus(n.id)
}

function getActionText(type) {
  const map = {
    report_completed: 'ПРОСМОТР',
    new_mission: 'ПРИНЯТЬ',
    bonus_received: 'ПОСМОТРЕТЬ',
    complaint_accepted: 'ПРОСМОТР',
    new_message: 'ОТКРЫТЬ'
  }
  return map[type] || 'ДЕЙСТВИЕ'
}

onMounted(() => console.log('Notifications ready'))
</script>

<style scoped>
.filter-btn {
  @apply bg-[#1a2332] border border-cyan-900/30 text-cyan-400 px-4 py-2 rounded font-medium transition;
}
.filter-btn.active {
  @apply bg-cyan-400 text-[#0a0e1a];
}
.notification-card {
  @apply bg-[#1a2332] border border-cyan-900/50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 transition-all hover:border-cyan-400/50;
}
.notification-card.highlight {
  @apply border-cyan-400/50 bg-cyan-900/10;
}
.badge {
  @apply bg-cyan-400 text-[#0a0e1a] px-2 py-0.5 rounded text-xs font-semibold uppercase;
}
.read-toggle {
  @apply w-5 h-5 border-2 rounded flex items-center justify-center cursor-pointer text-xs transition;
}
.read-toggle.read {
  @apply border-green-400 bg-green-400 text-[#0a0e1a];
}
.read-toggle.unread {
  @apply border-gray-400 hover:border-cyan-400;
}
.action-btn {
  @apply bg-cyan-400 text-[#0a0e1a] px-4 py-2 rounded font-medium hover:bg-cyan-300 transition text-xs sm:text-sm;
}
.delete-btn {
  @apply w-7 h-7 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-[#0a0e1a] transition flex items-center justify-center;
}
.page-btn, .page-num {
  @apply px-3 py-1 rounded transition;
}
.page-num.active {
  @apply bg-cyan-400 text-[#0a0e1a];
}
.page-btn:disabled {
  @apply text-gray-600 cursor-not-allowed;
}
</style>
