import React from 'react';
import Clock from './../../game_logic/clock.js';

class StrikeScreen extends React.Component {
  constructor (props) {
    super(props);
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
    this.props.player.message="";
    this.props.player.newCongrats = false;

  }

  render () {
    return (
      <div className="congrats" onClick={this.handleClick}>  CONGRATULATIONS!!!
      </div>
    );
  }

}//end component


export default StrikeScreen;
