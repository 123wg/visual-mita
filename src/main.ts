import Vue from 'vue';
import * as echarts from 'echarts';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
window.vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
