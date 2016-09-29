import React from 'react';
import PairsSeshDrivingScreen from './pairs_sesh_driving_screen.jsx';
import PairsSeshNavigatingScreen from './pairs_sesh_navigating_screen.jsx';

class PairsSeshScreen extends React.Component {
  constructor (props) {
    super(props);
    this.currentSesh = this.currentSesh.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.current = 0;
  }
  //
  // componentDidMount() {
  // }

  handleClick() {
    if (this.current === 0) {
      this.current = 1;}
      else {
        this.current=0;
      }
    }

  currentSesh() {
    if (this.current === 0) {
    return (
    <PairsSeshNavigatingScreen player={this.props.player} />);
    }
    else {
      return (
        <PairsSeshDrivingScreen player={this.props.player} />
      );
    }
  }

  render() {
    return (
      <div>
        <span className="pair-title">
          YOU ARE{(this.current===1) ? " DRIVING" : " NAVIGATING" }
        </span>
        {this.currentSesh()}
        <button className="switch-button" onClick={this.handleClick}>SWITCH!</button>
      </div>
    );
  }


}//end component


export default PairsSeshScreen;
