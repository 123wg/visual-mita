/**
* @Description: 加载gif测试
* @Author: wanggang
* @Date: 2020-12-03 19:30:43
**/
<template>
    <div class='gif'>
        <div id="container"></div>
    </div>
</template>

<script>
/* eslint-disable */
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
      *@description:
      *@param{}
      *@return:
      */
    init() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const templateImage = new Image();

      templateImage.onload = function () {
        // image  has been loaded
        drawKonva(templateImage);
      };

      templateImage.src = '/img/test.gif';

      function drawKonva(templateImage) {
        const stage = new Konva.Stage({
          container: 'container',
          width,
          height,
        });

        const layer = new Konva.Layer();
        stage.add(layer);

        const gif = new SuperGif({
          gif: templateImage,
          progressbar_height: 0, // 进度条的高度
          auto_play: true,
          loop_mode: true,
          draw_while_loading: true,
        });

        gif.load();

        const gif_canvas = gif.get_canvas(); // the lib canvas
        // a copy of this canvas which will be appended to the doc
        const canvas = gif_canvas.cloneNode();
        const context = canvas.getContext('2d');

        function anim(t) { // our animation loop
          context.clearRect(0, 0, canvas.width, canvas.height); // in case of transparency ?
          context.drawImage(gif_canvas, 0, 0); // draw the gif frame
          layer.draw();
          requestAnimationFrame(anim);
        }

        anim();

        // draw resulted canvas into the stage as Konva.Image
        const image = new Konva.Image({
            x:20,
            y:50,
            image: canvas,
            draggable: true,
            width:200,
            height:200,
            //   可以任意添加自定义属性 序列化的时候 用自定义属性保存图片
            // 配置项也可以全部保存啊 卧槽
            // 先写配置 后期修改为面向对象生成的方式
            imgSrc:'test.gif',
        });
        layer.add(image);
        const json = stage.toJSON();
        console.log(json);
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.gif {
    width: 100%;
    height: 100%;
}
</style>
