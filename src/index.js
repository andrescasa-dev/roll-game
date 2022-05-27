const hero = {
  id: 'hero',
  name: 'Wizard',
  avatar: 'https://images.unsplash.com/photo-1618426257457-0bc6cfa2de33?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387',
  health: 60,
  diceCount: 3 
}

const orc = {
  id: 'monster',
  name: 'Orc',
  avatar: 'https://images.unsplash.com/photo-1580321187070-da8bdee36013?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764',
  health: 10,
  diceCount: 1
}


function renderCharacter({id, name, avatar, health, diceCount}){
  
  const getDiceRolledArray = ()=> new Array(diceCount).fill(undefined).map((p, i, arr) => arr[i] = Math.floor(Math.random() * 10 + 1));
  const diceRoll = getDiceRolledArray();

  let diceHTML = diceRoll.reduce((acc, dice) => acc + `<div class="dice">${dice}</div>`, '');

  document.getElementById(id).innerHTML = 
  `
  <div class="character-card">
    <h4 class="name"> ${name} </h4>
    <img class="avatar" src="${avatar}"/>
    <p class="health">health: <b> ${health} </b></p>
    <div class="dice-container"> ${diceHTML}</div>
  </div>
  `
  
 /* -------------------------------------------------------------------------- */
 /*               set diceHTML using for (imperative programming)              */
 /* -------------------------------------------------------------------------- */
  // function fillDice(diceCount, diceRoll){
  //   let diceHtml = "";
  //   for (let i = 0; i < diceCount; i++) {
  //     diceHtml += `<div class="dice">${diceRoll[i]}</div>`;
  //   }
  //   return diceHtml
  // }
  // let diceHTML = fillDice(diceCount, diceRoll);
  
  /* -------------------------------------------------------------------------- */
  /*                         Replaced by const getDiceRolledArray               */
  /* -------------------------------------------------------------------------- */
  // function getDiceRoll(diceCount){
  //   let diceRoll = []
  //   for (let i = 0; i < diceCount; i++) {
  //     diceRoll.push();
  //   }
  //   return diceRoll
  // }
}

renderCharacter(hero);
renderCharacter(orc);



