import characterData from './data.js';
import { Character } from './Character.js';
import { privateProperties } from '../util/functions.js';

const characters = []
for (const keyCharacter in characterData) {
  characters.push(new Character(privateProperties(characterData[keyCharacter])));
}

function renderElement(element){
  document.getElementById(element.id).innerHTML = element.getInnerHtml();
}

characters.forEach(character => {
  renderElement(character);
});



