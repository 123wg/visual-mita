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
      const stage = new Konva.Stage({
        width: 900,
        height: 600,
        container: 'container',
      });
      const layer = new Konva.Layer();
      stage.add(layer);
      const con = stage.container();
      con.addEventListener('dragover', (evt) => {
        evt.preventDefault();
      });
      con.addEventListener('drop', (evt) => {
        stage.setPointersPositions(evt);
        const s = Konva.Node.create(evt.dataTransfer.getData('shapeJson'));
        s.position(stage.getPointerPosition());
        // console.log();
        layer.add(s);
        layer.draw();
      });
      // 创建变换器
      const tr = new Konva.Transformer({
        nodes: [],
        rotateAnchorOffset: 60,
        // 是否开启中心点缩放
        centeredScaling: false,
        // 保持纵横比
        keepRatio: false,
        enabledAnchors: ['top-left', 'top-center', 'top-right', 'middle-right', 'middle-left', 'bottom-left', 'bottom-center', 'bottom-right'],
      });
      //  选中矩形框
      let x1;
      let x2;
      let y1;
      let y2;
      const selectionRect = new Konva.Rect({
        fill: 'rgba(0,0,255,0.5)',
        visible: false,
      });
      //  鼠标按下事件
      stage.on('mousedown touchstart', (e) => {
        if (e.target !== stage) return;
        console.log('鼠标按下');
        x1 = stage.getPointerPosition().x;
        y1 = stage.getPointerPosition().y;
        x2 = stage.getPointerPosition().x;
        y2 = stage.getPointerPosition().y;

        selectionRect.visible(true);
        selectionRect.width(0);
        selectionRect.height(0);
        layer.draw();
      });

      //   // 鼠标移动事件
      stage.on('mousemove touchmove', () => {
        if (!selectionRect.visible()) return;
        x2 = stage.getPointerPosition().x;
        y2 = stage.getPointerPosition().y;
        selectionRect.setAttrs({
          x: Math.min(x1, x2),
          y: Math.min(y1, y2),
          width: Math.abs(x2 - x1),
          height: Math.abs(y2 - y1),
        });
        layer.batchDraw();
      });

      stage.on('mouseup touchend', () => {
        // no nothing if we didn't start selection
        if (!selectionRect.visible()) {
          return;
        }
        console.log('鼠标抬起');
        // update visibility in timeout, so we can check it in click event
        setTimeout(() => {
          selectionRect.visible(false);
          layer.batchDraw();
        });

        const shapes = stage.find('.rect').toArray();
        const box = selectionRect.getClientRect();
        // 过滤出有交叉点的图形
        const selected = shapes.filter((shape) => Konva.Util.haveIntersection(box, shape.getClientRect()));
        tr.nodes(selected);
        layer.batchDraw();
      });

      stage.on('click tap', (e) => {
        //  先执行mousedown 事件 在执行点击事件
        if (selectionRect.visible()) return;

        // 点击空白区域
        if (e.target === stage) {
          tr.nodes([]);
          layer.draw();
          return;
        }
        // console.log(e.target.parent.getAttr('moduleType'));
        // 未点击矩形 直接返回
        if (!e.target.parent.hasName('mita_module_group')) return;
        console.log('点击');
        // 是否按下shift或ctrl
        const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
        const isSelected = tr.nodes().indexOf(e.target) >= 0;
        if (!metaPressed && !isSelected) {
          tr.nodes([e.target]);
        } else if (metaPressed && isSelected) {
          const nodes = tr.nodes().slice();
          nodes.splice(nodes.indexOf(e.target), 1);
          tr.nodes(nodes);
        } else if (metaPressed && !isSelected) {
          const nodes = tr.nodes().concat([e.target]);
          tr.nodes(nodes);
        }
        layer.draw();
      });
      layer.add(tr);
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
