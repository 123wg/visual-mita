/**
* @Description: 测试加载svg
* @Author: wanggang
* @Date: 2020-12-10 21:15:29
**/
<template>
    <div class='test-svg'>
        <div id="container"></div>
    </div>
</template>

<script>
export default {
  name: 'Svg',
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

      Konva.Image.fromURL('/img/jiaoban/1.svg', (imageNode) => {
        layer.add(imageNode);
        imageNode.setAttrs({
          width: 150,
          height: 150,
        });
        layer.batchDraw();
      });
      stage.add(layer);
    },
  },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
