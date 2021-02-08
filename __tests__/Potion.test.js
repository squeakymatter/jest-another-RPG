const Potion = require('../lib/Potion.js')

//we'll use new keyword to create new Potion objects so we wnat to write our tests in a way tha tillustrates our object.
//Here, we're assuming that when we create a new `Potion`, it will take the string we pass in and assin it to the potion's name.
//Even though we haven't written any code for new potion yet, we can still specify that it should have a `name` property equal to health, and a `value` property that is a number of some kind.
//The `expect.any()` method takes a constructor as an argument. Here, we're expecting that the `value` property is created with a `Number()` constructor. In this isntance, we allow the `value` to be any number rather than a number in a range so the text is more flexible. This general test allows us to avoid testing the random number generator hundreds of times to make sure that it works.

//this test should fail. the error tells us that the function exported from `lib/Postion.js` is not a constructor function. That's ok. We write the test first, expect to, then write the code that makes the test pass. This is part of the TDD cycle.

test('creates a health potion object', () => {
  const potion = new Potion('health')

  expect(potion.name).toBe('health')
  expect(potion.value).toEqual(expect.any(Number))
})

//remember, our potion object is supposed to be one of three types: health, agility, or strength. We want our enemies to be able to drop a random ptoin. Since the logic is strictly related to a potion, we can add it to the Potion() constructor. If the Potion() constructor is called w/o any arugments, we will ahve it create a new potion with a random type and value.

//write a failing test that will check for this

test('create a random potion object', () => {
  const potion = new Potion()

  expect(potion.name).toEqual(expect.any(String))
  expect(potion.name.length).toBeGreaterThan(0)
  expect(potion.value).toEqual(expect.any(Number))
})
