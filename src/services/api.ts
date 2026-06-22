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

// Robust static backup array in case the public API is down or blocked
const MOCK_COUNTRIES: Country[] = [
  { name: 'United States', capital: 'Washington, D.C.', population: 331000000, area: 9834000, region: 'Americas', countryCode: 'US' },
  { name: 'Germany', capital: 'Berlin', population: 83000000, area: 357022, region: 'Europe', countryCode: 'DE' },
  { name: 'Japan', capital: 'Tokyo', population: 125000000, area: 377975, region: 'Asia', countryCode: 'JP' },
  { name: 'Brazil', capital: 'Brasília', population: 214000000, area: 8515767, region: 'Americas', countryCode: 'BR' },
  { name: 'Australia', capital: 'Canberra', population: 26000000, area: 7692024, region: 'Oceania', countryCode: 'AU' },
  { name: 'Egypt', capital: 'Cairo', population: 109000000, area: 1002450, region: 'Africa', countryCode: 'EG' },
  { name: 'India', capital: 'New Delhi', population: 1408000000, area: 3287263, region: 'Asia', countryCode: 'IN' },
  { name: 'France', capital: 'Paris', population: 68000000, area: 551695, region: 'Europe', countryCode: 'FR' }
]

export const countryService = {
  async getAllCountries(): Promise<Country[]> {
    try {
      const response = await fetch(COUNTRIES_URL)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
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
    } catch (error) {
      console.warn(
        'RestCountries API fetch failed or was blocked by CORS. Switching to local fallback dataset.',
        error
      )
      // Return the mock array so the dashboard charts and features still render perfectly
      return MOCK_COUNTRIES
    }
  },
}