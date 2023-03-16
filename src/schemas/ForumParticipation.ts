import { z } from 'zod'
import { ContentDate, ContributionAreaSchema, NumberAsString, SecondaryContributionAreaSchema } from './utils.js'

export const ForumParticipationSchema = z.object({
  primaryContributionArea: ContributionAreaSchema,
  secondaryContributionArea: SecondaryContributionAreaSchema,
  date: ContentDate,
  title: z.string(),
  url: z.string().url().optional(),
  description: z.string().optional(),
  numberOfAnswers: NumberAsString,
  numberOfPosts: NumberAsString.optional(),
  numberOfViewsOnAnswers: NumberAsString.optional()
})

export type ForumParticipation = z.infer<typeof ForumParticipationSchema>

export const ForumParticipationFieldMapping: Record<keyof ForumParticipation, string> = {
  primaryContributionArea: 'select_contributionAreasDDL',
  secondaryContributionArea: 'select_contributionAreasDDL2',
  date: 'DateOfActivity',
  title: 'TitleOfActivity',
  url: 'ReferenceUrl',
  description: 'Description',
  numberOfAnswers: 'AnnualQuantity',
  numberOfPosts: 'SecondAnnualQuantity',
  numberOfViewsOnAnswers: 'AnnualReach'
} as const
