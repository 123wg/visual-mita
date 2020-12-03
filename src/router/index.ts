import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Test',
    component: () => import('@/views/test/Index.vue'),
    meta: {
      title: '基础图形测试',
    },
  },
  {
    path: '/event',
    name: 'Event',
    component: () => import('@/views/test/Event.vue'),
    meta: {
      title: '事件测试',
    },
  },
  {
    path: '/drag',
    name: 'Drag',
    component: () => import('@/views/test/Drag.vue'),
    meta: {
      title: '拖放测试',
    },
  },
  {
    path: '/transform1',
    name: 'Transform',
    component: () => import('@/views/test/Transform1.vue'),
    meta: {
      title: '形状变换测试1',
    },
  },
  {
    path: '/transform2',
    name: 'Transform2',
    component: () => import('@/views/test/Transform2.vue'),
    meta: {
      title: '形状变换测试2',
    },
  },
  {
    path: '/tween',
    name: 'Tween',
    component: () => import('@/views/test/Tween.vue'),
    meta: {
      title: '补间动画',
    },
  },
  {
    path: '/animation',
    name: 'Animation',
    component: () => import('@/views/test/Animation.vue'),
    meta: {
      title: '补间动画',
    },
  },
  {
    path: '/select',
    name: 'Select',
    component: () => import('@/views/test/Select.vue'),
    meta: {
      title: '选择',
    },
  },
  {
    path: '/export',
    name: 'Export',
    component: () => import('@/views/test/Export.vue'),
    meta: {
      title: '导入导出',
    },
  },
  {
    path: '/gif',
    name: 'Gif',
    component: () => import('@/views/test/Gif.vue'),
    meta: {
      title: '加载Gif',
    },
  },

//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
//   },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
