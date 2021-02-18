/**
* @Description:透明度组件
* @Author: wanggang
* @Date: 2021-02-17 18:35:00
**/
<template>
    <div class=''>
        <el-form label-position="left" label-width="120px">
            <el-form-item :label="attr.attrName">
                <el-slider v-model="attr.attrValue" :step="0.1" :min="0" :max="1"></el-slider>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'OpacityAttr',
    props: ['attr'],
    components: {},
    data() {
        return {

        };
    },
    computed: {},
    created() {
        console.log(this.attr);
    },
    watch: {
        'attr.attrValue': {
            handler() {
                CONFIG.stage.setCurCon(this.attr);
            },
        },
    },
    methods: {
    },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
