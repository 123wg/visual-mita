const ShapeOption = {
  // 导出的配置
  optionObj: {
    moduleAttr: [], // 内部属性集合
  },

  //   蓄水池名称
  hasPoolName() {
    this.commonName();
  },
  //   蓄水池模块类型
  hasPoolModuleType() {
    this.commonModuleType('POOL');
  },
  //  蓄水池绑定设备
  hasPoolBindDevice(attrWhere = 'this') {
    this.commonBindDevice('setPoolValue', attrWhere);
  },

  //   -----蓄水池 1.水池高度
  hasPoolHeight(attrWhere = 'this') {
    this.optionObj.poolHeight = 20;
    this.createModuleAttr('水池高度(峰值)', 'poolHeight', 'input', attrWhere);
  },
  //   水池边框粗细
  hasPoolStrokeWidth(attrWhere = 'this') {
    this.commonStrokeWidth('水池边框粗细', attrWhere);
  },
  //  水池边框颜色
  hasPoolStrokeColor(attrWhere = 'this') {
    this.commonStrokeColor('水池边框颜色', attrWhere);
  },
  // 水池背景颜色
  hasPoolFillColor(attrWhere = 'this') {
    this.commonFillColor('水池背景颜色', attrWhere);
  },
  //  水的颜色
  hasPoolWaterColor(attrWhere = 'this') {
    this.commonFillColor('水的颜色', attrWhere);
  },

  //  通用name
  commonName() {
    this.optionObj.name = 'mita_module_group';
  },

  //   通用模块名
  commonModuleType(moduleType) {
    this.optionObj.moduleType = moduleType;
  },

  // 通用绑定设备
  commonBindDevice(valueEvtName = '', attrWhere = 'this') {
    this.optionObj.dataKey = '[\'\']';
    this.optionObj.methodCall = valueEvtName;
    this.createModuleAttr('绑定设备', 'dataKey', 'hardwareSelect', attrWhere);
  },
  //  通用边框粗细配置
  commonStrokeWidth(attrName, attrWhere = 'this') {
    this.createModuleAttr(attrName, 'strokeWidth', 'input', attrWhere);
  },
  //   通用边框颜色配置
  commonStrokeColor(attrName, attrWhere = 'this') {
    this.createModuleAttr(attrName, 'stroke', 'color', attrWhere);
  },
  //   通用填充颜色配置
  commonFillColor(attrName, attrWhere = 'this') {
    this.createModuleAttr(attrName, 'fill', 'color', attrWhere);
  },
  //  通用隐藏条件
  commonHide(attrWhere = 'this') {
    this.optionObj.hideWhere = "[{devicecode:'',min:'',max:''}]";
    this.createModuleAttr('隐藏条件', 'hideWhere', 'hideTable', attrWhere);
  },
  // 通用闪烁条件
  commonSparkLing(attrWhere = 'this') {
    this.optionObj.sparkLingWhere = "[{devicecode:'',min:'',max:''}]";
    this.optionObj.sparklingMethodCall = 'sparklingModule';
    this.createModuleAttr('闪烁条件', 'sparklingWhere', 'sparklingTable', attrWhere);
  },
  //  通用生成模块配置项
  createModuleAttr(attrName, attrCode, attrType, attrWhere = 'this') {
    this.optionObj.moduleAttr.push({
      attrName, // 配置项名称
      attrCode, // 配置项键名
      attrType, // 配置项对应UI
      attrWhere, // 配置项作用域 this 或者元素名称
    });
  },
  // 导出方法
  toObject() {
    return this.optionObj;
  },
};

export default ShapeOption;
