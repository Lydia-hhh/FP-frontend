import { useRef, useEffect, useState } from "react";
import * as echarts from 'echarts';
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const _xData=["jiao1","jiao2","jiao3","jiao4","jiao5","jiao6","jiao7","jiao8","jiao9","jiao10","jiao11","jiao12","jiao13","jiao14","jiao15","jiao16"];
const _yData=[[2,5],[4,5],[1,5],[4,5],[3,5],[2.5,5],[1.0,5],[2,5],[3,5],[5,5],[2,5],[1,5],[9,10],[2,5],[3,5],[4,5]];
export function Monitor(){
    const chartRef = useRef<any>(null);
    const myChart = useRef<any>(null);
    const [xData,setxData]=useState<string[]>(_xData);
    const [yData,setyData]=useState<number[][]>(_yData);
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
        let data1:any[]=[];
        let data2:any[]=[];
        _yData.forEach((value,index)=>{
            const percentage=value[0]/value[1];
            if(percentage>=0.9){
                data1.push({
                    value: value[0],
                    itemStyle: {
                        color: '#a90000'
                    }
                })
            }else {
                data1.push(value[0]);
            }
            data2.push(value[1]-value[0]);
        })
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
                    name: 'disk_usage',
                    type: 'bar',
                    stack: 'one',
                    data: data1
                },
                {
                    name: 'free_space',
                    type: 'bar',
                    stack: 'one',
                    data: data2
                },
                {
                    name: 'disk_usage',
                    type: 'bar',
                    stack: 'two',
                    data: data1
                },
                {
                    name: 'free_space',
                    type: 'bar',
                    stack: 'two',
                    data: data2
                },
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
        <div style={{width: '100%', height: 'calc(100vh - 180px)'}}>
            <div style={{width: '100%', height: '100%'}} ref={chartRef}></div>
        </div>
    )
}

export default Monitor;