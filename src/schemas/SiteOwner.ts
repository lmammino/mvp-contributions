import { z } from 'zod'
import { ContentDate, ContributionAreaSchema, NumberAsString, SecondaryContributionAreaSchema } from './utils.js'

export const SiteOwnerSchema = z.object({
  primaryContributionArea: ContributionAreaSchema,
  secondaryContributionArea: SecondaryContributionAreaSchema,
  date: ContentDate,
  title: z.string(),
  url: z.string().url().optional(),
  description: z.string().optional(),
  numberOfSites: NumberAsString,
  numberOfVisitors: NumberAsString.optional()
})

export type SiteOwner = z.infer<typeof SiteOwnerSchema>

export const SiteOwnerFieldMapping: Record<keyof SiteOwner, string> = {
  primaryContributionArea: 'select_contributionAreasDDL',
  secondaryContributionArea: 'select_contributionAreasDDL2',
  date: 'DateOfActivity',
  title: 'TitleOfActivity',
  url: 'ReferenceUrl',
  description: 'Description',
  numberOfSites: 'AnnualQuantity',
  numberOfVisitors: 'AnnualReach'
} as const
