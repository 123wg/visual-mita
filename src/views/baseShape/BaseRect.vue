/**
* @Description: 基本矩形
* @Author: wanggang
* @Date: 2021-01-03 17:42:33
**/
<template>
    <div class='base-rect'>
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
            const layer = new Konva.Layer();
            stage.add(layer);

            const group = new Konva.Group({
                draggable: true,
            });
            // const width = stage.width();
            // const height = stage.height();
            const rect = new Konva.Rect({
                width: 100,
                height: 100,
                stroke: 'black',
                strokeWidth: 1,
                name: 'base_rect',
            });

            group.add(rect);
            layer.add(group);
            layer.draw();
            ShapeOption.hasBaseRectName();
            ShapeOption.hasBaseRectModuleType();
            ShapeOption.hasBaseRectFillColor('base_rect');
            ShapeOption.hasBaseRectStrokeWidth('base_rect');
            ShapeOption.hasBaseRectStroke('base_rect');
            ShapeOption.hasBaseRectOpacity('base_rect');
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
