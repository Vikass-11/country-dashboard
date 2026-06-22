import { describe, it, expect } from 'vitest'
import { buildRegionAnalytics } from './countryAnalytics'
import type { Country } from '../types'

describe('buildRegionAnalytics', () => {
  it('correctly aggregates populations and areas across matching regions', () => {
    const sampleCountries: Country[] = [
      { name: 'Country A', capital: 'Cap A', population: 100, area: 10, region: 'Asia', countryCode: 'AA' },
      { name: 'Country B', capital: 'Cap B', population: 200, area: 20, region: 'Asia', countryCode: 'BB' },
      { name: 'Country C', capital: 'Cap C', population: 50, area: 5, region: 'Europe', countryCode: 'CC' },
    ]

    const result = buildRegionAnalytics(sampleCountries)

    expect(result.labels).toContain('Asia')
    expect(result.labels).toContain('Europe')
    
    // Asia checks
    const asiaIndex = result.labels.indexOf('Asia')
    expect(result.populations[asiaIndex]).toBe(300)
    expect(result.areas[asiaIndex]).toBe(30)

    // Largest region check
    expect(result.largestPopulationRegion).toBe('Asia')
  })
})