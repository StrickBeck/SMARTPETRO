<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <!-- Контент с прокруткой -->
      <div class="modal-inner-content">
        <slot></slot>
      </div>

      <button class="modal-close-btn" @click="$emit('close')">×</button>
    </div>
  </div>
</template>

<script setup>
// Определяем props (свойства), которые приходят от родителя
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})

// Определяем события, которые компонент может излучать (отправлять родителю)
// В нашем случае, это событие 'close' для закрытия модалки
const emit = defineEmits(['close'])
</script>

<style scoped>
/* Стили для затемнения (оверлея) */
.modal-overlay {
  position: fixed; /* Фиксирует на экране */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Темный полупрозрачный фон */
  backdrop-filter: blur(8px); /* Добавили размытие фона */
  display: flex;
  justify-content: center; /* Центрирует модалку по горизонтали */
  align-items: center; /* Центрирует модалку по вертикали */
  z-index: 1000; /* Гарантирует, что будет поверх всего */
  padding: 20px; /* Отступы от краев экрана */
}

/* Стили для содержимого модального окна */
.modal-content {
  @apply text-white border-2 border-[#1a3a52] rounded-3xl bg-gradient-to-br from-[#0a0e17] to-[#0d1520] shadow-[0_0_30px_rgba(0,217,255,0.1)];
  /* Размер и ограничения */
  width: 90vw; /* 90% ширины viewport */
  max-width: 900px; /* Ограничиваем максимальную ширину */
  max-height: 80vh; /* Максимальная высота 80% от высоты экрана */
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Контейнер с прокруткой внутри модалки */
.modal-inner-content {
  padding: 30px;
  overflow-y: auto; /* Включаем вертикальную прокрутку */
  max-height: calc(80vh - 40px); /* Высота с учетом padding */
  white-space: pre-line; /* Сохраняем переносы строк */
  line-height: 1.6;
  color: #e0e0e0;
}

/* Кастомный скроллбар в стиле SmartPetro */
.modal-inner-content::-webkit-scrollbar {
  width: 10px;
}

.modal-inner-content::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.5);
  border-radius: 5px;
}

.modal-inner-content::-webkit-scrollbar-thumb {
  background: rgba(0, 217, 255, 0.4);
  border-radius: 5px;
  border: 2px solid rgba(15, 23, 42, 0.5);
}

.modal-inner-content::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 217, 255, 0.6);
}

/* Стили для кнопки закрытия */
.modal-close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 217, 255, 0.1);
  border: 2px solid rgba(0, 217, 255, 0.3);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 28px;
  cursor: pointer;
  color: #00d9ff;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  z-index: 10;
}

.modal-close-btn:hover {
  background: rgba(0, 217, 255, 0.2);
  border-color: #00d9ff;
  transform: rotate(90deg);
  box-shadow: 0 0 15px rgba(0, 217, 255, 0.4);
}

/* Адаптив для мобильных */
@media (max-width: 640px) {
  .modal-content {
    width: 95vw;
    max-height: 90vh;
  }
  
  .modal-inner-content {
    padding: 20px;
    font-size: 14px;
  }
}
</style>