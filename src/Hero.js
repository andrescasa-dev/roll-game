import Character from "./Character.js";

export default class Hero extends Character {
  constructor(data, enemy){
    super(data);
    this.enemy = enemy; 
  }  
}