import { Link } from 'react-router-dom'
import { useAuth } from '../store/authStore'
import { useDashboard } from '../store/dashboardStore'

export const Admin = () => {
  const { user } = useAuth()
  const { customCountries, removeCountry } = useDashboard()

  return (
    <main className="page-shell">
      <header className="hero-card">
        <div>
          <p className="eyebrow" style={{ color: '#dc2626' }}>Elevated Privileges</p>
          <h1>Admin Control Panel</h1>
          <p className="hero-copy">
            Welcome, <strong>{user?.username}</strong>. Only administrators can view this control center and manage custom records.
          </p>
        </div>
        <div className="nav-links">
          <Link className="secondary-button" to="/dashboard">Back to Dashboard</Link>
        </div>
      </header>

      <section className="panel" style={{ marginTop: '2rem' }}>
        <div className="panel-heading">
          <h2>Administrative State Actions</h2>
          <p className="panel-copy">Destructive management of manually injected country objects.</p>
        </div>

        {customCountries.length === 0 ? (
          <p style={{ marginTop: '1rem', color: '#6b7280' }}>No custom entries available to manage.</p>
        ) : (
          <ul className="country-list" style={{ marginTop: '1rem' }}>
            {customCountries.map((country) => (
              <li key={country.countryCode} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{country.name}</strong>
                  <span>Code: {country.countryCode} · Region: {country.region}</span>
                </div>
                <button
                  className="secondary-button"
                  style={{ borderColor: '#dc2626', color: '#dc2626', padding: '0.25rem 0.75rem' }}
                  onClick={() => removeCountry(country.countryCode)}
                >
                  Delete Record
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}