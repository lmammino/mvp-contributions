import { z } from 'zod'
import { ContentDate, ContributionAreaSchema, NumberAsString, SecondaryContributionAreaSchema } from './utils.js'

export const WorkshopVolunteerProctorSchema = z.object({
  primaryContributionArea: ContributionAreaSchema,
  secondaryContributionArea: SecondaryContributionAreaSchema,
  date: ContentDate,
  title: z.string(),
  url: z.string().url().optional(),
  description: z.string().optional(),
  numberOfEvents: NumberAsString
})

export type WorkshopVolunteerProctor = z.infer<typeof WorkshopVolunteerProctorSchema>

export const WorkshopVolunteerProctorFieldMapping: Record<keyof WorkshopVolunteerProctor, string> = {
  primaryContributionArea: 'select_contributionAreasDDL',
  secondaryContributionArea: 'select_contributionAreasDDL2',
  date: 'DateOfActivity',
  title: 'TitleOfActivity',
  url: 'ReferenceUrl',
  description: 'Description',
  numberOfEvents: 'AnnualQuantity'
} as const
