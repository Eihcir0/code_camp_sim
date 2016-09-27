import React from 'react';
// import someother component from './somewhere';
// import someother component from './somewhere';
import Game from './../../game_logic/game.js';
import Player from './../../game_logic/player.js';
import Clock from './../../game_logic/clock.js';
import playerAnim from './../../game_logic/animation_logic/player_anim.js';
import OpenSeshScreen from './open_sesh_screen.jsx';
import LectureSeshScreen from './lecture_sesh_screen.jsx';
import PairsSeshScreen from './pairs_sesh_screen.jsx';
import StrikeScreen from './strike_screen.jsx';
import CongratsScreen from './congrats_screen.jsx';

//before this I will have a modal that asks for the player name
//and asks if they want to create an account

class GameMain extends React.Component {
  constructor() {
    super();
    this.player = new Player();
    this.player.clock = new Clock([8,0],60);
    this.playerAnim = new playerAnim({player: this.player});
    this.state = {
      currentFace: "happy1",
      currentPos: -1,
      message: "",
      clock: this.player.clock.time(),
      ruby: this.player.skills.Ruby,
      focus: this.player.focus
    };
    this.ticker = 0;
    this.currentFaceImage = this.currentFaceImage.bind(this);
    this.tick = this.tick.bind(this);
    this.updateAttributes = this.updateAttributes.bind(this);
    this.game = new Game(this.player);


    this.interval = window.setInterval(()=>this.tick(),20);
    // window.setInterval(()=>this.render(),200);
  }


  tick() {
    this.updateAttributes();
    this.currentFaceUpdate();
    this.setState({
      currentPos: this.player.currentPos,
      message: this.player.message,
      clock: this.player.clock.time(),
      ruby: Math.floor(this.player.skills.Ruby/10),
      focus: this.player.focus
    });
  }

  updateAttributes() {
    this.ticker++;
    if (this.ticker>5) {
      if (this.player.currentPos === 11) {
        this.player.focus--;}
      else if (this.player.currentPos !==12) {
        this.player.focus++;
        this.player.focus++;
        this.player.focus++;
      }
      if (this.player.focus>100) {this.player.focus = 100;}
      if (this.player.focus<0) {this.player.focus = 0;}

      this.ticker=0;
    }
  }

  currentFaceUpdate() {
    switch (this.player.currentEmotion) {
      case "eyes closed":
        this.setState({currentFace: "close eyes"});
        break;
      case "excited":
        this.setState({currentFace: "happy2"});
        break;
      default:
        this.setState({currentFace: "happy1"});

        break;
    }
  }

  currentFaceImage() {
    if (this.state.currentFace === "close eyes") {
      return (
        <img className="player-pic"
          src="./app/assets/images/frontface3.png"></img>
      );
    } else {return (
      <img className="player-pic"
        src="./app/assets/images/frontface2.png"></img>

    );}
  }

  sesh() { // change this to a switch
    if (this.player.newStrike) {
      return (
        <StrikeScreen player={this.player}/>
      );
    }
    else if (this.player.newCongrats) {
      return (
        <CongratsScreen player={this.player}/>
      );
    }

    else if (this.state.currentPos === 12){
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

  message() {
    if (this.player.currentPos === 10) { //change this
      return "CLICK ON THE OPEN WORK STATION RIGHT THERE TO START PROGRAMMING!";
    }
    else if (this.player.onFire) {
      return "YOU'RE ON FIRE!";
    }
    else {
      return this.player.message;
    }
  }



  // randomFace() {
  //   switch (this.player.currentEmotion) {
  //     case "excited":
  //     var t = Math.random();
  //     if (t < 0.2) {
  //       this.setState({currentFace: "happy2"});
  //     } else {
  //       this.setState({currentFace: "happy1"});
  //     }
  //       break;
  //     default:
  //       break;
  //   }
  // }


  render() {
    //{array} or <component className="" onClick={}
    return (
      <section>
        <span className="game-title">CODE CAMP SIM</span>
        <div className="game-middle-container">
          {this.sesh()}
          <div className="game-right-side">
            <div>
              w1d2    {this.state.clock[0]}:{this.state.clock[1]}{this.state.clock[2]}</div>
            <div className="stats-bar">
              <meter value={this.player.sleepBank} min="0" max="100" low="30" high="70" optimum="100"/>
              <img className="icon" src="./app/assets/images/bed.png" />
              <meter value={this.player.happiness} min="0" max="100" low="30" high="70" optimum="100"/>
              <img className="icon" src="./app/assets/images/happy.jpeg" />
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
