import React from 'react';
// import someother component from './somewhere';
// import someother component from './somewhere';
import Game from './../../game_logic/game.js';

class GameMain extends React.Component {
  constructor() {
    super();

    // this.undo = this.undo.bind(this);

    this.state = {
      // game: new Game
    };
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
          <div className="game-center-screen">GAMESCREEN</div>
          <div className="game-right-side">
            <div>8:37am  w1d2</div>
            <div className="stats-bar">
              <meter value="95" min="0" max="100" low="30" high="70" optimum="100"/>
              <img className="icon" src="./app/assets/images/bed.png" />
              <meter value="55" min="0" max="100" low="30" high="70" optimum="100"/>
              <img className="icon" src="./app/assets/images/bed.png" />
              <meter value="25" min="0" max="100" low="30" high="70" optimum="100"/>
              <img className="icon" src="./app/assets/images/star.png" />
              <span className="score">95,555</span>
              <span className="player-title"><br/>n00B</span>
            </div>
            <div ><br/><br/><br/><br/><br/><br/>
              <img className="player-pic" src="./app/assets/images/Untitled.png" />
            </div>
          </div>
        </div>
        <div className="game-messages">MESSAGES Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </div>
      </section>
    );
  }
}

export default GameMain;
