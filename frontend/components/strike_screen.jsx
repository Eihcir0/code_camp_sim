import React from 'react';
import Clock from './../../game_logic/clock.js';

class StrikeScreen extends React.Component {
  constructor (props) {
    super(props);
    this.player = this.props.player;

    this.strike = this.player.newStrike;

    this.startTime = Date.now();
    this.buzzerSound = new Audio("./app/assets/sounds/buzzer.mp3");
    this.buzzerSound.play();
    if (this.player.onFire) {this.player.onFire=false;}
    this.player.strikes = this.player.strikes + "X";
    this.player.happiness -= 20;
    if (this.player.arriveLate != undefined) {
      this.strike.message = this.player.arriveLate;
      this.player.arriveLate = undefined;
    }
    this.player.tempMessage = this.strike.message +
    `  You now have ${this.player.strikes.length}
    strike${this.player.strikes.length>1 ? "s" : ""}!`;
    this.handleClick = this.handleClick.bind(this);
    this.player.newFace = {filename: "tired_angry", duration: 10000};

    }


  handleClick() {
    var newClockSpeed;
    if (Date.now() - this.startTime < 1000) {return;}
    else {
      if (this.strike.newClockSpeed) {
        newClockSpeed = this.strike.newClockSpeed;
      } else {
        newClockSpeed = this.player.defaultClockSpeed;
      }
      this.player.newFace=false;
      this.player.clock = new Clock (this.strike.newTime, newClockSpeed);
      if (this.strike.newPos !== false) {
        this.player.currentPos = this.strike.newPos;
      }
      if (this.strike.newSession) {
        this.player.session = this.strike.newSession;
      }
      this.player.newStrike = false;}

  }

  render () {
    return (
      <div className="strike" onClick={this.handleClick}>
        <span className="x">X</span>
        <img src="./app/assets/images/ned1.png" className="strike-teacher-image"/>
      </div>
    );
  }

}//end component


export default StrikeScreen;
