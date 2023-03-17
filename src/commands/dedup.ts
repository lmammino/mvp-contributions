import { makeClient } from '../client.js'
import { ensureCookie } from './ensureCookie.js'

export async function dedupCmd (options: any): Promise<void> {
  const cookie = ensureCookie(options.cookie)
  const client = makeClient(cookie)
  const contributions = await client.getPublishedContent()

  const mapByTitleDate: Record<string, number[]> = {}
  if (typeof contributions !== 'undefined') {
    for (const contribution of contributions) {
      const entryId = `${contribution.DateOfActivityFormatted}-${contribution.ActivityType.Id}-${contribution.TitleOfActivity}`
      const entry = mapByTitleDate[entryId]
      if (typeof entry !== 'undefined') {
        entry.push(contribution.PrivateSiteId)
      } else {
        mapByTitleDate[entryId] = [contribution.PrivateSiteId]
      }
    }
  }
  const withDuplicates = Object.entries(mapByTitleDate).filter(([k, v]) => v.length > 1)

  for (const [title, ids] of withDuplicates) {
    ids.pop() // preserves one entry
    for (const id of ids) {
      await client.deleteContent(id)
    }
    console.log(`✔️  Deleted duplicates for ${title}`)
  }
}
