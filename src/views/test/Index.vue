<template>
    <div class='index'>
        <div id="container"></div>
    </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: '',
  components: {},
  mounted() {
    this.init();
  },
  data() {
    return {

    };
  },
  computed: {},
  watch: {},
  methods: {
    /**
        *@description: 初始化
        *@param{}
        *@return:
        */
    init() {
      const stage = new Konva.Stage({
        container: 'container', // 容器 id
        width: window.innerWidth, // canvas 宽度
        height: window.innerHeight, // canvas 高度
      });
      const layer = new Konva.Layer();

      // 1.矩形
      const rect = new Konva.Rect({
        x: 10,
        y: 10,
        width: 20,
        height: 20,
        fill: 'blue',
        shadowBlur: 10,
        cornerRadius: [0, 10, 20, 30],
      });
        // 2.圆
      const circle = new Konva.Circle({
        x: 50,
        y: 50,
        radius: 10,
        fill: 'red',
        stroke: 'black', // 描边
        strokeWidth: 4,
      });

      // 3.椭圆
      const ellipse = new Konva.Ellipse({
        x: 80,
        y: 80,
        radiusX: 20,
        radiusY: 10,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 1,
      });
        // 4.扇形
      const wedge = new Konva.Wedge({
        x: 110,
        y: 110,
        radius: 30,
        stroke: 'blue',
        angle: 30,
        rotation: -105,
      });
        // 5.线条-简单的线
      const redLine = new Konva.Line({
        points: [5, 70, 140, 23, 250, 60, 300, 20],
        stroke: 'red',
        strokeWidth: 5,
        lineCap: 'round',
        lineJoin: 'round',
        dash: [20, 15, 0.1], // 绘制虚线 实线和虚线的长度
        tension: 0.5, // 平滑曲线
      });
      redLine.move({
        x: 20, y: 120,
      });

      // 多边形
      const poly = new Konva.Line({
        points: [23, 20, 23, 160, 70, 93, 150, 109, 290, 139, 270, 93],
        fill: 'red',
        stroke: 'yellow',
        strokeWidth: 2,
        closed: true,
        tension: 0.5, // 平滑曲线
      });
      poly.move({
        x: 20,
        y: 150,
      });

      // 精灵动画
      const imgObj = new Image();
      imgObj.src = '/img/blob-sprite.png';
      const animations = {
        idle: [
          // x, y, width, height (4 frames)
          2,
          2,
          70,
          119,
          71,
          2,
          74,
          119,
          146,
          2,
          81,
          119,
          226,
          2,
          76,
          119,
        ],
        punch: [
          // x, y, width, height (4 frames)
          2,
          138,
          74,
          122,
          76,
          138,
          84,
          122,
          346,
          138,
          120,
          122,
        ],
      };

      imgObj.onload = () => {
        const blob = new Konva.Sprite({
          x: 150,
          y: 150,
          image: imgObj,
          animation: 'idle',
          animations,
          frameRate: 3,
          frameIndex: 0,
        });
        layer.add(blob);
        console.log('精灵动画');
        stage.add(layer);
        blob.start();
        setTimeout(() => {
          blob.animation('punch');
        }, 3000);
      };

      // 绘制图片
      const imgObj1 = new Image();
      imgObj1.src = '/img/wallhaven-vg8o6m.jpg';
      imgObj1.onload = () => {
        const blob = new Konva.Image({
          x: 200,
          y: 200,
          image: imgObj1,
          width: 150,
          height: 150,
        });
        layer.add(blob);
        layer.batchDraw();
        stage.add(layer);
      };

      // 图片 第二种你家在方式
      Konva.Image.fromURL('/img/wallhaven-vg8o6m.jpg', (darthNode) => {
        darthNode.setAttrs({
          x: 300,
          y: 300,
          width: 150,
          height: 150,
        });
        layer.add(darthNode);
        layer.batchDraw();
      });
      // 文字
      const simpleText = new Konva.Text({
        x: 300,
        y: 500,
        text: '你好啊，我是王刚',
        fill: 'red',
        fontSize: 18,
        fontFamily: 'Calibri',
        //   width: 900,
        padding: 20,
        align: 'center',
      });
      const textRect = new Konva.Rect({
        x: 300,
        y: 500,
        width: 800,
        height: simpleText.height(),
        stroke: 'black',
        strokeWidth: 2,
        shadowBlur: 2,
        shadowColor: 'black',
        cornerRadius: 10,
      });

      // 星星
      const star = new Konva.Star({
        x: 500,
        y: 80,
        numPoints: 6,
        innerRadius: 40, // 内半径
        outerRadius: 70, // 外半径
        fill: 'yellow',
        stroke: 'black',
        offsetX: 10,
        offsetY: 10,
        strokeWidth: 2,
      });
        // 圆环
      const ring = new Konva.Ring({
        x: 500,
        y: 150,
        innerRadius: 40,
        outerRadius: 50,
        fill: 'yellow',
        stroke: 'black',
        strokeWidth: 2,
      });

      // 扇形
      const arc = new Konva.Arc({
        x: 500,
        y: 200,
        innerRadius: 30,
        outerRadius: 40,
        fill: 'yellow',
        angle: 60,
        stroke: 'black',
        strokeWidth: 1,
      });
        // label 提示框
      const label1 = new Konva.Label({
        x: 600,
        y: 150,
        opacity: 0.75,
      });
      label1.add(
        new Konva.Tag({
          fill: 'black',
          pointerDirection: 'down',
          pointerWidth: 10,
          pointerHeight: 10,
          lineJoin: 'round',
          shadowBlur: 5,
          shadowColor: 'black',
          shadowOpacity: 0.5,
        }),
      );
      label1.add(
        new Konva.Text({
          text: '测试label',
          padding: 5,
          fill: 'white',
        }),
      );

      // 多边形
      const hexagon = new Konva.RegularPolygon({
        x: 500,
        y: 400,
        sides: 6,
        radius: 60,
        fill: 'yellow',
        stroke: 'black',
        strokeWidth: 2,
      });
        // 箭头
      const arrow = new Konva.Arrow({
        x: 500,
        y: 600,
        points: [0, 0, 100, 100],
        pointerLength: 20,
        pointerWidth: 20,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 'black',
        draggable: true,

      });

      // 事件绑定

      // 动画
      // 数据保存
      // 数据回显
      // 自定义属性
      // 加载gif图片
      // 自定义形状
      layer.add(arrow);
      layer.add(hexagon);
      layer.add(label1);
      layer.add(arc);
      layer.add(ring);
      layer.add(star);
      layer.add(textRect);
      layer.add(simpleText);
      layer.add(rect);
      layer.add(circle);
      layer.add(ellipse);
      layer.add(wedge);
      layer.add(redLine);
      layer.add(poly);
      stage.add(layer);
    },
  },
});
</script>
<style lang='scss' scoped>
.index {
    width: 100vw;
    height: 100vh;
}
</style>
