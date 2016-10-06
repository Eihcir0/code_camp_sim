import React from 'react';
import SleepMinigame from './sleep_minigame.jsx';
import Clock from './../../game_logic/clock.js';

class LectureSeshScreen extends React.Component {
  constructor (props) {
    super(props);
    // this.main = this.main.bind(this);
    this.props.player.focus = 100;
    var startTime;
    if (this.props.player.clock.time()[0]==="8") {
      startTime = [9,0];
    } else {startTime = this.props.player.clock.time();}
    this.props.player.clock = new Clock(startTime,6);
    this.startingFocus = this.props.player.focus;
    this.eyesClosedTimer = 0;
    this.state= {
      currentSlide: 1,
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
    this.handleClick = this.handleClick.bind(this);
    this.xxinterval = setInterval(()=>this.tick(),50);
    this.sleepSound = new Audio("./app/assets/sounds/Rock-a-bye Baby.mp3");
    this.faintSound = new Audio("./app/assets/sounds/siren.wav");
    this.faintSoundOn = false;
    this.dubstepSound = new Audio("./app/assets/sounds/trippy.wav");
    this.dubstepSoundOn = false;
  }

  tick() {
    var time = this.props.player.clock.time();
    if ((time[0]==="10" && parseInt(time[1])>45) || time[0]==="11") {
        this.updateFocus();
        this.updateFaintMeter();
        if (this.state.eyesClosed) {this.updateGoesToSleepMeter();}
      }
    this.checkWinner(time);

    // var rays = document.getElementById("lecture-slide");
		// rays.setAttribute("style","-"
    // + "webkit-transform:rotate(" + 1 + "deg)");

  }

  checkWinner(time) {
    if (time[0]==="12") {
        clearInterval(this.xxinterval);
        this.faintSound.pause();
        this.sleepSound.pause();
        this.faintSound = "";
        this.sleepSound = "";
        this.dubstepSound.pause();
        this.dubstepSound = "";
        this.xxinterval = undefined;
        this.props.player.newCongrats = {message: `CONGRATULATIONS!!! You made it through lecture without sleeping!`, newTime: [12,0], newPos: 0, newSession: 2};
    }
  }

  updateGoesToSleepMeter() {
    this.goesToSleepMeter ++;
    this.goesToSleepMeter ++;
    if (this.goesToSleepMeter >= this.faintMeterMax) {
      clearInterval(this.xxinterval);
      this.sleepSound.pause();
      this.xxinterval = undefined;
      this.props.player.newStrike = {message: "You received a strike for falling asleep during lecture.", newTime: [12,0], newPos: 0, newSession: 2};
      this.props.player.currentPos = 0;
      }
    this.setState({goesToSleepMeter: this.goesToSleepMeter});

  }

  updateFaintMeter () {
    if (this.state.eyesClosed) {
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
      if (!(this.dubstepSoundOn)) {
        if (this.faintSoundOn) {this.faintSound.pause();}
        this.dubstepSound.play();
        this.dubstepSoundOn = true;}
        this.faintMeter++;
        this.faintMeter++;
      if (this.faintMeter >= this.faintMeterMax) {
        clearInterval(this.xxinterval);
        this.faintSound.pause();
        this.faintSound = "";
        this.dubstepSound.pause();
        this.dubstepSound = "";
        this.xxinterval = undefined;
        this.props.player.newStrike = {message: "You received a strike for passing out during lecture.", newTime: [12,0], newPos: 0, newSession: 2};
        this.xxinterval = undefined;
        this.props.player.currentPos = 0;
        }
      }
    }
    this.setState({faintMeter: this.faintMeter});
  }

  updateFocus() {
    var time = this.props.player.clock.time();
    if (!(this.state.eyesClosed)) {
      this.props.player.focus--;

      if (time[0]==="11" && parseInt(time[1])>45) {this.props.player.focus--;}

      if (this.props.player.focus<50 && (!(this.state.eyesClosed))) {


        if (!(this.faintSoundOn)) {
          this.faintSound.play();
          this.faintSoundOn = true;

        }
        this.props.player.message =
         "OH NO!  You're losing focus!  You might pass out soon...........  (PRESS AND HOLD THE BUTTON TO CLOSE EYES AND REGAIN FOCUS)";
        this.faintMeterOn = true;
      } else {this.props.player.message = "";}
    }
    else { //if eyes ARE closed:
      if (!(this.faintMeterOn)) {
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
        return [
          "One of the hardest parts of an intensive bootcamp like this is getting enough sleep...","",
          "...and staying awake during lectures! "
      ];
    } else {return ["Stare at the lecture too long, you lose focus and you'll eventually lose consciousness...","","To regain focus, you need to close your eyes."];}
    } else if (time[0]==="10") {
      if (parseInt(time[1])<30) {
        return ["But if you keep your eyes closed too long then you'll fall asleep.","",  "Losing consciousness gets you a strike.","", "10 strikes and you're OUT!!!!"];
      } else {return ["OK, with that out of the way, we will begin learning Ruby!",""," Take a look at this code:"];}
    } else {
    return ["def my_each","..i = 0","..while i < self.length","....yield self[i]","....i += 1", "..end", "..self[0]","end"];
    }
  }

  handleClick() {
    var time = this.props.player.clock.time();
    if (time[0]==="9") { // ADD A CLOCK FUNCTION BETWEEN()
      if (parseInt(time[1])<30) {
        this.props.player.clock = new Clock([9,30],6);
    } else {
      this.props.player.clock = new Clock([10,0],6);
      }
    } else if (time[0]==="10") {
      if (parseInt(time[1])<30) {
        this.props.player.clock = new Clock([10,30],6);
      }
    }
  }

  lectureSlide() {
    if (!(this.state.eyesClosed)) {
      if (this.props.player.focus<30) {
      return (
        <ul id="lecture-slide" className="lecture-slide blur">
            {this.slide().map((line,idx)=>
              <li key={idx} id={idx}>
                {line} <br/>
              </li>)}
            <img src="./app/assets/images/ned3-blur.png" className="teacher-image"/>
        </ul>
      );}
      else {
          return (
            <ul id="lecture-slide" className="lecture-slide">
                {this.slide().map((line, idx)=>
                  <li key={idx} id={idx}>{line}<br/></li>)}
                <img src="./app/assets/images/ned3.png" className="teacher-image"/>
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
    if (this.dubstepSoundOn) {
      this.dubstepSound.pause();
      this.dubstepSoundOn=false;
    }
    if (this.faintSoundOn) {
      this.faintSound.pause();
      this.faintSoundOn = false;}
    this.sleepSound.play();
    this.eyesClosedTimer++;
    this.setState({eyesClosed: true});
    this.props.player.currentEmotion = "eyes closed";
  }

  handleCloseEyesOff() {
    if (this.props.player.focus>0 && this.props.player.focus < 50) {
      this.faintSound.play();
      this.faintSoundOn = true;
      }
    else if (this.faintMeter>0) {
      this.dubstepSound.play();
      this.dubstepSoundOn=true;}
    else {
      this.faintSound = new Audio("./app/assets/sounds/siren.wav");
      this.faintSoundOn = false;
    }
    this.sleepSound.pause();
    this.eyesClosed++;
    this.setState({eyesClosed: false});
    this.props.player.currentEmotion = "excited";
  }

  button() {
    if (this.props.player.focus < 30 && (!(this.state.eyesClosed)) ) {
      return (
      <button className="middle-button"
      onClick={this.handleCloseEyesOn}>
        CLOSE EYES
      </button>
      );
    } else if (this.state.eyesClosed) {
      return (
      <button className="middle-button"
      onClick={this.handleCloseEyesOff}>
        OPEN EYES
      </button>
      );
    }
  }

  render () {
    return (
      <div onClick={this.handleClick} className="lecture-slide-container">
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
