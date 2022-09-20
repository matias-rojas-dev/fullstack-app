const suma = (a, b) => {
  return a + b
}

const checks = [
  { a: 0, b: 0, result: 0 },
  { a: 1, b: 3, result: 4 },
  { a: -3, b: 3, result: 0 },
]

checks.forEach((check) => {
  console.assert(
    suma(check.a, check.b) === check.result,
    `Suma of ${check.a} and ${check.b} expected to be ${check.result}`
  )
})

console.log(`${checks.length} checks performed...`)
