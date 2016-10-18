import React from 'react';
import Game from './../../game_logic/game.js';
import Player from './../../game_logic/player.js';
import Clock from './../../game_logic/clock.js';
import Week from './../../game_logic/week.js';
import playerAnim from './../../game_logic/animation_logic/player_anim.js';
import OpenSeshScreen from './open_sesh_screen.jsx';
import LectureSeshScreen from './lecture_sesh_screen.jsx';
import NightSeshScreen from './night_sesh_screen.jsx';
import PairsSeshScreen from './pairs_sesh_screen.jsx';
import StrikeScreen from './strike_screen.jsx';
import GameOver from './game_over.jsx';
import CongratsScreen from './congrats_screen.jsx';
import FaceAnim from './face_anim.jsx';
//before this implement a modal that asks for the player name
//and asks if they want to create an account

class GameMain extends React.Component {
  constructor() {
    super();
    //HAVE TO DEAL WITH ATE LUNCH SHIT - reset each day, these should be tracked in day
    this.player = new Player("Guest");
    this.player.loading = true;
    if (this.player.week===undefined) {
      this.week = new Week(this.player);
      this.player.week = this.week;
      this.player.day = this.week.day;
    } else {
      this.week = this.player.week;
    }
    this.player.clock.pause();
    this.playerAnim = new playerAnim({player: this.player});

    this.state = {
      currentPos: -1,
      message: this.player.message,
      clock: this.player.clock.time(),
      ruby: this.player.skills.ruby,
      focus: this.player.focus
    };
    this.attributeTicker = 0;
    this.tick = this.tick.bind(this);
    this.updateAttributes = this.updateAttributes.bind(this);
    this.checkAteLunch = this.checkAteLunch.bind(this);
    this.handleLeaving = this.handleLeaving.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.ticksPerSecond = 100; //<<=If changed then update Clock class
    this.intervalTime = 1000 / this.ticksPerSecond;

  }

  tick() {
    this.player.clock.tick();
    var dt = (this.player.clock.tickCounter - this.player.clock.lastTickerCount);
    if (dt>=300) {
      this.player.clock.lastTickerCount = this.player.clock.tickCounter + 5 - 5;
      this.setState({
        currentPos: this.player.currentPos,
        clock: this.player.clock.time()
      });
      this.updateSession();

      if ([0,2,4].includes(this.player.session)) {this.updateAttributes(dt);}
    }
    this.setState({
      message: this.updateMessage(),
      ruby: Math.floor(this.player.skills.ruby/10),
      focus: this.player.focus
    });
    //animationFramE ????
  }

  handleLeaving() {
    this.player.clock.pause();
    if (this.player.clock.is([2,0])) {
        this.player.tempMessage = `  You're exhausted.  Must go home now....Your current rank is ${this.player.scoreTitle()}.  Here are the results of the day.`;
    } else {
      this.player.tempMessage = `  Your current rank is ${this.player.scoreTitle()}.  Here are the results of the day.`;}
    //handle strikes for leaving early
    //handle slept in office
    //add option to go out
    this.player.session = 5;
  }



  updateSession() {
    //WARNINGS SHOULD GO FIRST
    if (this.player.leaving) {
      this.handleLeaving();
    }
    if (this.player.session === 0 && this.player.currentPos !==12) {
      if (this.player.clock.is(["9","00","am"])) {
       if (this.player.talkingToCandanessa) {
         this.player.talkingToCandanessa = false;
         this.player.day.eatingLunch = false;
         this.player.currentPos = 0;
       }
       this.player.newStrike = {message: "You received a strike for tardiness to morning lecture.  Get to the lecture area immediately or you will receive another strike for missing the lecture!", newTime: [9,1], newPos: this.player.currentPos, newClockSpeed: this.player.defaultClockSpeed };
      }
      else if (this.player.clock.is(["9","30","am"])) {
       this.player.newStrike = {message: "You cannot enter the lecture hall after 9:30am.  You received a strike for missing morning lecture.", newTime: [9,31], newClockSpeed: this.player.defaultClockSpeed, newPos: this.player.currentPos};
      }
    }
    if (this.player.clock.is(["12","01","pm"])) {
      this.player.session = 2;
      this.player.message = "It's lunch time. Take a lunch break but be sure to be at your workstation by 1:30pm for pair programming.";
    }

    if (this.player.clock.is(["1","30","pm"])) {
      if (this.player.currentPos !== 11) {
        if (this.player.day.eatingLunch) {
          this.player.day.eatingLunch =false;
          this.player.day.ateLunch=true;}
        this.checkAteLunch();
        this.player.newStrike = {message: "You received a strike for not being seated at your workstation by 1:30pm for pair programming. ", newTime: [13,30], newClockSpeed: this.player.defaultClockSpeed, newSession: 3, newPos: 11};
      }
      else {
        this.checkAteLunch();
        this.player.clock = new Clock([13,31], this.player.defaultClockSpeed);
        this.player.session = 3;
      }
    }
  }

  checkAteLunch() {
    //if the player hasnt eaten lunch then they get a penalty for rest of day on max energy...launch a new warning.
    if (!(this.player.day.ateLunch)) {
      //ADD A WARNING SCREEN
      this.player.message = "BECAUSE YOU DIDN'T TAKE A LUNCH BREAK YOU ARE LIMITED TO HALF ENERGY FOR THE DAY";

      this.player.day.noLunchPenalty = 0.5;
      var maxEnergy = this.player.sleepBank*this.player.day.noLunchPenalty;
      if (this.player.focus>maxEnergy) {this.player.focus=maxEnergy;}

    }
  }

  updateAttributes(dt) { //REDO THIS SOON
    //use helper methods for each attribute
      var maxEnergy = this.player.sleepBank*this.player.day.noLunchPenalty;
      var realMax = Math.max(this.player.focus, maxEnergy);
      if (this.player.working()) {
        this.player.focus -=0.5;
      } else {
        if (this.player.focus < maxEnergy) {
          this.player.focus += this.player.focus<30 ? 0.3 : 2.7; // first 30 charges super slow
        }
      }
      if (this.player.focus<0) {this.player.focus = 0;}
      if (this.player.focus>100) {this.player.focus = 100;}
      if (this.player.sleepBank<0) {this.player.sleepBank = 0;}
      if (this.player.sleepBank>100) {this.player.sleepBank = 100;}
      if (this.player.happiness<0) {this.player.happiness = 0;}
      if (this.player.happiness>100) {this.player.happiness = 100;}
    }

    handleOpen() {
      this.player.clock.unpause();
      this.player.loading = false;
      this.interval = window.setInterval(this.tick,this.intervalTime);
    }

  gameOver() {
    
    switch (true) {
      case (this.player.assessments.includes("FAIL")):
        return "You failed an assessment.  You've been asked to leave the program.";
      case (this.player.happiness <= 0):
        return "You're happiness is at 0.  You don't have the motivation to continue with the program.";
      case (this.player.sleepBank <= 0):
        return "Your sleep bank is at 0.  You're exhausted.  You can't continue with the program.";
      case (this.player.strikes === "XXXXXXXXXX"):
        return "You had your chance.  10 in fact.  10 strikes and you're out.";

      default:
        return false;
    }
  }


  sesh() { // change this to a switch
    var reason = this.gameOver();
    if (this.player.loading) {
      return <button className="leave-button-big" onClick={this.handleOpen}>
        PRESS TO START </button>;
      }
    if (this.player.newStrike) {
      this.player.clock.pause();
      return (
        <StrikeScreen player={this.player}/>
      );
    }
    if (reason) {
      return <GameOver reason={reason} player={this.player}/>;
    }

    else if (this.player.newCongrats) {
      this.player.clock.pause();
      return (
        <CongratsScreen player={this.player}/>
      );
    }
    else if (this.player.session === 5) {
      return (<NightSeshScreen  player={this.player}/>);
    }
    else if (this.player.session === 3) {
      return (<PairsSeshScreen  player={this.player}/>);
    }

    else if (this.player.currentPos === 12){
        return (
          <LectureSeshScreen className="lecture-sesh"
            player={this.player}/>
          );

    } else if ([0,2,4].includes(this.player.session)) {
        return (
          <OpenSeshScreen className="open-sesh"
            player={this.player}
            playerAnim ={this.playerAnim}/>
      );
    }
  }

  updateMessage() {
    if (this.player.tempMessage) {
      // if (this.player.oldMessage!==this.player.tempMessage) {this.player.message = this.tempMessage;}
      return this.player.tempMessage;
    }
    if (this.player.message==="You can't focus any longer.  Take a break."
    && this.player.focus>30) {
      this.player.message = this.player.oldMessage;
    }

    if (this.player.currentPos === 10) { //change this
      return this.week.day.secretaryMessage();
    }
    else if (this.player.onFire) {
      return "YOU'RE ON FIRE!";
    }
    else {

      return (this.player.message ? this.player.message : this.player.defaultMessage);
    }
  }


  render() {
    return (
      <section>
        <span className="game-title">CODE CAMP SIM (ver 0.7.5)</span>

        <div className="game-middle-container">
          {this.sesh()}
          <div className="game-right-side">
            <div className="clock-area">
              {this.player.weekDayText()} w{this.player.weekNum}d{this.player.dayNum}<br/>

              <span className="clock">{this.state.clock[0]}:{this.state.clock[1]}{this.state.clock[2]}</span>

            </div>
            <div className="stats-bar">
              <meter value={this.player.sleepBank} min="0" max="100" low="30" high="70" optimum="100"/>
              <img className="icon" src="./app/assets/images/bed.png" />
              <meter value={this.player.happiness} min="0" max="100" low="30" high="70" optimum="100"/>
              <img className="icon" src="./app/assets/images/happy.png" />
              <meter value={this.player.focus} min="0" max="100" low="30" high="70" optimum="100"/>
              <img className="icon" src="./app/assets/images/star.png" /><br/>
              <span className="score">{this.player.score}</span><br/>
              <span className="player-title">
                <br/>LEVEL: {this.player.scoreTitle()}
              </span>
              <br/><br/>
              <span className="current-subject">
                SKILLS:
                <img className="icon" src="./app/assets/images/ruby.png" />
                 {this.state.ruby}% <br/>
              </span>
              <br/><span className="strikes">
                STRIKES:  <br/>
              {this.player.strikes}
              </span>
              <br/>
              <br/>

              <span className="player-name">{this.player.name}</span>
              <FaceAnim player={this.player}/>
            </div>
            <div className="player-pic-holder">
            </div>
          </div>
        </div>
        <div className="game-messages">{this.state.message} </div>
      </section>
    );
  }

}//end component

export default GameMain;
