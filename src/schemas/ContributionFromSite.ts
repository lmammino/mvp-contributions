export interface ContributionFromSite {
  PrivateSiteId: number
  ActivityType: {
    Id: string
    Name: string
    EnglishName: string
  }
  ApplicableTechnology: {
    Id: string
    Name: string
    AwardName: string | null
    AwardCategory: string | null
    Statuscode: number
    Active: boolean
  }
  AdditionalTechnology1: string | null
  AdditionalTechnology2: string | null
  AdditionalTechnologies: string
  DateOfActivity: string | null
  DateOfActivityFormatted: string
  EndDate: string | null
  EndDateFormatted: string
  TitleOfActivity: string
  ReferenceUrl: string
  ActivityVisibility: {
    Id: number
    Description: string
    LocalizeKey: string
  }
  AnnualQuantity: number | null
  SecondAnnualQuantity: number | null
  AnnualReach: number | null
  Description: string | null
  OnlineIdentity: string | null
  SocialNetwork: string | null
  AllAnswersUrl: string | null
  AllPostsUrl: string | null
  IsSystemCollected: boolean
  IsBelongToLatestAwardCycle: boolean
  DisplayMode: string
  IsAllowEdit: boolean
  IsAllowDelete: boolean
  IsNotInLockoutDateRange: boolean
  ActivityLockOutMessage: string
  IsFromBookmarklet: boolean
  Submitted: boolean
  IsMVP: boolean
}
