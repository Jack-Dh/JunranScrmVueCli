import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import vuecookies from 'vue-cookies'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Pagination } from 'element-ui';
import './assets/font/iconfont.css'



Vue.config.productionTip = false
Vue.use(vuecookies)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(Pagination)



new Vue({
    router,
  render: h => h(App)
}).$mount('#app')
