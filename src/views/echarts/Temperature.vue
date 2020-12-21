/**
* @Description:echarts 温度计
* @Author: wanggang
* @Date: 2020-12-12 22:02:58
**/
<template>
    <div class='temp'>
        <div id="container"></div>
        <div id="echarts" :style="{width: '500px', height: '500px'}"></div>
    </div>
</template>

<script>
import ShapeOption from '@/common/shapeOption';
import echartsOption from '@/common/echartsOption';

export default {
    components: {},
    data() {
        return {
            optionName: 'tempOption',
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.init();
    },
    methods: {
        init() {
            const stage = new Konva.Stage({
                width: 0,
                height: 0,
                container: 'container',
            });
            const layer = new Konva.Layer();

            const group = new Konva.Group({
                draggable: true,
            });
            const image = new Konva.Image();
            group.add(image);
            stage.add(layer);
            //  获取配置文件
            ShapeOption.hasTempName();
            ShapeOption.hasTempMoudleType();
            ShapeOption.hasTempBindDevice();
            ShapeOption.hasTempValue();
            ShapeOption.hasTempOptionUrl(this.optionName);
            const curAttr = group.toObject();
            Object.assign(curAttr.attrs, ShapeOption.toObject());
            console.log(JSON.stringify(curAttr));

            const echarts = this.$echarts.init(document.getElementById('echarts'));
            echarts.setOption(echartsOption[this.optionName]());
            echarts.on('finished', () => {
                console.log(echarts.getDataURL({
                    type: 'png',
                    background: '#fff',
                }));
            });
        },
    },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
