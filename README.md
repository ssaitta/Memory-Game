# Game of Memory
Written by Sierra Saitta-Zelterman for the The New York Times. Game pieces pull from [here](https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json), with starting scaffolding [NYT kyt](https://github.com/NYTimes/kyt). 

## How to play

Match all the pairs of cards to win!

* All cards begin face down.
* Flip over two cards by clicking on them.
  * If they match, the pair is removed from the game.
  * If they do not match, both cards turn back over.
* The game ends when you find all the matching pairs.

A timer will begin when you flip over your first card. You can pause the timer, but it will start again when you flip over another card. Play on easy or hard mode, and try and beat your best time!

## Install

Download the files, open your terminal, and run the following commands

```
npm install 
npm run build
npm run start 
```

When you see the message 
```
server started on port: 3000
```
you will be able to play at `localhost:3000`

## Some details about the app

This game of memory was made using React, and Redux for state management. Some additional libraries used were `axios`, `react-redux`, `redux-thunk`, and `redux-devtools-extension`. 
