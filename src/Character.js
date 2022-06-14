export default class Character {
  constructor(data){
    Object.assign(this, data);
    this._diceArray = [];
    this._enemy;
  }

  getDiceRolledArray(){
    return new Array(this.diceCount).fill(undefined).map((p, i, arr) => arr[i] = Math.floor(Math.random() * 10 + 1));
  }

  getDiceContent(){
    let diceContent ='';
    if(this._diceArray.length !== 0)
      diceContent = this._diceArray
        .reduce((acc, dice) => acc + `<div class="dice">${dice}</div>`, '')
    else
       diceContent = new Array(this.diceCount)
        .fill(`<div class="placeholder-dice"></div>`)
        .reduce((innerHtml, div) => innerHtml + div ,'');
    return diceContent;       
  }

  diceRoll(){
    this._diceArray = this.getDiceRolledArray();
    return ;
  }
  // this method could be wrong 
  getInnerHtml(diceRolled = false){
    return`
    <div class="character-card">
      <h4 class="name"> ${this.name} </h4>
      <img class="avatar" src="${this.avatar}"/>
      <p class="health">health: <b> ${this.health} </b></p>
      <div class="dice-container"> ${this.getDiceContent()}</div>
    </div>
    `
  }

  getDiceScore(){
    return this._diceArray.reduce((score, dice)=> score + dice, 0)
  }

  takeDamage(damage){
    console.log(`${this._name} was damage with ${damage} points`)
  }
  
  get enemy(){
    return this._enemy;
  }

  set enemy(character){
    this._enemy = character
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