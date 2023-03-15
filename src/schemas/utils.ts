import { z } from 'zod'
import { ContributionAreaIDs, type ContributionAreaId } from '../ContributionAreas.js'

export const ContributionAreaSchema = z.string().refine((value) => {
  return Object.keys(ContributionAreaIDs).includes(value)
}).transform((value) => {
  return ContributionAreaIDs[value as ContributionAreaId]
})

export const SecondaryContributionAreaSchema = z.array(ContributionAreaSchema).max(2).optional()

export const ContentDate = z.coerce.date().transform((value) => {
  const d = value

  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
})
