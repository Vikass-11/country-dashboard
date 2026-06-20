import type { Country } from '../types'

export interface RegionAnalytics {
  labels: string[]
  populations: number[]
  areas: number[]
  largestPopulationRegion: string
}

export const buildRegionAnalytics = (countries: Country[]): RegionAnalytics => {
  const regionCounts = new Map<string, { population: number; area: number }>()

  countries.forEach((country) => {
    const region = country.region || 'Unknown'
    const current = regionCounts.get(region) ?? { population: 0, area: 0 }

    regionCounts.set(region, {
      population: current.population + country.population,
      area: current.area + country.area,
    })
  })

  const entries = [...regionCounts.entries()].sort(
    (left, right) => right[1].population - left[1].population
  )

  return {
    labels: entries.map(([region]) => region),
    populations: entries.map(([, value]) => value.population),
    areas: entries.map(([, value]) => value.area),
    largestPopulationRegion: entries[0]?.[0] ?? 'N/A',
  }
}
