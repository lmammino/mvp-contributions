import { z } from 'zod'
import { ContentDate, ContributionAreaSchema, SecondaryContributionAreaSchema } from './utils.js'

export const ArticleSchema = z.object({
  primaryContributionArea: ContributionAreaSchema,
  secondaryContributionArea: SecondaryContributionAreaSchema,
  date: ContentDate,
  title: z.string(),
  url: z.string().url().optional(),
  description: z.string().optional(),
  numberOfArticles: z.number(),
  numberOfViews: z.number().optional()
})

export type Article = z.infer<typeof ArticleSchema>

export const ArticleFieldMapping: Record<keyof Article, string> = {
  primaryContributionArea: 'select_contributionAreasDDL',
  secondaryContributionArea: 'select_contributionAreasDDL2',
  date: 'DateOfActivity',
  title: 'TitleOfActivity',
  url: 'ReferenceUrl',
  description: 'Description',
  numberOfArticles: 'AnnualQuantity',
  numberOfViews: 'AnnualReach'
} as const
