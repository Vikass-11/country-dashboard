import axios from 'axios'
import type { Country } from '../types'

const API = axios.create({
  // Use Vite dev proxy path in development to avoid CORS issues
  baseURL: '/restcountries/v3.1',
  timeout: 10000,
})

export const countryService = {
  getAllCountries: async (): Promise<Country[]> => {
    const response = await API.get('/all')
    return response.data.map((country: any) => ({
      name: country.name.common,
      capital: country.capital?.[0] || 'N/A',
      population: country.population,
      area: country.area,
      region: country.region || 'Unknown',
      countryCode: country.cca2,
    }))
  },
}
