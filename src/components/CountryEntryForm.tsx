import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDashboard } from '../store/dashboardStore'
import { countrySchema } from '../utils/validators'
import type { CountryFormData, CountryFormInputData } from '../utils/validators'

export const CountryEntryForm = () => {
  const { addCountry } = useDashboard()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CountryFormInputData, undefined, CountryFormData>({
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

  const onSubmit = async (data: CountryFormData) => {
    addCountry(data)
    reset()
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Add New Entry</p>
          <h2>Add a country manually</h2>
        </div>
        <p className="panel-copy">This form uses React Hook Form and Zod with inline validation.</p>
      </div>

      <form className="country-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className="field">
          <span>Country name</span>
          <input {...register('name')} aria-invalid={Boolean(errors.name)} />
          {errors.name ? <small role="alert">{errors.name.message}</small> : null}
        </label>

        <label className="field">
          <span>Capital</span>
          <input {...register('capital')} aria-invalid={Boolean(errors.capital)} />
          {errors.capital ? <small role="alert">{errors.capital.message}</small> : null}
        </label>

        <label className="field">
          <span>Population</span>
          <input type="number" min="1" {...register('population')} aria-invalid={Boolean(errors.population)} />
          {errors.population ? <small role="alert">{errors.population.message}</small> : null}
        </label>

        <label className="field">
          <span>Area (km2)</span>
          <input type="number" min="1" step="0.01" {...register('area')} aria-invalid={Boolean(errors.area)} />
          {errors.area ? <small role="alert">{errors.area.message}</small> : null}
        </label>

        <label className="field">
          <span>Region</span>
          <input {...register('region')} aria-invalid={Boolean(errors.region)} />
          {errors.region ? <small role="alert">{errors.region.message}</small> : null}
        </label>

        <label className="field">
          <span>Country code</span>
          <input
            maxLength={2}
            {...register('countryCode')}
            aria-invalid={Boolean(errors.countryCode)}
          />
          {errors.countryCode ? <small role="alert">{errors.countryCode.message}</small> : null}
        </label>

        <button className="primary-button" type="submit" disabled={isSubmitting}>
          Save entry
        </button>
      </form>
    </section>
  )
}
