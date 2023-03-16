# Fetch videos from a YouTube channel

You could fetch all the videos from a YouTube channel using a custom script such as the following one:

```js
// fromYoutube.js

import { Innertube } from 'youtubei.js' // from npm
import emojiStrip from 'emoji-strip' // from npm
import YAML from 'yaml' // from npm

// change these values
const youtubeChannelId = 'UCL0w2IAjTBx3NNka-l7InPw'
const cutOffDate = '2022-04-01'
// Do your own category mapping here
// This function takes raw vido info objects and returns a category mapping
// categories should be strings from the list available in /src/ContributionAreas.ts
function categoryMapping (info) {
  const primaryContributionArea = info.primary_info.title.text.toLowerCase().includes('rust') ? 'C++' : 'Javascript/Typescript'
  const secondaryContributionArea = info.primary_info.title.text.toLowerCase().includes('rust') ? undefined : ['Node.js', 'Front End Web Dev']

  return {
    primaryContributionArea,
    secondaryContributionArea
  }
}

const youtube = await Innertube.create()

const content = await youtube.getChannel(youtubeChannelId)
const videos = content.videos

const seenVideos = new Set()
const contents = []
let i = 0
for (const video of videos) {
  if (!seenVideos.has(video.id)) {
    console.error(`(${++i}/${videos.length}) ${video.id}`)
    const info = await youtube.getInfo(video.id)
    const { primaryContributionArea, secondaryContributionArea } = categoryMapping(info)
    const content = {
      type: 'VideoWebcastPodcast',
      props: {
      // do your own category mapping
        primaryContributionArea,
        secondaryContributionArea,
        title: emojiStrip(info.primary_info.title.text).trim(),
        url: `https://www.youtube.com/watch?v=${video.id}`,
        numberOfVideos: 1,
        numberOfViews: info.basic_info.view_count,
        date: (new Date(info.primary_info.published.text)).toISOString().substring(0, 10),
        description: info.secondary_info.description.text.split('\n')[0].trim().substring(0, 256)
      }
    }
    if (content.props.date >= cutOffDate) {
      contents.push(content)
    }
    seenVideos.add(video.id)
  }
}

console.log(YAML.stringify(contents))
```

You could then run:

```bash
node fromYoutube.js > content.yml
```

To get your `content.yml` file including all the relevant videos
