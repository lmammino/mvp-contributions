import { z } from 'zod'
import { ContentDate, ContributionAreaSchema, NumberAsString, SecondaryContributionAreaSchema } from './utils.js'

export const TechnicalSocialMediaSchema = z.object({
  primaryContributionArea: ContributionAreaSchema,
  secondaryContributionArea: SecondaryContributionAreaSchema,
  date: ContentDate,
  title: z.string(),
  url: z.string().url().optional(),
  description: z.string().optional(),
  numberOfTalks: NumberAsString,
  numberOfFollowers: NumberAsString.optional()
})

export type TechnicalSocialMedia = z.infer<typeof TechnicalSocialMediaSchema>

export const TechnicalSocialMediaFieldMapping: Record<keyof TechnicalSocialMedia, string> = {
  primaryContributionArea: 'select_contributionAreasDDL',
  secondaryContributionArea: 'select_contributionAreasDDL2',
  date: 'DateOfActivity',
  title: 'TitleOfActivity',
  url: 'ReferenceUrl',
  description: 'Description',
  numberOfTalks: 'AnnualQuantity',
  numberOfFollowers: 'AnnualReach'
} as const
