import React from 'react';
import Clock from './../../game_logic/clock.js';

class StrikeScreen extends React.Component {
  constructor (props) {
    super(props);
    this.strike = this.props.player.newStrike;

    this.startTime = Date.now();
    this.buzzerSound = new Audio("./app/assets/sounds/buzzer.mp3");
    this.buzzerSound.play();
    if (this.props.player.onFire) {this.props.player.onFire=false;}
    this.props.player.strikes = this.props.player.strikes + "X";
    this.props.player.happiness -= 20;
    this.props.player.tempMessage = this.strike.message +
    `  You now have ${this.props.player.strikes.length}
    strike${this.props.player.strikes.length>1 ? "s" : ""}!`;
    this.handleClick = this.handleClick.bind(this);
    this.props.player.newFace = {filename: "tired_angry", duration: 10000};

    }


  handleClick() {
    var newClockSpeed;
    if (Date.now() - this.startTime < 1000) {return;}
    else {
      if (this.strike.newClockSpeed) {
        newClockSpeed = this.strike.newClockSpeed;
      } else {
        newClockSpeed = this.props.player.defaultClockSpeed;
      }
      this.props.player.newFace=false;
      this.props.player.clock = new Clock (this.strike.newTime, newClockSpeed);
      if (this.strike.newPos !== false) {
        this.props.player.currentPos = this.strike.newPos;
      }
      if (this.strike.newSession) {
        this.props.player.session = this.strike.newSession;
      }
      this.props.player.newStrike = false;}

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
