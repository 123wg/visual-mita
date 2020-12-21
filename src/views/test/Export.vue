/**
* @Description: 导入导出测试
* @Author: wanggang
* @Date: 2020-12-02 22:37:11
**/
<template>
    <div class='export'>
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
    //   测试导入

        this.load();
    // this.init();
    },
    methods: {
    /**
      *@description: 导入
      *@param{}
      *@return:
      */
        load() {
            const json = '{"attrs":{"width":1920,"height":937},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{"x":200,"y":200,"radius":50,"fill":"red","stroke":"black","draggable":true},"className":"Circle"}]}]}';
            const stag = Konva.Node.create(json, 'container');
        },
        init() {
            const stage = new Konva.Stage({
                width: window.innerWidth,
                height: window.innerHeight,
                container: 'container',
            });
            const layer = new Konva.Layer();
            const circle = new Konva.Circle({
                x: 200,
                y: 200,
                radius: 50,
                fill: 'red',
                stroke: 'black',
                strokeWidth: 2,
                draggable: true,
            });
            layer.add(circle);
            stage.add(layer);
            //   导出
            //   导入
            const json = stage.toJSON();
            console.log(json);
        },
    },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
