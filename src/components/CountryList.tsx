import React from 'react'
import { useDashboard } from '../store/dashboardStore'

export const CountryList: React.FC = () => {
  const { countries, loading, error, addCountry } = useDashboard()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h2>Countries ({countries.length})</h2>
      <ul>
        {countries.map((c) => (
          <li key={c.countryCode}>{c.name} — {c.region}</li>
        ))}
      </ul>
      <button onClick={() => addCountry({
        name: 'Demo',
        capital: 'Demo City',
        population: 1000,
        area: 10,
        region: 'Demo',
        countryCode: 'DM'
      })}>Add Demo</button>
    </div>
  )
}