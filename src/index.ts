import { chromium, devices } from 'playwright'
import { readFile } from 'node:fs/promises'
import { parse } from 'yaml'
import { parseContent } from './ContentParser.js'

const filepath = process.argv[2]
if (filepath?.length === 0) throw new Error('No filepath provided.')

const cookie = process.argv[3]
if (cookie?.length === 0) throw new Error('No cookie provided.')

const yaml = await readFile(filepath, 'utf8')
const data = parse(yaml)

const contents = parseContent(data)

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

for (const content of contents) {
  console.log(content)

  await page.click('#addNewActivityBtn')
  await page.waitForSelector('#activityTypeSelector', { state: 'visible' })
  for (const [field, value] of Object.entries(content)) {
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
}

// Teardown
// await context.close();
// await browser.close();
