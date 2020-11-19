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
      /**
        *@description: 初始化
        *@param{}
        *@return:
        */
      init() {
        const stage = new Konva.Stage({
          container: 'container', // 容器 id
          width: 500, // canvas 宽度
          height: 300, // canvas 高度
        });
        const layer = new Konva.Layer();
        stage.add(layer);
        const rect = new Konva.Rect({
          x: 10,
          y: 10,
          width: 100,
          height: 100,
          fill: 'blue',
        });
        console.log(rect);
      },
    };
  },
  computed: {},
  watch: {},
  methods: {},
});
</script>
<style lang='scss' scoped>
.index {
    width: 100vw;
    height: 100vh;
}
</style>
