import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'
import './assets/css/style/publicVariable.scss'
import axios from 'axios'
import Vab from '@/utils/vab'
Vue.prototype.$http=axios
// import ElementUI from 'element-ui' //element-ui的全部组件
// import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
// Vue.use(ElementUI) //使用elementUI

axios.interceptors.request.use(config =>{
    console.log(config);
    config.headers.Authorization = window.sessionStorage.getItem('token');
    return config;//最后必须返回config
})

Vue.config.productionTip = false

new Vue({
    router,
    Vab,
    render: h => h(App)
}).$mount('#app')
