const { palindrome } = require('../utils/for_testing')

test('palindrome', () => {
  const result = palindrome('text')

  expect(result).toBe('txet')
})

test('palindrome of empty string', () => {
  const result = palindrome('')

  expect(result).toBe('')
})

test('palindrome of undefined', () => {
  const result = palindrome()

  expect(result).toBeUndefined()
})
