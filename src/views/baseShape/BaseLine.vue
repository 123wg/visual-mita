/**
* @Description: 基本线条
* @Author: wanggang
* @Date: 2021-01-03 17:38:09
**/
<template>
    <div class='base-line'>
        <div id="container"></div>
    </div>
</template>

<script>
import ShapeOption from '@/common/shapeOption';

export default {
    components: {},
    data() {
        return {

        };
    },
    computed: {},
    mounted() {
        this.init();
    },
    watch: {},
    methods: {
        init() {
            const stage = new Konva.Stage({
                width: window.innerWidth,
                height: window.innerHeight,
                container: 'container',
            });
            const group = new Konva.Group({
                draggable: true,
            });
            const width = stage.width();
            const startX = 0;
            const Y = 20;
            const endX = width / 3;
            const layer = new Konva.Layer();
            stage.add(layer);
            const line = new Konva.Line({
                points: [startX, Y, endX, Y],
                stroke: '#000',
                strokeWidth: 2,
                lineCap: 'round',
                lineJoin: 'round',
                name: 'baseline_front',
            });
            group.add(line);
            layer.add(group);
            layer.draw();
            ShapeOption.hasBaseLineName();
            ShapeOption.hasBaseLineModuleType();
            ShapeOption.hasBaseLineWeight('baseline_front');
            ShapeOption.hasBaseLineColor('baseline_front');
            const groupObj = group.toObject();
            Object.assign(groupObj.attrs, ShapeOption.toObject());
            console.log(JSON.stringify(groupObj));
        },
    },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
