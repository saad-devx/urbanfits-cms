import { useEffect, useState } from "react";
import CardAdmin from "../cards/cardadmin";
import { Chart } from "react-google-charts";
import BarChartHor from '@/components/charts/BarChartHor'
import { UAEStates } from "@/uf.config";
import toaster from "@/utils/toast_function";
import axios from "axios";

export function GeoChart() {
    const defaultMetrics = {
        "ae-du": 0,
        "ae-sh": 0,
        "ae-az": 0,
        "ae-rk": 0,
        "ae-aj": 0,
        "ae-uq": 0,
        "ae-fu": 0
    }
    const [geoMetrics, setGeoMetrics] = useState({
        loading: false,
        metrics: defaultMetrics
    });

    useEffect(() => { getGeoMetrics() }, [])

    const getGeoMetrics = async () => {
        setGeoMetrics(prev => ({ ...prev, loading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/metrics/geo-metrics`, { withCredentials: true });
            setGeoMetrics(prev => ({ ...prev, metrics: data.geo_metrics }))
        } catch (e) { console.log(e); toaster("error", "Something went wrong getting the Months activity analytics.") }
        finally { setGeoMetrics(prev => ({ ...prev, loading: false })) }
    }

    return <CardAdmin classes={`${geoMetrics.loading && "animate-pulse"} w-full gap-[27px] mt-[30px]`}>
        <div className='px-[30px] py-[33.5px]'>
            <div className="w-full mb-8 flex justify-between items-center">
                <span className='text-[22px]'>Purchased By UAE States</span>
                <button disabled={geoMetrics.loading} onClick={() => {
                    setGeoMetrics(prev => ({ ...prev, metrics: defaultMetrics }))
                    getGeoMetrics()
                }} className="text-[10px] px-2 py-0.5 border border-gray-300 rounded-2xl">Refresh</button>
            </div>
            <Chart
                chartEvents={[
                    {
                        eventName: "select",
                        callback: ({ chartWrapper }) => {
                            const chart = chartWrapper.getChart();
                            const selection = chart.getSelection();
                            if (selection.length === 0) return;
                            const region = data[selection[0].row + 1];
                        }
                    }
                ]}
                chartType="GeoChart"
                width="100%"
                keepAspectRatio={true}
                data={[["States", "Full Name", "Orders"], ...Object.keys(geoMetrics.metrics).map(metric => [metric, UAEStates[metric], geoMetrics.metrics[metric]])]}
                options={{
                    legend: "bla bla",
                    region: "AE",
                    displayMode: "texts",
                    enableRegionInteractivity: true,
                    resolution: "provinces",
                    domain: "AE",
                    title: "UAE",
                    colors: ['#82A6D8']
                }}
            />
            <div className='w-full flex justify-between gap-[30px]'>
                <BarChartHor country={['Dubai', 'Abu Dhabi', 'Sharjah']} dataArr={[geoMetrics.metrics["ae-du"], geoMetrics.metrics["ae-az"], geoMetrics.metrics["ae-sh"]]} />
                <BarChartHor country={['Ajman', 'Umm Al-Quwain', 'Fujairah', 'Ras Al Khaimah']} dataArr={[geoMetrics.metrics["ae-aj"], geoMetrics.metrics["ae-uq"], geoMetrics.metrics["ae-fu"], geoMetrics.metrics["ae-rk"]]} />
            </div>
        </div>
    </CardAdmin>
}
