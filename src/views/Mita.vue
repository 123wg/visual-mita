/**
* @Description: 可视化展示首页
* @Author: wanggang
* @Date: 2020-12-06 19:37:23
**/
<template>
    <div class='mita'>
        <div class="header">
            <div class="header-item" @click="stageToJson">保存</div>
        </div>
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
                <div class="container" id="container" ref="container"></div>
            </div>
            <div class="right">
                <div class="right-item" v-for="(item,index) in panelList" :key="index">
                    <component :is="getBindComp(item.attrType)" :attr="item"></component>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import shapeConfig from '@/common/shapeConfig';
import StagePlugin from '@/common/stagePlugin';
import Vue from 'vue';

const requireComponents = require.context('./rightPanel', true, /\.vue$/);
const panelListCom = [];
requireComponents.keys().forEach((fileName) => {
  const componentConfig = requireComponents(fileName);
  const componentName = componentConfig.default.name;
  console.log(componentName);
  panelListCom.push(componentName);
  Vue.component(componentName, componentConfig.default || componentConfig);
});

// 获取组件的 PascalCase 命名
export default {
  components: {
  },
  data() {
    return {
      shapeConfig,
      stageJson: '{"attrs":{"width":1024,"height":768},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{"draggable":true,"moduleAttr":[{"attrName":"绑定设备","attrCode":"dataKey","attrType":"hardwareSelect","attrWhere":"this"},{"attrName":"水池高度(峰值)","attrCode":"poolHeight","attrType":"input","attrWhere":"pool_background"},{"attrName":"水池边框粗细","attrCode":"strokeWidth","attrType":"input","attrWhere":"pool_border"},{"attrName":"水池边框颜色","attrCode":"stroke","attrType":"color","attrWhere":"pool_border"},{"attrName":"水池背景颜色","attrCode":"fill","attrType":"color","attrWhere":"pool_background"},{"attrName":"水的颜色","attrCode":"fill","attrType":"color","attrWhere":"pool_wrater"},{"attrName":"隐藏条件","attrCode":"hideWhere","attrType":"hideTable","attrWhere":"this"},{"attrName":"闪烁条件","attrCode":"sparklingWhere","attrType":"sparklingTable","attrWhere":"this"}],"name":"mita_module_group","moduleType":"POOL","dataKey":"[\'\']","methodCall":"setPoolValue","poolHeight":20,"hideWhere":"[{devicecode:\'\',min:\'\',max:\'\'}]","sparkLingWhere":"[{devicecode:\'\',min:\'\',max:\'\'}]","sparklingMethodCall":"sparklingModule","x":256,"y":211},"className":"Group","children":[{"attrs":{"width":200,"height":300,"fill":"yellow","name":"pool_background"},"className":"Rect"},{"attrs":{"y":280,"width":200,"height":20,"fill":"red","name":"pool_water"},"className":"Rect"},{"attrs":{"points":[0,0,0,300,200,300,200,0],"stroke":"black","name":"pool_border"},"className":"Line"}]},{"attrs":{"draggable":true,"moduleAttr":[{"attrName":"绑定设备","attrCode":"dataKey","attrType":"hardwareSelect","attrWhere":"this"},{"attrName":"温度","attrCode":"tempValue","attrType":"input","attrWhere":"this"}],"name":"mita_module_group","moduleType":"ECHARTS","dataKey":"[\'\']","methodCall":"setTempValue","tempValue":"0","echartsOption":"tempOption","x":29,"y":189},"className":"Group","children":[{"attrs":{},"className":"Image"}]},{"attrs":{"draggable":true,"moduleAttr":[{"attrName":"绑定设备","attrCode":"dataKey","attrType":"hardwareSelect","attrWhere":"this"},{"attrName":"动画条件","attrCode":"where","attrType":"whereSelectTable","attrWhere":"this"},{"attrName":"线条底色","attrCode":"stroke","attrType":"color","attrWhere":"flowline_bc"},{"attrName":"流动线条颜色","attrCode":"stroke","attrType":"color","attrWhere":"flowline_front"},{"attrName":"粗细","attrCode":"strokeWidth","attrType":"input","attrWhere":"flowline_bc"},{"attrName":"闪烁条件","attrCode":"sparklingWhere","attrType":"sparklingTable","attrWhere":"this"},{"attrName":"隐藏条件","attrCode":"hideWhere","attrType":"hideTable","attrWhere":"this"}],"name":"mita_module_group","moduleType":"FLOW_LINE","dataKey":"[\'\']","methodCall":"setFlowLineValue","where":"[{direction:\'\',where:{min:\'\',max:\'\'}}]","sparkLingWhere":"[{devicecode:\'\',min:\'\',max:\'\'}]","sparklingMethodCall":"sparklingModule","hideWhere":"[{devicecode:\'\',min:\'\',max:\'\'}]","hideMethodCall":"hideModule","x":422,"y":258},"className":"Group","children":[{"attrs":{"points":[20,20,470,20],"stroke":"#6699cc","strokeWidth":20,"lineCap":"round","lineJoin":"round","name":"flowline_bc"},"className":"Line"},{"attrs":{"points":[20,20,470,20],"stroke":"yellow","strokeWidth":15,"lineCap":"round","lineJoin":"round","name":"flowline_front","dash":[33,25]},"className":"Line"}]},{"attrs":{"draggable":true,"moduleAttr":[{"attrName":"绑定设备","attrCode":"dataKey","attrType":"hardwareSelect","attrWhere":"this"},{"attrName":"动画条件","attrCode":"where","attrType":"whereSelectTable","attrWhere":"this"},{"attrName":"线条底色","attrCode":"stroke","attrType":"color","attrWhere":"flowline_bc"},{"attrName":"流动线条颜色","attrCode":"stroke","attrType":"color","attrWhere":"flowline_front"},{"attrName":"粗细","attrCode":"strokeWidth","attrType":"input","attrWhere":"flowline_bc"},{"attrName":"闪烁条件","attrCode":"sparklingWhere","attrType":"sparklingTable","attrWhere":"this"},{"attrName":"隐藏条件","attrCode":"hideWhere","attrType":"hideTable","attrWhere":"this"}],"name":"mita_module_group","moduleType":"FLOW_LINE","dataKey":"[\'\']","methodCall":"setFlowLineValue","where":"[{direction:\'\',where:{min:\'\',max:\'\'}}]","sparkLingWhere":"[{devicecode:\'\',min:\'\',max:\'\'}]","sparklingMethodCall":"sparklingModule","hideWhere":"[{devicecode:\'\',min:\'\',max:\'\'}]","hideMethodCall":"hideModule","x":272,"y":148},"className":"Group","children":[{"attrs":{"points":[20,20,470,20],"stroke":"#6699cc","strokeWidth":20,"lineCap":"round","lineJoin":"round","name":"flowline_bc"},"className":"Line"},{"attrs":{"points":[20,20,470,20],"stroke":"yellow","strokeWidth":15,"lineCap":"round","lineJoin":"round","name":"flowline_front","dash":[33,25]},"className":"Line"}]}]}]}',
      selectAttr: 'InputAttr',
    };
  },
  mounted() {
    this.initStage();
  },
  computed: {
    panelList() {
      return this.$store.state.curNodeConList;
    },
  },
  watch: {},
  methods: {
    /**
      *@description: 面向对象方式改写初始化测试
      *@param{}
      *@return:
      */
    initStage() {
      // FIXME 暂时挂载到当前组件中 后期移出 防止库中数据影响性能
      CONFIG.stage = new StagePlugin();
      CONFIG.stage.initStage();
    },
    /**
      *@description: 测试数据导入回显
      *@param{}
      *@return:
      */
    export() {
      Konva.Node.create(this.testJson, 'container');
    },

    /**
    *@description: 元素拖拽
    *@param{}
    *@return:
    */
    dragShape(event, item) {
      event.dataTransfer.setData('shapeJson', item.moduleJson);
    },

    /**
    *@description: 数据持久化
    *@param{}
    *@return:
    */
    stageToJson() {
    //   console.log(JSON.parse(CONFIG.stage.getStageJson()));
      console.log(CONFIG.stage.getStageJson());
    },

    /**
    *@description: 展示保存的数据
    *@param{}
    *@return:
    */
    showStage() {
      CONFIG.stage = new StagePlugin();
      CONFIG.stage.initStageJson(this.stageJson, 'container');
    },

    /**
    *@description:获取绑定的组件
    *@param{}
    *@return:
    */
    getBindComp(type) {
      const name = type.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
      console.log(`${name}Attr`);
      return `${name}Attr`;
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
            width: 1100px;
            padding: 5px;
            border: 1px solid red;

            .container {
                background: rgba(0, 0, 0, 0.65);
            }
        }

        .right {
            position: absolute;
            top: 60px;
            right: 0;
            box-sizing: border-box;
            width: calc(100% - 1400px);
            height: calc(100% - 60px);
            padding: 0 8px;
            border: 1px solid red;

            .right-item {
                width: 100%;
                margin-top: 15px;

                &:nth-child(1) {
                    margin-top: 0;
                }
            }
        }
    }
}
</style>
