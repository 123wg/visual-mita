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
                    v-for="item in options"
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

export default {
  name: 'HardwareselectAttr',
  props: ['attr'],
  components: {},

  data() {
    return {
      device: '',
      selfAttr: [], // 组件本身的值
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
  created() {
    this.selfAttr = deepClone(this.attr);
  },
  watch: {
    device() {
      this.selfAttr.attrValue = [].push(this.device);
      CONFIG.stage.setCurCon(this.selfAttr);
    },
  },
  computed: {},
  methods: {},
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
