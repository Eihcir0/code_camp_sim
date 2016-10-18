import React from 'react';
import SleepMinigame from './sleep_minigame.jsx';
import AssessmentSesh from './assessment_sesh.jsx';
import Clock from './../../game_logic/clock.js';

class LectureSeshScreen extends React.Component {
  constructor (props) {
    super(props);
    // this.main = this.main.bind(this);
    this.player = this.props.player;
    this.player.tempMessage = "";
    this.player.focus = 100;
    var startTime;
    if (this.player.clock.time()[0]==="8") {
      startTime = [9,0];
    } else {
      startTime = this.player.clock.time();
    }
    this.openingSound = new Audio("./app/assets/sounds/opening_lecture.wav");
    window.setTimeout(()=>this.openingSound.play(),10);
    this.player.clock = new Clock(startTime, this.player.defaultClockSpeed);
    this.startingFocus = this.player.focus;
    this.eyesClosedTimer = 0;
    this.startTime = this.player.clock.tickCounter;
    this.faintMeterBarStyle = {};
    this.state= {
      currentSlide: 1,
      eyesClosed: false,
      focus: this.player.focus,
      faintMeter: 0,
      goesToSleepMeter: -50,
      time: this.player.clock.time()

      // lastTime: Date.now()
      // isLiked: false
    };
    this.faintMeterMax = this.player.sleepBank + 0;
    this.faintMeterOn = false;
    this.faintMeter = 0;
    this.goesToSleepMeter = -50;
    this.handleCloseEyesOn = this.handleCloseEyesOn.bind(this);
    this.handleCloseEyesOff = this.handleCloseEyesOff.bind(this);
    this.button = this.button.bind(this);
    this.tick = this.tick.bind(this);
    this.slide = this.slide.bind(this);
    this.updateFocus = this.updateFocus.bind(this);
    this.updateFaintMeter = this.updateFaintMeter.bind(this);
    this.updateGoesToSleepMeter = this.updateGoesToSleepMeter.bind(this);
    this.checkWinner = this.checkWinner.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.sleepSound = new Audio("./app/assets/sounds/Rock-a-bye Baby.mp3");
    this.faintSound = new Audio("./app/assets/sounds/trippy.wav");
    this.faintSoundOn = false;
    this.xxinterval = setInterval(this.tick,50);
    this.lectureNotes = this.player.day.lectureNotes;
  }

  tick() {
    var time = this.player.clock.time();
    if (this.player.clock.is(["11","00","am"])) {
      this.player.clock = new Clock([11,1],this.player.defaultClockSpeed*3);
      this.player.clock.lastTickerCount = this.player.clock.tickCounter;
    }
    if (this.player.clock.isBetween([10,55],[12,0])) {
        this.updateFocus();
        this.updateFaintMeter();
        if (this.state.eyesClosed) {this.updateGoesToSleepMeter();}
      }
    this.checkWinner();

  }

  checkWinner(time) {
    if (this.player.clock.isBetween(["12","00","pm"],["1","00","pm"])) {
        clearInterval(this.xxinterval);
        this.faintSound.pause();
        this.sleepSound.pause();
        this.faintSound = "";
        this.sleepSound = "";
        this.xxinterval = undefined;
        this.player.newCongrats = {message: `You made it through lecture without sleeping!`, newTime: [12,0], newClockSpeed: this.player.defaultClockSpeed, newPos: 0, newSession: 2};
    }
  }

  updateGoesToSleepMeter() {
    this.goesToSleepMeter ++;
    this.goesToSleepMeter ++;
    if (this.goesToSleepMeter >= this.faintMeterMax) {
      clearInterval(this.xxinterval);
      this.sleepSound.pause();
      this.xxinterval = undefined;
      this.player.newStrike = {message: "You received a strike for falling asleep during lecture.", newTime: [12,0], newPos: 0, newSession: 2, newClockSpeed: this.player.defaultClockSpeed};
      this.player.currentPos = 0;
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
      if (!(this.faintSoundOn) && this.player.focus<50) {
        this.faintSound.play();
        this.faintSoundOn=true;}

      if (this.player.focus <= 10) {
        switch (Math.floor(Math.random()*3)+1) {
          case 1:
            this.player.newFace = {filename: "trippy1", duration: 100};
            break;
          default:
          this.player.newFace = {filename: "trippy2", duration: 100};

        }
        this.faintMeter++;
        this.faintMeter++;
      if (this.faintMeter >= this.faintMeterMax) {
        clearInterval(this.xxinterval);
        this.faintSound.pause();
        this.faintSound = "";
        this.xxinterval = undefined;
        this.player.newStrike = {message: "You received a strike for passing out during lecture.", newTime: [12,0], newPos: 0, newSession: 2};
        this.player.currentPos = 0;
        }
      }
    }
    this.setState({faintMeter: this.faintMeter});
  }

  updateFocus() {
    var time = this.player.clock.time();
    if (!(this.state.eyesClosed)) {
      this.player.focus--;

      if (time[0]==="11" && parseInt(time[1])>45) {this.player.focus--;}

      if (this.player.focus<50 && (!(this.state.eyesClosed))) {
        this.player.tempMessage =
         "You're losing focus!  You'll faint soon!";
      } else {this.player.tempMessage = "";}
    }
    else { //if eyes ARE closed:
      if (!(this.faintMeterOn)) {
        this.player.focus++;
      }
    }
    if (this.player.focus<0) {this.player.focus = 0;}
    if (this.player.focus>100) {this.player.focus = 100;}

  }

  slide() {
    var time = this.player.clock;

    switch (true) {
      case (time.isBetween([9,0],[9,29])):
        return this.lectureNotes[0];
      case (time.isBetween([9,30],[9,59])):
        return this.lectureNotes[1];
      case (time.isBetween([10,0],[10,29])):
        return this.lectureNotes[2];
      case (time.isBetween([10,30],[11,0])):
        return this.lectureNotes[3];
      case (time.isBetween([11,0],[11,59])):
        return this.lectureNotes[4];
      default:
        return [];
    }
  }

  handleClick() {
    var time = this.player.clock.time();
    if (time[0]==="9") { // ADD A CLOCK FUNCTION BETWEEN()
      if (parseInt(time[1])<30) {
        this.player.clock = new Clock([9,30],this.player.defaultClockSpeed*2);
    } else {
      this.player.clock = new Clock([10,0],this.player.defaultClockSpeed*2);
      }
    } else if (time[0]==="10") {
      if (parseInt(time[1])<30) {
        this.player.clock = new Clock([10,30],this.player.defaultClockSpeed*2);
      }
    }
  }

  lectureSlide() {
    if (this.player.dayNum % 7 === 1 && this.player.dayNum !== 1) {
      clearInterval(this.xxinterval);
      this.faintMeterBarStyle = {display: "none"};
      return <AssessmentSesh player={this.player}/>;
    }
    else if (!(this.state.eyesClosed)) {
      if (this.player.focus<=50) {
      var shadow = `0 0 ${50-this.player.focus}px rgba(0,0,0,0.5)`;
      var raysStyle = {opacity: (this.state.faintMeter)/100};
      var style = {color: "transparent", textShadow: `${shadow}` };
      return (
        <div>
          <ul id="lecture-slide" className="lecture-slide" style={style}>
              {this.slide().map((line,idx)=>
                <li key={idx} id={idx}>
                  {line} <br/>
                </li>)}
              <img src="./app/assets/images/ned3-blur.png" className="teacher-image"/>
          </ul>
          <img src="./app/assets/images/rays.jpeg"
            className="rays" style={raysStyle} />
      </div>
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
        <SleepMinigame goesToSleepMeter={this.state.goesToSleepMeter} faintMeter={this.state.faintMeter} player={this.player}/>
      );
    }
  }


  handleCloseEyesOn() {
    var now = this.player.clock.tickCounter;
    if ((now - this.startTime) > (1000*this.player.clock.relativeSpeed)) {
      if (this.faintSoundOn) {
        this.faintSound.pause();
        this.faintSoundOn = false;
      }
      this.sleepSound.play();
      this.eyesClosedTimer++;
      this.setState({eyesClosed: true});
      this.player.currentEmotion = "eyes closed";
      this.startTime = this.player.clock.tickCounter;
    }
  }

  handleCloseEyesOff() {
    var now = this.player.clock.tickCounter;
    if ((now - this.startTime) > (1000*this.player.clock.relativeSpeed)) {

      if (this.player.focus < 50) {
        this.faintSound.play();
        this.faintSoundOn = true;}
      else {
        this.faintSound = new Audio("./app/assets/sounds/trippy.wav");
        this.faintSoundOn = false;
      }
      this.sleepSound.pause();
      this.startTime = this.player.clock.tickCounter;
      this.eyesClosed++;
      this.setState({eyesClosed: false});
      this.player.currentEmotion = "excited";
    }
  }

  button() {
    var sleepStyle = {opacity: (1-(this.state.goesToSleepMeter)/100)};
    var faintStyle = {opacity: (1-(this.state.faintMeter)/100)};
    var button = <div/>;
    var now = this.player.clock.tickCounter;
    if ((now - this.startTime) > (1000*this.player.clock.relativeSpeed)) {
      if (!(this.state.eyesClosed)) {
      button = (
        <button className="middle-button"
          onClick={this.handleCloseEyesOn}>
          CLOSE EYES
        </button>
      );}
      else {
        button = (
          <button className="middle-button"
            onClick={this.handleCloseEyesOff}
            style={sleepStyle}>
            OPEN EYES
          </button>
        );
      }
    }
    if (this.player.focus < 50 && (!(this.state.eyesClosed)) ) {
      return (

        <div className="eyes-open"
          onClick={this.handleCloseEyesOn}
          style={faintStyle}
          >

          <img src="./app/assets/images/eyes_open.png"
            className="eyes"/>
          {button}

        </div>

      );
    } else if (this.state.eyesClosed) {
      return (
        <div className="eyes-open"
          onClick={this.handleCloseEyesOff}
          style={sleepStyle}>
          <img src="./app/assets/images/eyes_closed.png"
            className="eyes"
            onClick={this.handleCloseEyesOff}
            />
          {button}
        </div>
      );
    }
  }



  render () {
    return (
      <div onClick={this.handleClick} className="lecture-slide-container">
        {this.lectureSlide()}
        <meter style={this.faintMeterBarStyle}className="faint-meter-bar" value={this.state.faintMeter} min="0" max={this.faintMeterMax} low={this.faintMeterMax - 1} high={this.faintMeterMax -0.5} optimum={this.faintMeterMax} />
        <div>
          {this.button()}
        </div>
      </div>
    );
  }

}//end component


export default LectureSeshScreen;
