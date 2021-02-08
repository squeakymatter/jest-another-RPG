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
