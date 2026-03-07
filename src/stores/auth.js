// defineStore — функція для створення store
import { defineStore } from 'pinia'

// ref — реактивна змінна (Vue відстежує зміни і оновлює UI)
// computed — обчислювальне значення, яке автоматично оновлюється
import { ref, computed } from 'vue'

// Назва 'auth' — унікальний ідентифікатор store у Pinia DevTools
export const useAuthStore = defineStore('auth', () => {

  // --- STATE (стан) ---
  // Читаємо токен з localStorage, щоб після перезавантаження сторінки
  // користувач залишався залогіненим
  const token = ref(localStorage.getItem('token') || null)

  // Аналогічно — читаємо дані юзера (JSON.parse бо localStorage зберігає рядки)
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

  // --- GETTERS (обчислювані значення) ---
  // !! — подвійне заперечення, перетворює будь-яке значення на boolean
  // null -> false, 'токен123' -> true
  const isLoggedIn = computed(() => !!token.value)

  // --- ACTIONS (функції що змінюють стан) ---

  async function login(email, password) {
    // Mock перевірка — в реальному проєкті тут буде API запит
    if (!email.includes('@') || password.length < 3) {
      throw new Error('Invalid credentials')
    }

    // Імітуємо відповідь сервера
    const mockToken = 'mock-token-' + Date.now()
    const mockUser = { id: 1, email, name: email.split('@')[0] }

    // Оновлюємо реактивний стан — всі компоненти що використовують
    // ці значення автоматично перерендеряться
    token.value = mockToken
    user.value = mockUser

    // Зберігаємо в localStorage щоб не втратити після F5
    localStorage.setItem('token', mockToken)
    localStorage.setItem('user', JSON.stringify(mockUser))
  }

  function logout() {
    // Очищаємо стан
    token.value = null
    user.value = null

    // Очищаємо localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  // Повертаємо все що має бути доступно ззовні store
  return { token, user, isLoggedIn, login, logout }
})
