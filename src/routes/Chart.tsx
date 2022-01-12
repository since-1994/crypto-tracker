import * as React from 'react';
import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';


interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}
interface ChartProps {
    coinId: string;
}

const Chart: React.FC<ChartProps> = ({coinId}) => {
    const {isLoading, data} = useQuery<IHistorical[]>(['ohlcv', coinId], () => fetchCoinHistory(coinId));

    return (
        <>
            {
                isLoading? "Loading..." : <ApexChart type="line" 
                series={[
                    {
                        name: 'close price',
                        data: data?.map(price => price.close)
                    }
                ]}
                options={{
                    theme: {
                        mode: 'dark'
                    },
                    stroke: {
                        curve: 'smooth',
                        width: 3
                    },
                    yaxis: {
                        show: false
                    },
                    chart:{
                        height: 500,
                        width: 500,
                        toolbar: {
                            show: false
                        },
                        background: 'transparent'
                    }
                }}/>
            }
        </>
    )
}

export default Chart;