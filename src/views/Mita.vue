/**
* @Description: 可视化展示首页
* @Author: wanggang
* @Date: 2020-12-06 19:37:23
**/
<template>
    <div class='mita'>
        <div class="header"></div>
        <div class="main">
            <div class="left">
                <div class="module-group" v-for="(item,index) in shapeConfig" :key="index">
                    <div class="group-header">{{item.groupName}}</div>
                    <div class="group-con">
                        <div class="item"
                             :draggable="true"
                             v-for="(items,indexs) in item.moduleItem"
                             :key="indexs"
                             :style="{ backgroundImage: 'url('+items.imgSrc+')', fontSize: 20 + 'px' }"
                             @dragstart="(evt)=>dragShape(evt,items)">
                        </div>
                    </div>
                </div>
            </div>
            <div class="middle">
                <div class="container" id="container"></div>
            </div>
            <div class="right"></div>
        </div>
    </div>
</template>

<script>
import shapeConfig from '@/common/shapeConfig';

export default {
  components: {},
  data() {
    return {
      shapeConfig,
    };
  },
  computed: {},
  mounted() {
    this.init();
  },
  watch: {},
  methods: {
    init() {
      // 1.舞台初始化
      const stage = new Konva.Stage({
        width: 900,
        height: 600,
        container: 'container',
      });
      const layer = new Konva.Layer();
      stage.add(layer);
      //   2.监听拖拽事件
      const con = stage.container();
      con.addEventListener('dragover', (evt) => {
        evt.preventDefault();
      });
      con.addEventListener('drop', (evt) => {
        stage.setPointersPositions(evt);
        const shapeOption = JSON.parse(evt.dataTransfer.getData('shapeJson'));
        const curPosition = stage.getPointerPosition();
        if (shapeOption.attrs.moduleType === 'IMAGE' || shapeOption.attrs.moduleType === 'SVG') { // 一般图片
          Konva.Image.fromURL(shapeOption.attrs.imageUrl, (node) => {
            node.setAttrs({
              ...shapeOption.attrs,
            });
            node.position(curPosition);
            layer.add(node);
            layer.draw();
          });
        }
        // if (shapeOption.attrs.moduleType === 'SVG') {

        // }
        if (shapeOption.attrs.moduleType === 'GIF') {
          const templateImage = new Image();
          templateImage.src = shapeOption.attrs.imageUrl;
          templateImage.onload = () => {
            // image  has been loaded
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

            const anim = () => { // our animation loop
              context.clearRect(0, 0, canvas.width, canvas.height); // in case of transparency ?
              context.drawImage(gif_canvas, 0, 0); // draw the gif frame
              layer.draw();
              requestAnimationFrame(anim);
            };

            anim();

            // draw resulted canvas into the stage as Konva.Image
            const image = new Konva.Image({
              image: canvas,
              width: 200,
              height: 200,
              //   可以任意添加自定义属性 序列化的时候 用自定义属性保存图片
              // 配置项也可以全部保存啊 卧槽
              // 先写配置 后期修改为面向对象生成的方式
              imgSrc: 'test.gif',
            });
            image.position(curPosition);
            // image.setAttrs({
            //   ...shapeOption.attrs,
            // });
            console.log(shapeOption.attrs);
            Object.keys(shapeOption.attrs).forEach((key) => {
              image.setAttr(key, shapeOption.attrs[key]);
            });
            console.log(image);
            layer.add(image);
          };
        }

        if (shapeOption.attrs.moduleType === 'FLOW_LINE') {
          const s = Konva.Node.create(shapeOption);
          s.move(curPosition);
          layer.add(s);
          layer.draw();
        } else {
          const s = Konva.Node.create(shapeOption);
          s.position(stage.getPointerPosition());
          layer.add(s);
          layer.draw();
        }
      });
      // 3.创建变换器
      const tr = new Konva.Transformer({
        nodes: [],
        rotateAnchorOffset: 60,
        // 是否开启中心点缩放
        centeredScaling: false,
        // 保持纵横比
        keepRatio: false,
        enabledAnchors: ['top-left', 'top-center', 'top-right', 'middle-right', 'middle-left', 'bottom-left', 'bottom-center', 'bottom-right'],
      });

      stage.on('click tap', (e) => {
        if (e.target === stage) {
          tr.nodes([]);
          layer.draw();
          return;
        }
        const parent = e.target.getParent();
        if (e.target.attrs.moduleType === 'IMAGE' || e.target.attrs.moduleType === 'SVG' || e.target.attrs.moduleType === 'GIF') {
          tr.nodes([e.target]);
          layer.draw();
        } else if (parent) {
          if (parent.attrs.moduleType === 'POOL') {
            tr.nodes([parent]);
            layer.draw();
          }
          if (parent.attrs.moduleType === 'FLOW_LINE') {
            this.addFlowLineEdit(parent, layer);
          }
        }
      });
      layer.add(tr);
    },

    /**
    *@description: 流动线条编辑
    *@param{}
    *@return:
    */
    addFlowLineEdit(e, layer) {
      const that = this;
      // 查找所有拖拽元素 销毁
      const circleArrt = layer.find('Circle');
      circleArrt.each((obj) => {
        obj.destroy();
      });
      layer.draw();

      // 获取当前位置
      //   const position = {
      //     x: e.attrs.x,
      //     y: e.attrs.y,
      //   };
      // 获取背景线条元素
      const curLine = e.find('.flowline_bc')[0];
      const frontLine = e.find('.flowline_front')[0];
      // 线条点位
      const linePoints = curLine.points();
      // 线条宽度
      const strokeWidth = curLine.strokeWidth();
      for (let i = 0; i < linePoints.length / 2; i += 1) {
        const move = i * 2;
        const moves = linePoints[move];
        const movee = linePoints[move + 1];
        const drag = i;
        const dragP = drag * 2;
        // 创建移动标记
        const moveCircle = new Konva.Circle({
          x: moves,
          y: movee,
          radius: strokeWidth / 2 + 5,
          stroke: 'yellow',
          strokeWidth: 2,
          name: 'line_anchor',
          draggable: true,
          indexLabel: dragP,
        });
        e.add(moveCircle);
        layer.draw();

        moveCircle.on('dragmove', (evt) => {
          const obj = evt.currentTarget;
          const dragIndex = obj.attrs.indexLabel;
          // 当前移动的坐标
          const x = obj.x();
          const y = obj.y();
          const preCircle = layer.find(`.line_anchor${dragIndex - 1}`)[0];
          const behindCircle = layer.find(`.line_anchor${dragIndex + 1}`)[0];
          // 新坐标
          const preCirclex = dragIndex - 2;
          const preCircley = dragIndex - 1;
          const behindx = dragIndex + 2;
          const behindy = dragIndex + 3;
          if (preCircle !== undefined) {
            preCircle.x((linePoints[preCirclex] + x) / 2);
            preCircle.y((linePoints[preCircley] + y) / 2);
          }
          if (behindCircle !== undefined) {
            behindCircle.x((linePoints[behindx] + x) / 2);
            behindCircle.y((linePoints[behindy] + y) / 2);
          }
          linePoints.splice(dragIndex, 2, x, y);
          curLine.points(linePoints);
          frontLine.points(linePoints);
          layer.draw();
        });

        if (drag !== 0) {
          const drags = (linePoints[dragP - 2] + linePoints[dragP]) / 2;
          const drage = (linePoints[dragP - 1] + linePoints[dragP + 1]) / 2;
          // 创建拖动标记
          const dragCircle = new Konva.Circle({
            x: drags,
            y: drage,
            radius: strokeWidth / 2 + 5,
            stroke: 'red',
            strokeWidth: 2,
            name: `line_anchor${dragP - 1}`,
            draggable: true,
          });

          dragCircle.on('dragend', (evt) => {
            const obj = evt.currentTarget;
            linePoints.splice(dragP, 0, obj.x(), obj.y());
            curLine.points(linePoints);
            frontLine.points(linePoints);
            console.log(linePoints);
            that.addFlowLineEdit(e, layer);
          });
          e.add(dragCircle);
          layer.draw();
        }
      }
      // 查看所有的点数量
      // 有两个点 产生循环产生两个点
    },

    /**
    *@description: 元素拖拽
    *@param{}
    *@return:
    */
    dragShape(event, item) {
      event.dataTransfer.setData('shapeJson', item.moduleJson);
    },
  },
};
</script>
<style lang='scss' scoped>
.mita {
    width: 100vw;
    height: 100vh;

    .header {
        width: 100%;
        height: 60px;
        background: rgba(0, 0, 0, 0.65);
    }

    .main {
        display: flex;
        width: 100%;
        height: calc(100% - 60px);

        .left {
            box-sizing: border-box;
            width: 300px;
            overflow: auto;
            border: 1px solid red;

            .module-group {
                width: 100%;

                .group-header {
                    width: 100%;
                    height: 40px;
                    color: black;
                    border: 1px solid red;
                }

                .group-con {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                    width: 100%;

                    .item {
                        width: 85px;
                        height: 70px;
                        margin-top: 10px;
                        cursor: move;
                        background-size: 100% 100%;
                        border: 1px solid red;
                    }
                }
            }
        }

        .middle {
            box-sizing: border-box;
            width: 1024px;
            padding: 5px;
            border: 1px solid red;

            .container {
                background: rgba(0, 0, 0, 0.65);
            }
        }
    }
}
</style>
