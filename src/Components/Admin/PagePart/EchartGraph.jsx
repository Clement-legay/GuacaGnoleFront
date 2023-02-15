import ReactEcharts from 'echarts-for-react'
import {useEffect, useState} from "react";
import {Box, CircularProgress} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const EchartGraph = ({ data, selected, chartOptions }) => {
    const [finalArray, setFinalArray] = useState([]);
    const loading = finalArray.length === 0;
    const { palette } = useTheme();

    const getOptions = () => {
        switch (chartOptions.type) {
            case "pie" :
                return {
                    title: {
                        text: chartOptions.title,
                        left: 'center',
                        top: 20,
                        textStyle: {
                            color: palette.text.primary,
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 10,
                    },
                    series: [
                        {
                            name: chartOptions.title,
                            type: 'pie',
                            radius: ['65%', '20%'],
                            center: ['50%', '60%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            },
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            },
                            labelLine: {
                                show: false
                            },
                            data: finalArray.map(item => {
                                return {
                                    value: item[chartOptions.dataValue],
                                    name: item[chartOptions.dataName]
                                }
                            })
                        }
                    ],
                    color: palette.mode === 'light' ?
                        Object.values(["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#9e9e9e", "#607d8b"])
                        :
                        // same kind of colors but darker
                        Object.values(["#c62828", "#ad1457", "#6a1b9a", "#4527a0", "#283593", "#1565c0", "#0277bd", "#00838f", "#00695c", "#2e7d32", "#558b2f", "#9e9d24", "#f9a825", "#ef6c00", "#e65100", "#bf360c", "#3e2723", "#424242", "#1b5e20"])
                }
            case "bar" :
                return {
                    title: {
                        text: chartOptions.title,
                        left: 'center',
                        top: 20,
                        textStyle: {
                            color: palette.text.primary,
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: finalArray.map(item => item[chartOptions.dataName])
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: finalArray.map(item => item[chartOptions.dataName]),
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: chartOptions.title,
                            type: 'bar',
                            barWidth: '60%',
                            data: finalArray.map(item => {
                                return {
                                    value: item[chartOptions.dataValue],
                                    name: item[chartOptions.dataName]
                                }
                            }),
                            itemStyle: {
                                color: function (params) {
                                    let colorList = Object.values(["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#9e9e9e", "#607d8b"]);
                                    return colorList[params.dataIndex]
                                }
                            }
                        }
                    ],
                }
            default:
                return {}
        }
    };

    useEffect(() => {
        if (selected.length !== 0) {
            setFinalArray(
                data.filter(item => {
                    return selected.includes(item.id)
                })
            )
        } else {
            setFinalArray(data)
        }


    }, [selected, data, setFinalArray])

    return (
        <Box sx={{ width: '100%', height: '40vh', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            {!loading ? (
                <ReactEcharts
                    option={getOptions()}
                    style={{ height: '400px', width: '100%' }}
                />
            ) : (
                <CircularProgress size={24} />
            )}
        </Box>
    );
};



export default EchartGraph;