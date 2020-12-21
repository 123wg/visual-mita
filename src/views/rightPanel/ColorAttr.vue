/**
* @Description: 颜色选择组件
* @Author: wanggang
* @Date: 2020-12-14 22:37:22
**/
<template>
    <el-form label-position="left" label-width="120px">
        <el-form-item :label="attr.attrName">
            <el-color-picker v-model="attr.attrValue" @change="changeColor"></el-color-picker>
        </el-form-item>
    </el-form>
</template>

<script>

export default {
    name: 'ColorAttr',
    props: ['attr'],
    'attr.attrValue': {
        handler() {
            CONFIG.stage.setCurCon(this.attr);
        },
    },
    components: {},
    data() {
        return {
        };
    },
    computed: {},
    watch: {},
    methods: {
    /**
      *@description: 改变颜色
      *@param{}
      *@return:
      */
        changeColor() {
            CONFIG.stage.setCurCon(this.attr);
        },
    },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
