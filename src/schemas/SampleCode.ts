import { z } from 'zod'
import { ContentDate, ContributionAreaSchema, NumberAsString, SecondaryContributionAreaSchema } from './utils.js'

export const SampleCodeSchema = z.object({
  primaryContributionArea: ContributionAreaSchema,
  secondaryContributionArea: SecondaryContributionAreaSchema,
  date: ContentDate,
  title: z.string(),
  url: z.string().url().optional(),
  description: z.string().optional(),
  numberOfSamples: NumberAsString,
  numberOfDownloads: NumberAsString.optional()
})

export type SampleCode = z.infer<typeof SampleCodeSchema>

export const SampleCodeFieldMapping: Record<keyof SampleCode, string> = {
  primaryContributionArea: 'select_contributionAreasDDL',
  secondaryContributionArea: 'select_contributionAreasDDL2',
  date: 'DateOfActivity',
  title: 'TitleOfActivity',
  url: 'ReferenceUrl',
  description: 'Description',
  numberOfSamples: 'AnnualQuantity',
  numberOfDownloads: 'AnnualReach'
} as const
