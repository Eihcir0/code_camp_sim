import React from 'react';
import Clock from './../../game_logic/clock.js';

class StrikeScreen extends React.Component {
  constructor (props) {
    super(props);
    this.startTime = Date.now();
    this.buzzerSound = new Audio("./app/assets/sounds/buzzer.mp3");
    this.buzzerSound.play();
    this.props.player.strikes = this.props.player.strikes + "X";
    this.props.player.message =
    `You received a strike for passing out during lecture.
    You now have ${this.props.player.strikes.length}
    strike${this.props.player.strikes.length>1 ? "s" : ""}!`;
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
    this.props.player.newStrike = false;}

  }

  render () {
    return (
      <div className="strike" onClick={this.handleClick}>
        <span className="x">X</span>
      </div>
    );
  }

}//end component


export default StrikeScreen;
