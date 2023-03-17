import { oraPromise } from 'ora'
import { makeClient } from '../client.js'
import { ensureCookie } from './ensureCookie.js'

export async function deleteCmd (contributionIds: string[], options: any): Promise<void> {
  const cookie = ensureCookie(options.cookie)
  const client = makeClient(cookie)

  for (const contributionId of contributionIds) {
    await oraPromise(client.deleteContent(parseInt(contributionId, 10)), {
      text: `Deleting contribution "${contributionId}" ...`,
      successText: contributionId,
      failText: (err: Error) => err.message
    })
  }
}
