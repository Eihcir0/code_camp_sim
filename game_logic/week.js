import Day from './day.js';
//

class Week {
  constructor (player) {
    this.player = player;
    this.day = new Day (this.player);
    this.material = this.materials();
  }


  materials() {
    if (this.player.week === 1) {return "ruby";}
  }

  main () {
    while (this.currentWeekDay() < 6) {
      this.advanceDay();
    }
    this.weekEnd();
  }

  currentWeekDay() {
    return (this.player.dayNum % 7);
  }

  advanceDay() { //NOTE NEED TO HANDLE CHECK FOR WEEKEND IN GAME_MAIN

    // get alarm, calc new stats and arrival time within session(nighttime)
    console.log("advancing day");
    this.player.dayNum +=1;
    if (!(this.currentWeekDay())) {this.weekend();}
    var now = this.player.clock.time();
    var diff = this.player.clock.diff(now)/60;
    this.player.sleepBank -= diff*5;
    if (this.player.sleepBank<20) {this.player.sleepBank=20;}
    this.player.focus = this.player.sleepBank;
    var day = new Day(this.player, [8,30]);
    this.player.session = 0;
    this.player.leaving=false;

  }

  weekEnd() {
    //get player priorities for weekend;
    //perform accordingly
    //only advance day until Sunday - will advance once more in Game.advanceWeek
    console.log("weekend!!");
    this.player.dayNum +=1;
  }
} //end class

export default Week;
