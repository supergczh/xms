
import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from '../../../../node_modules/echarts//lib/echarts';
// 引入柱状图
import '../../../../node_modules/echarts/lib/chart/line';
import '../../../../node_modules/echarts/lib/chart/bar';
import '../../../../node_modules/echarts/lib/chart/map';
import '../../../../node_modules/echarts/map/js/china';
// import geoJson from 'echarts/map/json/china.json';
// 引入提示框和标题组件
import '../../../../node_modules/echarts/lib/component/tooltip';
import '../../../../node_modules/echarts/lib/component/title';
import '../../../../node_modules/echarts/lib/component/legend';
import '../../../../node_modules/echarts/lib/component/toolbox';
import '../../../../node_modules/echarts/lib/component/visualMap';
class EchartsMap extends Component {

    componentDidMount() {
        function randomData() {
            return Math.round(Math.random()*1000);
        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('mian'));
        var date = ['2018/4/1', '2018/4/2', '2018/4/3', '2018/4/4', '2018/4/5', '2018/4/6', '2018/4/7', '2018/4/8', '2018/4/9', '2018/4/10',
            '2018/4/4', '2018/4/12', '2018/4/13', '2018/4/14', '2018/4/15', '2018/4/16', '2018/4/17', '2018/4/18'
            , '2018/4/19', '2018/4/20', '2018/4/21', '2018/4/22', '2018/4/23', '2018/4/24', '2018/4/25', '2018/4/26', '2018/4/27'
            , '2018/4/28', '2018/4/29', '2018/4/30'];
        function my_data() {
            var data = [];
            for (var i = 0; i < 30; i++) {
                data.push(Math.round(Math.random() * (500 - 100) + 100));
            };
            return data;
        }
        // 绘制图表
        myChart.setOption({
            title: {
                text: '各系列销售情况'
            },
            tooltip: {
                trigger: 'axis',
                /* axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }*/
            },
            legend: {
                data: ['A系列', 'B系列', 'C系列', 'D系列']
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    data: date
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            grid: {
                left: '3%',
                right: '4%',
                containLabel: true
            },
            dataZoom: [{
                type: 'inside',
                start: 74,
                end: 100,
            }, {
                start: 74,
                end: 100,
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }],
            series: [
                {
                    name: 'A系列',
                    type: 'bar',
                    stack: '总量',
                    barMaxWidth: 30,
                    //itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: my_data()
                },
                {
                    name: 'B系列',
                    type: 'bar',
                    stack: '总量',
                    //itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: my_data()
                },
                {
                    name: 'C系列',
                    type: 'bar',
                    stack: '总量',
                    //itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: my_data()
                },
                {
                    name: 'D系列',
                    type: 'bar',
                    stack: '总量',
                    //itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: my_data()
                }
            ]
        });
        
    }
    render() {
        return (
            <div id="mian" style={{height:'430px', width:"100%"}}></div>
        );
    }
}

export default EchartsMap;