import React from 'react';
import Clock from './../../game_logic/clock.js';
import Week from './../../game_logic/week.js';

class NightSeshScreen extends React.Component {
    constructor (props) {
      super(props);
      this.player = this.props.player;
      this.player.clock.pause();
      var clock = this.player.clock;
      this.now = clock.time();
      this.minutesToGetToSchool = 60 + Math.floor(Math.random() * 30 +1);
      var minutesBeforeBed = 60 + Math.floor(Math.random() * 30 +1);

      var minutesSinceLastCoffee =
      clock.diff(this.player.day.lastCoffee, this.now);
      var coffeePenalty = Math.max(180 - minutesSinceLastCoffee, 0);
      var bedTime =
      clock.add(coffeePenalty + minutesBeforeBed, this.now);
      this.bedTime = clock.convertToAmPm(bedTime);
      this.coffeePenaltyMessage = coffeePenalty <= 0 ? null :
      "Late coffee -- couldn't fall asleep right away!!";

      this.handleClickScreen = this.handleClickScreen.bind(this);
      this.screen = this.screen.bind(this);
      this.alarmClock = this.alarmClock.bind(this);
      this.setAlarm = this.setAlarm.bind(this);
      this.ticker = 0;
      this.alarmTime = ["7","00","am"];
      this.sound = new Audio("./app/assets/sounds/typing.wav");
      window.setTimeout(this.sound.play(),1);
      this.redStyle={color: "red"};
      this.greenStyle={color: "green"};
      this.screen1Done =false;
      this.screen2Done =false;
      this.interval = window.setInterval(()=>this.ticker++,100);
      this.screenCounter = 1;

      }


    scoreChange() {
      var change = this.player.score - this.player.day.beginningScore;
      var changeText = `+ ${change}`;
      if (this.ticker===20) {
        new Audio("./app/assets/sounds/explosion.wav").play();
      }
      if (this.ticker<20) {
        return (

          <div>DAY {this.player.dayNum} RESULTS<br/><br/><br/>
            <br/>SCORE </div>
        );
      } else {
        return (
          <div>DAY {this.player.dayNum} RESULTS<br/><br/><br/>
            <br/>SCORE
              <span className="pair-result-number" style={change>0 ? this.greenStyle :   this.redStyle}>
                {changeText}
              </span>
          </div>
        );
      }

    }

    skillChange() {
      var skill = this.player.currentSkill.toUpperCase()+" SKILL ";
      var change = Math.round((this.player.skills[this.player.currentSkill] - this.player.day.beginningSkillPoints)/10);
      var changeText = `+ ${change}%`;
      if (this.ticker===40) {
        new Audio("./app/assets/sounds/explosion.wav").play();
      }
      if (this.ticker<40) {
        return (

          <div><br/>{skill} </div>
        );
      } else {
        return (

          <div>
            <br/>{skill}
              <span className="pair-result-number" style={change>0 ? this.greenStyle :   this.redStyle}>
                {changeText}
              </span>
          </div>
        );
      }

    }

    happinessChange() {
      var change = Math.round(this.player.happiness - this.player.day.beginningHappiness);
      var changeText = change < 0 ? `${change}` : `+ ${change}`;
      if (this.ticker===60) {
        new Audio("./app/assets/sounds/explosion.wav").play();
      }
      if (this.ticker<60) {
        return (

          <div><br/>HAPPINESS </div>
        );
      } else {
        this.screen1Done = true;
        return (

          <div>
            <br/>HAPPINESS
              <span className="pair-result-number" style={change<0 ? this.redStyle :   this.greenStyle}>
                {changeText}
              </span>
          </div>
        );
      }

    }

    setAlarm() {
      var alarm = document.getElementById("alarm").value;
      switch (alarm) {
        case "1":
          this.alarmTime = ["6","00","am"];
          break;
        case "2":
          this.alarmTime = ["6","30","am"];
          break;
        case "3":
          this.alarmTime = ["7","00","am"];
          break;
        case "4":
          this.alarmTime = ["7","30","am"];
          break;
        default:
          break;
      }
      debugger;
      var wakeupTime;
      var arrivalTime;
      var alarmDiff = this.player.clock.diff(this.now, this.alarmTime);
      if (alarmDiff > 270) {
        wakeupTime = this.alarmTime;
        arrivalTime = this.player.clock.add(this.minutesToGetToSchool, wakeupTime);
        if (this.player.clock.isAfter(arrivalTime, [8,59])) {
          arrivalTime = [8,59];
          this.player.arriveLate = "SWEATY STRIKE! You ran to school but didn't make it in time.  You get a strike for coming late to lecture.";
        }
      } else {
        wakeupTime = [8,0];
        arrivalTime = [8,59];
        this.player.arriveLate = "You overslept your alarm and showed up late for lecture!";
      }

      clearInterval(this.interval);

      var diff = this.player.clock.diff(wakeupTime, this.now) - 450;
      this.player.sleepBank -= (diff / 60 )*10;
      if (this.player.sleepBank<20) {this.player.sleepBank=20;}
      if (this.player.sleepBank>100) {this.player.sleepBank=100;}
      this.player.focus = this.player.sleepBank;
      this.player.week.advanceDay(arrivalTime);

    }

    alarmClock() {

      //NOTE WILL TAKE AT LEAST 1 hour to get to school
      var options = ["6:00am", "6:30am", "7:00am", "7:30am"];
      return (
        <div className = "set-alarm-form">
          Set alarm:<br/>
          <select id="alarm"
            className="set-alarm"
            defaultValue="3">
            <option value="1">{options[0]}</option>
            <option value="2">{options[1]}</option>
            <option value="3">{options[2]}</option>
            <option value="4">{options[3]}</option>
          </select>
          <button className="sleep-button" onClick={this.setAlarm}>GO TO SLEEP!</button>
        </div>);
    }

    screen() {
      if (this.screenCounter ===1){
         return (
           <div className="results-screen1">
             <br/>
             {this.scoreChange()}
             {this.skillChange()}
             {this.happinessChange()}
           </div>
           );
      } else if (this.screenCounter===2) {

        return (
          <div className="results-screen2">
              LEFT SCHOOL  : {`${this.now[0]}:${this.now[1]}${this.now[2]}`} <br/>
            READY FOR BED: {`${this.bedTime[0]}:${this.bedTime[1]}${this.bedTime[2]}`} <br/>
          {this.coffeePenaltyMessage} <br/><br/>
          {this.alarmClock()} <br/>
          </div>
        );
      }
    }

    handleClickScreen() {
      if (this.screenCounter===1) {
        if (this.screen1Done) {this.screenCounter = 2;}
        else {this.ticker += 60;}
      }
    }

    render() {
      return (
        <div className="day-results" onClick={this.handleClickScreen}>
          {this.screen()}
        </div>
      );
    }

  }//end component




export default NightSeshScreen;
