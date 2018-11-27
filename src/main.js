import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import vuecookies from 'vue-cookies'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {Pagination} from 'element-ui';
import './assets/font/iconfont.css'
import axios from 'axios'

Vue.prototype.$axios = axios
//
//
axios.interceptors.response.use(
    response => {
        if (response.data.code==103){
            alert('身份验证过期，请重新登录');
           router.push('./');
        }else {
            return response
        }
    }),
    error => {
        // if (error.response) {
        //     if (error.response.data.code==103){
        //         alert()
        //     }
        // }
        alert(1)
        return Promise.reject(error)

    }


Vue.config.productionTip = false
Vue.use(vuecookies)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(Pagination)


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
