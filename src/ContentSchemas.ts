import { z } from 'zod'
import { ArticleFieldMapping, ArticleSchema } from './schemas/Article.js'
import { BlogWebsitePostFieldMapping, BlogWebsitePostSchema } from './schemas/BlogWebsitePost.js'
import { BookAuthorFieldMapping, BookAuthorSchema } from './schemas/BookAuthor.js'
import { BookCoauthorFieldMapping, BookCoauthorSchema } from './schemas/BookCoauthor.js'
import { ConferenceStaffingFieldMapping, ConferenceStaffingSchema } from './schemas/ConferenceStaffing.js'
import { DocsMicrosoftComContributionFieldMapping, DocsMicrosoftComContributionSchema } from './schemas/DocsMicrosoftComContribution copy.js'
import { ForumModeratorFieldMapping, ForumModeratorSchema } from './schemas/ForumModerator.js'
import { ForumParticipationFieldMapping, ForumParticipationSchema } from './schemas/ForumParticipation.js'
import { ForumParticipationMicrosoftFieldMapping, ForumParticipationMicrosoftSchema } from './schemas/ForumParticipationMicrosoft.js'
import { MentorshipFieldMapping, MentorshipSchema } from './schemas/Mentorship.js'
import { MicrosoftOpenSourceFieldMapping, MicrosoftOpenSourceSchema } from './schemas/MicrosoftOpenSource.js'
import { NonMicrosoftOpenSourceFieldMapping, NonMicrosoftOpenSourceSchema } from './schemas/NonMicrosoftOpenSource.js'
import { OrganizerConferenceFieldMapping, OrganizerConferenceSchema } from './schemas/OrganizerConference.js'
import { OrganizerUserGroupFieldMapping, OrganizerUserGroupSchema } from './schemas/OrganizerUserGroup.js'
import { OtherFieldMapping, OtherSchema } from './schemas/Other.js'
import { ProductGroupFeedbackFieldMapping, ProductGroupFeedbackSchema } from './schemas/ProductGroupFeedback.js'
import { SampleCodeFieldMapping, SampleCodeSchema } from './schemas/SampleCode.js'
import { SiteOwnerFieldMapping, SiteOwnerSchema } from './schemas/SiteOwner.js'
import { SpeakingConferenceFieldMapping, SpeakingConferenceSchema } from './schemas/SpeakingConference.js'
import { SpeakingUserGroupFieldMapping, SpeakingUserGroupSchema } from './schemas/SpeakingUserGroup.js'
import { TechnicalSocialMediaFieldMapping, TechnicalSocialMediaSchema } from './schemas/TechnicalSocialMedia.js'
import { TranslationReviewFieldMapping, TranslationReviewSchema } from './schemas/TranslationReview.js'
import { VideoWebcastPodcastFieldMapping, VideoWebcastPodcastSchema } from './schemas/VideoWebcastPodcast.js'
import { WorkshopVolunteerProctorFieldMapping, WorkshopVolunteerProctorSchema } from './schemas/WorkshopVolunteerProctor.js'

export const ContentSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('Article'), props: ArticleSchema }),
  z.object({ type: z.literal('BlogWebsitePost'), props: BlogWebsitePostSchema }),
  z.object({ type: z.literal('BookAuthor'), props: BookAuthorSchema }),
  z.object({ type: z.literal('BookCoauthor'), props: BookCoauthorSchema }),
  z.object({ type: z.literal('ConferenceStaffing'), props: ConferenceStaffingSchema }),
  z.object({ type: z.literal('DocsMicrosoftComContribution'), props: DocsMicrosoftComContributionSchema }),
  z.object({ type: z.literal('ForumModerator'), props: ForumModeratorSchema }),
  z.object({ type: z.literal('ForumParticipation'), props: ForumParticipationSchema }),
  z.object({ type: z.literal('ForumParticipationMicrosoft'), props: ForumParticipationMicrosoftSchema }),
  z.object({ type: z.literal('Mentorship'), props: MentorshipSchema }),
  z.object({ type: z.literal('MicrosoftOpenSource'), props: MicrosoftOpenSourceSchema }),
  z.object({ type: z.literal('NonMicrosoftOpenSource'), props: NonMicrosoftOpenSourceSchema }),
  z.object({ type: z.literal('OrganizerConference'), props: OrganizerConferenceSchema }),
  z.object({ type: z.literal('OrganizerUserGroup'), props: OrganizerUserGroupSchema }),
  z.object({ type: z.literal('Other'), props: OtherSchema }),
  z.object({ type: z.literal('ProductGroupFeedback'), props: ProductGroupFeedbackSchema }),
  z.object({ type: z.literal('SampleCode'), props: SampleCodeSchema }),
  z.object({ type: z.literal('SiteOwner'), props: SiteOwnerSchema }),
  z.object({ type: z.literal('SpeakingConference'), props: SpeakingConferenceSchema }),
  z.object({ type: z.literal('SpeakingUserGroup'), props: SpeakingUserGroupSchema }),
  z.object({ type: z.literal('TechnicalSocialMedia'), props: TechnicalSocialMediaSchema }),
  z.object({ type: z.literal('TranslationReview'), props: TranslationReviewSchema }),
  z.object({ type: z.literal('VideoWebcastPodcast'), props: VideoWebcastPodcastSchema }),
  z.object({ type: z.literal('WorkshopVolunteerProctor'), props: WorkshopVolunteerProctorSchema })
])

interface WithTitle {
  TitleOfActivity: string
}

type MappedProps<T> = WithTitle & Record<keyof T, string>

export type MappedContentSchema =
  { type: 'Article', props: MappedProps<typeof ArticleFieldMapping> } |
  { type: 'BlogWebsitePost', props: MappedProps<typeof BlogWebsitePostSchema> } |
  { type: 'BookAuthor', props: MappedProps<typeof BookAuthorSchema> } |
  { type: 'BookCoauthor', props: MappedProps<typeof BookCoauthorSchema> } |
  { type: 'ConferenceStaffing', props: MappedProps<typeof ConferenceStaffingSchema> } |
  { type: 'DocsMicrosoftComContribution', props: MappedProps<typeof DocsMicrosoftComContributionSchema> } |
  { type: 'ForumModerator', props: MappedProps<typeof ForumModeratorSchema> } |
  { type: 'ForumParticipation', props: MappedProps<typeof ForumParticipationSchema> } |
  { type: 'ForumParticipationMicrosoft', props: MappedProps<typeof ForumParticipationMicrosoftSchema> } |
  { type: 'Mentorship', props: MappedProps<typeof MentorshipSchema> } |
  { type: 'MicrosoftOpenSource', props: MappedProps<typeof MicrosoftOpenSourceSchema> } |
  { type: 'NonMicrosoftOpenSource', props: MappedProps<typeof NonMicrosoftOpenSourceSchema> } |
  { type: 'OrganizerConference', props: MappedProps<typeof OrganizerConferenceSchema> } |
  { type: 'OrganizerUserGroup', props: MappedProps<typeof OrganizerUserGroupSchema> } |
  { type: 'Other', props: MappedProps<typeof OtherSchema> } |
  { type: 'ProductGroupFeedback', props: MappedProps<typeof ProductGroupFeedbackSchema> } |
  { type: 'SampleCode', props: MappedProps<typeof SampleCodeSchema> } |
  { type: 'SiteOwner', props: MappedProps<typeof SiteOwnerSchema> } |
  { type: 'SpeakingConference', props: MappedProps<typeof SpeakingConferenceSchema> } |
  { type: 'SpeakingUserGroup', props: MappedProps<typeof SpeakingUserGroupSchema> } |
  { type: 'TechnicalSocialMedia', props: MappedProps<typeof TechnicalSocialMediaSchema> } |
  { type: 'TranslationReview', props: MappedProps<typeof TranslationReviewSchema> } |
  { type: 'VideoWebcastPodcast', props: MappedProps<typeof VideoWebcastPodcastSchema> } |
  { type: 'WorkshopVolunteerProctor', props: MappedProps<typeof WorkshopVolunteerProctorSchema> }

export type Content = z.infer<typeof ContentSchema>

export const ContentSchemaList = z.array(ContentSchema)

export const ContentSchemaByType = {
  Article: ArticleSchema,
  BlogWebsitePost: BlogWebsitePostSchema,
  BookAuthor: BookAuthorSchema,
  BookCoauthor: BookCoauthorSchema,
  ConferenceStaffing: ConferenceStaffingSchema,
  DocsMicrosoftComContribution: DocsMicrosoftComContributionSchema,
  ForumModerator: ForumModeratorSchema,
  ForumParticipation: ForumParticipationSchema,
  ForumParticipationMicrosoft: ForumParticipationMicrosoftSchema,
  Mentorship: MentorshipSchema,
  MicrosoftOpenSource: MicrosoftOpenSourceSchema,
  NonMicrosoftOpenSource: NonMicrosoftOpenSourceSchema,
  OrganizerConference: OrganizerConferenceSchema,
  OrganizerUserGroup: OrganizerUserGroupSchema,
  Other: OtherSchema,
  ProductGroupFeedback: ProductGroupFeedbackSchema,
  SampleCode: SampleCodeSchema,
  SiteOwner: SiteOwnerSchema,
  SpeakingConference: SpeakingConferenceSchema,
  SpeakingUserGroup: SpeakingUserGroupSchema,
  TechnicalSocialMedia: TechnicalSocialMediaSchema,
  TranslationReview: TranslationReviewSchema,
  VideoWebcastPodcast: VideoWebcastPodcastSchema,
  WorkshopVolunteerProctor: WorkshopVolunteerProctorSchema
} as const

export const ContentFieldMapping: Record<keyof typeof ContentSchemaByType, Record<string, string>> = {
  Article: ArticleFieldMapping,
  BlogWebsitePost: BlogWebsitePostFieldMapping,
  BookAuthor: BookAuthorFieldMapping,
  BookCoauthor: BookCoauthorFieldMapping,
  ConferenceStaffing: ConferenceStaffingFieldMapping,
  DocsMicrosoftComContribution: DocsMicrosoftComContributionFieldMapping,
  ForumModerator: ForumModeratorFieldMapping,
  ForumParticipation: ForumParticipationFieldMapping,
  ForumParticipationMicrosoft: ForumParticipationMicrosoftFieldMapping,
  Mentorship: MentorshipFieldMapping,
  MicrosoftOpenSource: MicrosoftOpenSourceFieldMapping,
  NonMicrosoftOpenSource: NonMicrosoftOpenSourceFieldMapping,
  OrganizerConference: OrganizerConferenceFieldMapping,
  OrganizerUserGroup: OrganizerUserGroupFieldMapping,
  Other: OtherFieldMapping,
  ProductGroupFeedback: ProductGroupFeedbackFieldMapping,
  SampleCode: SampleCodeFieldMapping,
  SiteOwner: SiteOwnerFieldMapping,
  SpeakingConference: SpeakingConferenceFieldMapping,
  SpeakingUserGroup: SpeakingUserGroupFieldMapping,
  TechnicalSocialMedia: TechnicalSocialMediaFieldMapping,
  TranslationReview: TranslationReviewFieldMapping,
  VideoWebcastPodcast: VideoWebcastPodcastFieldMapping,
  WorkshopVolunteerProctor: WorkshopVolunteerProctorFieldMapping
} as const

export const ContentTypeIDs: Record<keyof typeof ContentSchemaByType, string> = {
  Article: 'e36464de-179a-e411-bbc8-6c3be5a82b68',
  BlogWebsitePost: 'df6464de-179a-e411-bbc8-6c3be5a82b68',
  BookAuthor: 'db6464de-179a-e411-bbc8-6c3be5a82b68',
  BookCoauthor: 'dd6464de-179a-e411-bbc8-6c3be5a82b68',
  ConferenceStaffing: 'f16464de-179a-e411-bbc8-6c3be5a82b68',
  DocsMicrosoftComContribution: '0ce0dc15-0304-e911-8171-3863bb2bca60',
  ForumModerator: 'f96464de-179a-e411-bbc8-6c3be5a82b68',
  ForumParticipation: 'd96464de-179a-e411-bbc8-6c3be5a82b68',
  ForumParticipationMicrosoft: 'd76464de-179a-e411-bbc8-6c3be5a82b68',
  Mentorship: 'f76464de-179a-e411-bbc8-6c3be5a82b68',
  MicrosoftOpenSource: 'd2d96407-0304-e911-8171-3863bb2bca60',
  NonMicrosoftOpenSource: '414bcf30-e889-e511-8110-c4346bac0abc',
  OrganizerUserGroup: 'fd6464de-179a-e411-bbc8-6c3be5a82b68',
  OrganizerConference: 'ef6464de-179a-e411-bbc8-6c3be5a82b68',
  Other: 'ff6464de-179a-e411-bbc8-6c3be5a82b68',
  ProductGroupFeedback: '016564de-179a-e411-bbc8-6c3be5a82b68',
  SampleCode: 'e96464de-179a-e411-bbc8-6c3be5a82b68',
  SiteOwner: 'fb6464de-179a-e411-bbc8-6c3be5a82b68',
  SpeakingConference: 'd16464de-179a-e411-bbc8-6c3be5a82b68',
  SpeakingUserGroup: 'd56464de-179a-e411-bbc8-6c3be5a82b68',
  TechnicalSocialMedia: 'eb6464de-179a-e411-bbc8-6c3be5a82b68',
  TranslationReview: '056564de-179a-e411-bbc8-6c3be5a82b68',
  VideoWebcastPodcast: 'e56464de-179a-e411-bbc8-6c3be5a82b68',
  WorkshopVolunteerProctor: '0ee0dc15-0304-e911-8171-3863bb2bca60'
} as const
