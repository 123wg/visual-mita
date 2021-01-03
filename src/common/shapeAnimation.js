class ShapeAnimation {
    constructor(stage) {
        this.stage = stage;
        [this.layer] = stage.getLayers();
    }

    // 设置水池的值
    setPoolValue(node, value) {
        const attrs = node.getAttrs();
        const bindKey = attrs.dataKey[0];
        if (!bindKey) return;
        const poolValue = value[bindKey];
        const [pool_water] = node.find('.pool_water');
        const [pool_bc] = node.find('.pool_background');
        const { poolHeight } = attrs;
        const water_y = pool_water.y();
        const water_height = pool_water.height();
        const maxHeight = pool_bc.height();
        // 最大值和当前值有了
        const cur_water_height = poolValue * (maxHeight / poolHeight);
        const cur_water_y = water_y - (cur_water_height - water_height);
        const tween = new Konva.Tween({
            node: pool_water,
            height: cur_water_height,
            y: cur_water_y,
            duration: 0.5,
        });
        tween.play();
    }

    //   设置线条的值
    setFlowLineValue(node, value) {
        console.log(value);
        const attrs = node.getAttrs();
        const bindKey = attrs.dataKey[0];
        if (!bindKey) return;
        const flow_line_value = value[bindKey];
        const [flow_line] = node.find('.flowline_front');
        // 循环绑定动画条件
        const list = attrs.where;
        for (let i = 0; i < list.length; i += 1) {
            const item = list[i];
            if (item.min === '' || item.max === '') {
                return;
            }
            //  判断线条流向
            const { direction } = item;
            const value_true = flow_line_value >= item.min && flow_line_value <= item.max;
            if (direction === 'stop' && value_true) {
                if (node.anim) node.anim.stop();
            }
            if (direction === 'forward') {
                if (node.anim) node.anim.sstop();
                node.anim = new Konva.Animation((e) => {
                    flow_line.dashOffset(-(e.time / 40));
                }, this.layer);
                node.anim.start();
            }
            if (direction === 'reverse') {
                if (node.anim) node.anim.sstop();
                node.anim = new Konva.Animation((e) => {
                    flow_line.dashOffset((e.time / 40));
                }, this.layer);
                node.anim.start();
            }
        }
    }

    //  旋转动画
    rotateModule(node, data) {
        const attrs = node.getAttrs();
        const bind_rotate = attrs.rotateWhere.filter((item) => item.min !== '' && item.max !== '');
        for (let i = 0; i < bind_rotate.length; i += 1) {
            const rotate_attr = bind_rotate[i];
            const bind_value = data[rotate_attr.devicecode];
            if (bind_value >= rotate_attr.min && bind_value <= rotate_attr.max) {
                if (!node.anim) {
                    node.anim = new Konva.Animation(() => {
                        node.rotate(1);
                    }, this.layer);
                    node.anim.start();
                }
            } else if (node.anim) node.anim.stop();
        }
    }
}
export default ShapeAnimation;
