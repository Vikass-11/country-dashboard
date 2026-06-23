import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useDashboard } from '../store/dashboardStore'

export function CountryEntryForm() {
  const [countryName, setCountryName] = useState('')
  const [capital, setCapital] = useState('')
  const [population, setPopulation] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { addCountry } = useDashboard()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!countryName.trim()) return

    setLoading(true)
    const token = Cookies.get('auth_token') || 'dummy-token-for-build'

    try {
      await axios.post(
        'https://api.example.com/countries',
        { 
          name: countryName, 
          capital, 
          population: Number(population) || 0 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      addCountry({
        name: countryName,
        capital: capital || 'N/A',
        population: Number(population) || 0,
        area: 0,
        region: 'Manual Entry',
        countryCode: countryName.slice(0, 2).toUpperCase(),
      })

      setCountryName('')
      setCapital('')
      setPopulation('')
      alert('Country logged completely!')
    } catch (error) {
      console.error('API Sync failure, running fallback global pipeline save:', error)
      
      addCountry({
        name: countryName,
        capital: capital || 'N/A',
        population: Number(population) || 0,
        area: 0,
        region: 'Manual Entry',
        countryCode: countryName.slice(0, 2).toUpperCase(),
      })
      
      setCountryName('')
      setCapital('')
      setPopulation('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="panel">
      <form onSubmit={handleSubmit} className="country-form" style={{ width: '100%', boxSizing: 'border-box' }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <p className="eyebrow">Form processing</p>
          <h2>Add custom country</h2>
        </div>

        <div className="field">
          <span>Country Name</span>
          <input
            type="text"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            placeholder="e.g., Iceland"
            disabled={loading}
            required
          />
        </div>

        <div className="field">
          <span>Capital City</span>
          <input
            type="text"
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
            placeholder="e.g., Reykjavik"
            disabled={loading}
          />
        </div>

        <div className="field" style={{ gridColumn: '1 / -1' }}>
          <span>Population Metrics</span>
          <input
            type="number"
            value={population}
            onChange={(e) => setPopulation(e.target.value)}
            placeholder="e.g., 370000"
            disabled={loading}
          />
        </div>

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? 'Processing...' : 'Save Country'}
        </button>
      </form>
    </section>
  )
}