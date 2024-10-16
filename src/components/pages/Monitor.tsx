import { useRef, useEffect, useState } from "react";
import * as echarts from 'echarts';
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
export function Monitor(){
    const chartRef = useRef<any>(null);
    const myChart = useRef<any>(null);
    const initChart = () => {
        if (myChart.current) {
            myChart.current.dispose();
        }
        myChart.current = echarts.init(chartRef.current,null,{renderer:'canvas'});
        window.addEventListener('resize', resizeChart);
    }
    const resizeChart=()=>{
        if(myChart.current){
            myChart.current.resize();
        }
    }

    const getChart = () => {
        const xData=["jiao1","jiao2","yushan3"];
        const yData=[2,4,0];
        const option = {
            title: {
                left: 'center',
                text: "Bar Chart"
            },
            tooltip: {
                trigger: 'axis',
                position: function (pt: any[]) {
                    return [pt[0], '10%'];
                }
            },
            xAxis: {
                type: 'category',
                data: xData
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: yData,
                    type: 'bar'
                }
            ],
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 100
                },
                {
                    start: 0,
                    end: 100
                }
            ]
        };
        myChart.current.setOption(option);
    }
    useEffect(() => {
        initChart();
        getChart();
    }, []);

    return (
        <div style={{width: '100%', height: 'calc(100vh - 180px)'}} ref={chartRef}></div>
    )
}

export default Monitor;