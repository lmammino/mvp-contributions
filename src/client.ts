import { parseDocument } from 'htmlparser2'
import { selectAll } from 'css-select'
import got from 'got'
import { ContentTypeIDs, type MappedContentSchema } from './ContentSchemas.js'
import { type ContributionFromSite } from './schemas/ContributionFromSite.js'

function makeCookieHeader (cookies: Record<string, string>): string {
  const jar = ['MVPLocaleCookie=en-us']
  for (const [name, value] of Object.entries(cookies)) {
    jar.push(`${name}=${value}`)
  }
  return jar.join('; ')
}

function makeHeaders (cookies: Record<string, string>, extraHeaders: Record<string, string> = {}): Record<string, string> {
  return {
    'sec-fetch-user': '?1',
    'sec-gpc': '1',
    'upgrade-insecure-requests': '1',
    'request-context': 'appId=cid-v1:1d755a5e-a2a9-43f5-9db0-1fbcf040a81d',
    'request-id': '|/jDEx.mppbR',
    'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
    accept: '*/*',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    Referer: 'https://mvp.microsoft.com/en-us/MyProfile/EditActivity',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    Cookie: makeCookieHeader(cookies),
    ...extraHeaders
  }
}

async function getRequestVerificationToken (cookies: Record<string, string>): Promise<{ tokenField: string, tokenCookie: string }> {
  const headers = makeHeaders(cookies)
  const resp = await got('https://mvp.microsoft.com/en-us/MyProfile/EditActivity', {
    method: 'GET',
    headers
  })

  const setCookies = resp.headers['set-cookie']
  let tokenCookie = ''
  const rawRequestVerificationTokenCookie = setCookies?.find((cookie) => cookie.startsWith('__RequestVerificationToken='))
  if (typeof rawRequestVerificationTokenCookie !== 'undefined') {
    tokenCookie = rawRequestVerificationTokenCookie.split(';')[0].split('=')[1]
  }

  const dom = parseDocument(resp.body)

  const node = selectAll('input[name="__RequestVerificationToken"]', dom)
  if (node.length === 0) {
    throw new Error('Could not retrieve a verification token. Is your ASP.NET cookie still valid?')
  }

  const tokenField = (node[0] as unknown as { attribs: { value: string } }).attribs.value
  return { tokenField, tokenCookie }
}

export interface Client {
  getPublishedContent: () => Promise<ContributionFromSite[] | undefined>
  postContent: (content: MappedContentSchema) => Promise<void>
  deleteContent: (contributionId: number) => Promise<void>
}

export function makeClient (aspnetCookieValue: string): Client {
  const baseCookies = { '.AspNet.Cookies': aspnetCookieValue }

  return {
    async getPublishedContent (): Promise<ContributionFromSite[] | undefined> {
      const url = 'https://mvp.microsoft.com/en-us/MyProfile/EditActivity'
      const headers = makeHeaders(baseCookies)
      const resp = await got(url, {
        headers,
        followRedirect: false
      })

      if (resp.statusCode === 302) {
        throw new Error('Your cookie is invalid. Please log in to https://mvp.microsoft.com/ and get a new cookie value from the `.AspNet.Cookies` cookie.')
      }

      let rawContributions = resp.body.match(/all_activities\s=\s(?<data>\[{.*)/)?.groups?.data
      if (typeof rawContributions !== 'undefined') {
        rawContributions = rawContributions.substring(0, rawContributions.length - 1)
        return JSON.parse(rawContributions) as ContributionFromSite[]
      }
    },

    async postContent (content: MappedContentSchema): Promise<void> {
      const { tokenField, tokenCookie } = await getRequestVerificationToken(baseCookies)

      const data: Record<string, string> = {
        __RequestVerificationToken: tokenField,
        formchanged: 'false',
        'ActivityVisibility.Id': '299600000', // TODO: add support different kinds of visibility
        PrivateSiteId: '0',
        IsFromBookmarklet: 'True',
        'ActivityType.Id': ContentTypeIDs[content.type]
      }

      for (const [field, value] of Object.entries(content.props)) {
        if (field === 'select_contributionAreasDDL') {
          data['ApplicableTechnology.Id'] = value
          data['ApplicableTechnology.Name'] = value
        } else if (field === 'select_contributionAreasDDL2') {
          const [firstItem, secondItem] = value
          if (typeof firstItem !== 'undefined') {
            data['AdditionalTechnology1.Id'] = firstItem
            data['AdditionalTechnology1.Name'] = firstItem
          }
          if (typeof secondItem !== 'undefined') {
            data['AdditionalTechnology2.Id'] = secondItem
            data['AdditionalTechnology2.Name'] = secondItem
          }
        } else {
          data[field] = value
        }
      }

      if (typeof data['AdditionalTechnology1.Id'] === 'undefined') {
        data['AdditionalTechnology1.Id'] = '00000000-0000-0000-0000-000000000000'
      }
      if (typeof data['AdditionalTechnology1.Name'] === 'undefined') {
        data['AdditionalTechnology1.Name'] = ''
      }
      if (typeof data['AdditionalTechnology2.Id'] === 'undefined') {
        data['AdditionalTechnology2.Id'] = '00000000-0000-0000-0000-000000000000'
      }
      if (typeof data['AdditionalTechnology2.Name'] === 'undefined') {
        data['AdditionalTechnology2.Name'] = ''
      }

      const headers = makeHeaders({
        ...baseCookies,
        ...{ __RequestVerificationToken: tokenCookie }
      },
      {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })

      const resp = await got('https://mvp.microsoft.com/en-us/Bookmarklet/SaveActivity?source=Profile', {
        method: 'POST',
        headers,
        form: data,
        followRedirect: false,
        throwHttpErrors: false
      })

      if (resp.statusCode !== 200) {
        throw new Error(`Could not post contribution with title "${content.props.TitleOfActivity}" (Status code: ${resp.statusCode}).`)
      }
    },

    async deleteContent (contributionId: number): Promise<void> {
      const { tokenField, tokenCookie } = await getRequestVerificationToken(baseCookies)
      const headers = makeHeaders({ ...baseCookies, ...{ __RequestVerificationToken: tokenCookie } })
      const resp = await got('https://mvp.microsoft.com/en-us/Bookmarklet/DeleteActivity?source=Profile', {
        method: 'POST',
        headers,
        form: {
          privateSiteId: contributionId.toString(),
          __RequestVerificationToken: tokenField
        },
        throwHttpErrors: false,
        followRedirect: false
      })

      if (resp.statusCode !== 200) {
        throw new Error(`Could not delete contribution ${contributionId} (Status code: ${resp.statusCode}).`)
      }
    }
  }
}
