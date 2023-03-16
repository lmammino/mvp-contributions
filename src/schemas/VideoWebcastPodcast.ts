import { z } from 'zod'
import { ContentDate, ContributionAreaSchema, NumberAsString, SecondaryContributionAreaSchema } from './utils.js'

export const VideoWebcastPodcastSchema = z.object({
  primaryContributionArea: ContributionAreaSchema,
  secondaryContributionArea: SecondaryContributionAreaSchema,
  date: ContentDate,
  title: z.string(),
  url: z.string().url().optional(),
  description: z.string().optional(),
  numberOfVideos: NumberAsString,
  numberOfViews: NumberAsString.optional()
})

export type VideoWebcastPodcast = z.infer<typeof VideoWebcastPodcastSchema>

export const VideoWebcastPodcastFieldMapping: Record<keyof VideoWebcastPodcast, string> = {
  primaryContributionArea: 'select_contributionAreasDDL',
  secondaryContributionArea: 'select_contributionAreasDDL2',
  date: 'DateOfActivity',
  title: 'TitleOfActivity',
  url: 'ReferenceUrl',
  description: 'Description',
  numberOfVideos: 'AnnualQuantity',
  numberOfViews: 'AnnualReach'
} as const
