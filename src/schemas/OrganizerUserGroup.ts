import { z } from 'zod'
import { ContentDate, ContributionAreaSchema, NumberAsString, SecondaryContributionAreaSchema } from './utils.js'

export const OrganizerUserGroupSchema = z.object({
  primaryContributionArea: ContributionAreaSchema,
  secondaryContributionArea: SecondaryContributionAreaSchema,
  date: ContentDate,
  title: z.string(),
  url: z.string().url().optional(),
  description: z.string().optional(),
  numberOfMeetings: NumberAsString,
  numberOfMembers: NumberAsString.optional()
})

export type OrganizerUserGroup = z.infer<typeof OrganizerUserGroupSchema>

export const OrganizerUserGroupFieldMapping: Record<keyof OrganizerUserGroup, string> = {
  primaryContributionArea: 'select_contributionAreasDDL',
  secondaryContributionArea: 'select_contributionAreasDDL2',
  date: 'DateOfActivity',
  title: 'TitleOfActivity',
  url: 'ReferenceUrl',
  description: 'Description',
  numberOfMeetings: 'AnnualQuantity',
  numberOfMembers: 'AnnualReach'
} as const
