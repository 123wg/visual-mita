import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
    //   当前操作的对象
        curNodeConList: [],
        // 控制上下文菜单显示隐藏
        menuControl: {
            show: false,
            top: 0,
            left: 0,
        },
    },
    mutations: {
        curNodeConList(state, obj) {
            state.curNodeConList = obj;
        },
        setMenuControl(state, obj) {
            state.menuControl = obj;
        },
    },
    actions: {
    },
    modules: {
    },
});
