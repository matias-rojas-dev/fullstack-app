const { palindrome } = require('../utils/for_testing')

test.skip('palindrome', () => {
  const result = palindrome('text')

  expect(result).toBe('txet')
})

test.skip('palindrome of empty string', () => {
  const result = palindrome('')

  expect(result).toBe('')
})

test.skip('palindrome of undefined', () => {
  const result = palindrome()

  expect(result).toBeUndefined()
})
