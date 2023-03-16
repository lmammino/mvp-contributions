import { z } from 'zod'
import { ContentDate, ContributionAreaSchema, NumberAsString, SecondaryContributionAreaSchema } from './utils.js'

export const WorkshopVolunteerProcotorSchema = z.object({
  primaryContributionArea: ContributionAreaSchema,
  secondaryContributionArea: SecondaryContributionAreaSchema,
  date: ContentDate,
  title: z.string(),
  url: z.string().url().optional(),
  description: z.string().optional(),
  numberOfEvents: NumberAsString
})

export type WorkshopVolunteerProcotor = z.infer<typeof WorkshopVolunteerProcotorSchema>

export const WorkshopVolunteerProcotorFieldMapping: Record<keyof WorkshopVolunteerProcotor, string> = {
  primaryContributionArea: 'select_contributionAreasDDL',
  secondaryContributionArea: 'select_contributionAreasDDL2',
  date: 'DateOfActivity',
  title: 'TitleOfActivity',
  url: 'ReferenceUrl',
  description: 'Description',
  numberOfEvents: 'AnnualQuantity'
} as const
