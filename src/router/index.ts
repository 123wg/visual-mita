import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/mita',
        name: 'Mita',
        component: () => import('@/views/Mita.vue'),
        meta: {
            title: '可视化大屏首页',
        },
    },
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
        path: '/lineAnimation',
        name: 'LineAnimation',
        component: () => import('@/views/test/LineAnimation.vue'),
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
            title: '测试加载Gif',
        },
    },
    {
        path: '/svg',
        name: 'Svg',
        component: () => import('@/views/test/Svg.vue'),
        meta: {
            title: '测试加载SVG',
        },
    },
    {
        path: '/echarts',
        name: 'Echarts',
        component: () => import('@/views/test/Echarts.vue'),
        meta: {
            title: '测试加载echarts',
        },
    },
    {
        path: '/pool',
        name: 'Pool',
        component: () => import('@/views/baseShape/Pool.vue'),
        meta: {
            title: '蓄水池',
        },
    },
    {
        path: '/flowLine',
        name: 'flowLine',
        component: () => import('@/views/baseShape/FlowLine.vue'),
        meta: {
            title: '流动线条',
        },
    },
    {
        path: '/baseLine',
        name: 'baseLine',
        component: () => import('@/views/baseShape/BaseLine.vue'),
        meta: {
            title: '基本线条',
        },
    },
    {
        path: '/baseArrow',
        name: 'baseArrow',
        component: () => import('@/views/baseShape/BaseLine.vue'),
        meta: {
            title: '箭头',
        },
    },
    {
        path: '/baseCircle',
        name: 'baseCircle',
        component: () => import('@/views/baseShape/BaseLine.vue'),
        meta: {
            title: '圆形',
        },
    },
    {
        path: '/baseRect',
        name: 'baseRect',
        component: () => import('@/views/baseShape/BaseRect.vue'),
        meta: {
            title: '矩形',
        },
    },
    {
        path: '/baseLine',
        name: 'baseLine',
        component: () => import('@/views/baseShape/BaseLine.vue'),
        meta: {
            title: '基本线条',
        },
    },
    {
        path: '/baseImage',
        name: 'baseLine',
        component: () => import('@/views/baseShape/BaseImage.vue'),
        meta: {
            title: '基本图片',
        },
    },
    {
        path: '/temperature',
        name: 'temperature',
        component: () => import('@/views/echarts/Temperature.vue'),
        meta: {
            title: '温度计',
        },
    },
    {
        path: '/client',
        name: 'client',
        component: () => import('@/views/MitaClient.vue'),
        meta: {
            title: '客户端测试',
        },
    },
    {
        path: '/baseRotate',
        name: 'BaseRotate',
        component: () => import('@/views/baseShape/BaseRotate.vue'),
        meta: {
            title: '蓝色旋转组件',
        },
    },
    {
        path: '/baseText',
        name: 'baseText',
        component: () => import('@/views/baseShape/BaseText.vue'),
        meta: {
            title: '文字测试',
        },
    },
    {
        path: '/baseVar',
        name: 'BaseVar',
        component: () => import('@/views/baseShape/BaseVar.vue'),
        meta: {
            title: '变量测试',
        },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
