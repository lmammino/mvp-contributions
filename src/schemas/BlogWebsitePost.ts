import { z } from 'zod'
import { ContentDate, ContributionAreaSchema, SecondaryContributionAreaSchema } from './utils.js'

export const BlogWebsitePostSchema = z.object({
  primaryContributionArea: ContributionAreaSchema,
  secondaryContributionArea: SecondaryContributionAreaSchema,
  date: ContentDate,
  title: z.string(),
  url: z.string().url(),
  description: z.string().optional(),
  numberOfPosts: z.number(),
  numberOfSubscribers: z.number().optional(),
  annualUniqueVisitors: z.number().optional()
})

export type BlogWebsitePost = z.infer<typeof BlogWebsitePostSchema>

export const BlogWebsitePostFieldMapping: Record<keyof BlogWebsitePost, string> = {
  primaryContributionArea: 'select_contributionAreasDDL',
  secondaryContributionArea: 'select_contributionAreasDDL2',
  date: 'DateOfActivity',
  title: 'TitleOfActivity',
  url: 'ReferenceUrl',
  description: 'Description',
  numberOfPosts: 'AnnualQuantity',
  numberOfSubscribers: 'SecondAnnualQuantity',
  annualUniqueVisitors: 'AnnualReach'
} as const
