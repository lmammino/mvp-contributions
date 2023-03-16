import { z } from 'zod'
import { ContentDate, ContributionAreaSchema, NumberAsString, SecondaryContributionAreaSchema } from './utils.js'

export const DocsMicrosoftComContributionSchema = z.object({
  primaryContributionArea: ContributionAreaSchema,
  secondaryContributionArea: SecondaryContributionAreaSchema,
  date: ContentDate,
  title: z.string(),
  url: z.string().url().optional(),
  description: z.string().optional(),
  numberOfSubmissions: NumberAsString
})

export type DocsMicrosoftComContribution = z.infer<typeof DocsMicrosoftComContributionSchema>

export const DocsMicrosoftComContributionFieldMapping: Record<keyof DocsMicrosoftComContribution, string> = {
  primaryContributionArea: 'select_contributionAreasDDL',
  secondaryContributionArea: 'select_contributionAreasDDL2',
  date: 'DateOfActivity',
  title: 'TitleOfActivity',
  url: 'ReferenceUrl',
  description: 'Description',
  numberOfSubmissions: 'AnnualQuantity'
} as const
