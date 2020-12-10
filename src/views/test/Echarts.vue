<template>
    <div class='test-eharts'>
        <div id="echarts" :style="{width: '300px', height: '300px'}"></div>
    </div>
</template>

<script>
const value = 0.2;
const data = [value, value, value];
export default {
  components: {},
  data() {
    return {
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
        }],
      },
    };
  },
  computed: {

  },
  mounted() {
    this.init();
  },
  watch: {},
  methods: {
    init() {
      console.log(this.$echarts);
      const echarts = this.$echarts.init(document.getElementById('echarts'));
      echarts.setOption(this.option);
      setTimeout(() => {
        const img = new Image();
        img.src = echarts.getDataURL({
          type: 'png',
          background: '#fff',
        });
        console.log(img.src);
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.test-echarts {
    width: 100%;
    height: 100%;
}
</style>
