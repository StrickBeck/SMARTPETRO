<template>
  <div>
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Hero Section with Auth Buttons -->
      <div class="bg-slate-900/50 backdrop-blur-sm border-2 border-cyan-900/30 rounded-2xl shadow-2xl p-8 mb-6">
        <h2 class="text-3xl font-bold mb-3 text-cyan-400">
          Помогите сделать наш город лучше!
        </h2>
        <p class="text-gray-400 mb-6">
          Сообщайте о проблемах в городе и следите, как их решают
        </p>
        
        <!-- Auth Buttons -->
        <div v-if="!isAuthenticated" class="flex items-center gap-3">
          <button 
            @click="showAuthModal = true; authMode = 'login'"
            class="text-cyan-400 hover:text-cyan-300 px-6 py-3 transition-colors border-2 border-cyan-500/30 rounded-lg hover:bg-cyan-500/10"
          >
            Войти
          </button>
          <button 
            @click="showAuthModal = true; authMode = 'register'"
            class="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 px-6 py-3 rounded-lg font-medium transition-all border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20"
          >
            РЕГИСТРАЦИЯ
          </button>
        </div>

        <!-- User Info when authenticated -->
        <div v-else class="flex items-center justify-between">
          <div class="text-sm text-cyan-300">
            Добро пожаловать, {{ user.name }}! Вы можете сообщать о проблемах.
          </div>
          <div class="flex items-center gap-4">
            <button 
              @click="showProfile = true"
              class="flex items-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-lg transition-all border border-cyan-500/30"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{{ user.name }}</span>
            </button>
            <button 
              @click="logout"
              class="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg transition-all border border-red-500/30"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-slate-900/50 backdrop-blur-sm border-2 border-cyan-900/30 rounded-xl p-6 shadow-xl">
          <div class="text-sm text-gray-400 mb-1">Активных миссий</div>
          <div class="text-3xl font-bold text-cyan-400">47</div>
        </div>
        <div class="bg-slate-900/50 backdrop-blur-sm border-2 border-cyan-900/30 rounded-xl p-6 shadow-xl">
          <div class="text-sm text-gray-400 mb-1">Решено проблем</div>
          <div class="text-3xl font-bold text-green-400">312</div>
        </div>
        <div class="bg-slate-900/50 backdrop-blur-sm border-2 border-cyan-900/30 rounded-xl p-6 shadow-xl">
          <div class="text-sm text-gray-400 mb-1">Помогли людям</div>
          <div class="text-3xl font-bold text-cyan-400">1,847</div>
        </div>
        <div class="bg-slate-900/50 backdrop-blur-sm border-2 border-cyan-900/30 rounded-xl p-6 shadow-xl">
          <div class="text-sm text-gray-400 mb-1">Активных героев</div>
          <div class="text-3xl font-bold text-purple-400">89</div>
        </div>
      </div>
    </div>

    <!-- Auth Modal -->
    <div 
      v-if="showAuthModal" 
      class="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
      @click.self="showAuthModal = false"
    >
      <div class="bg-slate-900 border-2 border-cyan-900/50 rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all relative">
        <!-- Close Button -->
        <button 
          @click="showAuthModal = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-cyan-400"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Login Form -->
        <div v-if="authMode === 'login'">
          <h3 class="text-2xl font-bold text-cyan-400 mb-6">Вход в аккаунт</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input 
                v-model="loginForm.email"
                type="email"
                placeholder="example@mail.com"
                class="w-full bg-slate-800/80 border-2 border-cyan-900/50 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">Пароль</label>
              <input 
                v-model="loginForm.password"
                type="password"
                placeholder="••••••••"
                class="w-full bg-slate-800/80 border-2 border-cyan-900/50 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
              />
            </div>

            <button 
              @click="handleLogin"
              class="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-semibold py-3 rounded-lg transition-all shadow-lg shadow-cyan-500/30 border-2 border-cyan-400/30"
            >
              Войти
            </button>
          </div>

          <div class="mt-6 text-center text-sm text-gray-400">
            Нет аккаунта? 
            <button @click="authMode = 'register'" class="text-cyan-400 hover:text-cyan-300 font-medium">
              Зарегистрироваться
            </button>
          </div>
        </div>

        <!-- Register Form -->
        <div v-else>
          <h3 class="text-2xl font-bold text-cyan-400 mb-6">Регистрация</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">Имя</label>
              <input 
                v-model="registerForm.name"
                type="text"
                placeholder="Иван Иванов"
                class="w-full bg-slate-800/80 border-2 border-cyan-900/50 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input 
                v-model="registerForm.email"
                type="email"
                placeholder="example@mail.com"
                class="w-full bg-slate-800/80 border-2 border-cyan-900/50 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">Телефон</label>
              <input 
                v-model="registerForm.phone"
                type="tel"
                placeholder="+7 (___) ___-__-__"
                class="w-full bg-slate-800/80 border-2 border-cyan-900/50 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">Пароль</label>
              <input 
                v-model="registerForm.password"
                type="password"
                placeholder="••••••••"
                class="w-full bg-slate-800/80 border-2 border-cyan-900/50 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">Подтвердите пароль</label>
              <input 
                v-model="registerForm.confirmPassword"
                type="password"
                placeholder="••••••••"
                class="w-full bg-slate-800/80 border-2 border-cyan-900/50 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
              />
            </div>

            <button 
              @click="handleRegister"
              class="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-semibold py-3 rounded-lg transition-all shadow-lg shadow-cyan-500/30 border-2 border-cyan-400/30"
            >
              Зарегистрироваться
            </button>
          </div>

          <div class="mt-6 text-center text-sm text-gray-400">
            Уже есть аккаунт? 
            <button @click="authMode = 'login'" class="text-cyan-400 hover:text-cyan-300 font-medium">
              Войти
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Profile Modal -->
    <div 
      v-if="showProfile && isAuthenticated" 
      class="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
      @click.self="showProfile = false"
    >
      <div class="bg-slate-900 border-2 border-cyan-900/50 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Profile Header -->
        <div class="bg-gradient-to-r from-cyan-600 to-cyan-700 p-8 rounded-t-2xl relative">
          <button 
            @click="showProfile = false"
            class="absolute top-4 right-4 text-cyan-100 hover:text-white"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="flex items-center gap-6">
            <div class="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold text-white border-2 border-white/30">
              {{ user.name.charAt(0).toUpperCase() }}
            </div>
            <div>
              <h3 class="text-2xl font-bold mb-1 text-white">{{ user.name }}</h3>
              <p class="text-cyan-100">{{ user.email }}</p>
              <div class="flex items-center gap-2 mt-2">
                <span class="bg-white/20 px-3 py-1 rounded-full text-sm text-white border border-white/30">⭐ Активный житель</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Content -->
        <div class="p-8">
          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4 mb-8">
            <div class="text-center p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
              <div class="text-2xl font-bold text-cyan-400">{{ user.reports }}</div>
              <div class="text-sm text-gray-400">Сообщений</div>
            </div>
            <div class="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
              <div class="text-2xl font-bold text-green-400">{{ user.solved }}</div>
              <div class="text-sm text-gray-400">Решено</div>
            </div>
            <div class="text-center p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
              <div class="text-2xl font-bold text-purple-400">{{ user.points }}</div>
              <div class="text-sm text-gray-400">Баллов</div>
            </div>
          </div>

          <!-- User Info -->
          <div class="space-y-4 mb-8">
            <h4 class="text-lg font-semibold text-cyan-400">Личная информация</h4>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-1">Имя</label>
                <div class="bg-slate-800/80 border border-cyan-900/30 rounded-lg px-4 py-3 text-gray-200">
                  {{ user.name }}
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-1">Телефон</label>
                <div class="bg-slate-800/80 border border-cyan-900/30 rounded-lg px-4 py-3 text-gray-200">
                  {{ user.phone }}
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <div class="bg-slate-800/80 border border-cyan-900/30 rounded-lg px-4 py-3 text-gray-200">
                {{ user.email }}
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="mb-6">
            <h4 class="text-lg font-semibold text-cyan-400 mb-4">Последние активности</h4>
            <div class="space-y-3">
              <div v-for="activity in user.activities" :key="activity.id" 
                   class="flex items-center gap-3 p-3 bg-slate-800/50 border border-cyan-900/30 rounded-lg">
                <div class="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                  {{ activity.icon }}
                </div>
                <div class="flex-1">
                  <div class="font-medium text-gray-200">{{ activity.title }}</div>
                  <div class="text-sm text-gray-400">{{ activity.date }}</div>
                </div>
                <span :class="[
                  'px-3 py-1 rounded-full text-xs font-medium border',
                  activity.status === 'solved' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                  activity.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                  'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                ]">
                  {{ activity.status === 'solved' ? 'Решено' : 
                     activity.status === 'pending' ? 'В обработке' : 'Новое' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button class="flex-1 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white py-3 rounded-lg font-medium transition-all shadow-lg shadow-cyan-500/20 border-2 border-cyan-400/30">
              Редактировать профиль
            </button>
            <button class="flex-1 bg-slate-800/80 hover:bg-slate-800 text-gray-300 py-3 rounded-lg font-medium transition-all border-2 border-cyan-900/30">
              Настройки
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isAuthenticated = ref(false)
const showAuthModal = ref(false)
const showProfile = ref(false)
const authMode = ref('login')

const user = ref({
  name: '',
  email: '',
  phone: '',
  reports: 0,
  solved: 0,
  points: 0,
  activities: []
})

const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

const handleLogin = () => {
  if (!loginForm.value.email || !loginForm.value.password) {
    alert('Пожалуйста, заполните все поля')
    return
  }

  user.value = {
    name: 'Иван Петров',
    email: loginForm.value.email,
    phone: '+7 (777) 123-45-67',
    reports: 12,
    solved: 8,
    points: 340,
    activities: [
      { id: 1, icon: '🚧', title: 'Сообщил о яме на дороге', date: '2 часа назад', status: 'pending' },
      { id: 2, icon: '💡', title: 'Проблема с освещением решена', date: 'Вчера', status: 'solved' },
      { id: 3, icon: '🗑️', title: 'Сообщил о свалке мусора', date: '3 дня назад', status: 'new' }
    ]
  }

  isAuthenticated.value = true
  showAuthModal.value = false
  loginForm.value = { email: '', password: '' }
}

const handleRegister = () => {
  if (!registerForm.value.name || !registerForm.value.email || !registerForm.value.password) {
    alert('Пожалуйста, заполните все поля')
    return
  }

  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert('Пароли не совпадают')
    return
  }

  user.value = {
    name: registerForm.value.name,
    email: registerForm.value.email,
    phone: registerForm.value.phone,
    reports: 0,
    solved: 0,
    points: 0,
    activities: []
  }

  isAuthenticated.value = true
  showAuthModal.value = false
  registerForm.value = { name: '', email: '', phone: '', password: '', confirmPassword: '' }
}

const logout = () => {
  isAuthenticated.value = false
  user.value = {
    name: '',
    email: '',
    phone: '',
    reports: 0,
    solved: 0,
    points: 0,
    activities: []
  }
}
</script>

<style scoped>
.transform {
  transition: all 0.3s ease;
}
</style>