import { z } from 'zod'
import { ContentDate, ContributionAreaSchema, NumberAsString, SecondaryContributionAreaSchema } from './utils.js'

export const ProductGroupFeedbackSchema = z.object({
  primaryContributionArea: ContributionAreaSchema,
  secondaryContributionArea: SecondaryContributionAreaSchema,
  date: ContentDate,
  title: z.string(),
  url: z.string().url().optional(),
  description: z.string().optional(),
  numberOfEvents: NumberAsString,
  numberOfFeedbacksProvided: NumberAsString.optional()
})

export type ProductGroupFeedback = z.infer<typeof ProductGroupFeedbackSchema>

export const ProductGroupFeedbackFieldMapping: Record<keyof ProductGroupFeedback, string> = {
  primaryContributionArea: 'select_contributionAreasDDL',
  secondaryContributionArea: 'select_contributionAreasDDL2',
  date: 'DateOfActivity',
  title: 'TitleOfActivity',
  url: 'ReferenceUrl',
  description: 'Description',
  numberOfEvents: 'AnnualQuantity',
  numberOfFeedbacksProvided: 'SecondAnnualQuantity'
} as const
