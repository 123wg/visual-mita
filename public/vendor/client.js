/* eslint-disable */
!(function (win) {
  const ModuleAnimation = function () {
    this.v = '1.0.1';
  };
  ModuleAnimation.prototype = {
    constructor: ModuleAnimation,
    setLineValue(moduleObject, valueObject) {
      for (var groupObj = moduleObject, layerObj = groupObj.getLayer(), whereStr = groupObj.attrs.where, dataKey = eval(`(${groupObj.attrs.dataKey})`)[0], keyValue = valueObject[dataKey], lineObj = groupObj.get('.dynamicLine')[0], whereObj = eval(`(${whereStr})`), i = 0; i < whereObj.length; i++) {
        const whereObjItem = whereObj[i];
        const { direction } = whereObjItem;
        const { min } = whereObjItem.where;
        const { max } = whereObjItem.where;
        if (keyValue >= min && max >= keyValue) {
          direction == 1 && (groupObj.hasOwnProperty('anim') && groupObj.anim.stop(),
          groupObj.anim = new Konva.Animation(((e) => {
            lineObj.dashOffset(-(e.time / 40));
          }),
          layerObj),
          groupObj.anim.start()),
          direction == 2 && (groupObj.hasOwnProperty('anim') && groupObj.anim.stop(),
          groupObj.anim = new Konva.Animation(((e) => {
            lineObj.dashOffset(e.time / 40);
          }),
          layerObj),
          groupObj.anim.start()),
          direction == 3 && groupObj.hasOwnProperty('anim') && groupObj.anim.stop();
          break;
        }
      }
    },
    setPoolValue(e, t) {
      const a = e;
      const o = a.get('.pool_background')[0];
      const i = a.get('.pool_water')[0];
      const n = a.attrs.poolHight;
      let r = '0';
      for (const l in t) r = t[l];
      if (r != 'undefined') {
        const c = r / n;
        const d = o.getY();
        const u = o.getHeight();
        let s = u * c;
        s > u && (s = u),
        s <= 0 && (s = 0);
        const m = d + u - s;
        i.tween = new Konva.Tween({
          node: i,
          duration: 0.5,
          y: m,
          height: s,
          onFinish() {},
        }),
        i.tween.play();
      }
    },
    setTextValue(e, t) {
      const a = e.getLayer();
      const o = e;
      const i = o.get('.complexTextValue')[0];
      let n = '';
      for (const r in t) n = t[r];
      i.text(n);
      const l = o.get('.rectValue')[0];
      l.width(i.getWidth()),
      l.height(i.getHeight()),
      a.draw();
    },
    setTValue(e, t) {
      const a = e.getLayer();
      const o = e;
      const i = o.get('.complexTextValue')[0];
      let n = '';
      for (const r in t) n = t[r];
      i.text(n),
      a.draw();
    },
    setEchart_GaugeValue(moduleObject, valueObject) {
      const { moduleType } = moduleObject.attrs;
      if (moduleType == 'ECHART_THERMOMETER') {
        var valueStr = 0;
        for (var item in valueObject) valueStr = valueObject[item];
        const { maxValue } = moduleObject.attrs;
        const { minValue } = moduleObject.attrs;
        var moduleObjectId = moduleObject.id();
        var echartDiv = document.getElementById(moduleObjectId);
        var myChart = echarts.init(echartDiv);
        var echart_option = eval(`${moduleObject.attrs.echartURL}(${valueStr},${maxValue},${minValue})`);
        myChart.setOption(echart_option);
      }
      if (moduleType == 'ECHART_GAUGE') {
        var moduleObjectId = moduleObject.id();
        var valueStr = '';
        for (var item in valueObject) valueStr = valueObject[item];
        var echartDiv = document.getElementById(moduleObjectId);
        var myChart = echarts.init(echartDiv);
        var echart_option = eval(`${moduleObject.attrs.echartURL}()`);
        const echartData = new Object();
        echartData.value = valueStr,
        echartData.name = '',
        echart_option.series[0].data[0] = echartData,
        echart_option.series[0].max = moduleObject.attrs.maxValue,
        myChart.setOption(echart_option);
      }
      if (moduleType == 'ECHART_realTimeLine') {
        var moduleObjectId = moduleObject.id();
        var valueStr = '';
        for (var item in valueObject) valueStr = valueObject[item];
        var echartDiv = document.getElementById(moduleObjectId);
        const echartObject = echarts.getInstanceByDom(echartDiv);
        const echartOption = echartObject.getOption();
        const seriesData = echartOption.series[0].data;
        const now = new Date();
        const dataOneArray = {
          value: [`${now.getFullYear()}-${$_check(now.getMonth() + 1)}-${$_check(now.getDate())} ${$_check(now.getHours())}:${$_check(now.getMinutes())}:${$_check(now.getSeconds())}`, valueStr],
        };
        seriesData.push(dataOneArray),
        echartObject.setOption({
          series: [{
            data: seriesData,
          }],
        });
      }
      if (moduleType == 'ECHART_Pool') {
        var valueStr = 0;
        for (var item in valueObject) valueStr = valueObject[item];
        const { poolHight } = moduleObject.attrs;
        const poolValue = $_toDecimal(valueStr / poolHight);
        var moduleObjectId = moduleObject.id();
        var echartDiv = document.getElementById(moduleObjectId);
        var myChart = echarts.init(echartDiv);
        var echart_option = eval(`${moduleObject.attrs.echartURL}(${poolValue})`);
        myChart.setOption(echart_option);
      }
    },
    setStatusValue(moduleObject, valueObject) {
      for (var layerObj = moduleObject.getLayer(), groupObj = moduleObject, whereStr = groupObj.attrs.where, dataKey = eval(`(${groupObj.attrs.dataKey})`)[0], keyValue = valueObject[dataKey], TextValue = groupObj.get('.complexTextValue')[0], whereObj = eval(`(${whereStr})`), i = 0; i < whereObj.length; i++) {
        const whereObjItem = whereObj[i];
        const { description } = whereObjItem;
        const { min } = whereObjItem.where;
        const { max } = whereObjItem.where;
        if (keyValue >= min && max >= keyValue) {
          TextValue.text(description);
          break;
        }
      }
      layerObj.draw();
    },
    setStatusLight(moduleObject, valueObject) {
      for (var layerObj = moduleObject.getLayer(), groupObj = moduleObject, whereStr = groupObj.attrs.where, dataKey = eval(`(${groupObj.attrs.dataKey})`)[0], keyValue = valueObject[dataKey], light = groupObj.findOne('.Light'), whereObj = eval(`(${whereStr})`), i = 0; i < whereObj.length; i++) {
        const whereObjItem = whereObj[i];
        const { color } = whereObjItem;
        const { min } = whereObjItem.where;
        const { max } = whereObjItem.where;
        if (keyValue >= min && max >= keyValue) {
          light.setFillRadialGradientColorStops([0, '#f1f1f1', 0.7, color, 1, '#f1f1f1']);
          break;
        }
      }
      layerObj.draw();
    },
    setSwitchValue(moduleObject, valueObject) {
      for (var layerObj = moduleObject.getLayer(), groupObj = moduleObject, whereStr = groupObj.attrs.where, dataKey = eval(`(${groupObj.attrs.dataKey})`)[0], keyValue = valueObject[dataKey], whereObj = eval(`(${whereStr})`), i = 0; i < whereObj.length; i++) {
        const whereObjItem = whereObj[i];
        const { status } = whereObjItem;
        var { command } = whereObjItem;
        const { icon } = whereObjItem;
        if (keyValue == status) {
          const nodes = moduleObject.find('Image');
          nodes.each((e) => {
            e.destroy();
          });
          const urlImage = icon;
          Konva.Image.fromURL(urlImage, (e) => {
            e.name('myShape'),
            e.setAttr('offset', {
              x: e.width() / 2,
              y: e.height() / 2,
            }),
            moduleObject.add(e),
            layerObj.draw();
          }),
          moduleObject.off('mousedown touchstart'),
          moduleObject.off('mouseup touchend'),
          moduleObject.off('mouseover'),
          moduleObject.off('mouseout'),
          moduleObject.off('click tap'),
          moduleObject.on('mousedown touchstart', () => {}),
          moduleObject.on('mouseup touchend', () => {}),
          moduleObject.on('mouseover', () => {
            document.body.style.cursor = 'pointer';
          }),
          moduleObject.on('mouseout', () => {
            document.body.style.cursor = 'default';
          }),
          moduleObject.on('click tap', (evt) => {
            try {
              command !== '' ? eval('webSocketClilent.sendCmdWebSocket(command)') : layui.layer.msg('点击命令未设置，不能触发！', {
                offset: 't',
                anim: 6,
                icon: 2,
              });
            } catch (e) {
              layui.layer.msg('预览模式下未链接webservice服务端，不能触发！', {
                offset: 't',
                anim: 6,
                icon: 2,
              });
            }
          });
          break;
        }
      }
    },
    rotateModule(moduleObject, valueObjectAll) {
      for (var groupObj = moduleObject, layerObj = groupObj.getLayer(), { rotateWhere } = groupObj.attrs, rotateWhereObj = eval(`(${rotateWhere})`), ismz = !1, i = 0; i < rotateWhereObj.length; i++) {
        const whereObjItem = rotateWhereObj[i];
        const { devicecode } = whereObjItem;
        const { min } = whereObjItem;
        const { max } = whereObjItem;
        const deviceValue = valueObjectAll[devicecode];
        if (deviceValue >= min && max >= deviceValue) {
          groupObj.hasOwnProperty('rotateAnim') && groupObj.rotateAnim.stop(),
          groupObj.rotateAnim = new Konva.Animation((() => {
            groupObj.rotate(1);
          }),
          layerObj),
          groupObj.rotateAnim.start(),
          ismz = !0;
          break;
        }
      }
      if (ismz == 0) {
        try {
          groupObj.rotateAnim.stop(),
          layerObj.draw();
        } catch (e) {}
      }
    },
    hideModule(moduleObject, valueObjectAll) {
      for (var groupObj = moduleObject, layerObj = groupObj.getLayer(), { hideWhere } = groupObj.attrs, hideWhereObj = eval(`(${hideWhere})`), ismz = !1, i = 0; i < hideWhereObj.length; i++) {
        const whereObjItem = hideWhereObj[i];
        const { devicecode } = whereObjItem;
        const { min } = whereObjItem;
        const { max } = whereObjItem;
        const deviceValue = valueObjectAll[devicecode];
        if (deviceValue >= min && max >= deviceValue) {
          groupObj.hide(),
          layerObj.draw(),
          ismz = !0;
          break;
        }
      }
      if (ismz == 0) {
        try {
          groupObj.show(),
          layerObj.draw();
        } catch (e) {}
      }
    },
    sparklingModule(moduleObject, valueObjectAll) {
      for (var groupObj = moduleObject, layerObj = groupObj.getLayer(), { sparklingWhere } = groupObj.attrs, sparklingWhereObj = eval(`(${sparklingWhere})`), ismz = !1, i = 0; i < sparklingWhereObj.length; i++) {
        const whereObjItem = sparklingWhereObj[i];
        const { devicecode } = whereObjItem;
        const { min } = whereObjItem;
        const { max } = whereObjItem;
        const deviceValue = valueObjectAll[devicecode];
        if (deviceValue >= min && max >= deviceValue) {
          groupObj.hasOwnProperty('sparklingTween') ? (groupObj.sparklingTween.reset(),
          groupObj.sparklingTween.reverse(),
          groupObj.sparklingTween.play()) : (groupObj.sparklingTween = new Konva.Tween({
            node: groupObj,
            duration: 1,
            opacity: 0,
            onFinish() {
              groupObj.sparklingTween.reset(),
              groupObj.sparklingTween.reverse(),
              groupObj.sparklingTween.play();
            },
          }),
          groupObj.sparklingTween.play()),
          ismz = !0;
          break;
        }
      }
      if (ismz == 0) {
        try {
          groupObj.sparklingTween.reset(),
          groupObj.sparklingTween.reverse();
        } catch (e) {}
      }
    },
  },
  win.ModuleAnimation = ModuleAnimation;
}(window)),
!(function (win) {
  const WebSocketClilent = function () {};
  WebSocketClilent.prototype = {
    constructor: WebSocketClilent,
    initWebSocket(stage_id) {
      if (this.stage_id = stage_id,
      window.WebSocket) {
        const websocket = new WebSocket(encodeURI(initjson.webSocketUrl));
        this.websocket = websocket,
        websocket.onopen = function () {
          $('#ljzt').html("<span style='font-size:18px;color:#00FF00'>●成功</span>"),
          websocket.send(`${stage_id}ONLINE`),
          webSocketClilent.intervalId = setInterval(webSocketClilent.sendCmdWebSocketHeart, 1e4);
          try {
            clearInterval(this.intervalCxlj);
          } catch (e) {}
        }
        ,
        websocket.onerror = function () {
          $('#ljzt').html("<span style='font-size:18px;color:#FF0000'>●失败</span>"),
          console.log('websocket链接异常');
        }
        ,
        websocket.onclose = function () {}
        ,
        websocket.onmessage = function (message) {
          console.log(`${new Date()}:${message.data}`);
          let serialDataJson = eval(`[${message.data}]`);
          serialDataJson = serialDataJson[0];
          const messagetype = serialDataJson.MESSAGETYPE;
          if (messagetype == '05') {
            var messageContent = serialDataJson.MESSAGECONTENT;
            $('#xtzt').html("<span style='font-size:18px;color: #00ff00'>●正常</span>"),
            console.log(messageContent);
          }
          if (messagetype == '01') {
            var messageContent = serialDataJson.MESSAGECONTENT;
            $('#sssj').html(`${(new Date()).Format('yyyy-MM-dd hh:mm:ss')}=>${JSON.stringify(messageContent)}`),
            stageView.setStageData(messageContent);
          }
        };
      } else {
        layer.msg('该浏览器不支持Websocket', {
          offset: 't',
          anim: 6,
          icon: 2,
        });
      }
    },
    sendCmdWebSocketHeart() {
      console.log('心跳开始HEARTCMD'),
      webSocketClilent.websocket.send(`${webSocketClilent.stage_id}HEARTCMD` + '00000'),
      console.log(`  bufferedAmount:${webSocketClilent.websocket.bufferedAmount}  CLOSED:${webSocketClilent.websocket.CLOSED}   CLOSING:${webSocketClilent.websocket.CLOSING}  CONNECTING:${webSocketClilent.websocket.CONNECTING}   OPEN:${webSocketClilent.websocket.OPEN}  readyState:${webSocketClilent.websocket.readyState}`),
      (webSocketClilent.websocket.readyState == 3 || webSocketClilent.websocket.readyState == 2) && ($('#xtzt').html("<span style='font-size:18px;color: #ff0000'>●停止</span>>"),
      clearInterval(webSocketClilent.intervalId),
      webSocketClilent.intervalCxlj = setInterval(webSocketClilent.reconnect, 1e4));
    },
    reconnect() {
      $('#ljzt').html("<span style='font-size:18px;color:#FFFF00'>●正在重新链接</span>"),
      webSocketClilent.initWebSocket(webSocketClilent.stage_id),
      console.log(`重连之后==  bufferedAmount:${webSocketClilent.websocket.bufferedAmount}  CLOSED:${webSocketClilent.websocket.CLOSED}   CLOSING:${webSocketClilent.websocket.CLOSING}  CONNECTING:${webSocketClilent.websocket.CONNECTING}   OPEN:${webSocketClilent.websocket.OPEN}  readyState:${webSocketClilent.websocket.readyState}`);
    },
    sendCmdWebSocket(e) {
      layer.confirm(`确认要发送命令【${e}】吗？`, {
        btn: ['确定', '取消'],
      }, (t) => {
        try {
          webSocketClilent.websocket.send(`${webSocketClilent.stage_id}CONTROLCMD${e}`),
          layer.close(t);
        } catch (a) {
          layui.layer.msg('websocket链接异常，请确认网络！', {
            offset: 't',
            anim: 6,
            icon: 2,
          });
        }
      }, () => {});
    },
  },
  win.WebSocketClilent = WebSocketClilent;
}(window)),
!(function (win) {
  const StageView = function () {
    this.v = '1.0.1';
  };
  StageView.prototype = {
    constructor: StageView,
    initStage() {
      const e = Konva.Node.create(stagejson, 'container');
      const t = e.getLayers()[1];
      $('#container').height(e.height()),
      $('#container').width(e.width()),
      this.stage = e,
      this.layer = t,
      this.UnDrag();
    },
    initClientStage(stage_id) {
      const stageObjJson = eval(`initConfig.${initjson.clientViewbackFunction}(stage_id)`);
      const stage = Konva.Node.create(stageObjJson, 'container');
      const layer = stage.getLayers()[1];
      $('#container').height(stage.height()),
      $('#container').width(stage.width()),
      this.stage = stage,
      this.layer = layer,
      this.UnDrag();
    },
    UnDrag() {
      const e = this.stage.find('Group');
      $('.yjzt_echart_class').remove(),
      e.each((e) => {
        e.draggable(!1),
        stageView.setTextDefaultValue(e),
        stageView.setGroupImage(e),
        stageView.addClickEvent(e);
      }),
      this.layer.draw();
    },
    setTextDefaultValue(e) {
      const t = e.attrs.moduleType;
      if (t == 'TextLableValue') {
        var a = e.attrs.defaultValue;
        const o = e.get('.description')[0];
        const i = e.get('.descriptionRect')[0];
        i.width(o.getWidth()),
        i.height(o.getHeight());
        var n = e.get('.complexTextValue')[0];
        n.setAttr('text', a),
        n.x(o.x() + o.getWidth()),
        n.y(o.y());
        const r = e.get('.rectValue')[0];
        r.x(o.x() + o.getWidth()),
        r.y(o.y()),
        r.width(n.getWidth()),
        r.height(n.getHeight());
      }
      if (t == 'VALUE') {
        var a = e.attrs.defaultValue;
        var n = e.get('.complexTextValue')[0];
        n.setAttr('text', a);
      }
      if (t == 'STATUSVALUE') {
        var a = e.attrs.defaultValue;
        var n = e.get('.complexTextValue')[0];
        n.setAttr('text', a);
      }
    },
    setGroupImage(moduleObject) {
      const { moduleType } = moduleObject.attrs;
      if ((moduleType.indexOf('IMAGES') != -1 || moduleType.indexOf('SVG') != -1) && typeof moduleType !== 'undefined') {
        var urlImage = moduleObject.attrs.imageURL;
        var nodes = moduleObject.find('Image');
        nodes.each((e) => {
          e.destroy();
        }),
        Konva.Image.fromURL(urlImage, (e) => {
          e.name('myShape'),
          e.setAttr('offset', {
            x: e.width() / 2,
            y: e.height() / 2,
          }),
          moduleObject.add(e),
          stageView.layer.draw();
        });
      }
      if (moduleType.indexOf('GIF') != -1 && typeof moduleType !== 'undefined') {
        var urlImage = moduleObject.attrs.imageURL;
        var nodes = moduleObject.find('Image');
        nodes.each((e) => {
          e.destroy();
        });
        const canvas = document.createElement('canvas');
        gifler(urlImage).frames(canvas, (e, t) => {
          canvas.width = t.width,
          canvas.height = t.height,
          e.drawImage(t.buffer, 0, 0),
          stageView.layer.draw();
        });
        const image = new Konva.Image({
          image: canvas,
        });
        moduleObject.add(image);
      }
      if (moduleType.indexOf('ECHART') != -1 && typeof moduleType !== 'undefined') {
        var divid = Math.uuid();
        moduleObject.id(divid);
        var urlImage = moduleObject.attrs.echartURL;
        const divWidth = moduleObject.attrs.width * moduleObject.scale().x;
        const divHeight = moduleObject.attrs.height * moduleObject.scale().y;
        var nodes = moduleObject.find('Image');
        nodes.each((e) => {
          e.destroy();
        });
        var stageBox = this.stage.container().getBoundingClientRect();
        var areaPosition = {
          x: moduleObject.x(),
          y: moduleObject.y(),
        };
        const divnode = document.createElement('div');
        divnode.id = divid,
        document.getElementById('container').appendChild(divnode),
        divnode.className = 'yjzt_echart_class',
        divnode.style.height = `${divHeight}px`,
        divnode.style.width = `${divWidth}px`,
        divnode.style.position = 'absolute',
        divnode.style.top = `${areaPosition.y}px`,
        divnode.style.left = `${areaPosition.x}px`;
        const myChart = echarts.init(divnode);
        if (moduleType == 'ECHART_GAUGE' && myChart.setOption(eval(`${moduleObject.attrs.echartURL}()`)),
        moduleType == 'ECHART_THERMOMETER') {
          const { maxValue } = moduleObject.attrs;
          const { minValue } = moduleObject.attrs;
          myChart.setOption(eval(`${moduleObject.attrs.echartURL}(0,${maxValue},${minValue})`));
        }
        moduleType == 'ECHART_realTimeLine' && myChart.setOption(eval(`${moduleObject.attrs.echartURL}(0)`)),
        moduleType == 'ECHART_Pool' && myChart.setOption(eval(`${moduleObject.attrs.echartURL}(0)`));
      }
      if (moduleType.indexOf('IFRAME') != -1 && typeof moduleType !== 'undefined') {
        const iframeid = Math.uuid();
        moduleObject.id(divid);
        const { iframeSrc } = moduleObject.attrs;
        const box = moduleObject.getClientRect();
        const iframeWidth = box.width;
        const iframeHeight = box.height;
        const nodes1 = moduleObject.find('Text');
        nodes1.each((e) => {
          e.destroy();
        });
        const nodes2 = moduleObject.find('Rect');
        nodes2.each((e) => {
          e.destroy();
        }),
        this.layer.draw();
        var stageBox = this.stage.container().getBoundingClientRect();
        var areaPosition = {
          x: moduleObject.x(),
          y: moduleObject.y(),
        };
        const iframeNode = document.createElement('iframe');
        document.getElementById('container').appendChild(iframeNode),
        iframeNode.className = 'yjzt_echart_class',
        iframeNode.style.height = `${iframeHeight}px`,
        iframeNode.style.width = `${iframeWidth}px`,
        iframeNode.style.position = 'absolute',
        iframeNode.style.top = `${areaPosition.y}px`,
        iframeNode.style.left = `${areaPosition.x}px`,
        iframeNode.src = iframeSrc,
        iframeNode.setAttribute('frameborder', 0);
      }
    },
    addClickEvent(moduleObject) {
      const { moduleType } = moduleObject.attrs;
      const { clickMethodCall } = moduleObject.attrs;
      const clickWhere = eval(`(${moduleObject.attrs.clickWhere})`);
      if (clickMethodCall !== '' && typeof clickMethodCall !== 'undefined') {
        moduleObject.off('mousedown touchstart'),
        moduleObject.off('mouseup touchend'),
        moduleObject.off('mouseover'),
        moduleObject.off('mouseout'),
        moduleObject.off('click tap');
        const buttonRect = moduleObject.findOne('.buttonRect');
        moduleObject.on('mousedown touchstart', () => {}),
        moduleObject.on('mouseup touchend', () => {}),
        moduleObject.on('mouseover', () => {
          moduleType == 'BUTTON' && buttonRect.setFillLinearGradientColorStops([0, '#352fab', 0.5, '#ffffff', 1, '#352fab']),
          document.body.style.cursor = 'pointer',
          moduleObject.getLayer().draw();
        }),
        moduleObject.on('mouseout', () => {
          moduleType == 'BUTTON' && buttonRect.setFillLinearGradientColorStops([0, '#ababab', 0.5, '#ffffff', 1, '#ababab']),
          document.body.style.cursor = 'default',
          moduleObject.getLayer().draw();
        }),
        moduleObject.on('click tap', (evt) => {
          const { code } = clickWhere[0];
          const { content } = clickWhere[0];
          if (code == '1') {
            try {
              eval(`webSocketClilent.${clickMethodCall}(content)`);
            } catch (e) {
              layui.layer.msg('预览模式下未链接webservice服务端，不能触发！', {
                offset: 't',
                anim: 6,
                icon: 2,
              });
            }
          } else {
            code == '2' && ($_IsURL(content) ? window.open(content, '', '') : layui.layer.msg('该网址不是有效网址', {
              offset: 't',
              anim: 6,
              icon: 2,
            }));
          }
        });
      }
    },
    setStageData(stageData) {
      const groups = this.stage.find('Group');
      groups.each((group) => {
        const { dataKey } = group.attrs;
        const moduleT = group.attrs.moduleType;
        const { methodCall } = group.attrs;
        const { rotateMethodCall } = group.attrs;
        const { hideMethodCall } = group.attrs;
        const { sparklingMethodCall } = group.attrs;
        if (typeof rotateMethodCall !== 'undefined' && rotateMethodCall !== '' && eval(`moduleAnimation.${rotateMethodCall}(group,stageData)`),
        typeof hideMethodCall !== 'undefined' && hideMethodCall !== '' && eval(`moduleAnimation.${hideMethodCall}(group,stageData)`),
        typeof sparklingMethodCall !== 'undefined' && sparklingMethodCall !== '' && eval(`moduleAnimation.${sparklingMethodCall}(group,stageData)`),
        typeof methodCall !== 'undefined' && methodCall !== '') {
          for (var keyArray = eval(dataKey), jsonstr = '{', i = 0; i < keyArray.length; i++) {
            const key = keyArray[i];
            key !== '' && typeof eval(`stageData.${key}`) !== 'undefined' && (jsonstr += `${key}:'${eval(`stageData.${key}`)}',`);
          }
          jsonstr += '}',
          jsonstr != '{}' && eval(`moduleAnimation.${methodCall}(group,${jsonstr})`);
        }
      });
    },
  },
  win.StageView = StageView;
}(window));
let initConfig; let initjson; let stageView; let moduleAnimation; let webSocketClilent; let stage_id; let
  jyztEchartOption;
$(() => {
  moduleAnimation = new ModuleAnimation(),
  layui.use(['layer'], () => {
    stage_id = $_GET.stageId,
    initConfig = new InitConfig(),
    $.ajaxSettings.async = !1,
    $.getJSON('config/init.json', (e) => {
      initjson = e;
    }),
    $.ajaxSettings.async = !0,
    jyztEchartOption = new EchartOption(),
    stageView = new StageView(),
    stageView.initClientStage(stage_id),
    webSocketClilent = new WebSocketClilent(),
    webSocketClilent.initWebSocket(stage_id),
    window.onresize = function () {}
    ,
    document.addEventListener;
  });
});
const scrollFunc = function (e) {
  e = e || window.event,
  e.wheelDelta ? (e.wheelDelta > 0 && stageView.initClientStage(stage_id),
  e.wheelDelta < 0 && stageView.initClientStage(stage_id)) : e.detail && (e.detail > 0 && stageView.initClientStage(stage_id),
  e.detail < 0 && stageView.initClientStage(stage_id));
};
