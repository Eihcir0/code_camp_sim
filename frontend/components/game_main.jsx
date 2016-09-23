import React from 'react';
// import someother component from './somewhere';
// import someother component from './somewhere';
import Game from './../../game_logic/game.js';
import OpenSeshScreen from './open_sesh_screen.jsx';

class GameMain extends React.Component {
  constructor() {
    super();
    this.player = {session: 0, currentPos: 0, lastCurrentPos: null, message: "", lastIconTime: 0};
    this.currentFaceImage = this.currentFaceImage.bind(this);
    // this.undo = this.undo.bind(this);

    this.state = {
      currentFace: "happy1",
      // game: new Game
    };
    window.setInterval(()=>this.updateCurrentFace(),200);
  }

  updateCurrentFace() {
    if (Math.floor(Math.random()*20)===1) {
      this.setState({currentFace: "happy1"});
    } else {
      this.setState({currentFace: "happy2"});
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
    if (this.player.session===0) { return (
      <OpenSeshScreen className="open-sesh" player={this.player}/>
    );} else {
      return (
        <div>ANOTHER SESSION</div>
        );
    }
  }

  message() {
    if (this.player.currentPos === 10) { //change this
      return "What do you want asshole?";
    }
    else {return this.player.message;}
  }


  render() {
    //{array} or <component className="" onClick={}
    return (
      <section>
        <span className="game-title">CODE CAMP SIM</span>
        <div className="game-middle-container">
          <div className="game-buttons">
            <button>TALK TO SECRETARY</button>
            <button>WORKSTATION</button>
            <button>LECTURE</button>
            <button>KITCHEN</button>
            <button>QUIT</button>


          </div>
          {this.sesh()}
          <div className="game-right-side">
            <div>8:37am  w1d2</div>
            <div className="stats-bar">
              <meter value="95" min="0" max="100" low="30" high="70" optimum="100"/>
              <img className="icon" src="./app/assets/images/bed.png" />
              <meter value="55" min="0" max="100" low="30" high="70" optimum="100"/>
              <img className="icon" src="./app/assets/images/happy.jpeg" />
              <meter value="25" min="0" max="100" low="30" high="70" optimum="100"/>
              <img className="icon" src="./app/assets/images/star.png" />
              <span className="score">95,555</span>
              <span className="player-title"><br/>LEVEL: n00B</span>
              <br/><br/>
              <span className="current-subject"><img className="icon" src="./app/assets/images/ruby.png" /> 37% <br/></span>
              <br/><span className="strikes">STRIKES: ✘✘✘✘✘✘✘✘</span>
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
