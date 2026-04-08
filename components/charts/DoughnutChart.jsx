import Link from "next/link";
import CardAdmin from '../cards/cardadmin';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { orderStatuses } from '@/uf.config';
import { useEffect, useState } from "react";
import toaster from "@/utils/toast_function";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusItem = ({ id, status }) => <Link key={id} href={"/orders?status=" + status.toLowerCase()} className='flex gap-[10px] items-center'>
    <div style={{ background: orderStatuses[status].bg }} className='w-4 aspect-square rounded-3xl' />
    <span className='capitalize'>{status.toLowerCase()}</span>
</Link>

const DoughnutChart = () => {
    const statusArray = Object.keys(orderStatuses);
    const [showMore, setShowMore] = useState(true);
    const defaultOrderMetrics = Object.keys(orderStatuses).map(status => ({ status, count: 6.25 }));
    const [orderMetrics, setOrderMetrics] = useState({
        loading: false,
        metrics: defaultOrderMetrics
    });

    const getOrderMetrics = async () => {
        setOrderMetrics(prev => ({ ...prev, loading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/metrics/order-status`, { withCredentials: true });
            setOrderMetrics(prev => ({ ...prev, metrics: data.order_status_metrics }))
        } catch (e) { console.log(e); toaster("error", "Something went wrong getting the meterics data.") }
        finally { setOrderMetrics(prev => ({ ...prev, loading: false })) }
    }

    useEffect(() => {
        getOrderMetrics();
    }, [])

    return <CardAdmin>
        <div className={`p-6 flex flex-col items-center justify-center ${orderMetrics.loading && "animate-pulse"}`}>
            <div className="w-full flex justify-between items-center">
                <span className='text-[22px] mb-b self-start'>Order Review</span>
                <button disabled={orderMetrics.loading} onClick={() => {
                    setOrderMetrics(prev => ({ ...prev, metrics: defaultOrderMetrics }))
                    getOrderMetrics()
                }} className="text-[10px] px-2 py-0.5 border border-gray-300 rounded-2xl">Refresh</button>
            </div>
            <div className='w-52 aspect-square'>
                <Doughnut
                    data={{
                        datasets: [{
                            data: orderMetrics.metrics.map(metric => metric.count),
                            backgroundColor: orderMetrics.metrics.map(metric => orderStatuses[metric.status].bg)
                        }]
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        cutout: 75,
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        const index = context.dataIndex;
                                        const indexStatus = orderMetrics.metrics[index]
                                        return indexStatus.count + " " + indexStatus.status;
                                    }
                                }
                            }
                        }
                    }}
                />
            </div>

            <button onClick={() => toaster("info", "Coming soon!")} className='pt-8 pb-4 text-sm' >
                <i class="fa-solid fa-download text-base mr-3" />
                Download Overall Report
            </button>
            <div className='relative pt-4 grid grid-cols-2 gap-y-5 gap-x-16 text-xs border-t border-gray-300'>
                {statusArray.slice(0, showMore ? 6 : 16).map((status, index) => <StatusItem id={index} status={status} />)}
                <button onClick={() => setShowMore((prev) => !prev)} className={`col-span-full self-end px-2 py-0.5 text-[10px] rounded-3xl ${showMore ? "bg-gold-land text-white" : "bg-gray-200 text-black"}`}>{showMore ? "Show More" : "Show Less"}</button>
            </div>
        </div>
    </CardAdmin>
}

export default DoughnutChart