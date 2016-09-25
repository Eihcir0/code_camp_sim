import React from 'react';
// import someother component from './somewhere';
// import someother component from './somewhere';
import Game from './../../game_logic/game.js';
import Player from './../../game_logic/player.js';
import playerAnim from './../../game_logic/animation_logic/player_anim.js';
import OpenSeshScreen from './open_sesh_screen.jsx';

//before this I will have a modal that asks for the player name
//and asks if they want to create an account

class GameMain extends React.Component {
  constructor() {
    super();
    this.state = {
      currentFace: "happy1",
      player: new Player(),
      playerAnim: {}
    };
    this.currentFaceImage = this.currentFaceImage.bind(this);
    this.buttons = this.buttons.bind(this);
    this.game = new Game(this.state.player);

    // window.setInterval(()=>this.updateCurrentFace(),200);
  }

  componentDidMount() {
    this.setState({playerAnim: new playerAnim({player: this.state.player})});
  }

  updateCurrentFace() {
    switch (this.state.player.currentEmotion) {
      case "excited":
      var t = Math.random();
      if (t < 0.2) {
        this.setState({currentFace: "happy2"});
      } else {
        this.setState({currentFace: "happy1"});
      }
        break;
      default:
        break;

    }
  }

  currentFaceImage() {
    if (this.state.currentFace === "happy1") {
      return (
        <img className="player-pic" src="./app/assets/images/frontface3.png"></img>
      );
    } else {return (
      <img className="player-pic" src="./app/assets/images/frontface2.png"></img>

    );}
  }

  sesh() {
    if ([0,2,4].includes(this.state.player.session)) {
      return (
        <OpenSeshScreen className="open-sesh"
          player={this.state.player}
          playerAnim ={this.state.playerAnim}/>
      );
    } else {
      return (
        <div>ANOTHER SESSION</div>
        );
    }
  }

  message() {
    if (this.state.player.currentPos === 10) { //change this
      return "CLICK ON THE OPEN WORK STATION RIGHT THERE TO START PROGRAMMING!";
    }
    else if (this.state.player.onFire) {
      return "YOU'RE ON FIRE!";
    }
    else {
      return this.state.player.message;
    }
  }

  buttons() {
    if (this.state.player.currentPos === 11)  {
      return (<button className="left-sidebar" onClick={()=>true}>QUIT</button>);
      }
  }


  render() {
    //{array} or <component className="" onClick={}
    return (
      <section>
        <span className="game-title">CODE CAMP SIM</span>
        <div className="game-middle-container">
          <div className="game-buttons">

            {this.buttons()}


          </div>
          {this.sesh()}
          <div className="game-right-side">
            <div>8:37am  w1d2</div>
            <div className="stats-bar">
              <meter value={this.state.player.sleepBank} min="0" max="100" low="30" high="70" optimum="100"/>
              <img className="icon" src="./app/assets/images/bed.png" />
              <meter value={this.state.player.happiness} min="0" max="100" low="30" high="70" optimum="100"/>
              <img className="icon" src="./app/assets/images/happy.jpeg" />
              <meter value={this.state.player.focus} min="0" max="100" low="30" high="70" optimum="100"/>
              <img className="icon" src="./app/assets/images/star.png" />
              <span className="score">{this.state.player.score}</span>
              <span className="player-title"><br/>LEVEL: {this.state.player.scoreTitle()}</span>
              <br/><br/>
              <span className="current-subject"><img className="icon" src="./app/assets/images/ruby.png" /> 37% <br/></span>
              <br/><span className="strikes">STRIKES: {this.state.player.strikes}</span>
              <br/>
              <br/>
              {this.currentFaceImage()}
            </div>
            <div className="player-pic-holder">
            </div>
          </div>
        </div>
        <div className="game-messages">{this.message()} </div>
      </section>
    );
  }
}

export default GameMain;
