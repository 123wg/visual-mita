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
            stageJson: '{"attrs":{"width":1100,"height":900},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{"draggable":true,"moduleAttr":[{"attrName":"绑定设备","attrCode":"dataKey","attrType":"hardwareSelect","attrWhere":"this"},{"attrName":"动画条件","attrCode":"where","attrType":"whereSelectTable","attrWhere":"this"},{"attrName":"线条底色","attrCode":"stroke","attrType":"color","attrWhere":"flowline_bc"},{"attrName":"流动线条颜色","attrCode":"stroke","attrType":"color","attrWhere":"flowline_front"},{"attrName":"粗细","attrCode":"strokeWidth","attrType":"input","attrWhere":"flowline_bc"},{"attrName":"闪烁条件","attrCode":"sparklingWhere","attrType":"sparklingTable","attrWhere":"this"},{"attrName":"隐藏条件","attrCode":"hideWhere","attrType":"hideTable","attrWhere":"this"}],"name":"mita_module_group","moduleType":"FLOW_LINE","dataKey":["a1"],"methodCall":"setFlowLineValue","where":[{"direction":"forward","where":{"min":"","max":""},"min":0,"max":100}],"sparklingWhere":[{"devicecode":"","min":"","max":""}],"sparklingMethodCall":"sparklingModule","hideWhere":[{"devicecode":"","min":"","max":""}],"hideMethodCall":"hideModule","x":313,"y":284},"className":"Group","children":[{"attrs":{"points":[12,47,325,45,321.5,441,542,440],"stroke":"#6699cc","strokeWidth":20,"lineCap":"round","lineJoin":"round","name":"flowline_bc"},"className":"Line"},{"attrs":{"points":[12,47,325,45,321.5,441,542,440],"stroke":"yellow","strokeWidth":15,"lineCap":"round","lineJoin":"round","name":"flowline_front","dash":[33,25]},"className":"Line"}]},{"attrs":{"draggable":true,"moduleAttr":[{"attrName":"绑定设备","attrCode":"dataKey","attrType":"hardwareSelect","attrWhere":"this"},{"attrName":"水池高度(峰值)","attrCode":"poolHeight","attrType":"input","attrWhere":"this"},{"attrName":"水池边框粗细","attrCode":"strokeWidth","attrType":"input","attrWhere":"pool_border"},{"attrName":"水池边框颜色","attrCode":"stroke","attrType":"color","attrWhere":"pool_border"},{"attrName":"水池背景颜色","attrCode":"fill","attrType":"color","attrWhere":"pool_background"},{"attrName":"水的颜色","attrCode":"fill","attrType":"color","attrWhere":"pool_water"},{"attrName":"隐藏条件","attrCode":"hideWhere","attrType":"hideTable","attrWhere":"this"},{"attrName":"闪烁条件","attrCode":"sparklingWhere","attrType":"sparklingTable","attrWhere":"this"}],"name":"mita_module_group","moduleType":"POOL","dataKey":["a1"],"methodCall":"setPoolValue","poolHeight":20,"hideWhere":[{"devicecode":"","min":"","max":""}],"hideMethodCall":"hideModule","sparklingWhere":[{"devicecode":"","min":"","max":""}],"sparklingMethodCall":"sparklingModule","x":291,"y":306,"offsetX":103,"offsetY":153},"className":"Group","children":[{"attrs":{"width":200,"height":300,"fill":"#b3f0ff","name":"pool_background"},"className":"Rect"},{"attrs":{"y":280,"width":200,"height":20,"fill":"#4db8ff","name":"pool_water"},"className":"Rect"},{"attrs":{"points":[0,0,0,300,200,300,200,0],"stroke":"#000000","strokeWidth":6,"name":"pool_border"},"className":"Line"}]},{"attrs":{"draggable":true,"moduleAttr":[{"attrName":"隐藏条件","attrCode":"hideWhere","attrType":"hideTable","attrWhere":"this"},{"attrName":"闪烁条件","attrCode":"sparklingWhere","attrType":"sparklingTable","attrWhere":"this"}],"name":"mita_module_group","imageUrl":"/img/paishui/2.svg","hideWhere":[{"devicecode":"","min":"","max":""}],"hideMethodCall":"hideModule","sparklingWhere":[{"devicecode":"","min":"","max":""}],"sparklingMethodCall":"sparklingModule","moduleType":"SVG","x":813,"y":730,"offsetX":100,"offsetY":100},"className":"Group","children":[{"attrs":{},"className":"Image"}]},{"attrs":{"draggable":true,"moduleAttr":[{"attrName":"文字","attrCode":"text","attrType":"input","attrWhere":"text"},{"attrName":"字体大小","attrCode":"fontSize","attrType":"input","attrWhere":"text"},{"attrName":"文字颜色","attrCode":"fill","attrType":"color","attrWhere":"text"}],"name":"mita_module_group","moduleType":"Text","x":262,"y":120,"offsetX":28,"offsetY":19},"className":"Group","children":[{"attrs":{"name":"text","text":"水槽","fontSize":18,"fontFamily":"Calibri","fill":"#000","align":"center","padding":10},"className":"Text"}]},{"attrs":{"draggable":true,"moduleAttr":[{"attrName":"隐藏条件","attrCode":"hideWhere","attrType":"hideTable","attrWhere":"this"},{"attrName":"闪烁条件","attrCode":"sparklingWhere","attrType":"sparklingTable","attrWhere":"this"}],"name":"mita_module_group","imageUrl":"/img/yibiao/5.png","hideWhere":[{"devicecode":"","min":"","max":""}],"hideMethodCall":"hideModule","sparklingWhere":[{"devicecode":"","min":"","max":""}],"sparklingMethodCall":"sparklingModule","moduleType":"IMAGE","x":888.4999999999998,"y":641.5000000000005,"offsetX":316,"offsetY":364,"scaleX":0.15031645569620342,"scaleY":0.14423076923077008},"className":"Group","children":[{"attrs":{},"className":"Image"}]},{"attrs":{"draggable":true,"moduleAttr":[{"attrName":"文字","attrCode":"text","attrType":"input","attrWhere":"text"},{"attrName":"字体大小","attrCode":"fontSize","attrType":"input","attrWhere":"text"},{"attrName":"文字颜色","attrCode":"fill","attrType":"color","attrWhere":"text"}],"name":"mita_module_group","moduleType":"Text","x":852,"y":571,"offsetX":28,"offsetY":19},"className":"Group","children":[{"attrs":{"name":"text","text":"水压","fontSize":"25","fontFamily":"Calibri","fill":"#07FFF7","align":"center","padding":10},"className":"Text"}]},{"attrs":{"draggable":true,"moduleAttr":[{"attrName":"隐藏条件","attrCode":"hideWhere","attrType":"hideTable","attrWhere":"this"},{"attrName":"闪烁条件","attrCode":"sparklingWhere","attrType":"sparklingTable","attrWhere":"this"}],"name":"mita_module_group","imageUrl":"/img/songpaifeng/11.svg","hideWhere":[{"devicecode":"","min":"","max":""}],"hideMethodCall":"hideModule","sparklingWhere":[{"devicecode":"","min":"","max":""}],"sparklingMethodCall":"sparklingModule","moduleType":"SVG","x":418,"y":647,"offsetX":60,"offsetY":50},"className":"Group","children":[{"attrs":{},"className":"Image"}]},{"attrs":{"draggable":true,"moduleAttr":[{"attrName":"隐藏条件","attrCode":"hideWhere","attrType":"hideTable","attrWhere":"this"},{"attrName":"闪烁条件","attrCode":"sparklingWhere","attrType":"sparklingTable","attrWhere":"this"}],"name":"mita_module_group","imageUrl":"/img/songpaifeng/12.svg","hideWhere":[{"devicecode":"","min":"","max":""}],"hideMethodCall":"hideModule","sparklingWhere":[{"devicecode":"","min":"","max":""}],"sparklingMethodCall":"sparklingModule","moduleType":"SVG","x":140,"y":656,"offsetX":60,"offsetY":50},"className":"Group","children":[{"attrs":{},"className":"Image"}]}]}]}',
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
