import { z } from 'zod'
import { ContentDate, ContributionAreaSchema, NumberAsString, SecondaryContributionAreaSchema } from './utils.js'

export const ConferenceStaffingSchema = z.object({
  primaryContributionArea: ContributionAreaSchema,
  secondaryContributionArea: SecondaryContributionAreaSchema,
  date: ContentDate,
  title: z.string(),
  url: z.string().url().optional(),
  description: z.string().optional(),
  numberOfConferences: NumberAsString,
  numberOfVisitors: NumberAsString.optional()
})

export type ConferenceStaffing = z.infer<typeof ConferenceStaffingSchema>

export const ConferenceStaffingFieldMapping: Record<keyof ConferenceStaffing, string> = {
  primaryContributionArea: 'select_contributionAreasDDL',
  secondaryContributionArea: 'select_contributionAreasDDL2',
  date: 'DateOfActivity',
  title: 'TitleOfActivity',
  url: 'ReferenceUrl',
  description: 'Description',
  numberOfConferences: 'AnnualQuantity',
  numberOfVisitors: 'AnnualReach'
} as const
