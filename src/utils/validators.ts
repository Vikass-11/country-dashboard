import { z } from 'zod'

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const countrySchema = z.object({
  name: z.string().min(2, 'Country name is required'),
  capital: z.string().min(2, 'Capital is required'),
  population: z.coerce.number().positive('Population must be a positive number'),
  area: z.coerce.number().positive('Area must be a positive number'),
  region: z.string().min(2, 'Region is required'),
  countryCode: z
    .string()
    .length(2, 'Country code must be 2 characters')
    .transform((value) => value.toUpperCase()),
})

export type CountryFormInputData = z.input<typeof countrySchema>
export type CountryFormData = z.infer<typeof countrySchema>
