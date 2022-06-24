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
    this._diceScore;
    this._dmgReceivedHTML = 0;
  }

  getDiceRolledArray(){
    return new Array(this._diceCount).fill(undefined).map((p, i, arr) => arr[i] = Math.floor(Math.random() * 10 + 1));
  }

  getDiceHTML(){
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
    this.__diceScore = this._diceArray.reduce((score, dice)=> score + dice, 0);
    return this;
  }

  get diceScore(){
    return this.__diceScore
  }

  attack(){
    this.diceRoll();
    this._enemy.takeEnemyDamage();
  }

  takeEnemyDamage(){
    const damage = this.enemy.diceScore;
    const leftOverHealth = this._health - damage;
    this._health = leftOverHealth < 0 ? 0 : leftOverHealth;
    this._isDead = this._health === 0; 
    this._dmgReceivedHTML = damage * -1;
  }
  

  getHealthPercentage(){
    return 100 * this._health / this._maxHealth;
  }

  getHealthBarHTML(){
    const percent = this.getHealthPercentage();
    return `
    <div class="health-bar-outer">
      <div class="health-bar-inner ${percent < 25 ? 'danger' : '' }" style="width: ${percent}% ;">
      </div>
    </div>`
  }

  getInnerHtml(){
    return`
    <h4 class="name"> ${this._name} </h4>
    <img class="avatar" src="${this._avatar}"/>
    <p class="health">health: <b> ${this._health} </b> ${this.getDmgReceivedHTML()}</p>
    ${this.getHealthBarHTML()}
    <div class="dice-container"> 
      ${this.getDiceHTML()}
    </div>
    `
  }
  
  getDmgReceivedHTML(){
    const html = this._dmgReceivedHTML ? `<span class="character-dmgReceived"> ${this._dmgReceivedHTML}</span>` : ''    
    this._dmgReceivedHTML = 0;
    return html;
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