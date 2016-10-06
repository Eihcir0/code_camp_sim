import React from 'react';
import Clock from './../../game_logic/clock.js';

class CongratsScreen extends React.Component {
  constructor (props) {
    super(props);
    this.congrats = this.props.player.newCongrats;
    this.startTime = Date.now();
    this.buzzerSound = new Audio("./app/assets/sounds/congrats-ding.wav");
    this.buzzerSound.play();

    this.props.player.message =
    this.congrats.message;
    debugger;
    this.handleClick = this.handleClick.bind(this);
    // this.main = this.main.bind(this);


  }

  handleClick() {
    var newClockSpeed;
    if (Date.now() - this.startTime < 2000) {return;}
    else {
      if (this.congrats.newClockSpeed) {
        newClockSpeed = this.congrats.newClockSpeed;
      } else {
        newClockSpeed = 6;
      }
      this.props.player.clock = new Clock (this.congrats.newTime, newClockSpeed);
      if (!(this.congrats.newPos===undefined)) {
        this.props.player.currentPos = this.congrats.newPos;
      }
      if (this.congrats.newSession) {
        this.props.player.session = this.congrats.newSession;
      }
      this.props.player.newCongrats = false;}

  }

  render () {
    return (
      <div className="congrats" onClick={this.handleClick}>  CONGRATULATIONS!!!
      </div>
    );
  }

}//end component


export default CongratsScreen;
