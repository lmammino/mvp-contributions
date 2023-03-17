import { makeClient } from '../client.js'
import { ensureCookie } from './ensureCookie.js'

export async function listCmd (options: any): Promise<void> {
  const cookie = ensureCookie(options.cookie)
  const client = makeClient(cookie)

  const contributions = await client.getPublishedContent()
  if (typeof contributions !== 'undefined') {
    for (const contribution of contributions) {
      console.log(`${contribution.PrivateSiteId}\t${contribution.DateOfActivityFormatted}\t${contribution.TitleOfActivity}`)
    }
  }
}
