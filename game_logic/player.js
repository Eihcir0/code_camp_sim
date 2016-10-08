import Clock from './clock.js';
import FireAnim from
 './animation_logic/fire_anim.js';
 import StudyIconAnim from
  './animation_logic/study_icon_anim.js';
 import BugAnim from
  './animation_logic/bug_anim.js';
 import SkillAnim from
  './animation_logic/skill_anim.js';
 import PointsAnim from
  './animation_logic/points_anim.js';

class Player {
  constructor(name, obj) {
    this.name = name || "Richie";
    this.clock = obj ? obj.clock : new Clock([8,40],1);
    this.defaultMessage =
      obj ? obj.defaultMessage
      : "";
    this.currentEmotion = obj ? obj.currentEmotion : "excited";
    this.info = obj ? obj.info : "";
    this.sleepBank = obj ? obj.sleepBank : 100;
    this.happiness = obj ? obj.happiness : 100;
    this.focus = obj ? obj.focus : 100;
    this.score = obj ? obj.score : 0;
    this.liked = obj ? obj.liked : 50; //not used
    this.currentPos = obj ? obj.currentPos : 0;
    this.lastCurrentPos = obj ? obj.lastCurrentPos : -1;
    this.message = obj ? obj.message : "";
    this.lastIconTickerCount = obj ? obj.lastIconTickerCount : 0;
    this.onFire = obj ? obj.onFire : false;
    this.fire = undefined;
    this.strikes = obj ? obj.strikes : "";
    this.session = obj ? obj.session : 0; //
    this.pos = obj ? obj.pos : [280,300];
    // 0 = morning
    // 1 = lecture/assessment
    // 2 = lunch
    // 3 = pairs/solo project
    // 4 = evening
    // 5 = night
    this.day = obj ? obj.day : 1;
    this.session = obj ? obj.session : 0;
    this.week = Math.floor(this.day / 7) + 1;
    this.weekDay = this.day % 7;
    this.skills = obj ? obj.skill : {
      Ruby: 0,
      Rails: 0,
      SQL: 0,
      JavaScript: 0,
      React: 0,
      Redux: 0
    };
    this.currentSkill = Object.keys(this.skills)[this.week - 1];
    this.fireOff = this.fireOff.bind(this);
    this.newOnFire = this.newOnFire.bind(this);

  } // end constructor

  working() {
    //
    // NEED TO ADD CHECK FOR ON BULLETIN BOARD
    return ([0,2,4].includes(this.session) && this.currentPos === 11);
  }

  scoreTitle() {
    if (this.score < 50000) {return "n00b";}
    if (this.score < 100000) {return "rookie";} //need better names
    if (this.score < 150000) {return "beginner";}
  }

  workstationGo(playerAnim) {
   var now = this.clock.tickCounter;
   //frequency driven by speed of clock:
   if (now-this.lastIconTickerCount < (50 / this.clock.relativeSpeed)) {
     return false;
   }
   this.lastIconTickerCount = this.clock.tickCounter;
  //scoreDivisor - adjust to increase/decrease chance of something
  //so scoreDivsor set to 50,000 with score is 5% chance plus offset
    var scoreDivisor = 10000;
    var scoreOffset = 100000;
    var gotSomething = (Math.random() <
    (((((this.score+scoreOffset) /scoreDivisor))/100) * (this.onFire ? 4 : 1)) );
    if (!(gotSomething)) {return false;}

    //onFire -- for now just score /1000000 * 50% (so 100k = 5%) + offset <== for testing
    var chanceForFireOffset = 0.1; //delete me
    var chanceForFire = (((this.score) / 1000000) * 0.5) + chanceForFireOffset;
    if (this.onFire) {chanceForFire = 0;}

    // out of 1000 so /1000 to convert to % then /2
    var chanceForBug = ((1- (this.skills[this.currentSkill]/1000)) / 2);
    if (this.onFire) {chanceForBug = 0;}
    if (Math.random()<chanceForFire) {
      return this.newOnFire();
    }
    else if (Math.random()<chanceForBug) {
      return this.newBug();
    }
    else if (Math.random()<(0.5)) {
      return this.newSkillIncrease();
    }
    else {return this.newPoints();}

  }

  newOnFire() {
    this.onFire=true;
    window.setTimeout(()=> {
      this.fireOff();
    },5000);
    this.fire = new FireAnim(this);
    return false;
  }

  fireOff() {
    this.onFire = false;
    if (this.fireSound) {
      this.fireSound.pause();
      this.fireSound = undefined;
  }
  }

  newBug() {
    this.happiness -=1;
    this.skills[this.currentSkill]++;
    return new BugAnim({canvas: this.canvas, ctx: this.ctx});
  }

  newSkillIncrease() {
    this.skills[this.currentSkill]++;
    this.skills[this.currentSkill]++;
    this.skills[this.currentSkill]++;
    return new SkillAnim({canvas: this.canvas, ctx: this.ctx},
      {type: "skill", value: this.currentSkill});
    }

  newPoints() {
    var points = Math.floor(((Math.random()*10)+1))*100;
    this.score += points;
    return new PointsAnim({canvas: this.canvas, ctx: this.ctx},
      {type: "points", value: points});
  }


} //end player class

export default Player;
