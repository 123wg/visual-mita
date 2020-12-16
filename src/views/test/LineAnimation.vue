/**
* @Description: 线条动画
* @Author: wanggang
* @Date: 2020-12-15 23:31:09
**/
// TODO
<template>
    <div class='line-anima'>
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
  mounted() {
    this.init();
  },
  computed: {},
  watch: {},
  methods: {
    /**
      *@description: init
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

      const group = new Konva.Group({
        draggable: true,
      });

      const staLenth = stage.width();
      const Y = 20;
      const startX = 20;
      const endX = staLenth / 3;
      console.log(staLenth);
      const lineBc = new Konva.Line({
        points: [startX, Y, endX, Y],
        stroke: '#6699cc',
        strokeWidth: 20,
        lineCap: 'round',
        lineJoin: 'round',
        name: 'flowline_bc',
      });
      const lineFront = new Konva.Line({
        points: [startX, Y, endX, Y],
        stroke: 'yellow',
        strokeWidth: 15,
        lineCap: 'round',
        lineJoin: 'round',
        name: 'flowline_front',
        dash: [33, 25],
      });
      console.log(lineFront);
      const anim = new Konva.Animation((e) => {
        console.log(-(e.time / 40));
        lineFront.dashOffset(-(e.time / 40));
      }, layer);
      anim.start();
      console.log(lineBc.points());
      group.add(lineBc);
      group.add(lineFront);
      layer.add(group);
      layer.draw();
    },
  },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
