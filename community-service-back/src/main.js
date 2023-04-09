import Vue from 'vue'
import App from './App.vue'
import './utils/element.js'
import router from './router'
import './style.css'

Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http = http

Vue.mixin({
  computed: {
    uploadUrl(){
      return this.$http.defaults.baseURL+'/upload'
    }
  },
})

// 将路由挂载到#app下
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
