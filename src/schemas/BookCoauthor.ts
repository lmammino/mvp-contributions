import { z } from 'zod'
import { ContentDate, ContributionAreaSchema, NumberAsString, SecondaryContributionAreaSchema } from './utils.js'

export const BookCoauthorSchema = z.object({
  primaryContributionArea: ContributionAreaSchema,
  secondaryContributionArea: SecondaryContributionAreaSchema,
  date: ContentDate,
  title: z.string(),
  url: z.string().url().optional(),
  description: z.string().optional(),
  numberOfBooks: NumberAsString,
  copiesSold: NumberAsString.optional()
})

export type BookCoauthor = z.infer<typeof BookCoauthorSchema>

export const BookCoauthorFieldMapping: Record<keyof BookCoauthor, string> = {
  primaryContributionArea: 'select_contributionAreasDDL',
  secondaryContributionArea: 'select_contributionAreasDDL2',
  date: 'DateOfActivity',
  title: 'TitleOfActivity',
  url: 'ReferenceUrl',
  description: 'Description',
  numberOfBooks: 'AnnualQuantity',
  copiesSold: 'AnnualReach'
} as const
