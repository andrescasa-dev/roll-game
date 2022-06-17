export default class Character {
  constructor(data){
    //read only properties
    for (const key in data) {
      Object.defineProperty(this, key, {value: data[key], writable: false, configurable: false})
    }
    this._health = data['_maxHealth'];
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

  getDiceScore(){
    return this._diceArray.reduce((score, dice)=> score + dice, 0)
  }

  takeDamage(damage){
    console.log(`${this._name} was damage with ${damage} points`)
    this._health =  this._health - damage < 0 ? 0 : this._health - damage;
    this._isDead = this._health === 0; 
  }
  

  getHealthPercentage(){
    return 100 * this._health / this._maxHealth;
  }

  getHTMLHealthBar(){
    const percent = this.getHealthPercentage();
    return `
    <div class="health-bar-outer">
      <div class="health-bar-inner ${percent < 25 ? 'danger' : '' }" style="width: ${percent}% ;">
      </div>
    </div>`
  }

  getInnerHtml(){
    return`
    <div class="character-card">
      <h4 class="name"> ${this._name} </h4>
      <img class="avatar" src="${this._avatar}"/>
      <p class="health">health: <b> ${this._health} </b></p>
      ${this.getHTMLHealthBar()}
      <div class="dice-container"> 
        ${this.getDiceContent()}
      </div>
    </div>
    `
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