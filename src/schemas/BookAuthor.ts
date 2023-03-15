import { z } from 'zod'
import { ContentDate, ContributionAreaSchema, SecondaryContributionAreaSchema } from './utils.js'

export const BookAuthorSchema = z.object({
  primaryContributionArea: ContributionAreaSchema,
  secondaryContributionArea: SecondaryContributionAreaSchema,
  date: ContentDate,
  title: z.string(),
  url: z.string().url().optional(),
  description: z.string().optional(),
  numberOfBooks: z.number().optional(),
  copiesSold: z.number().optional()
})

export type BookAuthor = z.infer<typeof BookAuthorSchema>

export const BookAuthorFieldMapping: Record<keyof BookAuthor, string> = {
  primaryContributionArea: 'select_contributionAreasDDL',
  secondaryContributionArea: 'select_contributionAreasDDL2',
  date: 'DateOfActivity',
  title: 'TitleOfActivity',
  url: 'ReferenceUrl',
  description: 'Description',
  numberOfBooks: 'AnnualQuantity',
  copiesSold: 'AnnualReach'
} as const
