import React from 'react';
// import someother component from './somewhere';
// import someother component from './somewhere';
import Game from './../../game_logic/game.js';
import Player from './../../game_logic/player.js';
import Clock from './../../game_logic/clock.js';
import Week from './../../game_logic/week.js';
import playerAnim from './../../game_logic/animation_logic/player_anim.js';
import OpenSeshScreen from './open_sesh_screen.jsx';
import LectureSeshScreen from './lecture_sesh_screen.jsx';
import PairsSeshScreen from './pairs_sesh_screen.jsx';
import StrikeScreen from './strike_screen.jsx';
import CongratsScreen from './congrats_screen.jsx';
import FaceAnim from './face_anim.jsx';

//before this I will have a modal that asks for the player name
//and asks if they want to create an account

class GameMain extends React.Component {
  constructor() {
    super();
    //HAVE TO DEAL WITH ATE LUNCH SHIT - reset each day, these should be tracked in day
    this.player = new Player("Guest");
    this.playerAnim = new playerAnim({player: this.player});
    this.week = new Week(this.player);

    this.state = {
      currentPos: -1,
      message: this.player.message,
      clock: this.player.clock.time(),
      ruby: this.player.skills.Ruby,
      focus: this.player.focus
    };
    this.attributeTicker = 0;
    this.tick = this.tick.bind(this);
    this.updateAttributes = this.updateAttributes.bind(this);
    this.checkAteLunch = this.checkAteLunch.bind(this);
    this.ticksPerSecond = 100; //<<=If changed then change Clock class
    this.intervalTime = 1000 / this.ticksPerSecond;
    this.interval = window.setInterval(()=>this.tick(),this.intervalTime);
  }



  tick() {
    this.player.clock.tick();
    var dt= (this.player.clock.tickCounter - this.player.clock.lastClockTickCounter);
    if (dt>300) {
      this.player.clock.lastClockTickCounter = this.player.clock.tickCounter;
      this.setState({
        currentPos: this.player.currentPos,
        clock: this.player.clock.time()
      });
      this.updateSession();

      this.updateAttributes(dt);
    }
    this.setState({
      message: this.updateMessage(),
      ruby: Math.floor(this.player.skills.Ruby/10),
      focus: this.player.focus
    });
    //animationFramE ????
  }

  updateSession() {
    //WARNINGS SHOULD GO FIRST
    if (this.player.session === 0 && this.player.currentPos !==12) {
      if (this.player.clock.is(["9","00","am"])) {
       this.player.newStrike = {message: "You received a strike for tardiness to morning lecture.  Get to the lecture area immediately or you will receive another strike for missing the lecture!", newTime: [9,1], newPos: this.player.currentPos, newClockSpeed: this.player.defaultClockSpeed, };
      }
      else if (this.player.clock.is(["9","30","am"])) {
       this.player.newStrike = {message: "You cannot enter the lecture hall after 9:30am.  You received a strike for missing morning lecture.", newTime: [9,31], newClockSpeed: this.player.defaultClockSpeed, newPos: this.player.currentPos};
      }
    }
    if (this.player.clock.is(["12","01","pm"])) {
      this.player.session = 2;
      this.player.message = "It's lunch time. Take a lunch break but be sure to be logged in at your workstation by 1:30pm for pair programming.";
    }

    if (this.player.clock.is(["1","30","pm"])) {
      if (this.player.currentPos !== 11) {
        if (this.player.eatingLunch) {
          this.player.eatingLunch =false;
          this.player.ateLunch=true;}
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
    if (!(this.player.ateLunch)) {
      //ADD A WARNING SCREEN
      this.player.message = "BECAUSE YOU DIDN'T TAKE A LUNCH BREAK YOU ARE LIMITED TO HALF ENERGY FOR THE DAY";
      console.log("BECAUSE YOU DIDN'T TAKE A LUNCH BREAK YOU ARE LIMITED TO HALF ENERGY FOR THE DAY");
      this.player.noLunchPenalty = 0.5;

    }
  }

  updateAttributes(dt) { //REDO THIS SOON
    //use helper methods for each attribute

      var maxEnergy = this.player.sleepBank*this.player.noLunchPenalty;
      console.log(maxEnergy);
      if (this.player.currentPos === 11 && this.player.session !==3) {
        this.player.focus -=0.5;
      }
      else if (this.player.currentPos !==12 && this.player.session !==3) {
        if (this.player.focus>=30) {
          this.player.focus+=2.7;
        }

        this.player.focus+=0.3;
      }
      if (this.player.focus>maxEnergy) {this.player.focus = maxEnergy;}
      if (this.player.focus<0) {this.player.focus = 0;}

  }

  sesh() { // change this to a switch

    if (this.player.newStrike) {
      this.player.clock.pause();
      return (
        <StrikeScreen player={this.player}/>
      );
    }
    else if (this.player.newCongrats) {
      this.player.clock.pause();
      return (
        <CongratsScreen player={this.player}/>
      );
    }
    else if (this.player.session == 3) {
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
    //{array} or <component className="" onClick={}
    return (
      <section>
        <span className="game-title">CODE CAMP SIM (ver 0.7.2)</span>

        <div className="game-middle-container">
          {this.sesh()}
          <div className="game-right-side">
            <div>
              w1d2    {this.state.clock[0]}:{this.state.clock[1]}{this.state.clock[2]}</div>
            <div className="stats-bar">
              <meter value={this.player.sleepBank} min="0" max="100" low="30" high="70" optimum="100"/>
              <img className="icon" src="./app/assets/images/bed.png" />
              <meter value={this.player.happiness} min="0" max="100" low="30" high="70" optimum="100"/>
              <img className="icon" src="./app/assets/images/happy.png" />
              <meter value={this.player.focus} min="0" max="100" low="30" high="70" optimum="100"/>
              <img className="icon" src="./app/assets/images/star.png" />
              <span className="score">{this.player.score}</span>
              <span className="player-title">
                <br/>LEVEL: {this.player.scoreTitle()}
              </span>
              <br/><br/>
              <span className="current-subject">
                <img className="icon" src="./app/assets/images/ruby.png" />
                 {this.state.ruby}% <br/>
              </span>
              <br/><span className="strikes">
                STRIKES:  {this.player.strikes}
              </span>
              <br/>
              <br/>
              <br/>
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
}

export default GameMain;
