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
