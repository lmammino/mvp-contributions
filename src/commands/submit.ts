import { makeClient } from '../client.js'
import { parseContent } from '../ContentParser.js'
import { ensureCookie } from './ensureCookie.js'

export async function submitCmd (filePath: string, options: any): Promise<void> {
  const cookie = ensureCookie(options.cookie)
  const client = makeClient(cookie)

  const content = await parseContent(filePath)
  for (const entry of content) {
    await client.postContent(entry)
    console.log(`✔️  Submitted ${entry.props.TitleOfActivity}`)
  }
}
