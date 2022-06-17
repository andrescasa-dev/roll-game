export default class Character {
  constructor(data){
    //writable: false (except the health)
    
    const {_health, ...readOnlyProps } = data
    Object.assign(this, { _health });
    for (const key in readOnlyProps) {
      Object.defineProperty(this, key, {value: readOnlyProps[key], writable: false, configurable: false})
    }
    this._diceArray = [];
    this._enemy;
    this._isDead;
  }

  getDiceRolledArray(){
    return new Array(this._diceCount).fill(undefined).map((p, i, arr) => arr[i] = Math.floor(Math.random() * 10 + 1));
  }

  getDiceContent(){
    let diceContent ='';
    if(this._diceArray.length !== 0)
      diceContent = this._diceArray
        .reduce((acc, dice) => acc + `<div class="dice">${dice}</div>`, '')
    else
       diceContent = new Array(this._diceCount)
        .fill(`<div class="placeholder-dice"></div>`)
        .reduce((innerHtml, div) => innerHtml + div ,'');
    return diceContent;       
  }

  diceRoll(){
    this._diceArray = this.getDiceRolledArray();
    return ;
  }
  
  getInnerHtml(){
    return`
    <div class="character-card">
      <h4 class="name"> ${this._name} </h4>
      <img class="avatar" src="${this._avatar}"/>
      <p class="health">health: <b> ${this._health} </b></p>
      <div class="dice-container"> ${this.getDiceContent()}</div>
    </div>
    `
  }

  getDiceScore(){
    return this._diceArray.reduce((score, dice)=> score + dice, 0)
  }

  takeDamage(damage){
    console.log(`${this._name} was damage with ${damage} points`)
    this._health =  this._health - damage < 0 ? 0 : this._health - damage;
    this._isDead = this._health === 0; 
  }
  
  get enemy(){
    return this._enemy;
  }

  set enemy(character){
    this._enemy = character
  }

  get isDead(){
    return this._isDead
  }

  set isDead(value){
    console.error('isDead property should no be modified');
  }

  get name(){
    return this._name;
  }
}