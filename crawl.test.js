const { normalizeUrl, getUrlFromHtml } = require('./crawl.js');
const { test, expect } = require('@jest/globals')


test('normalizeUrl strip protocal', () => {
  const input = "https://blog.boot.dev/path"
  const returned = normalizeUrl(input)
  const expected = "blog.boot.dev/path"
  expect(returned).toEqual(expected)
})

test('normalizeUrl strip trailing slash', () => {
  const input = "https://blog.boot.dev/path/"
  const returned = normalizeUrl(input)
  const expected = "blog.boot.dev/path"
  expect(returned).toEqual(expected)
})

test('normalizeUrl strip uppercase', () => {
  const input = "https://BLOG.boot.dev/path"
  const returned = normalizeUrl(input)
  const expected = "blog.boot.dev/path"
  expect(returned).toEqual(expected)
})


test('Find links from Htlm', () => {
  const input = `
    <html>
        <body>
          <a href = "https://blog.boot.dev/">
               Boot.dev blog
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const returned = getUrlFromHtml(input,inputBaseUrl)
    const expected = ["https://blog.boot.dev/"]
    expect(returned).toEqual(expected)
})

test('Find links from Htlm, relative url', () => {
  const input = `
    <html>
        <body>
          <a href = "/path/">
               Boot.dev blog
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const returned = getUrlFromHtml(input,inputBaseUrl)
    const expected = ["https://blog.boot.dev/path/"]
    expect(returned).toEqual(expected)
})

test('Find links from Htlm, both', () => {
  const input = `
    <html>
        <body>
          <a href = "/path/">
               Boot.dev blog
            </a>
          <a href = "/path4/">
               Boot.dev blog
            </a>
          <a href = "https://blog.boot.dev/">
               Boot.dev blog
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const returned = getUrlFromHtml(input,inputBaseUrl)
    const expected = ["https://blog.boot.dev/path/","https://blog.boot.dev/path4/","https://blog.boot.dev/"]
    expect(returned).toEqual(expected)
})

test('Find links from Htlm, invalid', () => {
  const input = `
    <html>
        <body>
          <a href = "invalid">
                invalid
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const returned = getUrlFromHtml(input,inputBaseUrl)
    const expected = []
    expect(returned).toEqual(expected)
})
