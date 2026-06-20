import { useAuth } from '../store/authStore'

export const Admin = () => {
  const { user } = useAuth()

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin</h1>
      <p>Hello, {user?.username}. This is admin-only content.</p>
    </div>
  )
}