import { useAuth } from '../store/authStore'

export const User = () => {
  const { user } = useAuth()

  return (
    <div style={{ padding: '20px' }}>
      <h1>User</h1>
      <p>Welcome back, {user?.username}. This is regular user content.</p>
    </div>
  )
}