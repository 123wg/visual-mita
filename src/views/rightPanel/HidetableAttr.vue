/**
* @Description:隐藏属性组件
* @Author: wanggang
* @Date: 2020-12-14 22:37:40
**/
<template>
    <el-table
        :data="attr.attrValue"
        border
    >
        <el-table-column label="隐藏条件">
            <template slot="header" slot-scope="">
                <el-row  type="flex" justify="space-between" align="center">
                    <el-col :span="20">
                        <span>隐藏条件</span>
                        <span class="empty-value">(值为空无效)</span>
                    </el-col>
                    <el-col :span="2">
                        <el-button icon="el-icon-edit"></el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button   icon="el-icon-edit" @click="saveValue"></el-button>
                    </el-col>
                </el-row>
            </template>
            <el-table-column
                label="绑定设备"
                width="140"
                align="center">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.devicecode" placeholder="请选择" size="small">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="最小值(>=)"
                align="center"
                width="155">
                <template slot-scope="scope">
                    <el-input-number v-model="scope.row.min" size="small" controls-position="right"></el-input-number>
                </template>
            </el-table-column>
            <el-table-column
                label="最大值(>=)"
                align="center"
                width="155">
                <template slot-scope="scope">
                    <el-input-number v-model="scope.row.max" size="small" controls-position="right"></el-input-number>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                align="center"
                width="51">
                <template slot-scope="">
                    <el-button  icon="el-icon-edit"></el-button>
                </template>
            </el-table-column>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
  name: 'HidetableAttr',
  props: ['attr'],
  components: {},
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕',
      }, {
        value: '选项2',
        label: '双皮奶',
      }, {
        value: '选项3',
        label: '蚵仔煎',
      }, {
        value: '选项4',
        label: '龙须面',
      }, {
        value: '选项5',
        label: '北京烤鸭',
      }],
      value: '',
    };
  },
  computed: {},
  created() {
    this.attr.attrValue.forEach((item) => {
      if (item.min === '') {
        item.min = undefined;
      }
      if (item.max === '') {
        item.max = undefined;
      }
    });
  },
  watch: {},
  methods: {
    /**
      *@description: 保存数据
      *@param{}
      *@return:
      */
    saveValue() {
      console.log(this.attr);
    },
  },
};
</script>
<style lang='scss' scoped>
.el-button {
    width: 30px;
    height: 30px;
}

.el-col {
    height: 30px;
    line-height: 30px;
}

.empty-value {
    color: red;
}

.el-select-dropdown__item {
    text-align: center;
}
</style>
