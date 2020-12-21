/**
* @Description: 基础蓝色旋转组件
* @Author: wanggang
* @Date: 2020-12-20 10:51:02
**/
<template>
    <div class='rotate-blue'>
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
            const group = new Konva.Group({
                draggable: true,
            });
            stage.add(layer);
            layer.add(group);
            const blueImgUrl = '/img/rotate_blue.svg';
            const redImgUrl = '/img/rotate_red.svg';
            Konva.Image.fromURL(blueImgUrl, (node) => {
                group.add(node);
                layer.draw();
                ShapeOption.hasBaseRotateName();
                ShapeOption.hasBaseRotateModuleType();
                ShapeOption.hasBaseRotateImgUrl(blueImgUrl);
                ShapeOption.hasBaseRotateRotate();
                ShapeOption.hasBaseRotateHide();
                ShapeOption.hasBaseRotateSparkling();
                const curAttr = group.toObject();
                Object.assign(curAttr.attrs, ShapeOption.toObject());
                console.log(JSON.stringify(curAttr));
            });
            Konva.Image.fromURL(redImgUrl, (node) => {
                group.add(node);
                layer.draw();
                ShapeOption.hasBaseRotateName();
                ShapeOption.hasBaseRotateModuleType();
                ShapeOption.hasBaseRotateImgUrl(redImgUrl);
                ShapeOption.hasBaseRotateRotate();
                ShapeOption.hasBaseRotateHide();
                ShapeOption.hasBaseRotateSparkling();
                const curAttr = group.toObject();
                Object.assign(curAttr.attrs, ShapeOption.toObject());
                console.log(JSON.stringify(curAttr));
            });
        },
    },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
