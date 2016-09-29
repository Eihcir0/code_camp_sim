import React from 'react';
import PairsSeshDrivingScreen from './pairs_sesh_driving_screen.jsx';
// import PairsSeshNavigatingScreen from './pairs_sesh_navigating_screen.jsx';

class PairsSeshScreen extends React.Component {
  constructor (props) {
    super(props);
    this.currentSesh = this.currentSesh.bind(this);
    this.current = 0;
  }
  //
  // componentDidMount() {
  // }

  currentSesh() {
    return (
    <PairsSeshDrivingScreen player={this.props.player} />);
  }

  render() {
    return (
      this.currentSesh()
    );
  }


}//end component


export default PairsSeshScreen;
