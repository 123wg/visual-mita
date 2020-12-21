/**
* @Description: 测试选择
* @Author: wanggang
* @Date: 2020-12-02 21:48:35
**/
<template>
    <div class='select'>
        <div id="container"></div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.init();
    },
    methods: {
    /**
    *@description: 初始化方法
    *@param{}
    *@return:
    */
        init() {
            const stage = new Konva.Stage({
                width: window.innerWidth,
                height: window.innerHeight,
                container: 'container',
            });
            const layer = new Konva.Layer();
            const circle = [];
            //   根据id选择
            for (let i = 0; i < 30; i += 1) {
                circle[i] = new Konva.Circle({
                    x: Math.random() * 1900 + i,
                    y: Math.random() * 800 + i,
                    radius: Math.random() * 50,
                    fill: 'red',
                    stroke: 'black',
                    strokeWidth: 2,
                    name: `circle${i}`,
                });
                layer.add(circle[i]);
            }
            const rect = new Konva.Rect({
                x: 350,
                y: 120,
                width: 150,
                height: 80,
                fill: 'blue',
                stroke: 'black',
                strokeWidth: 2,
                draggable: true,
                id: 'myRect',
            });
            layer.add(rect);
            setTimeout(() => {
                //   1.根据id查找
                const testObj = stage.find('#myRect')[0];
                if (testObj.tween) {
                    testObj.tween.destroy();
                }
                testObj.tween = new Konva.Tween({
                    node: testObj,
                    scaleX: 1.5,
                    scaleY: 1.5,
                    duration: 2,
                    easing: Konva.Easings.ElasticEaseOut,
                });
                testObj.tween.play();
                // 2.根据类型查找
                const rects = stage.find('Circle');
                console.log(rects);
                // 3.根据名称查找
                const names = stage.find('.circle1');
                console.log(names);
            });

            stage.add(layer);
        },
    },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
