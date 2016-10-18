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
    this.defaultClockSpeed = obj ? obj.defaultClockSpeed : 2;
    this.clock = obj ? obj.clock : null;
    this.tempMessage =
      obj ? obj.tempMessage
      : "I'm the brains, you're the muscle!  Use your muscles to move the mouse!";
    this.currentEmotion = obj ? obj.currentEmotion : "excited";
    this.info = obj ? obj.info : "";

    this.dayNum = obj ? obj.dayNum : 1;
    this.sleepBank = obj ? obj.sleepBank : 100;
    this.happiness = obj ? obj.happiness : 100;
    this.focus = obj ? obj.focus : this.sleepBank;
    this.score = obj ? obj.score : 0;

    this.currentPos = obj ? obj.currentPos : 0;
    this.lastCurrentPos = obj ? obj.lastCurrentPos : -1;
    this.message = obj ? obj.message : "";
    this.onFire = obj ? obj.onFire : false;
    this.fire = undefined;
    this.leaving = false;
    this.talkingToCandanessa = false;
    this.askedOutCandanessa = false;

    this.strikes = obj ? obj.strikes : "";
    this.assessments = [];
    this.session = obj ? obj.session : 0; //
    this.pos = obj ? obj.pos : [280,300];
    // 0 = morning
    // 1 = lecture/assessment
    // 2 = lunch
    // 3 = pairs/solo project
    // 4 = evening
    // 5 = night
    this.session = obj ? obj.session : 0;
    this.weekNum = Math.floor(this.dayNum / 7) + 1;
    this.weekDay = this.dayNum % 7;

    this.skills = obj ? obj.skill : {
      ruby: 0,
      rails: 0,
      sql: 0,
      javaScript: 0,
      react: 0,
      redux: 0
    };
    this.currentSkill = Object.keys(this.skills)[this.weekNum - 1];
    this.fireOff = this.fireOff.bind(this);
    this.newOnFire = this.newOnFire.bind(this);
    this.weekDayText = this.weekDayText.bind(this);
    this.day = undefined;
    this.week = undefined;

  } // end constructor

  weekDayText() {
    switch (this.weekDay) {
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      case 7:
        return "Sunday";
      default:
        break;
      }

  }

  working() {
    //
    // NEED TO ADD CHECK FOR ON BULLETIN BOARD
    return ([0,2,4].includes(this.session) && this.currentPos === 11);
  }

  scoreTitle() {
    if (this.score < 50000) {return "n00b";}
    if (this.score < 100000) {return "rookie";} //need better names
    if (this.score < 150000) {return "beginner";}
    if (this.score < 200000) {return "student";}
    if (this.score < 250000) {return "good student";}
    if (this.score < 300000) {return "hobbyist";}
    if (this.score < 400000) {return "intermediate";}
    if (this.score < 500000) {return "wannabe";}
    if (this.score < 600000) {return "hacker jr.";}
    if (this.score < 700000) {return "coding ace";}
    if (this.score < 800000) {return "7x coder";}
    if (this.score < 900000) {return "8x coder";}
    if (this.score < 1000000) {return "9x coder";}
    if (this.score < 2000000) {return "10x coder";}
    return "cheater";
  }

  workstationGo(playerAnim) {
   var now = this.clock.tickCounter;
   if (this.weekDay == 5 && !(this.day.workingLateOnFridaySucks) && this.day.clock.isBetween([21,0],[24,0])) {
     this.happiness -= 10;
     this.tempMessage = "Working late on Friday sucks!";
   }
   //frequency driven by speed of clock:
   if (now - this.clock.lastIconTickerCount < (100 / this.clock.relativeSpeed)) {
     return false;
   }

   this.day.chanceForFireOffset += 0.0001;
   this.clock.lastIconTickerCount = this.clock.tickCounter;
  //scoreDivisor - adjust to increase/decrease chance of something
  //so scoreDivsor set to 50,000 with score is 5% chance plus offset
    var scoreDivisor = 25000;
    var scoreOffset = 100000;
    var gotSomething = (Math.random() <
    (((((this.score+scoreOffset) /scoreDivisor))/100) * (this.onFire ? 4 : 1)) );
    if (!(gotSomething)) {return false;}

    //onFire -- for now just score /1000000 * 50% (so 100k = 5%) + offset <== for testing

    var chanceForFire = (((this.score) / 1000000) * 0.10) + this.day.chanceForFireOffset;
    if (this.onFire || this.day.fireCounter <= 0 || this.focus < 5) {chanceForFire = 0;}

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
    this.day.fireCounter -= 1;
    this.day.chanceForFireOffset = 0;
    window.setTimeout(()=> {
      this.fireOff();
    },(3000 * (1 + this.score / 500000)) + (4000*Math.random())  );
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
    this.happiness -=0.8;
    this.skills[this.currentSkill] +=0.20;
    if (this.sleepBank>30) {
      this.newFace = (this.sleepBank>70) ?
        {filename: "rested_teeth", duration: 10} :
        {filename: "tired_teeth", duration: 10};
    }
    return new BugAnim({canvas: this.canvas, ctx: this.ctx});
  }

  newSkillIncrease() {
    this.skills[this.currentSkill]+=0.4;
    if (this.skills[this.currentSkill]<800) {this.skills[this.currentSkill]+=0.4;}
    this.happiness += 0.1;
    if (this.sleepBank>30) {
      this.newFace = (this.sleepBank>70) ?
      {filename: "rested_happy", duration: 10} :
      {filename: "tired_happy", duration: 10};
    }
    return new SkillAnim({canvas: this.canvas, ctx: this.ctx},
      {type: "skill", value: this.currentSkill});
    }

  newPoints() {
    var rand = Math.floor(((Math.random()*10)+1))*10+(this.score/50000);
    var points;
    points = Math.max(Math.floor((rand-30)/10)*100,100);
    if (rand>99.5) {points = 1000;}
    if (this.sleepBank>30) {
      this.newFace = (this.sleepBank>70) ?
      {filename: "rested_happy", duration: 10} :
      {filename: "tired_happy", duration: 10};
    }
    if (points===1000) {
      this.happiness +=8;
      if (this.sleepBank>30) {
        this.newFace = {filename: "super_happy", duration: 20};
      }
    }
    this.score += points;
    return new PointsAnim({canvas: this.canvas, ctx: this.ctx},
      {type: "points", value: points});
  }


} //end player class

export default Player;
