import React from 'react';
import PairsSeshDrivingScreen from './pairs_sesh_driving_screen.jsx';
import PairsSeshNavigatingScreen from './pairs_sesh_navigating_screen.jsx';
import PairsSeshOpenScreen from './pairs_sesh_open_screen.jsx';

class PairsSeshScreen extends React.Component {
  constructor (props) {
    super(props);
    // this.currentSesh = this.currentSesh.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.current = 1;
    this.stopDriving = false;
    this.stopNav = true;
    this.drivingSentences = [];
    this.navigatingSentences = [];

  }
  //
  // componentDidMount() {
  // }

  handleClick() {
    if (this.current === 1) {  // 1 is driving 2 is navigating
        this.stopDriving=true;
        this.stopNav=false;
        this.current = 2;
        this.props.player.message = "FIND THE BUGS AND CORRECT THE CODE AS FAST AS YOU CAN!";

      } else {
        this.stopDriving=false;
        this.stopNav=true;
        this.current= 1;
        this.props.player.message = "TYPE THE TEXT AS FAST AS YOU CAN!";

      }
    }

  // currentSesh() {
  //   if (this.current === 2) {
  //   return (
  //   <PairsSeshNavigatingScreen
  //     sentences={this.navigatingSentences}
  //     stopped={this.stopNav}
  //     player={this.props.player} />
  //     );
  //   }
  //   else if (this.current===1) {
  //     return (
  //       <PairsSeshDrivingScreen
  //         sentences={this.drivingSentences}
  //         stopped={this.stopDriving}
  //         player={this.props.player} />
  //     );
  //   } else {
  //     return <PairsSeshOpenScreen current={this.current}/>;
  //   }
  // }

  render() {
    return (
      <div>
        <span className="pair-title">
          YOU ARE{(this.current===1) ? " DRIVING" : " NAVIGATING" }
        </span>

        <PairsSeshDrivingScreen
          sentences={this.drivingSentences}
          stopped={this.stopDriving}
          player={this.props.player} />

        <PairsSeshNavigatingScreen
          sentences={this.navigatingSentences}
          stopped={this.stopNav}
          player={this.props.player} />


        <button className="switch-button"
          onClick={this.handleClick}>SWITCH!</button>
      </div>
    );
  }


}//end component


export default PairsSeshScreen;
