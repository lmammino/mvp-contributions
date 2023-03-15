import { ContentSchema, ContentFieldMapping } from './ContentSchemas.js'

interface RawData {
  Type: keyof typeof ContentSchema
  Props: Record<string, any>
}

export function parseContent (data: RawData[]): Array<Record<string, any>> {
  return data.map((rawData) => {
    const schema = ContentSchema[rawData.Type]
    const parsed = schema.parse(rawData.Props)
    const mapped = {} as any
    const mapping = ContentFieldMapping[rawData.Type]
    for (const key in parsed) {
      mapped[mapping[key]] = parsed[key as keyof typeof parsed]
    }
    return mapped
  })
}
