// Tabler — CSS фреймворк для адмін-панелей (стилі + JS компоненти)
import '@tabler/core/dist/css/tabler.min.css'
import '@tabler/core/dist/js/tabler.min.js'

// createApp — створює Vue додаток
import { createApp } from 'vue'

// createPinia — створює глобальне сховище стану (store)
import { createPinia } from 'pinia'

// router — наші маршрути (які URL ведуть до яких сторінок)
import router from './router'

// App.vue — кореневий компонент, з якого починається весь додаток
import App from './App.vue'

// Створюємо Vue додаток на основі App.vue
const app = createApp(App)

// Підключаємо Pinia — тепер store доступний у всіх компонентах
app.use(createPinia())

// Підключаємо Vue Router — тепер <RouterView> і <RouterLink> працюють
app.use(router)

// Монтуємо додаток в елемент #app (він є в index.html)
app.mount('#app')
