<template>
  <div class="map-container">
    <div id="map" class="w-full h-full rounded-xl"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const map = ref(null)
const problems = [
  { 
    id: 1, 
    coords: [54.8656, 69.1450], // Петропавловск
    title: 'Яма на дороге',
    description: '2 часа назад',
    type: 'urgent'
  },
  { 
    id: 2, 
    coords: [54.8700, 69.1500],
    title: 'Свалка мусора',
    description: '5 часов назад',
    type: 'warning'
  }
]

onMounted(() => {
  // Загружаем Yandex Maps API
  const script = document.createElement('script')
  script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU'
  script.async = true
  
  script.onload = () => {
    // Инициализация карты после загрузки API
    window.ymaps.ready(initMap)
  }
  
  document.head.appendChild(script)
})

const initMap = () => {
  // Создаем карту с синим стилем
  map.value = new window.ymaps.Map('map', {
    center: [54.8656, 69.1450], // Координаты Петропавловска
    zoom: 13,
    controls: ['zoomControl', 'typeSelector']
  }, {
    searchControlProvider: 'yandex#search'
  })

  // Применяем синий стиль к карте
  map.value.layers.add(
    new window.ymaps.Layer(
      'https://vec0%d.maps.yandex.net/tiles?l=map&%c&%l&scale=%s&lang=ru_RU',
      {
        projection: window.ymaps.projection.sphericalMercator,
        tileTransparent: false
      }
    )
  )

  // Добавляем кастомные стили через CSS фильтры
  const mapElement = document.getElementById('map')
  mapElement.style.filter = 'hue-rotate(180deg) saturate(1.5) brightness(0.9)'
  
  // Альтернативный способ - применить синий оверлей
  const overlay = document.createElement('div')
  overlay.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(79, 70, 229, 0.15));
    pointer-events: none;
    border-radius: 0.75rem;
    z-index: 1;
  `
  mapElement.parentElement.style.position = 'relative'
  mapElement.parentElement.appendChild(overlay)

  // Добавляем маркеры проблем
  problems.forEach(problem => {
    const placemark = new window.ymaps.Placemark(
      problem.coords,
      {
        balloonContentHeader: problem.title,
        balloonContentBody: problem.description,
        hintContent: problem.title
      },
      {
        preset: problem.type === 'urgent' ? 'islands#redCircleDotIcon' : 'islands#yellowCircleDotIcon',
        iconColor: problem.type === 'urgent' ? '#ef4444' : '#eab308'
      }
    )
    
    map.value.geoObjects.add(placemark)
  })
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 500px;
  position: relative;
}

#map {
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  overflow: hidden;
}

/* Дополнительная стилизация для синего эффекта */
:deep(.ymaps-2-1-79-map) {
  filter: hue-rotate(180deg) saturate(1.3) brightness(0.95);
}

/* Возвращаем нормальные цвета для контролов */
:deep(.ymaps-2-1-79-controls__control) {
  filter: hue-rotate(-180deg);
}

:deep(.ymaps-2-1-79-zoom) {
  filter: hue-rotate(-180deg);
}
</style>