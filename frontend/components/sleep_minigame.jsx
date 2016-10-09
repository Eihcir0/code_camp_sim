import React from 'react';

class SleepMinigame extends React.Component {
  constructor (props) {

    super(props);
    this.props.player.newFace = {filename: "blink", duration: 1000};
  }


  sheepStyle() {
    var righty = `${(this.props.goesToSleepMeter*3)+600}px`;
    console.log(righty);
    return {right: righty};
  }

//old meter: <meter className="faint-meter-bar" value={this.props.goesToSleepMeter} low={this.props.player.sleepBank -0.5} max={this.props.player.sleepBank} />

  render () {
    var starsStyle = {opacity: ((this.props.goesToSleepMeter)/100)*2};
    return (
      <div className="eyes-closed" >
          YOU ARE GETTING SLEEPY....VERY SLEEEPY....
          <img src="./app/assets/images/sheep2.png" className="sheep-image" style={this.sheepStyle()}/>
      <img src="./app/assets/images/moon.png"
        className="rays" style={starsStyle} />
    </div>
    );
  }

}//end component


export default SleepMinigame;
