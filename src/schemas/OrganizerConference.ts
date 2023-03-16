import { z } from 'zod'
import { ContentDate, ContributionAreaSchema, NumberAsString, SecondaryContributionAreaSchema } from './utils.js'

export const OrganizerConferenceSchema = z.object({
  primaryContributionArea: ContributionAreaSchema,
  secondaryContributionArea: SecondaryContributionAreaSchema,
  date: ContentDate,
  title: z.string(),
  url: z.string().url().optional(),
  description: z.string().optional(),
  numberOfConferences: NumberAsString,
  numberOfAttendees: NumberAsString.optional()
})

export type OrganizerConference = z.infer<typeof OrganizerConferenceSchema>

export const OrganizerConferenceFieldMapping: Record<keyof OrganizerConference, string> = {
  primaryContributionArea: 'select_contributionAreasDDL',
  secondaryContributionArea: 'select_contributionAreasDDL2',
  date: 'DateOfActivity',
  title: 'TitleOfActivity',
  url: 'ReferenceUrl',
  description: 'Description',
  numberOfConferences: 'AnnualQuantity',
  numberOfAttendees: 'AnnualReach'
} as const
