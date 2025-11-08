<template>
  <div class="min-h-screen">

    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Hero Section -->
      <div class="border-2 border-[#1a3a52] rounded-3xl bg-gradient-to-br from-[#0a0e17] to-[#0d1520] shadow-[0_0_30px_rgba(0,217,255,0.1)] p-8 mb-6 text-white">
        <h2 class="text-3xl font-bold mb-3">
          Помогите сделать наш город лучше!
        </h2>
        <p class="text-blue-100 mb-6">
          Сообщайте о проблемах в городе и следите, как их решают
        </p>
        <div class="flex gap-3">
          <button
            @click="activeTab = 'form'"
            :class="[
              'px-6 py-2.5 rounded-lg font-medium transition-all',
              activeTab === 'form'
                ? 'bg-white text-blue-600 shadow-lg'
                : 'bg-blue-700/50 text-white hover:bg-blue-700'
            ]"
          >
            Сообщить о проблеме
          </button>
          <button
            @click="activeTab = 'map'"
            :class="[
              'px-6 py-2.5 rounded-lg font-medium transition-all',
              activeTab === 'map'
                ? 'bg-white text-blue-600 shadow-lg'
                : 'bg-blue-700/50 text-white hover:bg-blue-700'
            ]"
          >
            Посмотреть 3D-карту города
          </button>
        </div>
      </div>

      <!-- Form Section -->
      <div v-if="activeTab === 'form'" class="border-2 border-[#1a3a52] rounded-3xl bg-gradient-to-br from-[#0a0e17] to-[#0d1520] shadow-[0_0_30px_rgba(0,217,255,0.1)] p-8 mb-6">
        <h3 class="text-2xl font-bold text-white mb-6">
          Сообщить о проблеме
        </h3>

        <div class="space-y-5">
          <!-- Тип проблемы -->
          <div>
            <label class="block text-sm font-medium text-white mb-2">
              Тип проблемы
            </label>
            <select
              v-model="formData.type"
              class="w-full bg-blue-50 border-2 border-blue-200 rounded-lg px-4 py-3 text-blue-900 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all appearance-none cursor-pointer hover:bg-blue-100"
              style="background-image: url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%232563eb%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e'); background-repeat: no-repeat; background-position: right 1rem center; background-size: 1.25em;"
            >
              <option value="">Выберите тип</option>
              <option value="road">Дороги и тротуары</option>
              <option value="trash">Уборка мусора</option>
              <option value="light">Освещение</option>
              <option value="traffic">Светофоры</option>
              <option value="other">Другое</option>
            </select>
          </div>

          <!-- Описание -->
          <div>
            <label class="block text-sm font-medium text-white mb-2">
              Описание
            </label>
            <textarea
              v-model="formData.description"
              placeholder="Опишите проблему"
              rows="4"
              class="w-full bg-blue-50 border-2 border-blue-200 rounded-lg px-4 py-3 text-blue-900 
                     placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:border-blue-500 transition-all resize-none hover:bg-blue-100"
            ></textarea>
          </div>

          <!-- Локация -->
          <div>
            <label class="block text-sm font-medium text-white mb-2">
              Локация
            </label>
            <div class="relative">
              <input
                type="file"
                ref="fileInput"
                @change="handleFileChange"
                accept="image/*"
                class="hidden"
              />
              <button
                type="button"
                @click="$refs.fileInput.click()"
                class="w-full bg-blue-50 border-2 border-blue-200 border-dashed rounded-lg px-4 py-4 
                       text-blue-600 hover:bg-blue-100 hover:border-blue-400 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 transition-all flex items-center justify-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="font-medium">
                  {{ fileName || 'Загрузить фото' }}
                </span>
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            @click="handleSubmit"
            class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 
                   text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl 
                   transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Отправить проблему
          </button>

          <!-- Success Message -->
          <div v-if="showSuccess" class="bg-blue-50 border-2 border-blue-500 rounded-lg p-4 text-blue-800 text-center font-medium">
            ✓ Проблема успешно отправлена
          </div>
        </div>
      </div>

      <!-- Map Section -->
      <div v-if="activeTab === 'map'" class="border-2 border-[#1a3a52] rounded-3xl bg-gradient-to-br from-[#0a0e17] to-[#0d1520] shadow-[0_0_30px_rgba(0,217,255,0.1)] p-8 mb-6 text-white">
        <h3 class="text-2xl font-bold text-blue-900 mb-6">
          3D-карта города
        </h3>
        
        <div class="relative bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-200 rounded-xl overflow-hidden" 
             style="height: 400px;">
          <!-- Map placeholder -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
              <div class="inline-block bg-white rounded-full p-4 shadow-lg mb-4">
                <svg class="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <p class="text-blue-800 font-medium">3D-карта с отметками проблем</p>
            </div>
          </div>
          
          <!-- Map markers -->
          <div class="absolute top-20 left-32 animate-bounce">
            <div class="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg font-bold">
              !
            </div>
            <div class="mt-2 bg-white rounded-lg shadow-md px-3 py-2 text-sm border border-blue-100">
              <div class="font-semibold text-blue-900">Яма на дороге</div>
              <div class="text-blue-600 text-xs">2 часа назад</div>
            </div>
          </div>
          
          <div class="absolute bottom-24 right-40">
            <div class="bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg font-bold">
              !
            </div>
          </div>
        </div>

        <button class="mt-4 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
          Подробнее 
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Problems Ranking -->
      <div class="border-2 border-[#1a3a52] rounded-3xl bg-gradient-to-br from-[#0a0e17] to-[#0d1520] shadow-[0_0_30px_rgba(0,217,255,0.1)] p-8 ">
        <h3 class="text-2xl font-bold text-white mb-6">
          Рейтинг проблем
        </h3>

        <div class="space-y-3">
          <div
            v-for="problem in problems"
            :key="problem.id"
            class="flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 
                   rounded-xl transition-all cursor-pointer group border border-blue-100"
          >
            <div class="flex items-center gap-4">
              <div 
                :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center text-white font-bold',
                  problem.type === 'urgent' ? 'bg-red-500' : 
                  problem.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                ]"
              >
                {{ problem.icon }}
              </div>
              <div>
                <div class="font-semibold text-blue-900">{{ problem.title }}</div>
                <div class="text-sm text-blue-600">Сообщений: {{ problem.count }}</div>
              </div>
            </div>
            <button class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium 
                           opacity-0 group-hover:opacity-100 transition-all shadow-md hover:shadow-lg">
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('form')
const formData = ref({
  type: '',
  description: '',
  location: null
})
const fileName = ref('')
const showSuccess = ref(false)
const fileInput = ref(null)

const problems = ref([
  { id: 1, title: 'Яма на дороге', count: 120, icon: '🚧', type: 'urgent' },
  { id: 2, title: 'Свалка мусора', count: 87, icon: '🗑️', type: 'warning' },
  { id: 3, title: 'Нет освещения', count: 65, icon: '💡', type: 'normal' },
  { id: 4, title: 'Поломка светофора', count: 43, icon: '🚦', type: 'urgent' },
  { id: 5, title: 'Граффити', count: 28, icon: '🎨', type: 'normal' }
])

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    fileName.value = file.name
    formData.value.location = file
  }
}

const handleSubmit = () => {
  if (!formData.value.type || !formData.value.description) {
    alert('Пожалуйста, заполните все обязательные поля')
    return
  }

  console.log('Form submitted:', formData.value)
  showSuccess.value = true

  setTimeout(() => {
    formData.value = {
      type: '',
      description: '',
      location: null
    }
    fileName.value = ''
    showSuccess.value = false
  }, 3000)
}
</script>

<style scoped>
/* Custom styles if needed */
</style>