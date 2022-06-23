import data from './data.js';
import Character from './Character.js';
import { objPrivProp, compose } from '../utils/myUtils.js';

//use a map in order to create the follow relation
const herosData = [...data.heros];
const monstersData = [...data.monsters];
const actualPair =  {}

const getNewHero = () => new Character(objPrivProp(herosData.shift()));
const getNewMonster = () =>  new Character(objPrivProp(monstersData.shift()));

function startGame(){
  renderPlayGround(); 
  actualPair.hero = getNewHero();
  actualPair.monster = getNewMonster();
  setActualRivals();
  renderActualCharacters();
}


function setActualRivals(){
  actualPair.hero.enemy = actualPair.monster
  actualPair.monster.enemy = actualPair.hero
}

async function renderActualCharacters(){
  const divMonsters = document.getElementById("monsters");
  const divHeros = document.getElementById("heros");
  divHeros.innerHTML = actualPair.hero.getInnerHtml();
  divMonsters.innerHTML = actualPair.monster.getInnerHtml();

  await new Promise((resolve, reject)=>{setTimeout(()=>{resolve(console.log("time out"))}, 2000)})
}

function renderCard(type, html){

}

function renderPlayGround(){
  document.body.innerHTML = 
  `<main id="characters_container">
      <div id="heros">              
      </div>
      <div id="monsters">
      </div>    
    </main>
    <section id="actions">
        <button id="attack-button">Attack</button>
    </section>`
}

function endGame(){
  //at least one dead, it's to say, there may or may not one alive
  const winner = Object.values(actualPair).find(character => !character.isDead);
  let emoji = winner === actualPair.hero ? '🔮' : '☠️';
  let msg = winner ? ` The ${winner.name} is Victorious` 
  : `No victors - all creatures are dead`;
  document.body.innerHTML = 
  `<div class="end-game">
    <h2>Game Over</h2>
    <h3>${msg}</h3>
    <p class="end-emoji">${emoji}</p>
  </div>
  <section id="actions">
    <button id="playAgain">playAgain</button>
  </section>
  ` 
}

// this.diceRoll();
// this._enemy.takeEnemyDamage();

document.body.addEventListener('click', async (e) => {
  if(e.target.matches('#attack-button')){
    e.target.disabled = true;
    actualPair.hero.attack();
    await renderActualCharacters();

    //check death / new monster
    
    if(actualPair.monster.isDead || actualPair.hero.isDead){
      if(monstersData.length !== 0){
        actualPair.monster = getNewMonster();
        setActualRivals();
        await renderActualCharacters();
      }
      else{
        endGame();
      }
    }
    else{
      actualPair.monster.attack()
      await renderActualCharacters();
    }
    e.target.disabled = false;
  }
  if(e.target.matches('#playAgain')){
    location.reload();
    
  }
})

startGame();


