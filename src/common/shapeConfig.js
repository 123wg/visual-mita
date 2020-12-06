const shapeConfig = [
  {
    groupName: '交互组件',
    moduleItem: [
      {
        imgSrc: '/img/pool.png',
        moduleJson: '{"attrs":{"draggable":true,"moduleAttr":[{"attrName":"绑定设备","attrCode":"dataKey","attrType":"hardwareSelect","attrWhere":"this"},{"attrName":"水池高度(峰值)","attrCode":"poolHeight","attrType":"input","attrWhere":"pool_background"},{"attrName":"水池边框粗细","attrCode":"strokeWidth","attrType":"input","attrWhere":"pool_border"},{"attrName":"水池边框颜色","attrCode":"stroke","attrType":"color","attrWhere":"pool_border"},{"attrName":"水池背景颜色","attrCode":"fill","attrType":"color","attrWhere":"pool_background"},{"attrName":"水的颜色","attrCode":"fill","attrType":"color","attrWhere":"pool_wrater"},{"attrName":"隐藏条件","attrCode":"hideWhere","attrType":"hideTable","attrWhere":"this"},{"attrName":"闪烁条件","attrCode":"sparklingWhere","attrType":"sparklingTable","attrWhere":"this"}],"name":"mita_module_group","moduleType":"POOL","dataKey":"[\'\']","methodCall":"setPoolValue","poolHeight":20,"hideWhere":"[{devicecode:\'\',min:\'\',max:\'\'}]","sparkLingWhere":"[{devicecode:\'\',min:\'\',max:\'\'}]","sparklingMethodCall":"sparklingModule"},"className":"Group","children":[{"attrs":{"width":200,"height":300,"fill":"yellow","name":"pool_background"},"className":"Rect"},{"attrs":{"y":280,"width":200,"height":20,"fill":"red","name":"pool_water"},"className":"Rect"},{"attrs":{"points":[0,0,0,300,200,300,200,0],"stroke":"black","name":"pool_border"},"className":"Line"}]}',
        moduleName: '蓄水池',
      },
    ],
  },
];

export default shapeConfig;
