// User & Auth Types
export interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'user'
  token?: string
}

export interface LoginCredentials {
  username: string
  password: string
}

// Country Data Types
export interface Country {
  id?: string
  name: string
  capital: string
  population: number
  area: number
  region: string
  countryCode: string
}

export interface CountryStats {
  total: number
  byRegion: Record<string, number>
  topByPopulation: Country[]
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
}

// Form Types
export interface CountryFormData {
  name: string
  capital: string
  population: number
  area: number
  region: string
  countryCode: string
}