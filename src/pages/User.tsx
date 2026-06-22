import { Link } from 'react-router-dom'
import { useAuth } from '../store/authStore'

export const User = () => {
  const { user } = useAuth()

  return (
    <main className="page-shell">
      <header className="hero-card">
        <div>
          <p className="eyebrow">Standard Workspace</p>
          <h1>Regular User View</h1>
          <p className="hero-copy">
            Hello, <strong>{user?.username}</strong>. You are currently browsing via a standard user account profile.
          </p>
        </div>
        <div className="nav-links">
          <Link className="secondary-button" to="/dashboard">Back to Dashboard</Link>
        </div>
      </header>

      <section className="panel" style={{ marginTop: '2rem' }}>
        <h2>Your Profile Metrics</h2>
        <p className="panel-copy" style={{ marginTop: '0.5rem' }}>
          Account Privilege Classification: <code>{user?.role.toUpperCase()}</code><br />
          System Registered Email Address: {user?.email}
        </p>
      </section>
    </main>
  )
}