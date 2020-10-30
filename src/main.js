import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../src/plugins/element.js'
// 引入全局样式表
import '../src/assets/css/global.css'
// 引入饿了么element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入字体图标
import '../src/assets/fonts/iconfont.css'

//import moment from'moment'

import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://192.168.43.48:8080'
// 配置axios请求拦截器
axios.interceptors.request.use(config => {
  console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config;
});
// axios.interceptors.request.use((request) => {
//       console.log(request);
//        if(request.method == 'post'){
//          request.params = {};
//       }
//        return request;
//    });
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$http = axios

// axios.interceptors.request.use(function (config) {
//   if(config.method!='post'){
//       config.data=qs.stringify(config.data);
//   }
//   config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
//   return config;
// },function (error) {
//   return Promise.reject(error)
// })
Vue.use(ElementUI)
Vue.config.productionTip = false

//全局过滤器
// Vue.fillter('fmtdate',(v)=>{
//   return moment(v).format('YYYY-MM-DD')
// })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
