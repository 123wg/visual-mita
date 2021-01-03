/**
* @Description: 流动线条
* @Author: wanggang
* @Date: 2020-12-07 19:40:16
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
    watch: {},
    mounted() {
        this.init();
    },
    methods: {
    /**
      *@description: init
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
            stage.add(layer);

            const group = new Konva.Group({
                draggable: true,
            });

            const staLenth = stage.width();
            const Y = 20;
            const startX = 20;
            const endX = staLenth / 3;
            console.log(staLenth);
            const lineBc = new Konva.Line({
                points: [startX, Y, endX, Y],
                stroke: '#6699cc',
                strokeWidth: 20,
                lineCap: 'round',
                lineJoin: 'round',
                name: 'flowline_bc',
            });
            const lineFront = new Konva.Line({
                points: [startX, Y, endX, Y],
                stroke: 'yellow',
                strokeWidth: 15,
                lineCap: 'round',
                lineJoin: 'round',
                name: 'flowline_front',
                dash: [33, 25],
            });
            console.log(lineBc.points());
            group.add(lineBc);
            group.add(lineFront);
            ShapeOption.hasFlowLineName();
            ShapeOption.hasFlowLineModuleType();
            ShapeOption.hasFlowLineBindDevice();
            ShapeOption.hasFlowAnim();
            ShapeOption.hasFlowBcColor('flowline_bc');
            ShapeOption.hasFlowFlowColor('flowline_front');
            ShapeOption.hasFlowWeight('flowline_bc');
            ShapeOption.hasFlowLineSparkling();
            ShapeOption.hasFlowLineHide();
            const curAttr = group.toObject();
            Object.assign(curAttr.attrs, ShapeOption.toObject());
            console.log(curAttr);
            console.log(JSON.stringify(curAttr));
            layer.add(group);
            layer.draw();
        },
    },
};
</script>
<style lang='scss' scoped>
.base-line {
    width: 100%;
    height: 100%;
}
</style>
