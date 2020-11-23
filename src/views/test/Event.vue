<template>
    <div class='event'>
        <div id="event-container"></div>
    </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'Event',
  components: {},
  data() {
    return {

    };
  },
  mounted() {
    this.init();
  },
  computed: {},
  watch: {},
  methods: {
    init() {
      const stage = new Konva.Stage({
        container: 'event-container', // 容器 id
        width: window.innerWidth, // canvas 宽度
        height: window.innerHeight, // canvas 高度
      });
      const layer = new Konva.Layer();

      // 1.简单的事件测试
      const triangle = new Konva.RegularPolygon({
        x: 180,
        y: 180,
        sides: 3,
        radius: 80,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 3,
      });
      const text = new Konva.Text({
        x: 10,
        y: 10,
        fontFamily: 'Calibri',
        fontSize: 18,
        text: '1111',
        fill: 'black',
      });
      const writeMessage = (message) => {
        text.text(message);
        // 修改后画布重绘
        layer.draw();
      };
      triangle.on('mouseout', () => {
        writeMessage('鼠标移出');
      });
      triangle.on('mousemove', () => {
        //   获取鼠标在场景中的坐标
        const mousePos = stage.getPointerPosition();
        const { x } = mousePos;
        const { y } = mousePos;
        writeMessage(`x:${x}y:${y}`);
      });

      //   2.图片绑定事件
      const imgObj = new Image();
      imgObj.src = '/img/wallhaven-x19qel.jpg';
      imgObj.onload = () => {
        const img = new Konva.Image({
          image: imgObj,
          x: 300,
          y: 300,
          width: 150,
          height: 150,
        });
        // 3.绑定多个事件
        img.on('mouseover mousedown mouseup', () => {
          console.log('移动');
        });
        // 4.事件移除
        img.off('mouseover');
        // 5.事件命名空间
        img.on('mouseover.event1', () => {
          alert('事件1触发');
        });
        img.on('mouseover.event2', () => {
          alert('事件2触发');
        });
        img.off('mouseover.event1');
        layer.add(img);
        layer.draw();
      };

      // 6.扩大命中区域
      const line = new Konva.Line({
        x: 500,
        y: 150,
        points: [0, 0, 50, 0, 50, 100, 0, 100],
        tension: 1, // 平滑曲线
        stroke: 'black',
        strokeWidth: 2,
        hitStrokeWidth: 20,
      });
      line.on('mousedown', () => {
        layer.toggleHitCanvas();
        console.log('鼠标进入线条');
      });

      // 7.事件监听与不监听设置
      line.listening(true);
      line.listening(false);
      layer.drawHit();

      // 8.取消事件冒泡（测试不通过）
      const group = new Konva.Group();
      const circle = new Konva.Circle({
        x: '800',
        y: '200',
        radius: 80,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 2,
      });
      console.log(group);
      circle.on('click', (evt) => {
        alert('You clicked the circle!');
        // evt.cancelBubble = true;
      });

      group.on('click', () => {
        alert('You clicked on the group!');
      });

      //   9.事件委托
      layer.on('click', (evt) => {
        const obj = evt.target;
        console.log(obj);
      });

      //   10.模拟自己触发事件
      circle.fire('click');

      //   11.stage 触发事件
      stage.on('click', (evt) => {
        console.log(evt.target);
        console.log(`位置${JSON.stringify(stage.getPointerPosition())}`);
      });
      group.add(circle);
      layer.add(group);
      layer.add(circle);
      layer.add(line);
      layer.add(text);
      layer.add(triangle);
      stage.add(layer);
    },
  },
});
</script>
<style lang='scss' scoped>
.event {
    width: 100vw;
    height: 100vh;
}
</style>
