/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Country } from '../types'

interface DashboardContextType {
  countries: Country[]
  customCountries: Country[]
  allCountries: Country[]
  selectedCountries: Country[]
  loading: boolean
  error: string | null
  setCountries: (countries: Country[]) => void
  addCountry: (country: Country) => void
  removeCountry: (countryCode: string) => void
  selectCountry: (country: Country) => void
  deselectCountry: (countryCode: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [countries, setCountries] = useState<Country[]>([])
  const [customCountries, setCustomCountries] = useState<Country[]>([])
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addCountry = (country: Country) => {
    setCustomCountries((current) => [...current, { ...country, id: Date.now().toString() }])
  }

  const removeCountry = (countryCode: string) => {
    setCustomCountries((current) => current.filter((country) => country.countryCode !== countryCode))
  }

  const selectCountry = (country: Country) => {
    setSelectedCountries((current) => [...current, country])
  }

  const deselectCountry = (countryCode: string) => {
    setSelectedCountries((current) => current.filter((country) => country.countryCode !== countryCode))
  }

  const allCountries = useMemo(() => [...customCountries, ...countries], [countries, customCountries])

  return (
    <DashboardContext.Provider
      value={{
        countries,
        customCountries,
        allCountries,
        selectedCountries,
        loading,
        error,
        setCountries,
        addCountry,
        removeCountry,
        selectCountry,
        deselectCountry,
        setLoading,
        setError,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export const useDashboard = () => {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider')
  }
  return context
}
