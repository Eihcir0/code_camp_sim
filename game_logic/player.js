import Clock from './clock.js';
import Fire from
 './animation_logic/fire.js';

class Player {
  constructor(name, obj) {
    this.name = name || "Richie";
    this.clock = obj ? obj.clock : new Clock([18,1],180);
    this.defaultMessage = obj ? obj.defaultMessage : "Get to lecture before 9:00am or you will get your first strike!";
    this.currentEmotion = obj ? obj.currentEmotion : "excited";
    this.info = obj ? obj.info : "";
    this.sleepBank = obj ? obj.sleepBank : 100;
    this.happiness = obj ? obj.happiness : 100;
    this.focus = obj ? obj.focus : 100;
    this.score = obj ? obj.score : 100000;
    this.liked = obj ? obj.liked : 50;
    this.currentPos = obj ? obj.currentPos : 0;
    this.lastCurrentPos = obj ? obj.lastCurrentPos : -1;
    this.message = obj ? obj.message : "";
    this.lastIconTime = obj ? obj.lastIcontTime : 0;
    this.onFire = obj ? obj.onFire : false;
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
     //scoreDivisor - adjust to increase/decrease chance of something
    var scoreDivisor = 50000;
    var gotSomething = (Math.random() <
    ((((this.score+20000) /scoreDivisor))/100) * (this.onFire ? 2 : 1) );
    if (!(gotSomething)) {return false;}

    //onFire -- for now just score /1000000 * 50% (so 100k = 5%)
    // 50 is adjustable divisor to make it infrequent
    var chanceForFire = ((this.score / 1000000) * 0.5)*10;
    if (this.onFire) {chanceForFire = 0;}

    // out of 1000 so /1000 to convert to % then /2
    var chanceForBug = ((1- (this.skills[this.currentSkill]/1000)) / 2);
    if (this.onFire) {chanceForBug = 0;}
    if (Math.random()<chanceForFire) {return this.newOnFire();}
    else if (Math.random()<chanceForBug) {this.newBug();}
    else if (Math.random()<(0.5)) {this.newSkillIncrease();}
    else {this.newPoints();}

  }

  newOnFire() {
    this.onFire=true;
    console.log("fire on");
    window.setTimeout(()=> {
      this.fireOff();
    },5000);
    return new Fire({player: this});

  }

  fireOff() {
    this.onFire = false;
    this.fireSound.pause();
    this.fireSound = "";

  }

  newBug() {
    this.happiness -=1;
    console.log("new bug happiness -1");
  }

  newSkillIncrease() {
    this.skills[this.currentSkill]++;
    this.skills[this.currentSkill]++;
    console.log(`new skill increase ${this.currentSkill} + 2`);
  }

  newPoints() {
    var points = Math.floor(((Math.random()*10)+1))*100;
    console.log(`score increase ${points}`);
    this.score += points;
  }


} //end player class

export default Player;
