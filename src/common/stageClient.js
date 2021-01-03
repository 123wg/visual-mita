import ShapeAnimation from '@/common/shapeAnimation';
// 客户端加载场景
class StageClient {
    constructor(stage) {
        this.stage = stage;
        this.shapeAnimation = new ShapeAnimation(stage);
    }

    // 舞台初始化
    //   init();

    // 设置值
    setStageData(data) {
        const that = this;
        const transform = this.stage.find('.transform')[0];
        if (transform)transform.destroy();
        const groups = this.stage.find('Group');
        // FIXME  删除transform 后期修改为设备客户端加载后可以删除
        groups.each((node) => {
            //   获取设备设置值后的回调方法
            const attr = node.getAttrs();
            const { methodCall } = attr;
            const { rotateMethodCall } = attr;
            console.log(methodCall);
            //   const { hideMethodCall } = attr;
            //   const { sparklingMethodCall } = attr;
            if (that.shapeAnimation[methodCall]) {
                that.shapeAnimation[methodCall](node, data);
            }
            if (that.shapeAnimation[rotateMethodCall]) {
                console.log('进来');
                that.shapeAnimation[rotateMethodCall](node, data);
            }
        });
    }
}
export default StageClient;
