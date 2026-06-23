import axios from 'axios'
import type { Country } from '../types'

interface RestCountryResponse {
  names: {
    common: string
  }
  capital?: string[] | string
  population: number
  area: number
  region?: string
  codes: {
    alpha_2: string
  }
}

const COUNTRIES_URL = 'https://api.restcountries.com/countries/v5?limit=100';

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
      const response = await axios.get(COUNTRIES_URL, {
        headers: {
          'Authorization': 'Bearer rc_live_96873676d03a48d2946132c1c1d5b793'
        }
      })

      const rawData = response.data
      const data: RestCountryResponse[] = Array.isArray(rawData) ? rawData : (rawData.data || [])

      return data.map((country) => {
        const capitalStr = Array.isArray(country.capital) 
          ? country.capital[0] 
          : (country.capital ?? 'N/A')

        return {
          name: country.names?.common ?? 'Unknown',
          capital: capitalStr,
          population: country.population ?? 0,
          area: country.area ?? 0,
          region: country.region ?? 'Unknown',
          countryCode: country.codes?.alpha_2 ?? 'XX',
        }
      })
    } catch (error) {
      console.warn(
        'RestCountries API fetch failed via Axios. Switching to local fallback dataset.',
        error
      )
      return MOCK_COUNTRIES
    }
  },
}