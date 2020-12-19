class ShapeAnimation {
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
  // 设置水池的隐藏动画
  // 设置水池的闪烁动画
}
export default ShapeAnimation;
