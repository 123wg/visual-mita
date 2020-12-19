/**
* @Description: Mita 客户端展示
* @Author: wanggang
* @Date: 2020-12-13 17:14:22
**/
<template>
    <div class='mita-client'>
        <div class="socket">
            <!-- 心跳状态 -->
            <span class="msg-sta">心跳状态:{{heartStatus==='ping'?'未连接':'正常'}}</span>
            <!-- 接收数据 -->
            <span class="msg-val">接收数据:{{messageValue}}</span>
        </div>
        <div id="container"></div>
    </div>
</template>

<script>
import StagePlugin from '@/common/stagePlugin';
import Websocket from '@/common/websocket';
import StageClient from '@/common/stageClient';

export default {
  components: {},
  data() {
    return {
      stageJson: '{"attrs":{"width":1100,"height":900},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{"draggable":true,"moduleAttr":[{"attrName":"绑定设备","attrCode":"dataKey","attrType":"hardwareSelect","attrWhere":"this"},{"attrName":"水池高度(峰值)","attrCode":"poolHeight","attrType":"input","attrWhere":"this"},{"attrName":"水池边框粗细","attrCode":"strokeWidth","attrType":"input","attrWhere":"pool_border"},{"attrName":"水池边框颜色","attrCode":"stroke","attrType":"color","attrWhere":"pool_border"},{"attrName":"水池背景颜色","attrCode":"fill","attrType":"color","attrWhere":"pool_background"},{"attrName":"水的颜色","attrCode":"fill","attrType":"color","attrWhere":"pool_water"},{"attrName":"隐藏条件","attrCode":"hideWhere","attrType":"hideTable","attrWhere":"this"},{"attrName":"闪烁条件","attrCode":"sparklingWhere","attrType":"sparklingTable","attrWhere":"this"}],"name":"mita_module_group","moduleType":"POOL","dataKey":["a1"],"methodCall":"setPoolValue","poolHeight":"30","hideWhere":[{"devicecode":"","min":"","max":""}],"hideMethodCall":"hideModule","sparklingWhere":[{"devicecode":"","min":"","max":""}],"sparklingMethodCall":"sparklingModule","x":418,"y":135},"className":"Group","children":[{"attrs":{"width":200,"height":300,"fill":"#00BFEE","name":"pool_background"},"className":"Rect"},{"attrs":{"y":280,"width":200,"height":20,"fill":"#FB2302","name":"pool_water"},"className":"Rect"},{"attrs":{"points":[0,0,0,300,200,300,200,0],"stroke":"#000000","strokeWidth":"8","name":"pool_border"},"className":"Line"}]},{"attrs":{"draggable":true,"moduleAttr":[{"attrName":"绑定设备","attrCode":"dataKey","attrType":"hardwareSelect","attrWhere":"this"},{"attrName":"动画条件","attrCode":"where","attrType":"whereSelectTable","attrWhere":"this"},{"attrName":"线条底色","attrCode":"stroke","attrType":"color","attrWhere":"flowline_bc"},{"attrName":"流动线条颜色","attrCode":"stroke","attrType":"color","attrWhere":"flowline_front"},{"attrName":"粗细","attrCode":"strokeWidth","attrType":"input","attrWhere":"flowline_bc"},{"attrName":"闪烁条件","attrCode":"sparklingWhere","attrType":"sparklingTable","attrWhere":"this"},{"attrName":"隐藏条件","attrCode":"hideWhere","attrType":"hideTable","attrWhere":"this"}],"name":"mita_module_group","moduleType":"FLOW_LINE","dataKey":["a2"],"methodCall":"setFlowLineValue","where":[{"direction":"forward","where":{"min":"","max":""},"min":0,"max":20}],"sparklingWhere":[{"devicecode":"","min":"","max":""}],"sparklingMethodCall":"sparklingModule","hideWhere":[{"devicecode":"","min":"","max":""}],"hideMethodCall":"hideModule","x":207,"y":561},"className":"Group","children":[{"attrs":{"points":[20,20,640,20],"stroke":"#6699cc","strokeWidth":20,"lineCap":"round","lineJoin":"round","name":"flowline_bc"},"className":"Line"},{"attrs":{"points":[20,20,640,20],"stroke":"yellow","strokeWidth":15,"lineCap":"round","lineJoin":"round","name":"flowline_front","dash":[33,25]},"className":"Line"}]}]}]}',
      ws: null,
      heartStatus: 'pong',
      messageValue: null,
      client: null,
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.showStage();
    // 初始化websocket
    this.initSocket();
  },
  methods: {
    showStage() {
      CONFIG.stage = new StagePlugin();
      CONFIG.stage.initStageJson(this.stageJson, 'container');
      this.client = new StageClient(CONFIG.stage.stage);
    },

    // socket初始化
    initSocket() {
      this.ws = new Websocket('mita');
      this.ws.getMessage((data) => {
        if (data.messageType === 2) {
          this.heartStatus = data.messageValue;
        }
        if (data.messageType === 3) {
          this.messageValue = data.messageValue;
          this.client.setStageData(this.messageValue);
        }
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.mita-client {
    width: 100%;
    height: 100%;

    .socket {
        span {
            margin-left: 20px;
        }
    }
}
</style>
