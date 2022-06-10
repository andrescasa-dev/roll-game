import characterData from './data.js';
import Character from './Character.js';
import { privateProperties, compose } from '../utils/myUtils.js';
const characters = [];
const characterCards = document.getElementById('mount').children

function setCharacters(){
  for (const keyCharacter in characterData) {
    characters.push(new Character(privateProperties(characterData[keyCharacter])));
  }  
}

function renderCharacters(){
  //warning: its taken for granted that there is the same number of characters as of characterCards
  characters.forEach((character, i) => characterCards[i].innerHTML = character.getInnerHtml())
}

document.body.addEventListener('click', (e) => {
  if(e.target.matches('#attack-button')){
    renderCharacters();
  }
})

setCharacters();
renderCharacters();
