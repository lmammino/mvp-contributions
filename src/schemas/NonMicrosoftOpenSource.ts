import { z } from 'zod'
import { ContentDate, ContributionAreaSchema, NumberAsString, SecondaryContributionAreaSchema } from './utils.js'

export const NonMicrosoftOpenSourceSchema = z.object({
  primaryContributionArea: ContributionAreaSchema,
  secondaryContributionArea: SecondaryContributionAreaSchema,
  date: ContentDate,
  title: z.string(),
  url: z.string().url().optional(),
  description: z.string().optional(),
  numberOfProjects: NumberAsString,
  numberOfContributions: NumberAsString.optional()
})

export type NonMicrosoftOpenSource = z.infer<typeof NonMicrosoftOpenSourceSchema>

export const NonMicrosoftOpenSourceFieldMapping: Record<keyof NonMicrosoftOpenSource, string> = {
  primaryContributionArea: 'select_contributionAreasDDL',
  secondaryContributionArea: 'select_contributionAreasDDL2',
  date: 'DateOfActivity',
  title: 'TitleOfActivity',
  url: 'ReferenceUrl',
  description: 'Description',
  numberOfProjects: 'AnnualQuantity',
  numberOfContributions: 'SecondAnnualQuantity'
} as const
