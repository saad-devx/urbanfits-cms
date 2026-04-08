import { Bar } from 'react-chartjs-2';
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

const BarChartHor = ({ country, dataArr }) => <div className="w-1/2">
  <Bar width={50} height={20} options={{
    responsive: true,
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      title: { display: false }
    },
    scales: {
      x: {
        ticks: { display: true },
        grid: {
          drawBorder: true,
          display: true,
          offset: true
        }
      },
      y: {
        ticks: {
          display: true,
          beginAtZero: true,
        },
        grid: { display: false }
      }
    }
  }}
    data={{
      labels: country,
      datasets: [
        {
          label: 'Dataset 1',
          data: dataArr,
          barThickness: 9,
          backgroundColor: '#88AAF3',
        }
      ]
    }} />
</div>
export default BarChartHor