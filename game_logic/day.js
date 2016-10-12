// import Morning from './sessions/open_sessions/morning.js';
// import Lecture from './sessions/mid_morning/lecture.js';
// import Assessment from './sessions/mid_morning/assessment.js';
// import Lunch from './sessions/open_sessions/lunch.js';
// import SoloProject from './sessions/afternoon/solo_project.js';
// import PairsProgramming from './sessions/afternoon/pairs_programming.js';
// import Evening from './sessions/open_sessions/evening.js';
// import NightTime from './sessions/night_time.js';
import Clock from './clock.js';



class Day {
  constructor (player, arrivalTime) {
    this.player = player;
    if (this.player.dayNum === 1) {
      arrivalTime = ["1","30","pm"];
    }
    this.player.clock = new Clock(arrivalTime, this.player.defaultClockSpeed);
    this.player.currentPos = 0;
    this.player.ateDonut = false;
    this.player.lastCoffee = [4,0];
    this.player.ateLunch = false;
    this.player.lastIconTickerCount = 0;
    this.beginningScore = this.player.score;
    this.beginningSkillPoints =
    this.player.skills[this.player.currentSkill] ? this.player.skills[this.player.currentSkill] : 0;
    this.beginningHappiness = this.player.happiness;

  }

  secretaryMessage() {
    if (this.player.dayNum === 1 && this.player.session===0) {return "Please go to the lecture area immediately!!";}
  }
  // main() {
  //   while (this.player.session < 5) {
  //     this.playSession();
  //   }
  //   this.nightTime();
  // }
  //
  // playSession() {
  //   switch (this.player.session) {
  //     case 0:
  //       this.session = new Morning(this.player);
  //       break;
  //     case 1:
  //       if (this.player.weekDay===5) {
  //         this.session = new Assessment(this.player);
  //       } else {
  //         this.session = new Lecture(this.player);
  //       }
  //       break;
  //     case 2:
  //       this.session = new Lunch(this.player);
  //       break;
  //     case 3:
  //       if ([1,2,3].includes(this.player.weekDay)) {
  //         this.session = new PairsProgramming(this.player);
  //       } else {
  //         this.session = new SoloProject(this.player);
  //       }
  //       break;
  //     case 4:
  //       this.session = new Evening(this.player);
  //       break;
  //     default:
  //       break;
  //   }

  // }

  nightTime() {
    console.log("night time!");
    //this.session = new NightTime (which will
    // get alarm, calc new stats and arrival time within Session(night))
  }


} //end class

export default Day;
