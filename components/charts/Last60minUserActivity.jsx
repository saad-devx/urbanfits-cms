import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import CardAdmin from '../cards/cardadmin';
import axios from 'axios';
import toaster from '@/utils/toast_function';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Last60minUserActivity = () => {
    const defaultActivities = [
        { activity_count: 0, mins: 60 },
        { activity_count: 0, mins: 50 },
        { activity_count: 0, mins: 40 },
        { activity_count: 0, mins: 30 },
        { activity_count: 0, mins: 20 },
        { activity_count: 0, mins: 10 },
    ]
    const [metrics, setMetrics] = useState({
        loading: false,
        activities: defaultActivities
    });

    useEffect(() => { getActivityMetrics() }, [])

    const getActivityMetrics = async () => {
        setMetrics(prev => ({ ...prev, loading: true }))
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/metrics/last60min-user-metrics`, { withCredentials: true });
            console.log("here is the foocking data: ", data)
            setMetrics(prev => ({ ...prev, activities: data.past_60_min_activity }))
        } catch (e) { console.log(e); toaster("error", "Something went wrong getting the user activity analytics of last 60 mins.") }
        finally { setMetrics(prev => ({ ...prev, loading: false })) }
    }

    return <CardAdmin classes='col-span-2'>
        <div className={`p-8 ${metrics.loading && "animate-pulse"}`}>
            <div className="w-full mb-8 flex justify-between items-center">
                <span className='text-[22px]'>User Activity <span className="text-[10px]">(In Last 60 mins)</span></span>
                <button disabled={metrics.loading} onClick={() => {
                    setMetrics(prev => ({ ...prev, activities: defaultActivities }))
                    getActivityMetrics()
                }} className="text-[10px] px-2 py-0.5 border border-gray-300 rounded-2xl">Refresh</button>
            </div>
            <Bar width={40} height={50}
                options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { grid: { display: false } },
                        y: { grid: { display: true } }
                    }
                }}
                data={{
                    labels: ['10', '20', '30', '40', '50', '60'],
                    datasets: [{
                        label: "user activity",
                        data: metrics.activities.map(activity => activity.activity_count),
                        barThickness: 9,
                        backgroundColor: '#88AAF3',
                    }]
                }} />
        </div>
    </CardAdmin>
}

export default Last60minUserActivity