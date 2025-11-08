<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <slot></slot>

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
  display: flex;
  justify-content: center; /* Центрирует модалку по горизонтали */
  align-items: center; /* Центрирует модалку по вертикали */
  z-index: 1000; /* Гарантирует, что будет поверх всего */
}

/* Стили для содержимого модального окна */
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  /* Размер 16:9 и меньше окна браузера */
  width: 80vw; /* 80% ширины viewport */
  max-width: 900px; /* Ограничиваем максимальную ширину */
  /* Отношение 16:9: высота = ширина * 9 / 16 */
  aspect-ratio: 16 / 9; 
  position: relative;
}

/* Стили для кнопки закрытия */
.modal-close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: black;
}
</style>