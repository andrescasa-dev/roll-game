# Comparatives
## Before
```js
renderHTML(){
    const getDiceRolledArray = ()=> new Array(this.diceCount).fill(undefined).map((p, i, arr) => arr[i] = Math.floor(Math.random() * 10 + 1));
    const diceRoll = getDiceRolledArray();

    let diceHTML = diceRoll.reduce((acc, dice) => acc + `<div class="dice">${dice}</div>`, '');

    document.getElementById(this.id).innerHTML = 
    `
    <div class="character-card">
      <h4 class="name"> ${this.name} </h4>
      <img class="avatar" src="${this.avatar}"/>
      <p class="health">health: <b> ${this.health} </b></p>
      <div class="dice-container"> ${diceHTML}</div>
    </div>
    `
  }
```

```js
//this is into a class "Character"
  getDiceRolledArray(){
    return new Array(this.diceCount).fill(undefined).map((p, i, arr) => arr[i] = Math.floor(Math.random() * 10 + 1));
  }

  getDiceHTML(){
    return diceRoll.reduce((acc, dice) => acc + `<div class="dice">${dice}</div>`, '');
  }

  renderHTML(){
    document.getElementById(this.id).innerHTML = 
    `
    <div class="character-card">
      <h4 class="name"> ${this.name} </h4>
      <img class="avatar" src="${this.avatar}"/>
      <p class="health">health: <b> ${this.health} </b></p>
      <div class="dice-container"> ${this.getDiceHTML()}</div>
    </div>
    `
  }
```