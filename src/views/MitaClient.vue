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
            stageJson: '{"attrs":{"width":1100,"height":900},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{"draggable":true,"moduleAttr":[{"attrName":"旋转条件","attrCode":"rotateWhere","attrType":"rotateTable","attrWhere":"this"},{"attrName":"隐藏条件","attrCode":"hideWhere","attrType":"hideTable","attrWhere":"this"},{"attrName":"闪烁条件","attrCode":"sparklingWhere","attrType":"sparklingTable","attrWhere":"this"}],"name":"mita_module_group","moduleType":"SVG_BASE_ROTATE","imageUrl":"/img/rotate_blue.svg","rotateWhere":[{"devicecode":"a1","min":0,"max":20}],"rotateMethodCall":"rotateModule","hideWhere":[{"devicecode":"","min":"","max":""}],"hideMethodCall":"hideModule","sparklingWhere":[{"devicecode":"","min":"","max":""}],"sparklingMethodCall":"sparklingModule","x":355,"y":272,"offsetX":100,"offsetY":100},"className":"Group","children":[{"attrs":{},"className":"Image"}]}]}]}',
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
