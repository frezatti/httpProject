const { normalizeUrl } = require('./crawl.js');
const { test, expect } = require('@jest/globals')


test('normalizeUrl strip protocal', () => {
  const input = "https://blog.boot.dev/path"
  const returned = normalizeUrl(input)
  const expected = "blog.boot.dev/path"
  expect(returned).toEqual(expected)
})

test('normalizeUrl strip protocal', () => {
  const input = "https://blog.boot.dev/path/"
  const returned = normalizeUrl(input)
  const expected = "blog.boot.dev/path"
  expect(returned).toEqual(expected)
})
