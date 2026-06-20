import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'
import type { ChartData, ChartOptions } from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface ChartComponentProps {
  barData: ChartData<'bar'>
  lineData: ChartData<'line'>
}

const chartOptions: ChartOptions<'bar' | 'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
}

export const ChartComponent = ({ barData, lineData }: ChartComponentProps) => {
  return (
    <section className="chart-grid" aria-label="Country analytics charts">
      <div className="panel chart-panel">
        <h2>Population by Region</h2>
        <div className="chart-frame">
          <Bar data={barData} options={chartOptions} />
        </div>
      </div>
      <div className="panel chart-panel">
        <h2>Area by Region</h2>
        <div className="chart-frame">
          <Line data={lineData} options={chartOptions} />
        </div>
      </div>
    </section>
  )
}
