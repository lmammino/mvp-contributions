import { readFile } from 'node:fs/promises'
import { parse } from 'yaml'
import { ContentFieldMapping, ContentSchemaList, type Content, type MappedContentSchema } from './ContentSchemas.js'

// TODO: (future idea) support JS/TS files to allow edit time type checking
export async function parseContent (filepath: string): Promise<MappedContentSchema[]> {
  const yaml = await readFile(filepath, 'utf8')
  const rawData = parse(yaml)
  const data = ContentSchemaList.parse(rawData)

  return data.map((data: Content) => {
    const mapped = { type: data.type, props: {} } as any
    const mapping = ContentFieldMapping[data.type]
    for (const key in data.props) {
      mapped.props[mapping[key]] = data.props[key as keyof typeof data.props]
    }
    return mapped
  })
}
