/**
* @Description: 蓄水池
* @Author: wanggang
* @Date: 2020-12-06 18:09:00
**/

<template>
    <div class='base'>
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
      stage.add(layer);

      const group = new Konva.Group({
        draggable: true,
      });
      const rect1 = new Konva.Rect({
        x: 0,
        y: 0,
        width: 200,
        height: 300,
        fill: '#b3f0ff',
        name: 'pool_background',
      });
      const rect2 = new Konva.Rect({
        x: 0,
        y: 280,
        width: 200,
        height: 20,
        fill: '#4db8ff',
        name: 'pool_water',
      });
      const line = new Konva.Line({
        points: [0, 0, 0, 300, 200, 300, 200, 0],
        stroke: '#000000',
        strokeWidth: 6,
        name: 'pool_border',
      });
      group.add(rect1, rect2, line);
      layer.add(group);
      layer.draw();
      //   配置导入
      ShapeOption.hasPoolName();
      ShapeOption.hasPoolModuleType();
      ShapeOption.hasPoolBindDevice();
      ShapeOption.hasPoolHeight();
      ShapeOption.hasPoolStrokeWidth('pool_border');
      ShapeOption.hasPoolStrokeColor('pool_border');
      ShapeOption.hasPoolFillColor('pool_background');
      ShapeOption.hasPoolWaterColor('pool_water');
      ShapeOption.commonHide();
      ShapeOption.commonSparkLing();
      const curAttr = group.toObject();
      Object.assign(curAttr.attrs, ShapeOption.toObject());
      console.log(curAttr);
      console.log(JSON.stringify(curAttr));
    },
  },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
