import { useAuth } from '../store/authStore'

export const User = () => {
  const { user } = useAuth()

  return (
    <main className="page-shell status-panel">
      <h1>User</h1>
      <p>Welcome back, {user?.username}. This is regular user content.</p>
    </main>
  )
}
