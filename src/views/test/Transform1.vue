/**
* @Description: 形状变换测试
* @Author: wanggang
* @Date: 2020-11-29 17:44:05
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
    /**
      *@description: 测试初始化方法
      *@param{}
      *@return:
      */
        //  拖拽形状点测试
        init() {
            const stage = new Konva.Stage({
                width: window.innerWidth,
                height: window.innerHeight,
                container: 'container',
            });
            const layer = new Konva.Layer();
            //   蓝色矩形
            const rect1 = new Konva.Rect({
                x: 50,
                y: 50,
                width: 200,
                height: 200,
                fill: 'blue',
                stroke: 'black',
                strokeWidth: 2,
                draggable: true,
                name: 'rect',
            });
            const rect2 = new Konva.Rect({
                x: 300,
                y: 300,
                width: 200,
                height: 200,
                fill: 'yellow',
                stroke: 'black',
                strokeWidth: 2,
                draggable: true,
                name: 'rect',
            });

            // 创建变换器
            const tr = new Konva.Transformer({
                nodes: [],
                rotateAnchorOffset: 60,
                // 是否开启中心点缩放
                centeredScaling: false,
                // 保持纵横比
                keepRatio: false,
                enabledAnchors: ['top-left', 'top-center', 'top-right', 'middle-right', 'middle-left', 'bottom-left', 'bottom-center', 'bottom-right'],
            });
            //  选中矩形框
            let x1;
            let x2;
            let y1;
            let y2;
            const selectionRect = new Konva.Rect({
                fill: 'rgba(0,0,255,0.5)',
                visible: false,
            });
            //  鼠标按下事件
            stage.on('mousedown touchstart', (e) => {
                if (e.target !== stage) return;
                console.log('鼠标按下');
                x1 = stage.getPointerPosition().x;
                y1 = stage.getPointerPosition().y;
                x2 = stage.getPointerPosition().x;
                y2 = stage.getPointerPosition().y;

                selectionRect.visible(true);
                selectionRect.width(0);
                selectionRect.height(0);
                layer.draw();
            });

            //   // 鼠标移动事件
            stage.on('mousemove touchmove', () => {
                if (!selectionRect.visible()) return;
                x2 = stage.getPointerPosition().x;
                y2 = stage.getPointerPosition().y;
                selectionRect.setAttrs({
                    x: Math.min(x1, x2),
                    y: Math.min(y1, y2),
                    width: Math.abs(x2 - x1),
                    height: Math.abs(y2 - y1),
                });
                layer.batchDraw();
            });

            stage.on('mouseup touchend', () => {
                // no nothing if we didn't start selection
                if (!selectionRect.visible()) {
                    return;
                }
                console.log('鼠标抬起');
                // update visibility in timeout, so we can check it in click event
                setTimeout(() => {
                    selectionRect.visible(false);
                    layer.batchDraw();
                });

                const shapes = stage.find('.rect').toArray();
                const box = selectionRect.getClientRect();
                // 过滤出有交叉点的图形
                const selected = shapes.filter((shape) => Konva.Util.haveIntersection(box, shape.getClientRect()));
                tr.nodes(selected);
                layer.batchDraw();
            });

            stage.on('click tap', (e) => {
                //  先执行mousedown 事件 在执行点击事件
                if (selectionRect.visible()) return;

                // 点击空白区域
                if (e.target === stage) {
                    tr.nodes([]);
                    layer.draw();
                    return;
                }

                // 未点击矩形 直接返回
                if (!e.target.hasName('rect')) return;
                console.log('点击');
                // 是否按下shift或ctrl
                const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
                const isSelected = tr.nodes().indexOf(e.target) >= 0;
                if (!metaPressed && !isSelected) {
                    tr.nodes([e.target]);
                } else if (metaPressed && isSelected) {
                    const nodes = tr.nodes().slice();
                    nodes.splice(nodes.indexOf(e.target), 1);
                    tr.nodes(nodes);
                } else if (metaPressed && !isSelected) {
                    const nodes = tr.nodes().concat([e.target]);
                    tr.nodes(nodes);
                }
                layer.draw();
            });
            layer.add(rect1);
            layer.add(rect2);
            layer.add(selectionRect);
            layer.add(tr);
            stage.add(layer);
        },
    },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
