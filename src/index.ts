import { chromium, devices } from 'playwright'
import { setTimeout } from 'node:timers/promises'
import { parseContent } from './ContentParser.js'
import { ContentTypeIDs } from './ContentSchemas.js'

const filepath = process.argv[2]
if (filepath?.length === 0) throw new Error('No filepath provided.')

const cookie = process.argv[3] ?? process.env.MVP_COOKIE
if (typeof cookie === 'undefined') throw new Error('No cookie provided.')

const contents = await parseContent(filepath)

// Setup
const browser = await chromium.launch({ headless: false })
const context = await browser.newContext(devices['Desktop Chrome'])
await context.addCookies([
  {
    name: '.AspNet.Cookies',
    value: cookie,
    domain: 'mvp.microsoft.com',
    path: '/'
  }
])

const page = await context.newPage()
await page.goto('https://mvp.microsoft.com/en-us/MyProfile/EditActivity')

// cookie consent
await page.click('#cookie-banner button:first-child')

let done = 0
for (const content of contents) {
  await page.click('#addNewActivityBtn')
  await page.waitForSelector('#activityTypeSelector', { state: 'visible' })
  await page.selectOption('#activityTypeSelector', ContentTypeIDs[content.type])

  // TODO: find a better way to wait for the content switch to happen
  await setTimeout(1000)

  for (const [field, value] of Object.entries(content.props)) {
    if (field === 'select_contributionAreasDDL') {
      await page.selectOption('#select_contributionAreasDDL', value)
    } else if (field === 'select_contributionAreasDDL2') {
      const [firstItem, secondItem] = value
      if (typeof firstItem !== 'undefined') {
        await page.selectOption('#select_contributionAreasDDL2', firstItem)
      }
      if (typeof secondItem !== 'undefined') {
        await page.click('#firstSelect a.add')
        await page.waitForSelector('#select_contributionAreasDDL3')
        await page.selectOption('#select_contributionAreasDDL3', secondItem)
      }
    } else {
      await page.fill(`#${field}`, String(value))
    }
  }

  await page.click('#submitActivityButton')
  await page.waitForSelector('[role="dialog"]', { state: 'hidden' })

  console.log(`✔️ (${++done}/${contents.length}) - ${(content.props as unknown as { TitleOfActivity: string }).TitleOfActivity}`)
  process.exit(1)
}

await context.close()
await browser.close()
