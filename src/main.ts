import Vue from 'vue';
import * as echarts from 'echarts';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
