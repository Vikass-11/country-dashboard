import React, { createContext, useState, useContext, ReactNode } from 'react'
import type { Country } from '../types'

interface DashboardContextType {
  countries: Country[]
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

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [countries, setCountries] = useState<Country[]>([])
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addCountry = (country: Country) => {
    setCountries([...countries, { ...country, id: Date.now().toString() }])
  }

  const removeCountry = (countryCode: string) => {
    setCountries(countries.filter((c) => c.countryCode !== countryCode))
  }

  const selectCountry = (country: Country) => {
    setSelectedCountries([...selectedCountries, country])
  }

  const deselectCountry = (countryCode: string) => {
    setSelectedCountries(selectedCountries.filter((c) => c.countryCode !== countryCode))
  }

  return (
    <DashboardContext.Provider
      value={{
        countries,
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