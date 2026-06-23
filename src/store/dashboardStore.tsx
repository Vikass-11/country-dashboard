/* eslint-disable react-refresh/only-export-components */
import { create } from 'zustand'
import type { ReactNode } from 'react'
import type { Country } from '../types'

interface DashboardState {
  countries: Country[]
  customCountries: Country[]
  selectedCountries: Country[]
  allCountries: Country[]
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

export const useDashboard = create<DashboardState>((set) => ({
  countries: [],
  customCountries: [],
  selectedCountries: [],
  allCountries: [], 
  loading: false,
  error: null,

  setCountries: (countries) => set((state) => ({ 
    countries,
    allCountries: [...state.customCountries, ...countries]
  })),
  
  addCountry: (country) => set((state) => {
    const updatedCustom = [...state.customCountries, { ...country, id: Date.now().toString() }]
    return {
      customCountries: updatedCustom,
      allCountries: [...updatedCustom, ...state.countries]
    }
  }),
  
  removeCountry: (countryCode) => set((state) => {
    const updatedCustom = state.customCountries.filter((c) => c.countryCode !== countryCode)
    return {
      customCountries: updatedCustom,
      allCountries: [...updatedCustom, ...state.countries]
    }
  }),
  
  selectCountry: (country) => set((state) => ({
    selectedCountries: [...state.selectedCountries, country]
  })),
  
  deselectCountry: (countryCode) => set((state) => ({
    selectedCountries: state.selectedCountries.filter((c) => c.countryCode !== countryCode)
  })),
  
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}))

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  return children
}