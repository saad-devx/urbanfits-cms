import { useEffect, useState } from 'react';
import CardAdmin from '../cards/cardadmin';
import { Line } from 'react-chartjs-2';
import toaster from '@/utils/toast_function';
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const MonthsActivityChart = () => {
    const defaultMonthsActivity = [
        { month: 'Jan', activity: 0, registered_users: 0 },
        { month: 'Feb', activity: 0, registered_users: 0 },
        { month: 'Mar', activity: 0, registered_users: 0 },
        { month: 'Apr', activity: 0, registered_users: 0 },
        { month: 'May', activity: 0, registered_users: 0 },
        { month: 'Jun', activity: 0, registered_users: 0 },
        { month: 'Jul', activity: 0, registered_users: 0 }
    ]
    const [activity, setActivity] = useState({
        loading: false,
        months_activity: defaultMonthsActivity
    });

    useEffect(() => {
        getMonthsActivity()
    }, [])

    const getMonthsActivity = async () => {
        setActivity(prev => ({ ...prev, loading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/metrics/months-activity`, { withCredentials: true });
            setActivity(prev => ({ ...prev, months_activity: data.months_activity }))
        } catch (e) { console.log(e); toaster("error", "Something went wrong getting the Months activity analytics.") }
        finally { setActivity(prev => ({ ...prev, loading: false })) }
    }

    return <CardAdmin classes="col-span-4" >
        <div className='px-[30px] py-8'>
            <div className="w-full mb-8 flex justify-between items-center">
                <span className='text-[22px]'>User Activity {activity.loading && "(Loading...)"}</span>
                <button disabled={activity.loading} onClick={() => {
                    setActivity(prev => ({ ...prev, months_activity: defaultMonthsActivity }))
                    getMonthsActivity()
                }} className="text-[10px] px-2 py-0.5 border border-gray-300 rounded-2xl">Refresh</button>
            </div>
            <Line options={{
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: { legend: { display: false } },
                scales: { x: { ticks: { display: true } } }
            }} data={{
                // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                labels: activity.months_activity.map(item => item.month),
                datasets: [
                    {
                        label: 'Active',
                        data: activity.months_activity.map(item => item.activity),
                        borderColor: '#75A0FF',
                        backgroundColor: '#75A0FF',
                        pointRadius: 5,
                        pointBackgroundColor: '#FFFFFF',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'In Active',
                        data: activity.months_activity.map(item => (item.registered_users - item.activity < 0 ? 0 : item.registered_users - item.activity)),
                        borderColor: '#FFD23F',
                        backgroundColor: '#FFD23F',
                        pointRadius: 5,
                        borderWidth: 1,
                        pointBackgroundColor: '#FFFFFF',
                        pointBorderWidth: 2,
                        borderDash: [10, 7],
                    }
                ]
            }}
            />
        </div>
    </CardAdmin>
}

export default MonthsActivityChart