/**
* @Description: 变量
* @Author: wanggang
* @Date: 2020-12-29 21:17:54
**/
<template>
    <div class='base-var'>
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
            const text1 = new Konva.Text({
                text: '##',
                fill: 'black',
                padding: 5,
                fontSize: 16,
                align: 'center',
                name: 'label',
            });

            const rect1 = new Konva.Rect({
                width: text1.width(),
                height: text1.height(),
                fill: ' #e6e6e6',
                stroke: 'black',
                strokeWidth: 1,
                name: 'labelRect',
            });
            const text2 = new Konva.Text({
                x: rect1.width(),
                text: '##',
                fill: 'black',
                padding: 5,
                fontSize: 16,
                align: 'center',
                name: 'value',
            });
            const rect2 = new Konva.Rect({
                x: rect1.width(),
                width: text2.width(),
                height: text2.height(),
                fill: ' #e6e6e6',
                stroke: 'black',
                strokeWidth: 1,
                name: 'valueRect',
            });
            ShapeOption.hasBaseVarName();
            ShapeOption.hasBaseVarModuleType();
            ShapeOption.hasBaseVarBindDevice();
            ShapeOption.hasBaseVarTextDescription('label');
            ShapeOption.hasBaseVarFontSize('label,value');
            ShapeOption.hasBaseVarColor('label,value');
            ShapeOption.hasBaseVarHide();
            ShapeOption.hasBaseVarSparkling();
            group.add(rect1).add(text1);
            group.add(rect2).add(text2);
            const groupObj = group.toObject();
            Object.assign(groupObj.attrs, ShapeOption.toObject());
            console.log(JSON.stringify(groupObj));
            layer.add(group);
            layer.draw();
        },
    },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
