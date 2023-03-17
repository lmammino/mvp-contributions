export function ensureCookie (cookie: string | undefined): string {
  if (typeof cookie === 'string' && cookie.length > 0) {
    return cookie
  }

  const env = process.env.MVP_COOKIE
  if (typeof env === 'string' && env.length > 0) {
    return env
  }

  throw new Error('No cookie provided. Please provide a cookie via the `--cookie` flag or the `MVP_COOKIE` environment variable. You can get the cookie value from the `.AspNet.Cookies` cookie on a logged in session at https://mvp.microsoft.com/')
}
