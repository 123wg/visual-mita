/**
* @Description: 文本组件
* @Author: wanggang
* @Date: 2020-12-21 22:07:52
**/
<template>
    <div class='text'>
        <div id="container"></div>
    </div>
</template>

<script>
import ShapeOption from '@/common/shapeOption';
// import ShapeOption from '@/common/shapeOption';

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
            const text = new Konva.Text({
                name: 'text',
                text: '文字',
                fontSize: 18,
                fontFamily: 'Calibri',
                fill: '#000',
                align: 'center',
                padding: 10,
            });
            group.add(text);
            layer.add(group);
            layer.draw();
            const groupObj = group.toObject();
            ShapeOption.hasBaseTextName();
            ShapeOption.hasBaseTextModuleType();
            ShapeOption.hasBaseTextText('text');
            ShapeOption.hasBaseTextFontSize('text');
            ShapeOption.hasBaseTextFill('text');
            Object.assign(groupObj.attrs, ShapeOption.toObject());
            console.log(JSON.stringify(groupObj));
        },
    },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
