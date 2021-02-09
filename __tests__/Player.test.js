const { exportAllDeclaration } = require('@babel/types')
const Player = require('../lib/Player')

//this imports Potion() constructor into the test, establishing Potion as a usable variable.
const Potion = require('../lib/Potion')

//
jest.mock('../lib/Potion')
//Player should nave `name` and three number properties: health, strength, agility.
//Write test to check for existence of those 4 things.

test('creates a player object', () => {
  const player = new Player('Dave')

  expect(player.name).toBe('Dave')
  expect(player.health).toEqual(expect.any(Number))
  expect(player.strength).toEqual(expect.any(Number))
  expect(player.agility).toEqual(expect.any(Number))
  expect(player.inventory).toEqual(expect.arrayContaining([expect.any(Object)]))
})

//check that player.getStatus() returns an object with four specific properties:
test("gets player's stats as an object", () => {
  const player = new Player('Dave')

  expect(player.getStats()).toHaveProperty('potions')
  expect(player.getStats()).toHaveProperty('health')
  expect(player.getStats()).toHaveProperty('strength')
  expect(player.getStats()).toHaveProperty('agility')
})

test('get inventory from player or returns false', () => {
  const player = new Player('Dave')

  expect(player.getInventory()).toEqual(expect.any(Array))
  player.inventory = []

  expect(player.getInventory()).toEqual(false)
})

//create a test to get info about player's health:

//why create a method on the `Player` object if it's going to be console logged by the `Game` object? We chose to create a `Player` method for this in order to help declutter the logic in `Game`. This way, the game doesn't have to display data, which falls more in line with the responsibilities of the `Game` object.

test("get player's health value", () => {
  const player = new Player('Dave')

  //expect.stringContaining() method is an expect method that is used to make sure the string includes our player's health. This is preferred in this case because we might need flexibility to change how the player's health will be displayed. THis way, if that change happens, we wont' need to pudate our test as well.

  expect(player.getHealth()).toEqual(
    expect.stringContaining(player.health.toString())
  )
})

//test to make sure player is alive
test('checks if player is alive or not', () => {
  const player = new Player('Dave')

  expect(player.isAlive()).toBeTruthy()

  player.health = 0

  expect(player.isAlive()).toBeFalsy()
})

//test to handle the reduceHealth() method to see if the correct amount of health is being substracted from the Player health property

test("substracts from player's health", () => {
  const player = new Player('Dave')
  const oldHealth = player.health

  player.reduceHealth(5)

  expect(player.health).toBe(oldHealth - 5)
  player.reduceHealth(99999)

  expect(player.health).toBe(0)
})

//test to get player's attack value

test("gets player's attack value", () => {
  const player = new Player('Dave')
  player.strength = 10

  expect(player.getAttackValue()).toBeGreaterThanOrEqual(5)
  expect(player.getAttackValue()).toBeLessThanOrEqual(15)
})

test('adds a potion to the new inventory', () => {
  const player = new Player('Dave')
  const oldCount = player.inventory.length
  player.addPotion(new Potion())

  expect(player.inventory.length).toBeGreaterThan(oldCount)
})

test('uses a potion from inventory', () => {
  const player = new Player('Dave')
  player.inventory = [new Potion(), new Potion(), new Potion()]
  const oldCount = player.inventory.length

  player.usePotion(1)

  expect(player.inventory.length).toBeLessThan(oldCount)
})
