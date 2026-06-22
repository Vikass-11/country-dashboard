export interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'user'
  token: string
}

export interface Country {
  id?: string
  name: string
  capital: string
  population: number
  area: number
  region: string
  countryCode: string
}