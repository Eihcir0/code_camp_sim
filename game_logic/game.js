import Player from './player.js';
import Week from './week.js';

class Game {
  constructor (player, name) {
    this.player = player || new Player();

    this.main();

  }

  main () {
    while (!(this.gameIsOver())) {
      this.week = new Week(this.player);
      this.advanceWeek();
    }
    this.gameOver();
  }

  advanceWeek() {
    this.player.day += 1;
  }
  gameIsOver() {
    return false; // UPDATE ME!
  }

  gameOver() {
    console.log("game over");
  }

}//end class
