/**
* @Description:基本图片
* @Author: wanggang
* @Date: 2020-12-09 19:37:29
**/
<template>
    <div class='base-image'>
        <div id="container"></div>
        <div class="test">{{imgOption}}</div>
    </div>
</template>

<script>
import ShapeOption from '@/common/shapeOption';

export default {
  components: {},
  data() {
    return {
      imgOption: [],
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const imageObj = {
        罐子: [
          '/img/guanzi/1.png',
          '/img/guanzi/2.png',
        ],
        电力: [],
        二次接线图: [],
        风机: [
          '/img/fengji/1.png',
          '/img/fengji/2.png',
          '/img/fengji/3.png',
          '/img/fengji/4.png',
          '/img/fengji/5.gif',
          '/img/fengji/6.gif',
          '/img/fengji/7.png',
          '/img/fengji/8.gif',
          '/img/fengji/9.png',
        ],
        隔栏: [],
        给排水: [],
        管道: [],
        罐体搅拌装置: [],
        锅炉: [],
        仪表: [],
        加热器: [],
        冷热源: [],
        流量计: [],
        送排风: [],
        制程加热: [],
        制程冷却: [],
        智能仪表: [],
      };
      for (let i = 1; i <= 155; i += 1) {
        imageObj['电力'].push(`/img/dianli/${i}.png`);
      }

      for (let i = 1; i <= 36; i += 1) {
        imageObj['二次接线图'].push(`/img/jiexian/${i}.png`);
      }
      for (let i = 1; i <= 11; i += 1) {
        imageObj['隔栏'].push(`/img/gelan/${i}.png`);
      }
      for (let i = 1; i <= 9; i += 1) {
        imageObj['给排水'].push(`/img/paishui/${i}.svg`);
      }
      for (let i = 1; i <= 5; i += 1) {
        imageObj['管道'].push(`/img/guandao/${i}.png`);
      }
      for (let i = 1; i <= 4; i += 1) {
        imageObj['罐体搅拌装置'].push(`/img/jiaoban/${i}.svg`);
      }
      for (let i = 1; i <= 33; i += 1) {
        imageObj['锅炉'].push(`/img/guolu/${i}.png`);
      }
      for (let i = 1; i <= 16; i += 1) {
        imageObj['仪表'].push(`/img/yibiao/${i}.png`);
      }
      for (let i = 1; i <= 17; i += 1) {
        imageObj['加热器'].push(`/img/jiareqi/${i}.png`);
      }
      for (let i = 1; i <= 7; i += 1) {
        imageObj['冷热源'].push(`/img/lengreyuan/${i}.svg`);
      }
      for (let i = 1; i <= 21; i += 1) {
        imageObj['流量计'].push(`/img/liuliangji/${i}.png`);
      }
      for (let i = 1; i <= 15; i += 1) {
        imageObj['送排风'].push(`/img/songpaifeng/${i}.svg`);
      }
      for (let i = 1; i <= 58; i += 1) {
        imageObj['制程加热'].push(`/img/zhichengjiare/${i}.png`);
      }
      for (let i = 1; i <= 21; i += 1) {
        imageObj['制程冷却'].push(`/img/zhichenglengque/${i}.png`);
      }
      for (let i = 1; i <= 5; i += 1) {
        imageObj['智能仪表'].push(`/img/zhinegyibiao/${i}.svg`);
      }

      const stage = new Konva.Stage({
        width: window.innerWidth,
        height: window.innerHeight,
        container: 'container',
      });
      const layer = new Konva.Layer();

      Object.keys(imageObj).forEach((key) => {
        const imgOption = {
          groupName: key,
          moduleItem: [],
        };
        const imgList = imageObj[key];
        for (let i = 0; i < imgList.length; i += 1) {
          ((j) => {
            const menuItem = {
              imgSrc: imgList[j],
              moduleJson: null,
              moduleName: '',
            };
            const group = new Konva.Group({
              draggable: true,
            });
            Konva.Image.fromURL(imgList[j], (node) => {
              group.add(node);
              // 判断图片类型
              ShapeOption.hasImageName();
              ShapeOption.hasImageUrl(imgList[j]);
              ShapeOption.hasImageHide();
              ShapeOption.hasImageSparkling();
              if (imgList[j].endsWith('.png') || imgList[j].endsWith('.jpg')) {
                ShapeOption.hasImageModuleType();
              }
              if (imgList[j].endsWith('.gif')) {
                ShapeOption.hasImageGifModuleType();
              }
              if (imgList[j].endsWith('.svg')) {
                ShapeOption.hasImageSvgModuleType();
              }
              const curAttr = group.toObject();
              console.log(curAttr.attrs);
              Object.assign(curAttr.attrs, ShapeOption.toObject());
              menuItem.moduleJson = JSON.stringify(curAttr);
              imgOption.moduleItem.push(menuItem);
              layer.add(group);
              layer.draw();
            });
          })(i);
        }
        this.imgOption.push(imgOption);
      });

      stage.add(layer);
    },
  },
};
</script>
<style lang='scss' scoped>
.base-image {
    width: 100%;
    height: 100%;

    .test {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1000;
        width: 100%;
        height: 100%;
        overflow: auto;
        color: white;
        background: rgba(0, 0, 0, 0.8);
    }
}
</style>
