/**
* @Description: 动画
* @Author: wanggang
* @Date: 2020-12-02 20:13:06
**/
<template>
    <div class='animation'>
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
      *@description: 初始化
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
      const hexagon = new Konva.RegularPolygon({
        x: 50,
        y: 50,
        radius: 20,
        sides: 6,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 2,
      });
      //   1.直线运动动画
      const anim = new Konva.Animation((frame) => {
        hexagon.x(100 * Math.sin((frame.time * 2 * Math.PI) / 2000) + 500);
      }, layer);
      anim.start();

      const rotateRect = new Konva.Rect({
        x: 300,
        y: 300,
        width: 200,
        height: 200,
        fill: 'yellow',
        stroke: 'black',
        strokeWidth: 2,
        draggable: true,
        offset: {
          x: 100,
          y: 100,
        },
      });
      //   2.旋转动画
      const animi = new Konva.Animation((frame) => {
        const angleDiff = (frame.timeDiff * 90) / 1000;
        rotateRect.rotate(angleDiff);
      }, layer);

      //   3.缩放动画
      const scalePoly1 = new Konva.RegularPolygon({
        x: 500,
        y: 500,
        sides: 6,
        fill: 'yellow',
        radius: 20,
        stroke: 'black',
        strokeWidth: 2,
      });
      layer.add(scalePoly1);
      const scaleAnim = new Konva.Animation((frame) => {
        const scale = Math.sin((frame.time * 2 * Math.PI) / 2000) + 0.001;
        scalePoly1.scale({ x: scale, y: scale });
      });
      //   4.关闭动画
      setTimeout(() => {
        scaleAnim.stop();
      }, 5000);
      scaleAnim.start();
      animi.start();
      layer.add(rotateRect);
      layer.add(hexagon);
      stage.add(layer);
    },
  },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
