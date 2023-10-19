export const checkHttpUrl = (url: string): boolean => { // source: https://snyk.io/fr/blog/secure-javascript-url-validation/
  let givenUrl
  try {
    givenUrl = new URL(url)
  } catch (error) {
    return false
  }

  return givenUrl.hostname.includes('.') && (givenUrl.protocol === 'http:' || givenUrl.protocol === 'https:')
}
