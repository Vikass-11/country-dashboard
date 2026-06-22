import { Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler, // 1. Import the Filler plugin
  type ChartData,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler // 2. Register the Filler plugin
)

interface ChartComponentProps {
  barData: ChartData<'bar'>
  lineData: ChartData<'line'>
}

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
}

export const ChartComponent = ({ barData, lineData }: ChartComponentProps) => {
  return (
    <section className="charts-grid" aria-label="Visual analytics metrics">
      <div className="panel chart-card" style={{ minHeight: '300px', position: 'relative' }}>
        <h3 className="eyebrow" style={{ marginBottom: '1rem' }}>Regional Populations</h3>
        <div style={{ height: '250px' }}>
          <Bar data={barData} options={commonOptions} />
        </div>
      </div>

      <div className="panel chart-card" style={{ minHeight: '300px', position: 'relative' }}>
        <h3 className="eyebrow" style={{ marginBottom: '1rem' }}>Regional Land Footprint</h3>
        <div style={{ height: '250px' }}>
          <Line data={lineData} options={commonOptions} />
        </div>
      </div>
    </section>
  )
}