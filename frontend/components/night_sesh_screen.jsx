import React from 'react';
import Clock from './../../game_logic/clock.js';
import Week from './../../game_logic/week.js';

class NightSeshScreen extends React.Component {
    constructor (props) {
      super(props);
      this.player = this.props.player;

      this.skill = this.player.currentSkill;
      this.skillCapitalized = this.skill.charAt(0).toUpperCase() + this.skill.slice(1);

      this.player.clock.pause();
      var clock = this.player.clock;
      this.now = clock.time();

      if (clock.isBefore(this.now,[6,0])) {this.now = clock.add(24*60),this.now;} //add 24 hours if after midnight
      this.minutesToGetToSchool = 60 + Math.floor(Math.random() * 30 +1);
      var minutesBeforeBed = 60 + Math.floor(Math.random() * 30 +1);

      var minutesSinceLastCoffee =
      clock.diff(this.player.day.lastCoffee || [12,0], this.now);
      var coffeePenalty = Math.max(180 - minutesSinceLastCoffee, 0);

      this.bedTime =
      clock.add(coffeePenalty + minutesBeforeBed, this.now);

      this.coffeePenaltyMessage = coffeePenalty <= 0 ? null :
      "Late coffee -- couldn't fall asleep right away!!";

      this.state = {messages: []};

      this.handleClickScreen = this.handleClickScreen.bind(this);
      this.screen = this.screen.bind(this);
      this.alarmClock = this.alarmClock.bind(this);
      this.setAlarm = this.setAlarm.bind(this);
      this.resultsScreen = this.resultsScreen.bind(this);
      this.alarmScreen = this.alarmScreen.bind(this);
      this.weekendSetter = this.weekendSetter.bind(this);
      this.startWeekend = this.startWeekend.bind(this);
      this.ticker = 0;
      this.alarmTime = [31,0];
      // this.sound = new Audio("./app/assets/sounds/typing.wav");
      // window.setTimeout(this.sound.play(),1);
      this.redStyle={color: "red"};
      this.greenStyle={color: "green"};
      this.screen1Done =false;
      this.screen2Done =false;
      this.interval = window.setInterval(()=> this.ticker++,100);
      this.screenCounter = 1;
      this.weekendMessages = [];

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
          this.alarmTime = [30,0];
          break;
        case "2":
          this.alarmTime = [30,30];
          break;
        case "3":
          this.alarmTime = [31,0];
          break;
        case "4":
          this.alarmTime = [31,30];
          break;
        default:
          break;
      }
      var wakeupTime;
      var arrivalTime;
      var alarmDiff = this.player.clock.diff(this.bedTime, this.alarmTime);
      if (alarmDiff > 270) {
        wakeupTime = this.alarmTime;
        arrivalTime = this.player.clock.add(this.minutesToGetToSchool, wakeupTime); //24*60 adjust for new day
        if (this.player.clock.isAfter(arrivalTime, [32,57])) {
          arrivalTime = [32,59];
          this.player.arriveLate = "SWEATY STRIKE! You ran to school but didn't make it in time.  You get a strike for coming late to lecture.";
        }
      } else {
        wakeupTime = [32,0];
        arrivalTime = [32,59];
        this.player.arriveLate = "You overslept your alarm and showed up late for lecture!";
      }
      clearInterval(this.interval);
      var diff = this.player.clock.diff(this.bedTime, wakeupTime) - 450; //450 = 7.5 hours min sleep requirement
      this.player.sleepBank += (diff / 60 )*10;
      if (this.player.sleepBank<20) {this.player.sleepBank=20;}
      if (this.player.sleepBank>100) {this.player.sleepBank=100;}
      this.player.focus = this.player.sleepBank;
      this.player.week.advanceDay(this.player.clock.convertToAmPm(arrivalTime));

    }

    increaseAttributes(value, id) {
      switch (value) {
        case "1": //sleep
          this.player.sleepBank += 25;
          return <span key={id}><br/>You got some zzzz's ==> SleepBank +20 <br/></span>;
        case "2":   //study
          this.player.skills[this.skill] += 100;
          return <span key={id}><br/>You hit the books. ==> {this.skillCapitalized} skill +10%<br/></span>;
        case "3": //have fun
          this.player.happiness += 20;
          return <span key={id}><br/>You had fun! ==> Happiness +20 <br/></span>;
        default:
          break;
      }

      //display then window timeout to change screen

    }

    startWeekend() {
      var wk1 = document.getElementById("weekend1").value;
      var wk2 = document.getElementById("weekend2").value;
      var wk3 = document.getElementById("weekend3").value;

      this.weekendMessages.push(this.increaseAttributes(wk1, 1));
      this.weekendMessages.push(this.increaseAttributes(wk2, 2));
      this.weekendMessages.push(this.increaseAttributes(wk3, 3));
      this.setState({messages: this.weekendMessages});
      var arrivalTime = [8,30];

      clearInterval(this.interval);
      if (this.player.sleepBank<20) {this.player.sleepBank=20;}
      if (this.player.sleepBank>100) {this.player.sleepBank=100;}

      this.player.focus = this.player.sleepBank;

      window.setTimeout(()=> {
        this.player.week.weekEnd();
        var week = new Week(this.player, arrivalTime);
        this.player.week = week;
        this.player.week.advanceDay(this.player.clock.convertToAmPm(arrivalTime));},5000);

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

    weekendSetter() {

      //NOTE WILL TAKE AT LEAST 1 hour to get to school
      var options = ["SLEEP", "STUDY", "HAVE FUN"];
      return (
        <div className = "set-weekend-form">
          <select id="weekend1"
            className="set-weekend"
            defaultValue="1">
            <option value="1">{options[0]}</option>
            <option value="2">{options[1]}</option>
            <option value="3">{options[2]}</option>
          </select>
          <select id="weekend2"
            className="set-weekend"
            defaultValue="2">
            <option value="1">{options[0]}</option>
            <option value="2">{options[1]}</option>
            <option value="3">{options[2]}</option>
          </select>
          <select id="weekend3"
            className="set-weekend"
            defaultValue="3">
            <option value="1">{options[0]}</option>
            <option value="2">{options[1]}</option>
            <option value="3">{options[2]}</option>
          </select>
          <br/><br/>
          <button className="weekend-button" onClick={this.startWeekend}>GO WEEKEND!</button>
          <br/>
          <div className="weekend-messages">
            <br/><br/>{this.state.messages}
          </div>
        </div>);
    }

    resultsScreen() {
      return (
        <div className="results-screen1">
          <br/>
          {this.scoreChange()}
          {this.skillChange()}
          {this.happinessChange()}
        </div>
        );
    }

    alarmScreen() {
      var bedTime = this.player.clock.convertToAmPm(this.bedTime);
      var nowAmPm = this.player.clock.convertToAmPm(this.now);
      return (
        <div className="results-screen2">
            LEFT SCHOOL  : {`${nowAmPm[0]}:${nowAmPm[1]}${nowAmPm[2]}`} <br/>
          READY FOR BED: {`${bedTime[0]}:${bedTime[1]}${bedTime[2]}`} <br/>
        {this.coffeePenaltyMessage} <br/>
        {this.alarmClock()} <br/>
        </div>
      );
    }

    weekendScreen() {
      return (
        <div className="weekend-screen">
          <br/>
          THE WEEKEND IS HERE!<br/>CHOOSE 3 AREAS TO FOCUS ON THIS WEEKEND<br/> <br/>(you can choose the same category more than once!)<br/><br/>
        {this.weekendSetter()} <br/>
        </div>
      );

    }

    screen() {
      if (this.screenCounter ===1){
        return this.resultsScreen();
      } else if (this.screenCounter === 2) {
        if (this.player.dayNum % 7 === 5) {
          return this.weekendScreen();
        } else {
          return this.alarmScreen();
        }
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
