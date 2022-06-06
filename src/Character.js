export class Character {
  constructor(data){
    Object.assign(this, data);
  }

  getDiceRolledArray(){
    return new Array(this.diceCount).fill(undefined).map((p, i, arr) => arr[i] = Math.floor(Math.random() * 10 + 1));
  }
  
  getDiceHTML(){
    return this.getDiceRolledArray().reduce((acc, dice) => acc + `<div class="dice">${dice}</div>`, '');
  }

  getInnerHtml(){
    return`
    <div class="character-card">
      <h4 class="name"> ${this.name} </h4>
      <img class="avatar" src="${this.avatar}"/>
      <p class="health">health: <b> ${this.health} </b></p>
      <div class="dice-container"> ${this.getDiceHTML()}</div>
    </div>
    `
  }
  
  get id() {
    return this._id
  }
  set id(value) {
    this._id = value
  }
  get name() {
    return this._name
  }
  set name(value) {
    this._name = value
  }
  get avatar() {
    return this._avatar
  }
  set avatar(value) {
    this._avatar = value
  }
  get health() {
    return this._health
  }
  set health(value) {
    this._health = value
  }
  get diceCount() {
    return this._diceCount
  }
  set diceCount(value) {
    this._diceCount = value
  }
}