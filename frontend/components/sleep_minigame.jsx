import React from 'react';

class SleepMinigame extends React.Component {
  constructor (props) {

    super(props);
    this.props.player.newFace = {filename: "blink", duration: 1000};
  }


  sheepStyle() {
    var lefty = `${400-(this.props.goesToSleepMeter*3)}px`;
    return {left: lefty};
  }

//old meter: <meter className="faint-meter-bar" value={this.props.goesToSleepMeter} low={this.props.player.sleepBank -0.5} max={this.props.player.sleepBank} />

  render () {
    var starsStyle = {opacity: ((this.props.goesToSleepMeter)/100)*2};
    this.props.player.tempMessage = "When the sheep crosses the screen you're asleep...";

    return (
      <div className="eyes-closed" >
        <img src="./app/assets/images/moon.png"
          className="rays" style={starsStyle} />
          YOU ARE GETTING SLEEPY....VERY SLEEEPY....
          <img src="./app/assets/images/sheep2.png" className="sheep-image" style={this.sheepStyle()}/>
    </div>
    );
  }

}//end component


export default SleepMinigame;
