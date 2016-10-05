import React from 'react';
import PairsSeshDrivingScreen from './pairs_sesh_driving_screen.jsx';
import PairsSeshNavigatingScreen from './pairs_sesh_navigating_screen.jsx';
import PairsSeshOpenScreen from './pairs_sesh_open_screen.jsx';
import PairsSeshResults from './pairs_sesh_results.jsx';

class PairsSeshScreen extends React.Component {
  constructor (props) {
    super(props);
    // this.currentSesh = this.currentSesh.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.sesh = this.sesh.bind(this);
    this.newSwitch = this.newSwitch.bind(this);
    this.current = 1;
    this.stopDriving = false;
    this.stopNav = true;
    this.drivingSentences = [];
    this.navigatingSentences = [];
    this.drivingLines = [0,0];
    this.navigatingLines = [0,0];
    this.goodSwitches = 0;
    this.badSwitches = 0;
    this.lastSwitch = ["1","30","pm"];

  }
  //
  // componentDidMount() {
  // }

  newSwitch() {
    //if time from last is 25-30 min then good switch else bad swithc
    //set lastSwitch to now
    var clock = this.props.player.clock;
    var diff = clock.diff(this.lastSwitch);
    this.lastSwitch = clock.time();
    if (diff > 25 && diff < 35) {
      this.goodSwitches++;
    } else {
      this.badSwitches++;
    }
  }

  handleClick() {
    if (this.current === 1) {  // 1 is driving 2 is navigating
        this.newSwitch();
        this.stopDriving=true;
        this.stopNav=false;
        this.current = 2;
        this.props.player.message = "FIND THE BUGS AND CORRECT THE CODE AS FAST AS YOU CAN!";

      } else {
        this.newSwitch();
        this.stopDriving=false;
        this.stopNav=true;
        this.current= 1;
        this.props.player.message = "TYPE THE TEXT AS FAST AS YOU CAN!";

      }
    }

  sesh() {

    if (this.props.player.clock.is(["6","00","pm"])) {
      this.props.player.clock.pause();
      this.current ===3;
      this.stopDriving = true;
      this.stopNavigating = true;
      this.props.player.message = "Today's pair programming results are in!";
      return (
        <PairsSeshResults
          drivingLines = {this.drivingLines}
          navigatingLines = {this.navigatingLines}
          goodSwitches = {this.goodSwitches}
          badSwitches = {this.badSwitches}
          player={this.props.player} />
      );
    } else {
    return (
      <div>
        <span className="pair-title">
          YOU ARE{(this.current===1) ? " DRIVING" : " NAVIGATING" }
        </span>

        <PairsSeshDrivingScreen
          sentences={this.drivingSentences}
          drivingLines = {this.drivingLines}
          stopped={this.stopDriving}
          current={this.current}
          player={this.props.player} />

        <PairsSeshNavigatingScreen
          sentences={this.navigatingSentences}
          navigatingLines = {this.navigatingLines}
          stopped={this.stopNav}
          current={this.current}
          player={this.props.player} />


        <button className="switch-button"
          onClick={this.handleClick}>SWITCH!</button>
      </div>
    );}

  }
  render() {
    return this.sesh();
  }


}//end component


export default PairsSeshScreen;
