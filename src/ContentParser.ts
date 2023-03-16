import { readFile } from 'node:fs/promises'
import { parse } from 'yaml'
import { ContentSchemaByType, ContentFieldMapping, ContentSchemaList, type Content } from './ContentSchemas.js'

// TODO: (future idea) support JS/TS files to allow edit time type checking
export async function parseContent (filepath: string): Promise<Array<Record<string, any>>> {
  const yaml = await readFile(filepath, 'utf8')
  const rawData = parse(yaml)
  const data = ContentSchemaList.parse(rawData)

  return data.map((data: Content) => {
    const schema = ContentSchemaByType[data.type]
    const parsed = schema.parse(rawData.props)
    const mapped = {} as any
    const mapping = ContentFieldMapping[data.type]
    for (const key in parsed) {
      mapped[mapping[key]] = parsed[key as keyof typeof parsed]
    }
    return mapped
  })
}
