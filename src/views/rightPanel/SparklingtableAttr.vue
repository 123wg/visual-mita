/**
* @Description:闪烁条件组件
* @Author: wanggang
* @Date: 2020-12-14 22:37:40
**/
<template>
    <el-table
        :data="selfAttr.attrValue"
        border
    >
        <el-table-column :label="selfAttr.attrName">
            <template slot="header" slot-scope="">
                <el-row  type="flex" justify="space-between" align="center">
                    <el-col :span="20">
                        <span>{{selfAttr.attrName}}</span>
                        <span class="empty-value">(值为空无效)</span>
                    </el-col>
                    <el-col :span="2">
                        <el-button icon="el-icon-plus" @click="addValue"></el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button   icon="el-icon-check" @click="saveValue"></el-button>
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
                            v-for="item in deviceList"
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
                <template slot-scope="{$index}">
                    <el-button  icon="el-icon-delete" @click="delValue($index)"></el-button>
                </template>
            </el-table-column>
        </el-table-column>
    </el-table>
</template>

<script>
// TODO vue 引用类型数据传递为题 在vue中的数据传递过程中， 是不涉及深拷贝的。
// 是通过props、vuex、v-bind等方法传递的引用类型都是传递的内存指针
import { deepClone } from '@/common/util';
import deviceList from '@/common/deviceData';

export default {
    name: 'SparklingtableAttr',
    props: ['attr'],
    components: {},
    data() {
        return {
            // FIXME 修改为后台请求数据
            selfAttr: [],
            deviceList,
        };
    },
    computed: {},
    created() {
        this.selfAttr = deepClone(this.attr);
        this.initParam();
    },
    watch: {},
    methods: {
    /**
      *@description: 初始化参数
      *@param{}
      *@return:
      */
        initParam() {
            this.selfAttr.attrValue.forEach((item) => {
                if (item.min === '') {
                    item.min = undefined;
                }
                if (item.max === '') {
                    item.max = undefined;
                }
            });
        },
        /**
      *@description: 保存数据
      *@param{}
      *@return:
      */
        saveValue() {
            CONFIG.stage.setCurCon(this.selfAttr, () => {
                this.$message({
                    message: '保存成功',
                    type: 'success',
                });
            });
        },

        /**
    *@description: 添加数据
    *@param{}
    *@return:
    */
        addValue() {
            this.selfAttr.attrValue.push({
                devicecode: '',
                min: '',
                max: '',
            });
            this.initParam();
        },

        /**
    *@description: 删除数据
    *@param{}
    *@return:
    */
        delValue(index) {
            this.selfAttr.attrValue.splice(index, 1);
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
