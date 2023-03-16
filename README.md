# mvp-contributions

Automates contribution submissions to the Microsoft MVP (Most Valuable Professional) portal.

**Status**: **Alpha quality** (manually tested, bugs are expected)

![Screenshot of the tool in action](/docs/screenshot.png)


## Rationale

The MVP website is slow and it's tedious to submit a lot of stuff by hand. This tool should be able to automate most of the hard work.


## Authentication

Go to your browser of choice and head to [mvp.microsoft.com](https://mvp.microsoft.com/). Do a login. Inspect your cookies and copy the value for the cookie `.AspNet.Cookies`.


## Usage

- Clone
- run `npm i`
- populate the sample `content.yml` with your content
- run `npm start -- content.yml <your_session_cookie>` (replace `<your_session_cookie>` with your actual cookie). Alternatively, the session cookie can also be specified using the `MVP_COOKIE` environment variable (recommended).


## Automation

The goal of this project is to be able to come up with ways of fetching all the content activities from one or more sources and convert them to the expected YAML contribution format.

Some examples are available on how you might be able to fetch and convert data from various sources:

  - [YouTube videos from a channel](/docs/automation/youtube.md)


Feel free to submit your examples here.


## Schema

Your `content.yml` file needs to follow a very specific schema.

The list of entries should be an array and every entry must have 2 fields: `type` (`string`) and `props` (`object`).

The `props` object will have a different schema depending on the selected type.

Here you can find the list of all the available types (pointing to their schema file in Zod):

- [`Article`](/src/schemas/Article.ts)
- [`BlogWebsitePost`](/src/schemas/BlogWebsitePost.ts)
- [`BookAuthor`](/src/schemas/BookAuthor.ts)
- [`BookCoauthor`](/src/schemas/BookCoauthor.ts)
- [`ConferenceStaffing`](/src/schemas/ConferenceStaffing.ts)
- [`DocsMicrosoftComContribution`](/src/schemas/DocsMicrosoftComContribution.ts)
- [`ForumModerator`](/src/schemas/ForumModerator.ts)
- [`ForumParticipation`](/src/schemas/ForumParticipation.ts)
- [`ForumParticipationMicrosoft`](/src/schemas/ForumParticipationMicrosoft.ts)
- [`Mentorship`](/src/schemas/Mentorship.ts)
- [`MicrosoftOpenSource`](/src/schemas/MicrosoftOpenSource.ts)
- [`NonMicrosoftOpenSource`](/src/schemas/NonMicrosoftOpenSource.ts)
- [`OrganizerConference`](/src/schemas/OrganizerConference.ts)
- [`OrganizerUserGroup`](/src/schemas/OrganizerUserGroup.ts)
- [`Other`](/src/schemas/Other.ts)
- [`ProductGroupFeedback`](/src/schemas/ProductGroupFeedback.ts)
- [`SampleCode`](/src/schemas/SampleCode.ts)
- [`SiteOwner`](/src/schemas/SiteOwner.ts)
- [`SpeakingConference`](/src/schemas/SpeakingConference.ts)
- [`SpeakingUserGroup`](/src/schemas/SpeakingUserGroup.ts)
- [`TechnicalSocialMedia`](/src/schemas/TechnicalSocialMedia.ts)
- [`TranslationReview`](/src/schemas/TranslationReview.ts)
- [`VideoWebcastPodcast`](/src/schemas/VideoWebcastPodcast.ts)
- [`WorkshopVolunteerProctor`](/src/schemas/WorkshopVolunteerProctor.ts)


Note tha the [`content.yml`](/content.yml) committed in this repository contains some commented examples that you can use as a reference.


## Future improvement ideas

- Better testing
- Support content files in JS/TS (to have a better authoring experience with autocompletion and type checking)
- Detection of expired sessions (it generally lasts 1 hour)
- Managed state files to be able to recover from failure


## Contributing

Everyone is very welcome to contribute to this project.
You can contribute just by submitting bugs or suggesting improvements by
[opening an issue on GitHub](https://github.com/lmammino/mvp-contributions/issues).


## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.