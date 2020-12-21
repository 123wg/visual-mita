<template>
    <div class='test-eharts'>
        <div id="echarts" :style="{width: '500px', height: '500px'}"></div>
    </div>
</template>

<script>
const value = 0.2;
const data = [value, value, value];
export default {
    components: {},
    data() {
        return {
            option: {
                tooltip: {
                    formatter: '{a} <br/>{b} : {c}℃',
                },
                series: [{
                    name: '',
                    type: 'gauge',
                    detail: {
                        formatter: '{value}',
                    },
                    data: [{
                        value: 50,
                        name: '温度',
                    }],
                }],
            },
        };
    },
    computed: {

    },
    mounted() {
        this.init();
    },
    watch: {},
    methods: {
        init() {
            console.log(this.$echarts);
            const echarts = this.$echarts.init(document.getElementById('echarts'));
            echarts.setOption(this.option);
            echarts.on('finished', () => {
                const img = new Image();
                img.src = echarts.getDataURL({
                    type: 'png',
                    background: '#fff',
                });
                console.log(img.src);
            });
        },
    },
};
</script>
<style lang='scss' scoped>
.test-echarts {
    width: 100%;
    height: 100%;
}
</style>
