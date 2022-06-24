import data from './data.js';
import Hero from './Hero.js';
import Monster from './Monster.js';
import { objPrivProp, compose } from '../utils/myUtils.js';

class App{
  constructor(){
    this.$playground = document.querySelector('#playground')
    this.$modal_endgame = document.querySelector('#modal-end-game')
    this.$monster = document.querySelector('#monster')
    this.$hero = document.querySelector('#hero');
    this.$btn_attack = document.querySelector('#attack-button')
    this.$btn_playAgain = document.querySelector('#playAgain');
    this.addEventListeners();

    this.herosList = [];
    this.monstersList = [];
    this.actualPair =  {};

    this.startGame();
  }

  startGame(){
    this.herosList = data.heros.map( data => new Hero(objPrivProp(data)));
    this.monstersList = data.monsters.map( data => new Monster(objPrivProp(data)));
    this.hero = this.herosList.shift();
    this.monster = this.monstersList.shift();
    console.log(this.hero instanceof Hero)
    this.setActualRivals();
    this.renderHero();
    this.renderMonster();
  }

  setActualRivals(){
    this.hero.enemy = this.monster
    this.monster.enemy = this.hero
  }

  animationTimeOut(seconds){    
    return new Promise((resolve, reject)=>{setTimeout(()=>{resolve(console.log("2s time out"))}, seconds)})
  }

  endGame(winner){
    const emoji = winner === this.hero ? '🔮' : '☠️';
    const msg = winner ? ` The ${winner.name} is Victorious` : `No victors - all creatures are dead`;
    this.$modal_endgame.querySelector('#end-game--message').textContent = msg;
    this.$modal_endgame.querySelector('#end-game--emoji').textContent = emoji;

    this.toggleModalRender(this.$modal_endgame);
  } 

  async renderNextMonster(){
    this.monster = this.monstersList.shift();
    this.setActualRivals();
    await this.renderMonster();
  }

  async renderAttack(character){
    character.attack();
    await this.renderActualCharacter(character)
    await this.renderActualCharacter(character.enemy)
  }

  async renderActualCharacter(character){
    const element = typeof character === 'Hero' ? this.$hero : this.$monster;
    element.innerHTML = character.innerHTML();
  }

  renderMonster(){
    this.$monster.innerHTML = this.monster.getInnerHtml();
    return this.animationTimeOut(1000);
  }

  renderHero(){
    this.$hero.innerHTML = this.hero.getInnerHtml();
    return this.animationTimeOut(1000);
  }

  
  async attackHandler(){
    this.$btn_attack.disabled = true;
    await this.renderAttack(this.hero);
    // si murio el monstru y hay más render el siguiente
    // si murio el monstruo y no hay más end the game hero is the winner
    // si murio el hero end the game
    // si murio el hero y el monster end game es empate
    const areThereEnemies = this.monstersList.length !== 0;
    const someDead = this.hero.isDead || this.monster.isDead;
    const bothDead = this.hero.isDead && this.monster.isDead;

    if(someDead){
      bothDead ? this.endGame(undefined) :
      this.hero.isDead ? this.endGame(this.monster) :
      areThereEnemies ? await this.renderNextMonster() : this.endGame(this.hero);
    }
    else await this.renderAttack(this.monster);

    this.$btn_attack.disabled = false;
  }

  toggleModalRender(modal){
    this.$playground.classList.toggle('hide');
    modal.classList.toggle('hide');
  }

  playAgainHandler(){
    this.toggleModalRender(this.$modal_endgame);
    this.startGame();
  }

  addEventListeners(){
    this.$btn_attack.addEventListener('click',  async ()=>{
      await this.attackHandler();
    })

    this.$btn_playAgain.addEventListener('click', ()=>{
      this.playAgainHandler();
    })
  }
}

new App();