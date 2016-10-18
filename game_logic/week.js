import Day from './day.js';
//

class Week {
  constructor (player, arrivalTime = ["8","30","am"]) {
    this.player = player;
    this.day = new Day (this.player, arrivalTime); //change this to new arrival time
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

  advanceDay(arrivalTime) { //NOTE NEED TO HANDLE CHECK FOR WEEKEND IN GAME_MAIN

    // get alarm, calc new stats and arrival time within session(nighttime)
    this.player.dayNum +=1;
    if ([6,7].includes(this.currentWeekDay())) {this.weekend();}

    this.player.day = new Day(this.player, arrivalTime);
    this.player.session = 0;

  }

  weekEnd() {
    //get player priorities for weekend;
    //perform accordingly
    //only advance day until Sunday - will advance once more in Game.advanceWeek
    this.player.dayNum +=2;
  }
} //end class

export default Week;
