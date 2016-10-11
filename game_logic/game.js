import Player from './player.js';
import Week from './week.js';

class Game {  ////I DON'T THINK WE NEED A GAME CLASS
  constructor (player) {
    this.player = player;
  }

  main () {
    while (!(this.gameIsOver())) {
      this.week = new Week(this.player);
      this.advanceWeek();
    }
    this.gameOver();
  }

  advanceWeek() {
    this.player.dayNum += 1;
  }
  gameIsOver() {
    return false; // UPDATE ME!
  }

  gameOver() {
    console.log("game over");
  }

}//end class

export default Game;
