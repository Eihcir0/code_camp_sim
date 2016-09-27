import React from 'react';
import Clock from './../../game_logic/clock.js';

class StrikeScreen extends React.Component {
  constructor (props) {
    super(props);
    this.startTime = Date.now();
    this.buzzerSound = new Audio("./app/assets/sounds/congrats-ding.wav");
    this.buzzerSound.play();

    this.props.player.message =
    `CONGRATULATIONS!!! You made it through lecture without sleeping!`;
    this.handleClick = this.handleClick.bind(this);
    // this.main = this.main.bind(this);
    this.state= {
      // lastTime: Date.now()
      // isLiked: false
    };

  }

  handleClick() {
    if (Date.now() - this.startTime < 2000) {return;}
    else {this.props.player.message="";
    this.props.player.newCongrats = false;}

  }

  render () {
    return (
      <div className="congrats" onClick={this.handleClick}>  CONGRATULATIONS!!!
      </div>
    );
  }

}//end component


export default StrikeScreen;
