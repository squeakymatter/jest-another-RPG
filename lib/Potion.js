//create new constructor function for a health potion.
//Potion() constructor should take in a name parameter and assign the value property to be a random number between 7 and 12.
//Add logic so that if the potion is a health potion, its value is a number between 30 and 40.

function Potion(name) {
  this.types = ['strength', 'agility', 'health']
  this.name = name || this.types[Math.floor(Math.random() * this.types.length)]

  if (this.name === 'health') {
    this.value = Math.floor(Math.random() * 10 + 30)
  } else {
    this.value = Math.floor(Math.random() * 5 + 7)
  }
}
//set module.exports to be the Potion() constructor so that the Jest tests can create new potions.
module.exports = Potion
