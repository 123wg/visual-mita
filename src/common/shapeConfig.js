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
  {
    groupName: '基本组件',
    moduleItem: [
      {
        imgSrc: '/img/base_line.png',
        moduleJson: '{"attrs":{"draggable":true,"moduleAttr":[{"attrName":"绑定设备","attrCode":"dataKey","attrType":"hardwareSelect","attrWhere":"this"},{"attrName":"动画条件","attrCode":"where","attrType":"whereSelectTable","attrWhere":"this"},{"attrName":"线条底色","attrCode":"stroke","attrType":"color","attrWhere":"flowline_bc"},{"attrName":"流动线条颜色","attrCode":"stroke","attrType":"color","attrWhere":"flowline_front"},{"attrName":"粗细","attrCode":"strokeWidth","attrType":"input","attrWhere":"flowline_bc"},{"attrName":"闪烁条件","attrCode":"sparklingWhere","attrType":"sparklingTable","attrWhere":"this"},{"attrName":"隐藏条件","attrCode":"hideWhere","attrType":"hideTable","attrWhere":"this"}],"name":"mita_module_group","moduleType":"FLOW_LINE","dataKey":"[\'\']","methodCall":"setFlowLineValue","where":"[{direction:\'\',where:{min:\'\',max:\'\'}}]","sparkLingWhere":"[{devicecode:\'\',min:\'\',max:\'\'}]","sparklingMethodCall":"sparklingModule","hideWhere":"[{devicecode:\'\',min:\'\',max:\'\'}]","hideMethodCall":"hideModule"},"className":"Group","children":[{"attrs":{"points":[20,20,470,20],"stroke":"#6699cc","strokeWidth":20,"lineCap":"round","lineJoin":"round","name":"flowline_bc"},"className":"Line"},{"attrs":{"points":[20,20,470,20],"stroke":"yellow","strokeWidth":15,"lineCap":"round","lineJoin":"round","name":"flowline_front","dash":[33,25]},"className":"Line"}]}',
        moduleName: '直线',
      },
    ],
  },
];

export default shapeConfig;
