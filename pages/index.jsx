import { useEffect, useState } from 'react'
import CardAdmin from '@/components/cards/cardadmin';
import LineChart from '@/components/charts/LineChart';
import DoughnutChart from '@/components/charts/DoughnutChart';
import RecentOrders from '@/components/recent-orders';
import MonthsActivityChart from '@/components/charts/MonthsActivityChart';
import Last60minUserActivity from '@/components/charts/Last60minUserActivity';
import NewCustomersAndTopProducts from '@/components/new-customers';
import AvatarIconV from '@/public/icons/AvatarIconV';
import PurseIcon from '@/public/icons/PurseIcon';
import VisitorsIcon from '@/public/icons/VisitorsIcon';
import WalletIcon from '@/public/icons/WalletIcon';
import DollarCardIcon from '@/public/icons/DollarCardIcon';
import { TruckLIcon } from '@/public/icons/TruckLIcon';
import axios from 'axios';
import toaster from '@/utils/toast_function';
import { GeoChart } from '@/components/charts/GeoChart';

export default function Dashboard() {
    const [metrics, setMetrics] = useState({
        metricsLoading: false,
        avg_signups: 0,
        avg_visits: 0,
        total_orders: 0,
        cancelled_orders: 0,
        total_products: 0,
        total_category: 0,
        monthly_revenue: 0,
        monthly_sales: 0,
        daily_revenue: 0
    })

    const getMetrics = async () => {
        setMetrics(prev => ({ ...prev, metricsLoading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/metrics`, { withCredentials: true });
            setMetrics(data.metrics)
        } catch (e) { console.log(e); toaster("error", "Somethign went wrong getting the meterics data.") }
        finally { setMetrics(prev => ({ ...prev, metricsLoading: false })) }
    }

    useEffect(() => {
        getMetrics()
    }, [])

    return <>
        <div className="my-4 flex justify-end">
            <button disabled={metrics.metricsLoading} onClick={getMetrics} className={`${metrics.metricsLoading && "pointer-events-none animate-pulse"} px-4 py-1 text-sm rounded-2xl bg-gold-land text-white`}>Refresh Metrics</button>
        </div>
        <section className='grid grid-cols-4 gap-6'>
            <CardAdmin round="rounded-2xl">
                <div className='px-[20px] py-[30px] rounded-[15px] flex justify-between items-center ' >
                    <div className='flex flex-col gap-[8px]' >
                        <span className='text-sm'>Daily Signups</span>
                        <span className='text-[22px]'>{metrics.avg_signups.toFixed(3)} <span className='text-xs'>Avg</span></span>
                    </div>
                    <div className=' bg-[#F5F5F5] rounded-[50px] w-[50px] h-[50px]  flex items-center justify-center ' >
                        <AvatarIconV />
                    </div>
                </div>
            </CardAdmin>
            <CardAdmin round="rounded-2xl">
                <div className='px-[20px] py-[30px] rounded-[15px] flex justify-between items-center ' >
                    <div className='flex flex-col gap-[8px]' >
                        <p className='text-sm'>Daily Visitors</p>
                        <p className='text-[22px]'>{metrics.avg_visits.toFixed(3)} <span className='text-xs'>Avg</span></p>
                    </div>
                    <div className=' bg-[#F5F5F5] rounded-[50px] w-[50px] h-[50px]  flex items-center justify-center ' >
                        <VisitorsIcon />
                    </div>
                </div>
            </CardAdmin>
            <CardAdmin round="rounded-2xl">
                <div className='px-[20px] py-[30px] rounded-[15px] flex justify-between items-center ' >
                    <div className='flex flex-col gap-2' >
                        <p className='text-sm'>Monthly Sales</p>
                        <p className='text-[22px]'>{metrics.monthly_sales} <span className='text-xs'>Units</span> </p>
                    </div>
                    <div className=' bg-[#F5F5F5] rounded-[50px] w-[50px] h-[50px]  flex items-center justify-center ' >
                        <AvatarIconV />
                    </div>
                </div>
            </CardAdmin>
            <CardAdmin round="rounded-2xl">
                <div className='px-[20px] py-[30px] rounded-[15px] flex justify-between items-center ' >
                    <div className='flex flex-col gap-[8px]' >
                        <p className='text-sm'>Cancelled Orders</p>
                        <p className='text-[22px]'>{metrics.cancelled_orders}</p>
                    </div>
                    <div className=' bg-[#F5F5F5] rounded-[50px] w-[50px] h-[50px]  flex items-center justify-center ' >
                        <VisitorsIcon />
                    </div>
                </div>
            </CardAdmin>
            <CardAdmin round="rounded-2xl">
                <div className='px-[20px] py-[30px] rounded-[15px] flex justify-between items-center ' >
                    <div className='flex flex-col gap-[8px]' >
                        <p className='text-sm'>Orders</p>
                        <p className=' text-[22px]'>{metrics.total_orders}</p>
                        <p className='text-xs'>Excluding cancelled orders</p>
                    </div>
                    <div className=' bg-[#F5F5F5] rounded-[50px] w-[50px] h-[50px]  flex items-center justify-center ' >
                        <TruckLIcon />
                    </div>
                </div>
            </CardAdmin>
            <CardAdmin round="rounded-2xl">
                <div className='px-[20px] py-[30px] rounded-[15px] flex justify-between items-center ' >
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm'>Products</p>
                        <p className=' text-[22px]'>{metrics.total_products}</p>
                        <p className='text-xs'>In {metrics.total_category} Categories</p>
                    </div>
                    <div className=' bg-[#F5F5F5] rounded-[50px] w-[50px] h-[50px]  flex items-center justify-center ' >
                        <PurseIcon />
                    </div>
                </div>
            </CardAdmin>
            <CardAdmin round="rounded-2xl">
                <div className='px-[20px] py-[30px] rounded-[15px] flex justify-between items-center ' >
                    <div className='flex flex-col gap-2' >
                        <p className='text-sm'>Daily Revenue</p>
                        <p className='text-[22px]'>{metrics.daily_revenue.toFixed(3)} <span className='text-xs'>AED</span></p>
                        <p className='text-xs'>Today's</p>
                    </div>
                    <div className=' bg-[#F5F5F5] rounded-[50px] w-[50px] h-[50px]  flex items-center justify-center ' >
                        <DollarCardIcon />
                    </div>
                </div>
            </CardAdmin>
            <CardAdmin round="rounded-2xl">
                <div className='px-[20px] py-[30px] rounded-[15px] flex justify-between items-center ' >
                    <div className='flex flex-col gap-[8px]' >
                        <p className='text-sm'>Monthly Earning</p>
                        <p className='text-[22px]'>{metrics.monthly_revenue.toFixed(3)} <span className='text-xs'>AED</span></p>
                        <p className='text-xs'>Based in your local time</p>
                    </div>
                    <div className=' bg-[#F5F5F5] rounded-[50px] w-[50px] h-[50px]  flex items-center justify-center ' >
                        <WalletIcon />
                    </div>
                </div>
            </CardAdmin>
        </section>
        <section className='grid grid-cols-6 gap-[27px] mt-[30px]'>
            <div className='col-span-4' >
                <CardAdmin>
                    <div className='px-[30px] py-[33.5px]'>
                        <p className='text-[22px] mb-[34px]'>Sale Report</p>
                        <LineChart />
                        <div className='flex gap-[70px] items-center text-sm mt-12'>
                            <span className='flex gap-[10px] items-center'>
                                <div className='w-[15px] h-[15px] rounded-[50px] bg-[#88B5E2]' />
                                <p>Via Referral</p>
                            </span>
                            <span className='flex gap-[10px] items-center'>
                                <div className='w-[15px] h-[15px] rounded-[50px] bg-[#C7FCDF]' />
                                <p>Direct</p>
                            </span>
                            <span className='flex gap-[10px] items-center'>
                                <div className='w-[15px] h-[15px] rounded-[50px] bg-[#FEDDE1]' />
                                <p>Via Social</p>
                            </span>
                        </div>
                    </div>
                </CardAdmin>
            </div>
            <div className='col-span-2' >
                <DoughnutChart />
            </div>
        </section>
        <section className='grid grid-cols-6 gap-[27px] mt-[30px]'>
            <MonthsActivityChart />
            <Last60minUserActivity />
        </section>
        <GeoChart />
        <RecentOrders />
        <NewCustomersAndTopProducts />
    </>
}