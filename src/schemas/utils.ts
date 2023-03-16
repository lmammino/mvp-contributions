import { z } from 'zod'
import { ContributionAreas, type ContributionAreaId } from '../ContributionAreas.js'

export const ContributionAreaSchema = z.string().refine((value) => {
  return Object.keys(ContributionAreas).includes(value)
}).transform((value) => {
  return ContributionAreas[value as ContributionAreaId]
})

export const SecondaryContributionAreaSchema = z.array(ContributionAreaSchema).max(2).optional()

export const ContentDate = z.coerce.date().transform((value) => {
  const d = value

  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
})

export const NumberAsString = z.number().transform(String)
