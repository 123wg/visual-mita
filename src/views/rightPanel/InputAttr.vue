/**
* @Description: 输入框组件
* @Author: wanggang
* @Date: 2020-12-14 22:37:51
**/
<template>
    <el-form label-position="left" label-width="120px">
        <el-form-item :label="attr.attrName">
            <el-input v-model="attr.attrValue"></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
  name: 'InputAttr',
  components: {},
  props: ['attr'],
  computed: {
  },
  data() {
    return {
    };
  },
  watch: {
    'attr.attrValue': {
      handler() {
        CONFIG.stage.setCurCon(this.attr);
      },
    },
  },
  methods: {},
};
</script>
