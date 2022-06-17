import characterData from './data.js';
import Character from './Character.js';
import { privateProperties, compose } from '../utils/myUtils.js';

//use a map in order to create the follow relation
const characters = [];


function setCharacters(){
  characters.length = 0;
  for (const keyCharacter in characterData) {
    characters.push(new Character(privateProperties(characterData[keyCharacter])));
  }
  characters[0].enemy = characters[1];
  characters[1].enemy = characters[0];
}

function renderCharacters(){
  //warning: its taken for granted that there is the same number of characters as of characterCards
  const characterCards = document.getElementById('characters_container').children
  characters.forEach((character, i) => characterCards[i].innerHTML = character.getInnerHtml())
}

function renderPlayGround(){
  document.body.innerHTML = 
  `<main id="characters_container">
      <div id="hero">              
      </div>
      <div id="monster">
      </div>    
    </main>
    <section id="actions">
        <button id="attack-button">Attack</button>
    </section>`
}

document.body.addEventListener('click', (e) => {
  if(e.target.matches('#attack-button')){
    characters.forEach(character => character.diceRoll());
    characters.forEach((character) => character.takeDamage(character.enemy.getDiceScore()));
    renderCharacters();
    let isSomeDead = characters.some(character => character.isDead);
    if(isSomeDead) endGame();
  }
  if(e.target.matches('#playAgain')){
    startGame();
  }
})


function endGame(){
  //at least one dead, it's to say, there may or may not one alive
  const winner = characters.find(character => !character.isDead);
  let emoji = winner === characters[0] ? '🔮' : '☠️';
  let msg = winner ? ` The ${winner.name} is Victorious` 
  : `No victors - all creatures are dead`;
  document.body.innerHTML = 
  `<div class="end-game">
    <h2>Game Over</h2>
    <h3>${msg}</h3>
    <p class="end-emoji">${emoji}</p>
  </div>
  <section id="actions">
    <button id="playAgain">Play again</button>
  </section>
  ` 
}

function startGame(){
  renderPlayGround();
  setCharacters();
  renderCharacters();
}

startGame();


