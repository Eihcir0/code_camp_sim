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
        It's time for PAIR PROGRAMMING!
        The real point of pair programming in Code Camp is to learn how to
        be a good, collaborative pair programmer. You shouldn't worry as much about
        the code as you should try to switch with your partner every 30 minutes.

        <button className="lets-pair" onClick={this.handleClick}>LET'S PAIR!</button>

      </div>


    );

  }

}//end component



export default PairsSeshOpenScreen;
