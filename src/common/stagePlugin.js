import echartsOption from '@/common/echartsOption';
import store from '@/store/index';

class StagePlugin {
    constructor() {
    // 当前操作的节点
        this.curNode = null;
        this.stage = null;
        this.layer = null;
        this.transform = null;
    }

    //   初始化场景方法
    initStage(width = 1100, height = 900, container = 'container') {
        this.stage = new Konva.Stage({
            width,
            height,
            container,
        });
        this.layer = new Konva.Layer();
        this.stage.add(this.layer);
        // 创建变换器
        this.createTransform();
        // 注册全局事件
        this.setStageEvent();
    }

    //   加载数据方法
    initStageJson(stageJson, container) {
        this.stage = Konva.Node.create(stageJson, container);
        [this.layer] = this.stage.getLayers();
        this.stage.add(this.layer);
        // 获取所有子节点
        const nodes = this.layer.find('Group');
        nodes.each((e) => {
            this.createModuleObj(e);
            this.addModuleEvent(e);
        });
        // 创建变换器
        this.createTransform();
        this.setStageEvent();
    }

    //   场景全局事件监听
    setStageEvent() {
        const { stage } = this;
        const { layer } = this;
        const container = stage.container();
        container.addEventListener('dragover', (evt) => {
            evt.preventDefault();
        });
        // 全局鼠标放下事件
        container.addEventListener('drop', (evt) => {
            evt.preventDefault();
            stage.setPointersPositions(evt);
            const shapeOption = JSON.parse(evt.dataTransfer.getData('shapeJson'));
            const moduleObj = Konva.Node.create(shapeOption);
            const curPosition = stage.getPointerPosition();
            moduleObj.position(curPosition);
            layer.add(moduleObj);
            this.createModuleObj(moduleObj);
        });
        // 全局点击事件
        stage.on('click tap', (evt) => {
            const tr = this.transform;
            if (evt.target === stage) {
                this.removeLineEdit();
                tr.nodes([]);
                store.commit('curNodeConList', []);
                layer.draw();
                return;
            }
            const parent = evt.target.getParent();
            this.curNode = parent;
            //  获取当前选中元素的所有配置项
            this.getCurCon();
            //   store.commit('setCurModuleObj', this.curNode);
            const { moduleType } = parent.attrs;
            if (moduleType === 'IMAGE'
           || moduleType === 'SVG'
           || moduleType === 'GIF') {
                this.removeLineEdit();
                tr.nodes([]);
                // tr.nodes([evt.target]);
                tr.nodes([parent]);
                layer.draw();
            } else if (moduleType === 'FLOW_LINE' || moduleType === 'BASE_LINE') {
                this.removeLineEdit();
                tr.nodes([]);
                this.addLineEdit(parent);
            } else {
                this.removeLineEdit();
                tr.nodes([]);
                tr.nodes([parent]);
                layer.draw();
            }
            this.transform.moveToTop();
            layer.draw();
        });
    }

    /**
  *@description: 获取当前选中元素的配置项列表
  *@param{}
  *@return:
  */
    getCurCon() {
        if (!this.curNode) store.commit('curNodeConList', []);
        // console.log(this.curNode);
        const configList = [];
        const obj = this.curNode;
        const attrs = obj.getAttrs().moduleAttr;
        attrs.forEach((item) => {
            const config = {
                attrName: item.attrName,
                attrCode: item.attrCode,
                attrValue: null,
                attrType: item.attrType,
                attrWhere: item.attrWhere,
            };
            if (item.attrWhere === 'this') {
                config.attrValue = obj.getAttr(config.attrCode);
            } else {
                const child = obj.find(`.${item.attrWhere}`)[0];
                config.attrValue = child.getAttrs()[item.attrCode];
            }
            configList.push(config);
        });
        store.commit('curNodeConList', configList);
        // console.log(configList);
        return configList;
    }

    /**
  *@description: 修改元素配置项
  *@param{}
  *@return:
  */
    setCurCon(attr, callback) {
    // console.log(attr);
    //   FIXME 需要用到节流函数
        const obj = this.curNode;
        if (attr.attrWhere === 'this') {
            // 获取要修改的属性
            obj.setAttr(attr.attrCode, attr.attrValue);
        } else {
            const attrs = attr.attrWhere.split(',');
            attrs.forEach((eattr) => {
                const child = obj.find(`.${eattr}`)[0];
                child.setAttr(attr.attrCode, attr.attrValue);
                //  TODO 判断是否是线条 如果是线条的话 重新改变两条线条的粗细
                const childType = obj.getAttrs().moduleType;
                const code = attr.attrCode;
                const value = attr.attrValue;
                if (childType === 'FLOW_LINE' && code === 'strokeWidth') {
                    const objChild = obj.find('.flowline_front')[0];
                    objChild.setAttr(code, value * 0.8);
                    objChild.setAttr('dash', [value, value * 2]);
                    this.addLineEdit(obj);
                }
            });
        }
        const shapeType = obj.getAttrs().moduleType;
        // 基础变量组件
        if (shapeType === 'BaseVar') {
            // 重置宽高
            const label = obj.find('.label')[0];
            const value = obj.find('.value')[0];
            const labelRect = obj.find('.labelRect')[0];
            const valueRect = obj.find('.valueRect')[0];
            const labelWidth = label.width();
            const labelHeight = label.height();
            labelRect.width(labelWidth);
            labelRect.height(labelHeight);
            valueRect.x(labelRect.width());
            // console.log(value);
            value.x(labelRect.width());
            valueRect.width(value.width());
            valueRect.height(value.height());
        }
        this.layer.draw();
        // 选中效果重置
        if (shapeType === 'BASE_LINE' || shapeType === 'fLOW_LINE') {
            this.addLineEdit(obj);
        } else {
            this.layer.get('.transform')[0].nodes([obj]);
        }
        if (callback) {
            callback();
        }
    }

    /**
  *@description: 添加元素鼠标悬浮事件
  *@param{}
  *@return:
  */
    addModuleEvent(e) {
        e.on('mouseover', (evt) => {
            const t = evt.target;
            document.body.style.cursor = t.name().indexOf('line_anchor') !== -1 ? 'crosshair' : 'move';
        });
        e.on('mouseout', () => {
            document.body.style.cursor = 'default';
        });
    }

    /**
  *@description: 创建图形
  *@param{}
  *@return:
  */
    createModuleObj(obj) {
        const { stage } = this;
        const { layer } = this;
        const moduleObj = obj;
        const curPosition = moduleObj.position();
        const attrs = moduleObj.getAttrs();
        const { moduleType } = attrs;
        if (moduleType.includes('IMAGE') || moduleType.includes('SVG')) { // 一般图片
            // FIXME 暂时删除所有子节点 不排除后期选择性删除
            console.log(moduleObj);
            moduleObj.destroyChildren();
            Konva.Image.fromURL(attrs.imageUrl, (node) => {
                const clientRect = node.getClientRect();
                // node.setAttr('width', clientRect.width);
                // node.setAttr('height', clientRect.height);
                // console.log(clientRect.width);
                // console.log(clientRect.width > layer.width() / 2 ? layer.width() / 2 : clientRect.width);
                // moduleObj.setAttrs({
                //     width: 120,
                //     height: 200,
                // });
                moduleObj.offsetX(node.width() / 2);
                moduleObj.offsetY(node.height() / 2);
                moduleObj.add(node);
                // console.log(moduleObj);
                layer.draw();
            });
        } else if (moduleType === 'GIF') {
            moduleObj.destroyChildren();
            const templateImage = new Image();
            templateImage.src = attrs.imageUrl;
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
                const clientRect = image.getClientRect();
                moduleObj.offsetX(clientRect.width / 2);
                moduleObj.offsetY(clientRect.height / 2);
                moduleObj.add(image);
                layer.draw();
            };
        } else if (moduleType === 'FLOW_LINE' || moduleType === 'BASE_LINE') {
            const clientRect = moduleObj.getClientRect();
            moduleObj.offsetX(clientRect.width / 2);
            moduleObj.offsetY(clientRect.height / 2);
            layer.draw();
        } else if (moduleType === 'ECHARTS') {
            moduleObj.destroyChildren();
            const stageArea = stage.container().getBoundingClientRect();
            //  创建渲染echarts 的节点
            const optionName = attrs.echartsOption;
            const dom = document.createElement('div');
            dom.style.width = '200px';
            dom.style.height = '200px';
            dom.style.position = 'absolute';
            dom.style.left = `${stageArea.x + curPosition.x - 100}px`;
            dom.style.top = `${stageArea.y + curPosition.y - 100}px`;
            const echarts = vm.$echarts.init(dom);
            echarts.setOption(echartsOption[optionName]());
            stage.container().appendChild(dom);
            echarts.on('finished', () => {
                const src = echarts.getDataURL({
                    type: 'png',
                    background: '#fff',
                });
                Konva.Image.fromURL(src, (imgNode) => {
                    console.log(imgNode);
                    moduleObj.add(imgNode);
                    const clientRect = imgNode.getClientRect();
                    moduleObj.offsetX(clientRect.width / 2);
                    moduleObj.offsetY(clientRect.height / 2);
                    layer.add(moduleObj);
                    layer.draw();
                    stage.container().removeChild(dom);
                });
            });
            //  创建图片
        } else {
            const clientRect = moduleObj.getClientRect();
            moduleObj.offsetX(clientRect.width / 2);
            moduleObj.offsetY(clientRect.height / 2);
            layer.draw();
        }
    }

    /**
  *@description: 添加流动线条绘制方法
  *@param{}
  *@return:
  */
    addLineEdit(node) {
        const nodeAttrs = node.getAttrs();
        const modeuleType = nodeAttrs.moduleType;
        const cLineStr = modeuleType === 'BASE_LINE' ? 'baseline_front' : 'flowline_bc';
        const hasFront = modeuleType === 'FLOW_LINE';
        const that = this;
        const { layer } = this;
        // 查找所有拖拽元素 销毁
        const circleArrt = node.find('Circle');
        circleArrt.each((obj) => {
            obj.destroy();
        });
        layer.draw();
        // 获取背景线条元素
        const curLine = node.find(`.${cLineStr}`)[0];
        const frontLine = hasFront ? node.find('.flowline_front')[0] : null;
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
            node.add(moveCircle);
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
                if (hasFront)frontLine.points(linePoints);
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

                // eslint-disable-next-line no-loop-func
                dragCircle.on('dragend', (evt) => {
                    const obj = evt.currentTarget;
                    linePoints.splice(dragP, 0, obj.x(), obj.y());
                    curLine.points(linePoints);
                    if (hasFront) { frontLine.points(linePoints); }
                    that.addLineEdit(node);
                });
                node.add(dragCircle);
                layer.draw();
            }
        }
    }

    /**
  *@description: 移除流动线条绘制
  *@param{}
  *@return:
  */
    removeLineEdit() {
        const anchors = this.layer.find((node) => node.getName().includes('line_anchor'));
        anchors.each((e) => {
            e.destroy();
        });
    }

    //   创建变换器
    createTransform() {
        this.transform = new Konva.Transformer({
            name: 'transform',
            padding: 5,
            nodes: [],
            rotateAnchorOffset: 60,
            ignoreStroke: true,
            // 是否开启中心点缩放
            centeredScaling: false,
            // 保持纵横比
            keepRatio: false,
            enabledAnchors: ['top-left', 'top-center', 'top-right', 'middle-right', 'middle-left', 'bottom-left', 'bottom-center', 'bottom-right'],
        });
        this.layer.add(this.transform);
        this.layer.draw();
    }

    //  场景数据保存
    getStageJson() {
    //  删除transform
        this.transform.destroy();
        //  去除线的绘制标签
        this.removeLineEdit();
        this.layer.draw();
        //  导出json数据
        return this.stage.toJSON();
    }

    // 上一层
    upLevel() {
        if (this.curNode) {
            this.curNode.moveUp();
            this.layer.draw();
        }
    }

    // 下一层
    downLevel() {
        if (this.curNode) {
            this.curNode.moveDown();
            this.layer.draw();
        }
    }

    // 置顶
    topLevel() {
        if (this.curNode) {
            this.curNode.moveToTop();
            this.layer.draw();
        }
    }

    // 置底
    bottomLevel() {
        if (this.curNode) {
            this.curNode.moveToBottom();
            this.layer.draw();
        }
    }
    // 设置场景大小方法
    //   setStageSize();

    // 设置场景背景方法
    //   setStageBacground();

    // 获取当前操作的节点
    //   getCurNode();

    // 节点复制
    //   copyNode();

    // 节点黏贴
    //   pasteNode();

    // 节点上移
    //   topNode();

    // 节点下移
//   botomNode();
    //   节点置顶
    //   节点置底
    //   画布放大
    //   画布缩小
    //   数据保存
}
export default StagePlugin;
