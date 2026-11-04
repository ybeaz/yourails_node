export const getShortUrl = (
  rawUrl: string,
  keys: string[] = ['flowName', 'client_id', 'prompt'],
): string => {
  try {
    const url = new URL(rawUrl)
    const picked = keys
      .filter((key) => url.searchParams.has(key))
      .map((key) => {
        const value = url.searchParams.get(key) ?? ''
        return `${key}=${value.length > 24 ? `${value.slice(0, 24)}…` : value}`
      })
    return `${url.origin}${url.pathname}${picked.length ? ` ? ${picked.join(' & ')}` : ''}`
  } catch {
    return rawUrl.slice(0, 120)
  }
}
