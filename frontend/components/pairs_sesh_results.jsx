import React from 'react';
import Clock from './../../game_logic/clock.js';
import PairsLine from './pairs_line.jsx';

class PairsSeshResults extends React.Component {
    constructor (props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.startTime = Date.now();
      }


    handleClick() {
      var newClockSpeed;
      if (Date.now() - this.startTime < 2000) {return;}
      this.props.player.message = "You're done for the day!  Keep working or leave whenever you want!";
      this.props.player.currentPos = 0;
      this.props.player.session = 4;
      this.props.player.clock = new Clock ([18,1],3);

    }

    render () {
      return (
        <div className="pairs-results" onClick={this.handleClick}>
          driving lines:{this.props.drivingLines[0]} out of {this.props.drivingLines[1]} <br/>
    navigating lines:{this.props.navigatingLines[0]} out of {this.props.navigatingLines[1]} <br/>
        good switches: {this.props.goodSwitches} <br/>
      bad Switches: {this.props.badSwitches} <br/>
        </div>
      );
    }

  }//end component




export default PairsSeshResults;
