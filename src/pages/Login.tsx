import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/authStore'
import { loginSchema } from '../utils/validators'
import type { LoginFormData } from '../utils/validators'

export const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    await login(data.username, data.password)
    navigate('/dashboard')
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <div>
          <p className="eyebrow">Auth Flow POC</p>
          <h1>Sign in to the dashboard</h1>
          <p className="hero-copy">
            This proof of concept stores the mock JWT in <code>localStorage</code> for demo
            simplicity and route persistence. In production, an HttpOnly cookie would be safer for
            sensitive tokens.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <label className="field" htmlFor="username">
            <span>Username</span>
            <input id="username" autoComplete="username" {...register('username')} />
            {errors.username ? <small role="alert">{errors.username.message}</small> : null}
          </label>

          <label className="field" htmlFor="password">
            <span>Password</span>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register('password')}
            />
            {errors.password ? <small role="alert">{errors.password.message}</small> : null}
          </label>

          <button className="primary-button" type="submit" disabled={isSubmitting}>
            Log in
          </button>
        </form>

        <p className="helper-copy">Use username `admin` for admin access. Any other valid username becomes a regular user.</p>
      </section>
    </main>
  )
}
