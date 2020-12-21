<template>
    <div class='drag'>
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
    mounted() {
        this.init();
    },
    watch: {},
    methods: {
        init() {
            //   3.拖动舞台
            const stage = new Konva.Stage({
                width: window.innerWidth,
                height: window.innerHeight,
                container: 'container',
                // draggable: true,
            });
            const layer = new Konva.Layer();

            // 1.拖放测试
            const rect = new Konva.Rect({
                x: 50,
                y: 50,
                width: 100,
                height: 100,
                fill: 'yellow',
                stroke: 'black',
                strokeWidth: 2,
                draggable: true,
            });
            rect.on('mouseover', () => {
                document.body.style.cursor = 'pointer';
            });
            rect.on('mouseout', () => {
                document.body.style.cursor = 'default';
            });

            //   2.拖放group
            const group = new Konva.Group({
                draggable: true,
            });
            const colors = ['red', 'blue', 'yellow', 'pink'];
            for (let i = 0; i < 4; i += 1) {
                const box = new Konva.Rect({
                    x: 100 + i * 10,
                    y: 100 + i * 10,
                    width: 150,
                    height: 150,
                    fill: colors[i],
                    stroke: 'black',
                    strokeWidth: 2,
                });
                group.add(box);
            }
            group.on('mouseover', () => {
                document.body.style.cursor = 'pointer';
            });
            group.on('mouseout', () => {
                document.body.style.cursor = 'default';
            });

            // 4.   拖放事件
            const text = new Konva.Text({
                x: 10,
                y: 10,
                fill: 'black',
                fontSize: 25,
            });
            const showMessage = (msg) => {
                text.text(msg);
                layer.draw();
            };
            rect.on('dragstart', () => {
                showMessage('拖放开始啦');
            });
            rect.on('dragmove', () => {
                showMessage('拖放进行中');
            });
            rect.on('dragend', () => {
                showMessage('拖放结束');
            });

            //   5. 限制拖放
            const text1 = new Konva.Text({
                text: '我只能水平拖拽',
                x: 300,
                y: 300,
                fontSize: 20,
                fill: 'black',
                draggable: true,
                dragBoundFunc(pos) {
                    console.log(this.absolutePosition());
                    return {
                        x: pos.x,
                        y: this.absolutePosition().y,
                    };
                },
            });

            //   6.区域内拖放
            //   蓝色组合和黄色组合 里面有文字
            const groupBlue = new Konva.Group({
                x: stage.width() / 2,
                y: stage.height() / 2,
                draggable: true,
                dragBoundFunc(pos) {
                    // 位置小于50 就不动
                    const y = pos.y < 50 ? 50 : pos.y;
                    return {
                        x: pos.x,
                        y,
                    };
                },
            });
            const blueText = new Konva.Text({
                text: 'blue text',
                fill: 'black',
                fontSize: 18,
                padding: 10,
            });
            const blueRect = new Konva.Rect({
                width: blueText.width(),
                height: blueText.height(),
                fill: 'blue',
                stroke: 'black',
                strokeWidth: 2,
            });
            const groupYellow = new Konva.Group({
                x: stage.width() / 2 + 50,
                y: 90,
                draggable: true,
                dragBoundFunc(pos) {
                    const radius = 30;
                    const x = stage.width() / 2;
                    const y = 90;
                    // eslint-disable-next-line no-restricted-properties
                    const scale = radius / Math.sqrt(Math.pow(pos.y - y, 2) + Math.pow(pos.x - x, 2));
                    if (scale < 1) {
                        return {
                            x: (pos.x - x) * scale + x,
                            y: (pos.y - y) * scale + y,
                        };
                    }
                    return pos;
                },
            });
            const yellowText = new Konva.Text({
                text: 'yellow text',
                fill: 'black',
                fontSize: 18,
                padding: 10,
            });
            const yellowRect = new Konva.Rect({
                width: yellowText.width(),
                height: yellowText.height(),
                stroke: 'black',
                fill: 'yellow',
                strokeWidth: 4,
            });
            groupYellow.add(yellowRect).add(yellowText);
            groupBlue.add(blueRect).add(blueText);
            layer.add(groupYellow);
            layer.add(groupBlue);
            layer.add(text1);
            layer.add(text);
            layer.add(group);
            layer.add(rect);
            stage.add(layer);
        },
    },
};
</script>
<style lang='scss' scoped>
.drag {
    width: 100vw;
    height: 100vh;
}
</style>
