import React from 'react';
import Clock from './../../game_logic/clock.js';

class CongratsScreen extends React.Component {
  constructor (props) {
    super(props);
    this.player = this.props.player;
    this.congrats = this.player.newCongrats;
    this.startTime = Date.now();
    this.buzzerSound = new Audio("./app/assets/sounds/congrats-ding.wav");
    this.buzzerSound.play();
    this.player.happiness += 5;

    this.skill = this.player.currentSkill;
    this.skillCapitalized = this.skill.charAt(0).toUpperCase() + this.skill.slice(1);
    this.player.skills[this.skill] += 50;
    this.player.tempMessage = "=========== Happiness: +5  " + this.skillCapitalized + " " + " skill: +5%  =========== " + this.congrats.message;
    this.handleClick = this.handleClick.bind(this);
    this.player.newFace = {filename: "super_happy", duration: 30};

    // this.main = this.main.bind(this);


  }

  handleClick() {
    var newClockSpeed;
    if (Date.now() - this.startTime < 1000) {return;}
    else {
      if (this.congrats.newClockSpeed) {
        newClockSpeed = this.congrats.newClockSpeed;
      } else {
        newClockSpeed = this.player.defaultClockSpeed;
      }
      this.player.clock = new Clock (this.congrats.newTime, newClockSpeed);
      if (!(this.congrats.newPos===undefined)) {
        this.player.currentPos = this.congrats.newPos;
      }
      if (this.congrats.newSession) {
        this.player.session = this.congrats.newSession;
      }
      this.player.newCongrats = false;}

  }

  render () {
    return (
      <div className="congrats" onClick={this.handleClick}>  CONGRATULATIONS!!!
        <img src="./app/assets/images/ned2.png" className="congrats-teacher-image"/>

      </div>
    );
  }

}//end component


export default CongratsScreen;
