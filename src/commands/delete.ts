import { makeClient } from '../client.js'
import { ensureCookie } from './ensureCookie.js'

export async function deleteCmd (contributionIds: string[], options: any): Promise<void> {
  const cookie = ensureCookie(options.cookie)
  const client = makeClient(cookie)

  for (const contributionId of contributionIds) {
    await client.deleteContent(parseInt(contributionId, 10))
    console.log(`✔️  Deleted contribution ${contributionId}`)
  }
}
