<template>
  <div class="min-h-screen bg-[#0a0e1a] text-white p-8">
    <div class="flex gap-8">
      <!-- Left Sidebar -->
      <div class="w-80 space-y-6">
        <h1 class="text-4xl font-bold tracking-wider text-cyan-400">УВЕДОМЛЕНИЯ</h1>

        <!-- Filter Section 1 -->
        <div class="space-y-3">
          <div class="text-gray-400 uppercase tracking-wider text-sm">ФИЛЬТРЫ:</div>
          <div class="flex gap-3">
            <button 
              class="px-6 py-2 rounded font-medium transition"
              :class="selectedFilter === 'all' 
                ? 'bg-cyan-400 text-[#0a0e1a]' 
                : 'bg-[#1a2332] border border-cyan-900/30 text-cyan-400 hover:bg-cyan-900/20'"
              @click="selectedFilter = 'all'"
            >
              ВСЕ
            </button>
            <button 
              class="px-6 py-2 rounded font-medium transition"
              :class="selectedFilter === 'new' 
                ? 'bg-cyan-400 text-[#0a0e1a]' 
                : 'bg-[#1a2332] border border-cyan-900/30 text-cyan-400 hover:bg-cyan-900/20'"
              @click="selectedFilter = 'new'"
            >
              НОВЫЕ
            </button>
          </div>
        </div>

        <!-- Filter Section 2 -->
        <div class="space-y-3">
          <div class="text-gray-400 uppercase tracking-wider text-sm">СТАТУС:</div>
          <div class="flex gap-3">
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
              :class="selectedStatus === 'read' 
                ? 'bg-cyan-400 text-[#0a0e1a]' 
                : 'bg-[#1a2332] border border-cyan-900/30 text-cyan-400 hover:bg-cyan-900/20'"
              @click="selectedStatus = 'read'"
            >
              ПРОЧИТАННЫЕ
            </button>
          </div>
        </div>

        <!-- Actions -->
        <div class="space-y-3">
          <button 
            @click="markAllAsRead"
            class="text-cyan-400 hover:text-cyan-300 transition uppercase tracking-wider text-sm w-full text-left"
          >
            ОТМЕТИТЬ ВСЕ КАК ПРОЧИТАННЫЕ
          </button>
          
          <button 
            @click="clearAllNotifications"
            class="text-red-400 hover:text-red-300 transition uppercase tracking-wider text-sm w-full text-left"
          >
            ОЧИСТИТЬ ВСЕ
          </button>
        </div>

        <!-- Sort Button -->
        <button 
          @click="toggleSortOrder"
          class="bg-[#1a2332] border border-cyan-900/30 text-cyan-400 px-6 py-2 rounded hover:bg-cyan-900/20 transition w-full"
        >
          ПО ДАТЕ {{ sortOrder === 'desc' ? '▼' : '▲' }}
        </button>

        <!-- Stats -->
        <div class="pt-4 border-t border-cyan-900/30">
          <div class="text-gray-400 text-sm">Всего: {{ totalNotifications }}</div>
          <div class="text-cyan-400 text-sm">Новые: {{ unreadNotifications }}</div>
          <div class="text-green-400 text-sm">Прочитанные: {{ readNotifications }}</div>
        </div>
      </div>

      <!-- Right Content Area -->
      <div class="flex-1">
        <div class="bg-[#0f1621] border border-cyan-900/30 rounded-lg p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-cyan-400 tracking-wider">СПИСОК УВЕДОМЛЕНИЙ</h2>
            <span class="text-cyan-500 text-sm">{{ currentDate }}</span>
          </div>

          <!-- Notifications List -->
          <div class="space-y-4" v-if="filteredNotifications.length > 0">
            <div 
              v-for="notification in filteredNotifications" 
              :key="notification.id"
              class="bg-[#1a2332] border border-cyan-900/50 rounded-lg p-6 flex items-start justify-between gap-4 transition-all hover:border-cyan-400/50"
              :class="{ 'border-cyan-400/50 bg-cyan-900/10': notification.isNew }"
            >
              <div class="flex gap-4 flex-1">
                <div class="text-cyan-400 text-2xl mt-1">
                  <span v-if="notification.isNew">🔔</span>
                  <span v-else>🔕</span>
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <h3 class="text-cyan-400 font-medium">{{ notification.title }}</h3>
                    <span 
                      v-if="notification.isNew"
                      class="bg-cyan-400 text-[#0a0e1a] px-2 py-1 rounded text-xs font-medium"
                    >
                      НОВОЕ
                    </span>
                  </div>
                  <p class="text-gray-400 text-sm">{{ notification.description }}</p>
                  <div class="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>ID: {{ notification.id }}</span>
                    <span>Тип: {{ notification.type }}</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-2 text-gray-400 text-sm">
                  <span 
                    class="w-5 h-5 border-2 rounded flex items-center justify-center cursor-pointer transition"
                    :class="notification.read 
                      ? 'border-green-400 bg-green-400 text-[#0a0e1a]' 
                      : 'border-gray-400 hover:border-cyan-400'"
                    @click="toggleReadStatus(notification.id)"
                  >
                    {{ notification.read ? '✓' : '' }}
                  </span>
                  {{ notification.date }}
                </div>
                <button 
                  @click="handleAction(notification)"
                  class="bg-cyan-400 text-[#0a0e1a] px-6 py-2 rounded font-medium hover:bg-cyan-300 transition whitespace-nowrap"
                >
                  {{ getActionText(notification.type) }}
                </button>
                <button 
                  @click="deleteNotification(notification.id)"
                  class="w-8 h-8 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-[#0a0e1a] transition flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <div class="text-6xl mb-4 text-gray-600">🔕</div>
            <h3 class="text-xl text-gray-400 mb-2">Уведомлений нет</h3>
            <p class="text-gray-500">Здесь появятся новые уведомления</p>
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
              @click="prevPage"
              :disabled="currentPage === 1"
              class="text-cyan-400 hover:text-cyan-300 transition disabled:text-gray-600"
            >
              ПРЕД.
            </button>
            
            <button 
              v-for="page in visiblePages"
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
              СЛЕД.
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
      </div>
    </div>

    <!-- Decorative Star -->
    <div class="fixed bottom-8 right-8 text-cyan-400 text-6xl opacity-30 pointer-events-none">✦</div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

// Reactive data
const selectedFilter = ref('all')
const selectedStatus = ref('all')
const sortOrder = ref('desc')
const currentPage = ref(1)
const itemsPerPage = ref(5)

// Notifications data
const notifications = reactive([
  {
    id: 1,
    title: 'Ваш отчет "Починка детской площадки" выполнен!',
    description: 'Проблема решена',
    type: 'report_completed',
    date: '10.11.2024',
    read: true,
    isNew: false
  },
  {
    id: 2,
    title: 'Новая миссия доступна!',
    description: 'Новая миссия: Посадите деревья в парке',
    type: 'new_mission',
    date: '10.11.2024',
    read: true,
    isNew: false
  },
  {
    id: 3,
    title: 'Получены бонусы за активность!',
    description: 'Бонус активности: +50 очков',
    type: 'bonus_received',
    date: '09.11.2024',
    read: false,
    isNew: true
  },
  {
    id: 4,
    title: 'Ваша жалоба принята',
    description: 'Жалоба №2266 на рассмотрении до 10.11.2024',
    type: 'complaint_accepted',
    date: '09.11.2024',
    read: false,
    isNew: true
  },
  {
    id: 5,
    title: 'Новое сообщение в чате',
    description: 'У вас новое сообщение от администратора',
    type: 'new_message',
    date: '08.11.2024',
    read: false,
    isNew: true
  }
])

// Computed properties
const filteredNotifications = computed(() => {
  let filtered = [...notifications]
  
  // Filter by status
  if (selectedStatus.value === 'read') {
    filtered = filtered.filter(n => n.read)
  } else if (selectedStatus.value === 'unread') {
    filtered = filtered.filter(n => !n.read)
  }
  
  // Filter by new
  if (selectedFilter.value === 'new') {
    filtered = filtered.filter(n => n.isNew)
  }
  
  // Sort by date
  filtered.sort((a, b) => {
    const dateA = new Date(a.date.split('.').reverse().join('-'))
    const dateB = new Date(b.date.split('.').reverse().join('-'))
    return sortOrder.value === 'desc' ? dateB - dateA : dateA - dateB
  })
  
  // Pagination
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filtered.slice(start, end)
})

const totalNotifications = computed(() => notifications.length)
const unreadNotifications = computed(() => notifications.filter(n => !n.read).length)
const readNotifications = computed(() => notifications.filter(n => n.read).length)
const totalPages = computed(() => Math.ceil(notifications.length / itemsPerPage.value))
const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, 4, '...', total)
    } else if (current >= total - 2) {
      pages.push(1, '...', total - 3, total - 2, total - 1, total)
    } else {
      pages.push(1, '...', current - 1, current, current + 1, '...', total)
    }
  }
  return pages
})

const currentDate = computed(() => {
  return new Date().toLocaleDateString('ru-RU')
})

// Methods
const toggleReadStatus = (id) => {
  const notification = notifications.find(n => n.id === id)
  if (notification) {
    notification.read = !notification.read
    if (notification.read) {
      notification.isNew = false
    }
  }
}

const markAllAsRead = () => {
  notifications.forEach(notification => {
    notification.read = true
    notification.isNew = false
  })
}

const clearAllNotifications = () => {
  notifications.splice(0, notifications.length)
}

const deleteNotification = (id) => {
  const index = notifications.findIndex(n => n.id === id)
  if (index !== -1) {
    notifications.splice(index, 1)
  }
}

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc'
}

const handleAction = (notification) => {
  switch (notification.type) {
    case 'report_completed':
      alert('Переход к отчету: ' + notification.title)
      break
    case 'new_mission':
      alert('Принятие миссии: ' + notification.description)
      break
    case 'bonus_received':
      alert('Просмотр бонусов')
      break
    case 'complaint_accepted':
      alert('Просмотр жалобы')
      break
    case 'new_message':
      alert('Переход к сообщениям')
      break
  }
  
  // Mark as read after action
  if (!notification.read) {
    toggleReadStatus(notification.id)
  }
}

const getActionText = (type) => {
  switch (type) {
    case 'report_completed': return 'ПРОСМОТР'
    case 'new_mission': return 'ПРИНЯТЬ'
    case 'bonus_received': return 'ПОСМОТРЕТЬ'
    case 'complaint_accepted': return 'ПРОСМОТР'
    case 'new_message': return 'ОТКРЫТЬ'
    default: return 'ДЕЙСТВИЕ'
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// Initialize
onMounted(() => {
  console.log('Notifications component mounted')
})
</script>

<style scoped>
/* Additional custom styles if needed */
</style>