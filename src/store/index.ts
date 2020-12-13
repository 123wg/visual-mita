import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //   当前操作的对象
    curNodeConList: [],
  },
  mutations: {
    curNodeConList(state, obj) {
      state.curNodeConList = obj;
    },
  },
  actions: {
  },
  modules: {
  },
});
