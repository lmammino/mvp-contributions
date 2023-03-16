import { z } from 'zod'
import { ContentDate, ContributionAreaSchema, NumberAsString, SecondaryContributionAreaSchema } from './utils.js'

export const SpeakingUserGroupSchema = z.object({
  primaryContributionArea: ContributionAreaSchema,
  secondaryContributionArea: SecondaryContributionAreaSchema,
  date: ContentDate,
  title: z.string(),
  url: z.string().url().optional(),
  description: z.string().optional(),
  numberOfTalks: NumberAsString,
  numberOfAttendees: NumberAsString.optional()
})

export type SpeakingUserGroup = z.infer<typeof SpeakingUserGroupSchema>

export const SpeakingUserGroupFieldMapping: Record<keyof SpeakingUserGroup, string> = {
  primaryContributionArea: 'select_contributionAreasDDL',
  secondaryContributionArea: 'select_contributionAreasDDL2',
  date: 'DateOfActivity',
  title: 'TitleOfActivity',
  url: 'ReferenceUrl',
  description: 'Description',
  numberOfTalks: 'AnnualQuantity',
  numberOfAttendees: 'AnnualReach'
} as const
