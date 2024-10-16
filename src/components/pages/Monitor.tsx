import { useRef, useEffect, useState } from "react";
import * as echarts from 'echarts';
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const _xData=["jiao1","jiao2","jiao3","jiao4","jiao5","jiao6","jiao7","jiao8","jiao9","jiao10","jiao11","jiao12","jiao13","jiao14","jiao15","jiao16"];
        const _yData=[2,4,0,4,3,2.5,1.0,2,3,5,2,1,9,2,3,4];
export function Monitor(){
    const chartRef = useRef<any>(null);
    const myChart = useRef<any>(null);
    const [xData,setxData]=useState<string[]>(_xData);
    const [yData,setyData]=useState<number[]>(_yData);
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
        
        const option = {
            title: {
                left: 'center',
                text: "Quota Bar Chart"
            },
            tooltip: {
                trigger: 'axis',
                position: function (pt: any[]) {
                    return [pt[0], '10%'];
                }
            },
            xAxis: {
                type: 'category',
                data: xData,
                name:"user"
            },
            yAxis: {
                type: 'value',
                name:'disk usage/GB'
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