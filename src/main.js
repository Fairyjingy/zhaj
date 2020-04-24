import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
 import 'element-ui/lib/theme-chalk/index.css'
 import VueRouter from 'vue-router'
 import routes from './routes'
 import echarts from 'echarts'

 Vue.use(ElementUI)
 Vue.use(VueRouter)
 Vue.prototype.$echarts=echarts;

Vue.config.productionTip = false

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: routes
};
const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
  // console.log(to);
  if (to.matched.length !== 0) {
    next()
  } else {
    next({ path: '/404' })
  }
})
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
