import { useRef, useEffect, useState } from "react";
import * as echarts from 'echarts';
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {getMonitor} from "../../store/features/FPSlice";
import {unwrapResult} from "@reduxjs/toolkit";

const _xData=["jiao1","jiao2","jiao3","jiao4","jiao5","jiao6","jiao7","jiao8","jiao9","jiao10","jiao11","jiao12","jiao13","jiao14","jiao15","jiao16"];
const linux_yData:any[]=[[2,5],[4,5],[1,5],[4,5],[3,5],[2.5,5],[1.0,5],[2,5],[3,5],[5,5],[2,5],[1,5],[9,10],[2,5],[3,5],[4,5]];
const windows_yData=[[4,5],[3,5],[2,5],[9,10],[1,5],[2,5],[5,5],[3,5],[2,5],[1.0,5],[2.5,5],[3,5],[4,5],[1,5],[4,5],[2,5]]
export function Monitor() {
    const dispatch=useDispatch();
    const chartRef = useRef<any>(null);
    const myChart = useRef<any>(null);
    const [xData,setxData]=useState<string[]>(_xData);
    const [linux_yData,set_linux_yData]=useState<any[][]>([]);
    const [windows_yData,set_windows_yData]=useState<any[][]>([]);
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
    const fetchMonitor=()=>{
        dispatch(getMonitor() as any).then(unwrapResult).then((res:any)=>{
            if(res){
                const linux_yData: number[][] = JSON.parse(res.linux_yData);
                const windows_yData: number[][] = JSON.parse(res.windows_yData);
                getChart(res._xData,linux_yData,windows_yData);
            }
        })
    }

    const getChart = (xData:any[],linux_yData:any[],windows_yData:any[]) => {
        let data1:any[]=[];
        let data2:any[]=[];
        let data3:any[]=[];
        let data4:any[]=[];
        console.log(typeof (xData));
        console.log(typeof (linux_yData));
        console.log(typeof (windows_yData));
        linux_yData.forEach((value,index)=>{
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
        windows_yData.forEach((value,index)=>{
            const percentage=value[0]/value[1];
            if(percentage>=0.9){
                data3.push({
                    value: value[0],
                    itemStyle: {
                        color: '#a90000'
                    }
                })
            }else {
                data3.push(value[0]);
            }
            data4.push(value[1]-value[0]);
        })
        const option = {
            title: {
                left: 'center',
                text: "Disk Utilization Bar Chart"
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
                name:'disk usage/MB'
            },
            series: [
                {
                    name: 'linux_disk_usage',
                    type: 'bar',
                    stack: 'one',
                    data: data1
                },
                {
                    name: 'linux_free_space',
                    type: 'bar',
                    stack: 'one',
                    data: data2,
                    itemStyle:{
                        color: 'rgba(180, 180, 180, 0.2)'
                    }
                },
                {
                    name: 'windows_disk_usage',
                    type: 'bar',
                    stack: 'two',
                    data: data3
                },
                {
                    name: 'windows_free_space',
                    type: 'bar',
                    stack: 'two',
                    data: data4,
                    itemStyle:{
                        color: 'rgba(180, 180, 180, 0.2)'
                    }
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
        fetchMonitor();
    }, []);

    return (
        <div style={{width: '100%', height: 'calc(100vh - 180px)'}}>
            <div style={{width: '100%', height: '100%'}} ref={chartRef}></div>
        </div>
    )
}

export default Monitor;