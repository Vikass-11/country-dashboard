import { useAuth } from '../store/authStore'

export const Admin = () => {
  const { user } = useAuth()

  return (
    <main className="page-shell status-panel">
      <h1>Admin</h1>
      <p>Hello, {user?.username}. This is admin-only content.</p>
    </main>
  )
}
