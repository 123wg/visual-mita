/**
* @Description: 绑定设备组件
* @Author: wanggang
* @Date: 2020-12-14 22:37:12
**/
<template>
    <el-form label-position="left" label-width="120px">
        <el-form-item :label="selfAttr.attrName">
            <el-select v-model="device" placeholder="请选择">
                <el-option
                    v-for="item in deviceList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script>
import { deepClone } from '@/common/util';
import deviceList from '@/common/deviceData';

export default {
  name: 'HardwareselectAttr',
  props: ['attr'],
  components: {},

  data() {
    return {
      device: '',
      selfAttr: [], // 组件本身的值
      deviceList,
    };
  },
  created() {
    this.selfAttr = deepClone(this.attr);
    this.device = this.selfAttr.attrValue[0] || '';
  },
  watch: {
    device() {
      this.selfAttr.attrValue = [this.device];
      CONFIG.stage.setCurCon(this.selfAttr);
    },
  },
  computed: {},
  methods: {},
};
</script>
<style>
.el-select-dropdown__item {
    text-align: center;
}
</style>
