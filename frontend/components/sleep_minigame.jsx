import React from 'react';

class SleepMinigame extends React.Component {
  constructor (props) {
    super(props);
    // this.main = this.main.bind(this);

    this.state= {
      // lastTime: Date.now()
      // isLiked: false
    };

  }



  render () {
    return (
      <div className="eyes-closed" >
          BE CAREFUL.
          IF THIS BAR FILLS UP THEN YOU FALL ASLEEP!
                <meter className="faint-meter-bar" value={this.props.goesToSleepMeter} low={this.props.player.sleepBank -0.5} max={this.props.player.sleepBank} />
      </div>
    );
  }

}//end component


export default SleepMinigame;
