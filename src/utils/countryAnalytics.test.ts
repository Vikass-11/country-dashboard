import { describe, expect, it } from 'vitest'
import { buildRegionAnalytics } from './countryAnalytics'

describe('buildRegionAnalytics', () => {
  it('groups countries by region and sorts by population', () => {
    const analytics = buildRegionAnalytics([
      {
        name: 'A',
        capital: 'A City',
        population: 50,
        area: 20,
        region: 'Europe',
        countryCode: 'AA',
      },
      {
        name: 'B',
        capital: 'B City',
        population: 100,
        area: 45,
        region: 'Asia',
        countryCode: 'BB',
      },
      {
        name: 'C',
        capital: 'C City',
        population: 60,
        area: 15,
        region: 'Europe',
        countryCode: 'CC',
      },
    ])

    expect(analytics.labels).toEqual(['Europe', 'Asia'])
    expect(analytics.populations).toEqual([110, 100])
    expect(analytics.areas).toEqual([35, 45])
    expect(analytics.largestPopulationRegion).toBe('Europe')
  })
})
