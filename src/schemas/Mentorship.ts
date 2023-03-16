import { z } from 'zod'
import { ContentDate, ContributionAreaSchema, NumberAsString, SecondaryContributionAreaSchema } from './utils.js'

export const MentorshipSchema = z.object({
  primaryContributionArea: ContributionAreaSchema,
  secondaryContributionArea: SecondaryContributionAreaSchema,
  date: ContentDate,
  title: z.string(),
  url: z.string().url().optional(),
  description: z.string().optional(),
  numberOfMentorshipActivities: NumberAsString,
  numberOfMentee: NumberAsString.optional()
})

export type Mentorship = z.infer<typeof MentorshipSchema>

export const MentorshipFieldMapping: Record<keyof Mentorship, string> = {
  primaryContributionArea: 'select_contributionAreasDDL',
  secondaryContributionArea: 'select_contributionAreasDDL2',
  date: 'DateOfActivity',
  title: 'TitleOfActivity',
  url: 'ReferenceUrl',
  description: 'Description',
  numberOfMentorshipActivities: 'AnnualQuantity',
  numberOfMentee: 'AnnualReach'
} as const
