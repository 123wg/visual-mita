/**
* @Description: 补间动画测试
* @Author: wanggang
* @Date: 2020-12-02 19:24:50
**/
<template>
    <div class='tween'>
        <div id="container"></div>
    </div>
</template>

<script>
export default {
  name: 'Tween',
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
      *@description: 补间动画测试
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
      const rect = new Konva.Rect({
        x: 50,
        y: 50,
        width: 200,
        height: 200,
        fill: 'yellow',
        stroke: 'black',
        strokeWidth: 2,
      });
      layer.add(rect);
      layer.draw();

      // 1. 创建动画对象
      const tween = new Konva.Tween({
        node: rect,
        duration: 1,
        x: 140,
        y: 90,
        fill: 'red',
        // rotation: Math.PI * 2,
        opacity: 1,
        strokeWidth: 6,
        scaleX: 1.5,
      });
      //   2.开始播放
      tween.play();
      // 3.缓动动画形式
      const yellowRect = new Konva.Rect({
        x: 100,
        y: 300,
        width: 200,
        height: 200,
        fill: 'yellow',
        stroke: 'black',
        strokeWidth: 2,
      });
      const redRect = new Konva.Rect({
        x: 400,
        y: 300,
        width: 200,
        height: 200,
        fill: 'red',
        blurRadius: 20,
        stroke: 'black',
        strokeWidth: 2,
      });
      layer.add(yellowRect);
      layer.add(redRect);
      yellowRect.tween = new Konva.Tween({
        node: yellowRect,
        scaleX: 1.5,
        scaleY: 1.5,
        duration: 1,
        easing: Konva.Easings.EaseIn,
        // 4.动画执行结束回调
        onFinish() {
          console.log('动画执行结束');
        },
      });
      redRect.tween = new Konva.Tween({
        node: redRect,
        scaleX: 1.5,
        scaleY: 1.5,
        duration: 1,
        // blurRadius: 50,
        easing: Konva.Easings.EaseOut,
      });
      layer.on('mouseover touchstart', (evt) => {
        evt.target.tween.play();
      });
      layer.on('mouseout touchend', (evt) => {
        evt.target.tween.reverse();
      });
    //   5.所有方法
    // play()
    // reverse()
    // pause()
    // finish
    },
  },
};
</script>
<style lang='scss' scoped>
.tween {
    width: 100%;
    height: 100%;
}
</style>
