import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// import './util/rem'
import axios from 'axios'
import './assets/fonts/iconfont.css'
import './assets/font/iconfont'
import './assets/css/style.css'
import VueParticles from 'vue-particles'
import Viser from 'viser-vue'


axios.defaults.baseURL = 'http://123.56.96.139:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})


Vue.use(VueParticles)
Vue.use(Viser)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
