import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { ChartComponent } from '../components/ChartComponent'
import { CountryEntryForm } from '../components/CountryEntryForm'
import { countryService } from '../services/api'
import { useAuth } from '../store/authStore'
import { useDashboard } from '../store/dashboardStore'
import { buildRegionAnalytics } from '../utils/countryAnalytics'

export const Dashboard = () => {
  const { user, logout } = useAuth()
  const { countries, allCountries, customCountries, setCountries } = useDashboard()
  const query = useQuery({
    queryKey: ['countries'],
    queryFn: countryService.getAllCountries,
  })

  useEffect(() => {
    if (query.data) {
      setCountries(query.data)
    }
  }, [query.data, setCountries])

  const regionAnalytics = buildRegionAnalytics(allCountries)

  const barData = {
    labels: regionAnalytics.labels,
    datasets: [
      {
        label: 'Population',
        data: regionAnalytics.populations,
        backgroundColor: '#1d4ed8',
        borderRadius: 8,
      },
    ],
  }

  const lineData = {
    labels: regionAnalytics.labels,
    datasets: [
      {
        label: 'Area (km2)',
        data: regionAnalytics.areas,
        borderColor: '#ea580c',
        backgroundColor: 'rgba(234, 88, 12, 0.18)',
        fill: true,
        tension: 0.35,
      },
    ],
  }

  if (query.isLoading) {
    return <main className="page-shell status-panel">Loading dashboard data...</main>
  }

  if (query.isError) {
    return (
      <main className="page-shell status-panel" role="alert">
        Unable to load countries right now. {query.error.message}
      </main>
    )
  }

  return (
    <main className="page-shell">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Country Dashboard</p>
          <h1>Track country metrics, route access, and manual entries in one place.</h1>
          <p className="hero-copy">
            TanStack Query powers the API fetch, Context stores shared state, and the form below
            validates with React Hook Form plus Zod.
          </p>
        </div>
        <div className="hero-actions">
          <div className="user-pill">
            Signed in as <strong>{user?.username}</strong> ({user?.role})
          </div>
          <div className="nav-links">
            <Link className="secondary-button" to="/admin">
              Admin view
            </Link>
            <Link className="secondary-button" to="/user">
              User view
            </Link>
            <button className="primary-button" type="button" onClick={logout}>
              Log out
            </button>
          </div>
        </div>
      </section>

      <section className="stats-grid" aria-label="Country summary cards">
        <article className="panel stat-card">
          <p className="eyebrow">API records</p>
          <h2>{countries.length}</h2>
          <p>Countries loaded from the public API.</p>
        </article>
        <article className="panel stat-card">
          <p className="eyebrow">Manual entries</p>
          <h2>{customCountries.length}</h2>
          <p>Countries created with the validated form.</p>
        </article>
        <article className="panel stat-card">
          <p className="eyebrow">Top region</p>
          <h2>{regionAnalytics.largestPopulationRegion}</h2>
          <p>Largest combined population across all loaded records.</p>
        </article>
      </section>

      <ChartComponent barData={barData} lineData={lineData} />

      <section className="content-grid">
        <CountryEntryForm />

        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Latest Entries</p>
              <h2>Combined country list</h2>
            </div>
            <p className="panel-copy">Showing the first 8 entries from shared state for a quick review.</p>
          </div>

          <ul className="country-list">
            {allCountries.slice(0, 8).map((country) => (
              <li key={`${country.countryCode}-${country.name}`}>
                <div>
                  <strong>{country.name}</strong>
                  <span>
                    {country.capital} · {country.region}
                  </span>
                </div>
                <span>{country.population.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  )
}
