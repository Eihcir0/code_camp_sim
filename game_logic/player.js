
class Player {
  constructor(obj, name) {
    this.name = name || "Richie";
    this.currentEmotion = obj ? obj.currentEmotion : "excited";
    this.info = obj ? obj.info : "";
    this.sleepBank = obj ? obj.sleepBank : 100;
    this.happiness = obj ? obj.happiness : 100;
    this.focus = obj ? obj.focus : 100;
    this.liked = obj ? obj.liked : 50;
    this.score = obj ? obj.score : 0;
    this.session = obj ? obj.session : 0; //
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

  } // end constructor


} //end player class

export default Player;
