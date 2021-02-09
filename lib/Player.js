const { FLIPPED_ALIAS_KEYS } = require('@babel/types')
const Potion = require('../lib/Potion')

//set default to empty string if no name is provided.
function Player(name = '') {
  this.name = name

  this.health = Math.floor(Math.random() * 10 + 95)
  this.strength = Math.floor(Math.random() * 5 + 7)
  this.agility = Math.floor(Math.random() * 5 + 7)

  //`new` creates an empty object and assigns it to `this`.

  this.inventory = [new Potion('health'), new Potion()]
}

//This will create a getStats() and getInventory() method on every `Player` object that is created.
Player.prototype.getStats = function () {
  return {
    potions: this.inventory.length,
    health: this.health,
    strength: this.strength,
    agility: this.agility,
  }
}

Player.prototype.getInventory = function () {
  if (this.inventory.length) {
    return this.inventory
  }
  return false
}

//refactored getStats() and getInventory() with `prototype`
//The problem with ``this.methodName` is that it creates new methods for EACH player, so if you have 100 `Player` objects, your code will create 100 getStats() methods. When using `prototype, you are only creating the method ONCE on the constructor itself.
//New `player objects simply inherit this method from the constructor rather than having their own instances of that method. Inheritance can traverse multiple levels, meaning if the method being called doesn't exist on Player(), JS will look for it on the next constructor up the chain. In this case, the next constructor would be the built-in `Object` data type.

// //returns an object with various player properties
// this.getStats = function () {
//   return {
//     potions: this.inventory.length,
//     health: this.health,
//     strength: this.strength,
//     agility: this.agility,
//   }
// }

// //returns the inventory array or false if empty

// this.getInventory = function () {
//   if (this.inventory.length) {
//     return this.inventory
//   }
//   return false
// }

Player.prototype.getHealth = function () {
  return `${this.name}'s health is now ${this.health}!`
}

Player.prototype.isAlive = function () {
  if (this.health === 0) {
    return false
  }
  return true
}

Player.prototype.reduceHealth = function (health) {
  this.health -= health

  //add conditional so that health never goes negative.

  if (this.health < 0) {
    this.health = 0
  }
}

Player.prototype.getAttackValue = function () {
  const min = this.strength - 5
  const max = this.strength + 5

  return Math.floor(Math.random() * (max - min) + min)
}

Player.prototype.addPotion = function (potion) {
  this.inventory.push(potion)
}

Player.prototype.usePotion = function (index) {
  //splice() method removes items frm an array and returns the removed items as a new array. Two things are happening here. 1) original inventory array has a singe Potion removed at the specified index value and put into a new "removed items" array, then 2) the Potion at index [0] of this 'removed items' array is saved in a potion variable.

  //push() and splice() are methods on the Array prototype.
  const potion = this.getInventory().splice(index, 1)[0]

  switch (potion.name) {
    case 'agility':
      this.agility += potion.value
      break
    case 'health':
      this.health += potion.value
      break
    case 'strength':
      this.strength += potion.value
      break
  }
}
module.exports = Player
