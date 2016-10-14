import React from 'react';

class GameOver extends React.Component {
  constructor (props) {
    super(props);
    this.player = this.props.player;
    this.player.clock.pause();
    this.startTime = Date.now();
    this.reason = this.props.reason;
    this.buzzerSound = new Audio("./app/assets/sounds/buzzer.mp3");
    this.buzzerSound.play();
    this.player.tempMessage = this.reason;
    this.handleClick = this.handleClick.bind(this);
    this.player.newFace = {filename: "tired_angry", duration: 10000};
    }


  handleClick() {
    location.reload();
  }

  render () {
    return (
      <div className="game-over" onClick={this.handleClick}>
        <span className="game-over-text">GAME OVER <br/><br/></span>
        Click To Start Over
      </div>
    );
  }

}//end component


export default GameOver;
