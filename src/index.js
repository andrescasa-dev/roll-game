import characterData from './data.js';
import Character from './Character.js';
import { privateProperties, compose } from '../utils/myUtils.js';

//use a map in order to create the follow relation
const characters = [];
const characterCards = document.getElementById('mount').children

function setCharacters(){
  for (const keyCharacter in characterData) {
    characters.push(new Character(privateProperties(characterData[keyCharacter])));
  }
  characters[0].enemy = characters[1];
  characters[1].enemy = characters[0];
}

function renderCharacters(){
  //warning: its taken for granted that there is the same number of characters as of characterCards
  characters.forEach((character, i) => characterCards[i].innerHTML = character.getInnerHtml())
}

document.body.addEventListener('click', (e) => {
  if(e.target.matches('#attack-button')){
    characters.forEach(character => character.diceRoll());
    characters.forEach((character) => character.takeDamage(character.enemy.getDiceScore()));
    renderCharacters();
  }
})

setCharacters();
renderCharacters();
