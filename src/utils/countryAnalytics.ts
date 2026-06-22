import type { Country } from '../types'

interface RegionMetrics {
  labels: string[]
  populations: number[]
  areas: number[]
  largestPopulationRegion: string
}

export const buildRegionAnalytics = (countries: Country[]): RegionMetrics => {
  const aggregated = countries.reduce<Record<string, { population: number; area: number }>>(
    (acc, country) => {
      const region = country.region || 'Unknown'
      if (!acc[region]) {
        acc[region] = { population: 0, area: 0 }
      }
      acc[region].population += country.population
      acc[region].area += country.area
      return acc
    },
    {}
  )

  const labels = Object.keys(aggregated)
  const populations = labels.map((region) => aggregated[region].population)
  const areas = labels.map((region) => aggregated[region].area)

  let largestPopulationRegion = 'N/A'
  let maxPopulation = -1

  Object.entries(aggregated).forEach(([region, metrics]) => {
    if (metrics.population > maxPopulation) {
      maxPopulation = metrics.population
      largestPopulationRegion = region
    }
  }) // <-- Fixed: Added the missing closing curly brace here

  return {
    labels,
    populations,
    areas,
    largestPopulationRegion,
  }
}