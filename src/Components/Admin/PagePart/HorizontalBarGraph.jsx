import ReactEcharts from 'echarts-for-react'
import {useEffect, useState} from "react";

const StockBarChart = ({ data }) => {
    const [options, setOptions] = useState({})

    useEffect(() => {
        if (data.length > 0) {
            setOptions({
                xAxis: {
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    data: data.length > 0 ? data.map((item) => item.name) : [],
                },
                series: [
                    {
                        type: 'bar',
                        data: data.length > 0 ? data.map((item) => item.stock) : [],
                        barWidth: 20,
                        label: {
                            show: true,
                            position: 'right',
                            formatter: function(params) {
                                return params.value + ' unités';
                            }
                        }
                    }
                ]
            })
        }
    }, [data, setOptions])

    return (data.length > 0 ?
                <ReactEcharts
                    option={options}
                    style={{ height: '400px', width: '100%' }}
                />
        :
            <div className="text-center">
                <h3>Aucun produit en stock</h3>
            </div>
    );
};



export default StockBarChart;