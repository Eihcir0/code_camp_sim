import React from 'react';
import SleepMinigame from './sleep_minigame.jsx';
import Clock from './../../game_logic/clock.js';

class LectureSeshScreen extends React.Component {
  constructor (props) {
    super(props);
    // this.main = this.main.bind(this);

    this.props.player.focus = 100;
    this.props.player.clock = new Clock([9,0],360);
    this.startingFocus = this.props.player.focus;
    this.eyesClosedTimer = 0;
    this.state= {
      currentSlide: 1,
      white: 0,
      black: 0,
      phase: 3,
      eyesClosed: false,
      focus: this.props.player.focus,
      faintMeter: 0,
      goesToSleepMeter: -50,
      time: this.props.player.clock.time()

      // lastTime: Date.now()
      // isLiked: false
    };
    this.faintMeterMax = this.props.player.sleepBank + 0;
    this.faintMeterOn = false;
    this.faintMeter = 0;
    this.goesToSleepMeter = -50;
    this.handleCloseEyesOn = this.handleCloseEyesOn.bind(this);
    this.handleCloseEyesOff = this.handleCloseEyesOff.bind(this);
    this.button = this.button.bind(this);
    this.tick = this.tick.bind(this);
    this.updateFocus = this.updateFocus.bind(this);
    this.updateFaintMeter = this.updateFaintMeter.bind(this);
    this.updateGoesToSleepMeter = this.updateGoesToSleepMeter.bind(this);
    // this.onClick = this.onClick.bind(this);
   this.xxinterval = setInterval(()=>this.tick(),50);
  }

  tick() {
    var time = this.props.player.clock.time();
    if ((time[0]==="10" && parseInt(time[1])>45) || time[0]==="11") {
        this.updateFocus();
        this.updateFaintMeter();
        if (this.state.eyesClosed) {this.updateGoesToSleepMeter();}
      }
    this.checkWinner(time);
  }

  checkWinner(time) {
    if (time[0]==="12") {
        clearInterval(this.xxinterval);
        this.xxinterval = undefined;
        this.props.player.newCongrats = true;
        this.props.player.currentPos = 0;
        this.props.player.clock = new Clock([12,0],60);
    }
  }

  updateGoesToSleepMeter() {
    this.goesToSleepMeter ++;
    this.goesToSleepMeter ++;
    if (this.goesToSleepMeter >= this.faintMeterMax) {
      clearInterval(this.xxinterval);
      this.xxinterval = undefined;
      this.props.player.newStrike = true;
      this.props.player.currentPos = 0;
      this.props.player.clock = new Clock([12,0],60);
      }
    this.setState({goesToSleepMeter: this.goesToSleepMeter});

  }

  updateFaintMeter () {
    if (this.state.eyesClosed) {
      this.faintMeter--;
      this.faintMeter--;
      this.faintMeter--;
      this.faintMeter--;
      this.faintMeter--;
      if (this.faintMeter <= 0) {
        this.faintMeter = 0;
        this.faintMeterOn = false;
      }
    }
    else {
      if (this.props.player.focus <= 0) {
      this.faintMeter++;
      if (this.faintMeter >= this.faintMeterMax) {
        clearInterval(this.xxinterval);
        this.xxinterval = undefined;
        this.props.player.newStrike = true;
        this.props.player.currentPos = 0;
        this.props.player.clock = new Clock([12,0],60);
        }
      }
    }
    this.setState({faintMeter: this.faintMeter});
  }

  updateFocus() {
    if (!(this.state.eyesClosed)) {
      this.props.player.focus--;
      if (this.props.player.focus<30 && (!(this.state.eyesClosed))) {
        this.props.player.message =
         "OH NO!  You're losing focus!  You might pass out soon...........  (PRESS AND HOLD THE BUTTON TO CLOSE EYES AND REGAIN FOCUS)";
        this.faintMeterOn = true;
      } else {this.props.player.message = "";}
    }
    else { //if eyes ARE closed:
      if (!(this.faintMeterOn)) {
        this.props.player.focus++;
        this.props.player.focus++;
      }
    }
    if (this.props.player.focus<0) {this.props.player.focus = 0;}
    if (this.props.player.focus>100) {this.props.player.focus = 100;}

  }

  slide() {
    var time = this.props.player.clock.time();
    if (time[0]==="9") {
      if (parseInt(time[1])<30) {
        return ["One of the hardest parts of an intensive bootcamp like this is getting enough sleep - and staying awake during lectures! "];
      } else {return ["Stare at the lecture too long, you lose focus and you'll eventually lose consciousness...To regain focus, you need to close your eyes."];}
    } else if (time[0]==="10") {
      if (parseInt(time[1])<30) {
        return ["But if you keep your eyes closed too long then you'll fall asleep.  Losing consciousness gets you a strike. 10 strikes and you're OUT!)."];
      } else {return ["OK, with that out of the way, we will begin learning Ruby. Take a look at this code:"];}
    } else {
    return ["def my_each","..i = 0","..while i < self.length","....yield self[i]","....i += 1", "..end", "..self[0]","end"];
    }
  }

  lectureSlide() {
    if (!(this.state.eyesClosed)) {
      if (this.props.player.focus<30) {
      return (
        <ul id="lecture-slide" className="lecture-slide blur">
            {this.slide().map((line)=><li>{line}<br/></li>)}
        </ul>
      );}
      else {
          return (
            <ul id="lecture-slide" className="lecture-slide">
                {this.slide().map((line)=><li>{line}<br/></li>)}
            </ul>);
        }
      }
    else {
      return (
        <SleepMinigame goesToSleepMeter={this.state.goesToSleepMeter} faintMeter={this.state.faintMeter} player={this.props.player}/>
      );
    }
  }


  handleCloseEyesOn() {
    this.eyesClosedTimer++;
    this.setState({eyesClosed: true});
    this.props.player.currentEmotion = "eyes closed";
  }

  handleCloseEyesOff() {
    this.eyesClosed++;
    this.setState({eyesClosed: false});
    this.props.player.currentEmotion = "excited";
  }

  button() {
    if (this.props.player.focus < 30 && (!(this.state.eyesClosed)) ) {
      return (
      <button className="close-eyes-button"
      onClick={this.handleCloseEyesOn}>
        CLOSE EYES
      </button>
      );
    } else if (this.state.eyesClosed) {
      return (
      <button className="close-eyes-button"
      onClick={this.handleCloseEyesOff}>
        OPEN EYES
      </button>
      );
    }
  }

  render () {
    return (
      <div className="lecture-slide-container">
        <div className="white-front" opacity={this.state.white} />
        <div className="black-front" opacity={this.state.black} />
        {this.lectureSlide()}
        <meter className="faint-meter-bar" value={this.state.faintMeter} min="0" max={this.faintMeterMax} low={this.faintMeterMax - 1} high={this.faintMeterMax -0.5} optimum={this.faintMeterMax} />
        <div>
          {this.button()}
        </div>
      </div>
    );
  }

}//end component


export default LectureSeshScreen;
