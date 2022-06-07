import characterData from './data.js';
import Character from './Character.js';
import { privateProperties, compose } from '../utils/myUtils.js';
const mount = document.getElementById('mount');

function createCharacters(){
  const characters = [];
  for (const keyCharacter in characterData) {
    characters.push(new Character(privateProperties(characterData[keyCharacter])));
  }
  return characters
}

function renderCharacters(characters){
  const fragment = new DocumentFragment();
  characters.forEach( character => {
    const div = document.createElement('div');
    div.innerHTML = character.getInnerHtml();
    fragment.appendChild(div)
  });
  mount.appendChild(fragment);
}

compose(renderCharacters, createCharacters)();