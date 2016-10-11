import React from 'react';
import Clock from './../../game_logic/clock.js';

class PairsSeshOpenScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.player.tempMessage="";
    this.handleClick=this.handleClick.bind(this);


  }

  handleClick() {
    this.props.cb();
  }

  render() {
      return (
        <div className="pairs-open">
          PAIR PROGRAMMING TIME!<br/>
        <br/><br/>
      TIP: Switch with your partner every 30 minutes!!<br/><br/>
    That is more important than getting the code right...<br/>
  <br/>

          <button className="lets-pair" onClick={this.handleClick}>LET'S PAIR!</button>

        </div>


    );

  }

}//end component



export default PairsSeshOpenScreen;
