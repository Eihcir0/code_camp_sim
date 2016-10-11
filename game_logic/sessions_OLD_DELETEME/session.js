
class Session {
  constructor (player) {
    this.player = player;
    this.over = false;
    //each session starts a clock

    this.main(); // may get rid of this
    }

  main() {
    while (!(this.over)) {
      this.getInput();
      this.handleInput();
    }

  }

  getInput() {
    console.log(`${this.player.name}`);
    console.log(`session: ${this.player.session}`);
    console.log(`day: w${this.player.week}d${this.player.dayNum / 7}`);
  }

  handleInput() {
    this.advanceSession();

  }

  advanceSession() {
    this.over = true;
    this.player.session +=1; //might have to pass the clock?
  }



} //end class


export default Session;
