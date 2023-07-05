import { createApp } from 'vue'
import vue3MinAudio from './lib'
import App from './App.vue'

const app = createApp(App)
app.use(vue3MinAudio)
app.mount('#app')
