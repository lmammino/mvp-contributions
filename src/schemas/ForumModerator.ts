import { z } from 'zod'
import { ContentDate, ContributionAreaSchema, NumberAsString, SecondaryContributionAreaSchema } from './utils.js'

export const ForumModeratorSchema = z.object({
  primaryContributionArea: ContributionAreaSchema,
  secondaryContributionArea: SecondaryContributionAreaSchema,
  date: ContentDate,
  title: z.string(),
  url: z.string().url().optional(),
  description: z.string().optional(),
  numberOfThreads: NumberAsString
})

export type ForumModerator = z.infer<typeof ForumModeratorSchema>

export const ForumModeratorFieldMapping: Record<keyof ForumModerator, string> = {
  primaryContributionArea: 'select_contributionAreasDDL',
  secondaryContributionArea: 'select_contributionAreasDDL2',
  date: 'DateOfActivity',
  title: 'TitleOfActivity',
  url: 'ReferenceUrl',
  description: 'Description',
  numberOfThreads: 'AnnualQuantity'
} as const
