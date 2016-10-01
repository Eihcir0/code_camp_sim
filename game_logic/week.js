import Day from './day.js';
//

class Week {
  constructor (player) {
    this.player = player;
    this.day = new Day (this.player);
    this.material = this.materials();
  }


  materials() {
    if (this.player.week === 1) {return "Ruby";}
  }
  
  main () {
    while (this.currentWeekDay() < 6) {
      this.advanceDay();
    }
    this.weekEnd();
  }

  currentWeekDay() {
    return (this.player.day % 7);
  }

  advanceDay() {
    // get alarm, calc new stats and arrival time within session(nighttime)
    console.log("advancing day");
    this.player.day +=1;
    this.player.session = 0;
  }

  weekEnd() {
    //get player priorities for weekend;
    //perform accordingly
    //only advance day until Sunday - will advance once more in Game.advanceWeek
    console.log("weekend!!");
    this.player.day +=1;
  }
} //end class

export default Week;
