# Design

## Animations

# Features
*

## Escojer enemigos

# UX

## gamePlay
  - [x] First player attacks then bot (monster) attacks.
  - [x] Show dmg received
  - [ ] work in the work flow attack (see below)
  - [ ] received animation
  - [ ] make the static the html that should be (the hero enemies container, and the final view)
  - [ ] attack animation 
  - [ ] Death and new Monster animation
  - [ ] Dice animation
  
# attack work flow
the idea is use functional programing to easily manipulate the work flow

//attaw workflow for hero
compose(attack,render,waitForAnimation,renderEnemy,waitForAnimation)(hero)

//attaw workflow for monster
compose(attack,render,waitForAnimation,renderEnemy,waitForAnimation)(monster)
