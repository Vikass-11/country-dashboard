import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDashboard } from '../store/dashboardStore'
import { countrySchema } from '../utils/validators'
import type { CountryFormData } from '../utils/validators'

export const CountryEntryForm = () => {
  const { addCountry } = useDashboard()
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CountryFormData>({
    resolver: zodResolver(countrySchema),
    defaultValues: {
      name: '',
      capital: '',
      population: 0,
      area: 0,
      region: '',
      countryCode: '',
    },
  })

  const onSubmit = (data: CountryFormData) => {
    addCountry({
      name: data.name,
      capital: data.capital,
      population: data.population,
      area: data.area,
      region: data.region,
      countryCode: data.countryCode,
    })
    reset()
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <p className="eyebrow">Data Management</p>
        <h2>Add custom entry</h2>
        <p className="panel-copy">Append records instantly to global context state with schema checking.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <label className="field" htmlFor="name">
            <span>Country Name</span>
            <input id="name" {...register('name')} />
            {errors.name ? <small role="alert">{errors.name.message}</small> : null}
          </label>

          <label className="field" htmlFor="capital">
            <span>Capital</span>
            <input id="capital" {...register('capital')} />
            {errors.capital ? <small role="alert">{errors.capital.message}</small> : null}
          </label>

          <label className="field" htmlFor="population">
            <span>Population</span>
            <input id="population" type="number" {...register('population')} />
            {errors.population ? <small role="alert">{errors.population.message}</small> : null}
          </label>

          <label className="field" htmlFor="area">
            <span>Area ($km^2$)</span>
            <input id="area" type="number" {...register('area')} />
            {errors.area ? <small role="alert">{errors.area.message}</small> : null}
          </label>

          <label className="field" htmlFor="region">
            <span>Region</span>
            <input id="region" {...register('region')} />
            {errors.region ? <small role="alert">{errors.region.message}</small> : null}
          </label>

          <label className="field" htmlFor="countryCode">
            <span>Country Code (2 chars)</span>
            <input id="countryCode" maxLength={2} {...register('countryCode')} />
            {errors.countryCode ? <small role="alert">{errors.countryCode.message}</small> : null}
          </label>
        </div>

        <button 
          className="primary-button" 
          type="submit" 
          disabled={isSubmitting} 
          style={{ marginTop: '1.5rem', width: 'auto', alignSelf: 'start' }}
        >
          Add Country Record
        </button>
      </form>
    </section>
  )
}