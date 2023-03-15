import { type Article, ArticleFieldMapping, ArticleSchema } from './schemas/Article.js'
import { type BlogWebsitePost, BlogWebsitePostFieldMapping, BlogWebsitePostSchema } from './schemas/BlogWebsitePost.js'
import { type BookAuthor, BookAuthorFieldMapping, BookAuthorSchema } from './schemas/BookAuthor.js'
import { type BookCoauthor, BookCoauthorFieldMapping, BookCoauthorSchema } from './schemas/BookCoauthor.js'

export type ContentType = Article | BlogWebsitePost | BookAuthor | BookCoauthor

export const ContentSchema = {
  Article: ArticleSchema,
  BlogWebsitePost: BlogWebsitePostSchema,
  BookAuthor: BookAuthorSchema,
  BookCoauthor: BookCoauthorSchema
} as const

export const ContentFieldMapping: Record<keyof typeof ContentSchema, Record<string, string>> = {
  Article: ArticleFieldMapping,
  BlogWebsitePost: BlogWebsitePostFieldMapping,
  BookAuthor: BookAuthorFieldMapping,
  BookCoauthor: BookCoauthorFieldMapping
} as const

export const ContentTypeIDs: Record<keyof typeof ContentSchema, string> = {
  Article: 'e36464de-179a-e411-bbc8-6c3be5a82b68',
  BlogWebsitePost: 'df6464de-179a-e411-bbc8-6c3be5a82b68',
  BookAuthor: 'db6464de-179a-e411-bbc8-6c3be5a82b68',
  BookCoauthor: 'dd6464de-179a-e411-bbc8-6c3be5a82b68'
  // ,'Conference (Staffing)': 'f16464de-179a-e411-bbc8-6c3be5a82b68',
  // 'Docs.Microsoft.com Contribution': '0ce0dc15-0304-e911-8171-3863bb2bca60',
  // 'Forum Moderator': 'f96464de-179a-e411-bbc8-6c3be5a82b68',
  // 'Forum Participation (3rd Party forums)': 'd96464de-179a-e411-bbc8-6c3be5a82b68',
  // 'Forum Participation (Microsoft Forums)': 'd76464de-179a-e411-bbc8-6c3be5a82b68',
  // Mentorship: 'f76464de-179a-e411-bbc8-6c3be5a82b68',
  // 'Microsoft Open Source Projects': 'd2d96407-0304-e911-8171-3863bb2bca60',
  // 'Non-Microsoft Open Source Projects': '414bcf30-e889-e511-8110-c4346bac0abc',
  // 'Organizer (User Group/Meetup/Local Events)': 'fd6464de-179a-e411-bbc8-6c3be5a82b68',
  // 'Organizer of Conference': 'ef6464de-179a-e411-bbc8-6c3be5a82b68',
  // Other: 'ff6464de-179a-e411-bbc8-6c3be5a82b68',
  // 'Product Group Feedback': '016564de-179a-e411-bbc8-6c3be5a82b68',
  // 'Sample Code/Projects/Tools': 'e96464de-179a-e411-bbc8-6c3be5a82b68',
  // 'Site Owner': 'fb6464de-179a-e411-bbc8-6c3be5a82b68',
  // 'Speaking (Conference)': 'd16464de-179a-e411-bbc8-6c3be5a82b68',
  // 'Speaking (User Group/Meetup/Local events)': 'd56464de-179a-e411-bbc8-6c3be5a82b68',
  // 'Technical Social Media (Twitter, Facebook, LinkedIn...)': 'eb6464de-179a-e411-bbc8-6c3be5a82b68',
  // 'Translation Review, Feedback and Editing': '056564de-179a-e411-bbc8-6c3be5a82b68',
  // 'Video/Webcast/Podcast': 'e56464de-179a-e411-bbc8-6c3be5a82b68',
  // 'Workshop/Volunteer/Proctor': '0ee0dc15-0304-e911-8171-3863bb2bca60'
} as const
