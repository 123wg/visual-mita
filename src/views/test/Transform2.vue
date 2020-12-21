/**
* @Description: 测试旋转时获取形状属性
* @Author: wanggang
* @Date: 2020-12-01 21:19:35
**/
<template>
    <div class='transform'>
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
        init() {
            const stage = new Konva.Stage({
                width: window.innerWidth,
                height: window.innerHeight,
                container: 'container',
            });
            const layer = new Konva.Layer();
            const rect = new Konva.Rect({
                x: stage.width() / 2,
                y: stage.height() / 2,
                width: 200,
                height: 200,
                fill: 'yellow',
                stroke: 'black',
                strokeWidth: 2,
                draggable: true,
            });
            //   3.更改文本的宽度
            const text1 = new Konva.Text({
                x: 200,
                y: 500,
                text: '我是测试文本',
                fill: 'red',
                draggable: true,
                fontSize: 25,
                padding: 10,
            });
            text1.on('transform', () => {
                text1.setAttrs({
                    width: Math.max(text1.width() * text1.scaleX(), 20),
                    scaleX: 1,
                    scaleY: 1,
                });
            });
            //   1. 自定义变换过程中的限制
            const tr = new Konva.Transformer({
                nodes: [text1],
                rotateAnchorOffset: 60,
                // 自定义变换过程中的方法
                // boundBoxFunc(oldBox, newBox) {
                //   if (newBox.width > 300) {
                //     return oldBox;
                //   }
                //   return newBox;
                // },
                // 2.捕捉旋转位置 自动黏住
                rotationSnaps: [0, 90, 180, 270],
            });

            const text = new Konva.Text({
                x: 20,
                y: 20,
            });

            const updateText = () => {
                const lines = [
                    `x:${rect.x()}`,
                    `y:${rect.y()}`,
                    `width:${rect.width()}`,
                    `height:${rect.height()}`,
                    `rotation:${rect.rotation()}`,
                    `scaleX:${rect.scaleX()}`,
                    `scaleY${rect.scaleY()}`,
                ];
                text.text(lines.join('\n'));
                layer.batchDraw();
            };
            // 监听形状变化事件
            rect.on('transformstart', () => {
                console.log('开始形状变换');
            });
            rect.on('transform', () => {
                updateText();
            });
            rect.on('transformend', () => {
                console.log('形状变换结束');
            });
            rect.on('dragmove', () => {
                updateText();
            });
            layer.add(text1);
            layer.add(text);
            layer.add(tr);
            //   tr.nodes([rect]);
            layer.draw();
            layer.add(rect);
            stage.add(layer);
        },
    },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
