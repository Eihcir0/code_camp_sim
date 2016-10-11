import React from 'react';
import Clock from './../../game_logic/clock.js';

class PairsSeshOpenScreen extends React.Component {
  constructor() {
    super();
    this.handleClick=this.handleClick.bind(this);


  }

  handleClick() {
    this.props.player.clock.unpause();
    this.props.current = 1;
  }

  render() {
      return (
        <div className="pairs-open">
          PAIR PROGRAMMING TIME!
          Be a good, collaborative pair programmer!
          Switch with your partner every 30 minutes!!
          That is much more important than getting the code right...

          <button className="lets-pair" onClick={this.handleClick}>LET'S PAIR!</button>

        </div>


    );

  }

}//end component



export default PairsSeshOpenScreen;
