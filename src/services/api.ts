import type { Country } from '../types'

interface RestCountryResponse {
  name: {
    common: string
  }
  capital?: string[]
  population: number
  area: number
  region?: string
  cca2: string
}

const COUNTRIES_URL =
  'https://restcountries.com/v3.1/all?fields=name,capital,population,area,region,cca2'

export const countryService = {
  async getAllCountries(): Promise<Country[]> {
    const response = await fetch(COUNTRIES_URL)

    if (!response.ok) {
      throw new Error(`Failed to fetch countries: HTTP ${response.status}`)
    }

    const data = (await response.json()) as RestCountryResponse[]

    return data.map((country) => ({
      name: country.name.common,
      capital: country.capital?.[0] ?? 'N/A',
      population: country.population,
      area: country.area,
      region: country.region ?? 'Unknown',
      countryCode: country.cca2,
    }))
  },
}
