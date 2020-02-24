import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/reset.css'
import './common/font-awesome-4.7.0/font-awesome-4.7.0/css/font-awesome.min.css'

import axios from 'axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
