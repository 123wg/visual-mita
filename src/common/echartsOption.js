const echartsOption = {
    // 1.温度图表
    tempOption() {
        const option = {
            tooltip: {
                formatter: '{a} <br/>{b} : {c}%',
            },
            series: [
                {
                    name: '业务指标',
                    type: 'gauge',
                    detail: { formatter: '{value}℃' },
                    data: [{ value: 50, name: '温度' }],
                },
            ],
        };
        return option;
    },
    //   其它图表
};

export default echartsOption;
