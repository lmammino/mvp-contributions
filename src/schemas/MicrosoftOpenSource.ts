import { z } from 'zod'
import { ContentDate, ContributionAreaSchema, NumberAsString, SecondaryContributionAreaSchema } from './utils.js'

export const MicrosoftOpenSourceSchema = z.object({
  primaryContributionArea: ContributionAreaSchema,
  secondaryContributionArea: SecondaryContributionAreaSchema,
  date: ContentDate,
  title: z.string(),
  url: z.string().url().optional(),
  description: z.string().optional(),
  numberOfProjects: NumberAsString
})

export type MicrosoftOpenSource = z.infer<typeof MicrosoftOpenSourceSchema>

export const MicrosoftOpenSourceFieldMapping: Record<keyof MicrosoftOpenSource, string> = {
  primaryContributionArea: 'select_contributionAreasDDL',
  secondaryContributionArea: 'select_contributionAreasDDL2',
  date: 'DateOfActivity',
  title: 'TitleOfActivity',
  url: 'ReferenceUrl',
  description: 'Description',
  numberOfProjects: 'AnnualQuantity'
} as const
