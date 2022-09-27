import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import './index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Datepicker from '@vuepic/vue-datepicker';
import VueElementLoading from "vue-element-loading";
import '@vuepic/vue-datepicker/dist/main.css'

const pinia = createPinia()
pinia.use(piniaPersist)
library.add(fas, far, fab)

createApp(App)
  .use(router)
  .use(pinia)
  .component('font-awesome-icon', FontAwesomeIcon )
  .component('Datepicker', Datepicker)
  .component("VueElementLoading", VueElementLoading)
  .mount('#app')
