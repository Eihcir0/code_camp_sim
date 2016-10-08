import React from 'react';
import SleepMinigame from './sleep_minigame.jsx';
import Clock from './../../game_logic/clock.js';

class LectureSeshScreen extends React.Component {
  constructor (props) {
    super(props);
    // this.main = this.main.bind(this);
    this.player = this.props.player;
    this.player.focus = 100;
    var startTime;
    if (this.player.clock.time()[0]==="8") {
      startTime = [9,0];
    } else {
      startTime = this.player.clock.time();
    }
    this.player.clock = new Clock(startTime,9);
    this.startingFocus = this.player.focus;
    this.eyesClosedTimer = 0;
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
    this.updateFocus = this.updateFocus.bind(this);
    this.updateFaintMeter = this.updateFaintMeter.bind(this);
    this.updateGoesToSleepMeter = this.updateGoesToSleepMeter.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.sleepSound = new Audio("./app/assets/sounds/Rock-a-bye Baby.mp3");
    this.faintSound = new Audio("./app/assets/sounds/trippy.wav");
    this.faintSoundOn = false;
    this.xxinterval = setInterval(()=>this.tick(),50);

  }

  tick() {
    var time = this.player.clock.time();
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
        this.xxinterval = undefined;
        this.player.newCongrats = {message: `CONGRATULATIONS!!! You made it through lecture without sleeping!`, newTime: [12,0], newPos: 0, newSession: 2};
    }
  }

  updateGoesToSleepMeter() {
    this.goesToSleepMeter ++;
    this.goesToSleepMeter ++;
    if (this.goesToSleepMeter >= this.faintMeterMax) {
      clearInterval(this.xxinterval);
      this.sleepSound.pause();
      this.xxinterval = undefined;
      this.player.newStrike = {message: "You received a strike for falling asleep during lecture.", newTime: [12,0], newPos: 0, newSession: 2, newClockSpeed: 360};
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
      if (this.player.focus <= 10) {
      if (!(this.faintSoundOn)) {
        this.faintSound.play();
        this.faintSoundOn=true;}
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
        this.player.message =
         "OH NO!  You're losing focus!  You might pass out soon...........  (PRESS AND HOLD THE BUTTON TO CLOSE EYES AND REGAIN FOCUS)";
      } else {this.player.message = "";}
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
    var time = this.player.clock.time();
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
    var time = this.player.clock.time();
    if (time[0]==="9") { // ADD A CLOCK FUNCTION BETWEEN()
      if (parseInt(time[1])<30) {
        this.player.clock = new Clock([9,30],6);
    } else {
      this.player.clock = new Clock([10,0],6);
      }
    } else if (time[0]==="10") {
      if (parseInt(time[1])<30) {
        this.player.clock = new Clock([10,30],6);
      }
    }
  }

  lectureSlide() {
    if (!(this.state.eyesClosed)) {
      if (this.player.focus<5) {
      return (
        <ul id="lecture-slide" className="lecture-slide blur10">
            {this.slide().map((line,idx)=>
              <li key={idx} id={idx}>
                {line} <br/>
              </li>)}
            <img src="./app/assets/images/ned3-blur.png" className="teacher-image"/>
        </ul>
      );}
      if (this.player.focus<10) {
      return (
        <ul id="lecture-slide" className="lecture-slide blur9">
            {this.slide().map((line,idx)=>
              <li key={idx} id={idx}>
                {line} <br/>
              </li>)}
            <img src="./app/assets/images/ned3-blur.png" className="teacher-image"/>
        </ul>
      );}
      if (this.player.focus<15) {
      return (
        <ul id="lecture-slide" className="lecture-slide blur8">
            {this.slide().map((line,idx)=>
              <li key={idx} id={idx}>
                {line} <br/>
              </li>)}
            <img src="./app/assets/images/ned3-blur.png" className="teacher-image"/>
        </ul>
      );}
      if (this.player.focus<20) {
      return (
        <ul id="lecture-slide" className="lecture-slide blur7">
            {this.slide().map((line,idx)=>
              <li key={idx} id={idx}>
                {line} <br/>
              </li>)}
            <img src="./app/assets/images/ned3-blur.png" className="teacher-image"/>
        </ul>
      );}
      if (this.player.focus<25) {
      return (
        <ul id="lecture-slide" className="lecture-slide blur6">
            {this.slide().map((line,idx)=>
              <li key={idx} id={idx}>
                {line} <br/>
              </li>)}
            <img src="./app/assets/images/ned3-blur.png" className="teacher-image"/>
        </ul>
      );}
      if (this.player.focus<30) {
      return (
        <ul id="lecture-slide" className="lecture-slide blur5">
            {this.slide().map((line,idx)=>
              <li key={idx} id={idx}>
                {line} <br/>
              </li>)}
            <img src="./app/assets/images/ned3-blur.png" className="teacher-image"/>
        </ul>
      );}
      if (this.player.focus<35) {
      return (
        <ul id="lecture-slide" className="lecture-slide blur4">
            {this.slide().map((line,idx)=>
              <li key={idx} id={idx}>
                {line} <br/>
              </li>)}
            <img src="./app/assets/images/ned3-blur.png" className="teacher-image"/>
        </ul>
      );}
      if (this.player.focus<40) {
      return (
        <ul id="lecture-slide" className="lecture-slide blur3">
            {this.slide().map((line,idx)=>
              <li key={idx} id={idx}>
                {line} <br/>
              </li>)}
            <img src="./app/assets/images/ned3-blur.png" className="teacher-image"/>
        </ul>
      );}
      if (this.player.focus<45) {
      return (
        <ul id="lecture-slide" className="lecture-slide blur2">
            {this.slide().map((line,idx)=>
              <li key={idx} id={idx}>
                {line} <br/>
              </li>)}
            <img src="./app/assets/images/ned3-blur.png" className="teacher-image"/>
        </ul>
      );}
      if (this.player.focus<50) {
      return (
        <ul id="lecture-slide" className="lecture-slide blur1">
            {this.slide().map((line,idx)=>
              <li key={idx} id={idx}>
                {line} <br/>
              </li>)}
            <img src="./app/assets/images/ned3-blur.png" className="teacher-image"/>
        </ul>
      );}
      if (this.player.focus<30) {
      return (
        <ul id="lecture-slide" className="lecture-slide blur5">
            {this.slide().map((line,idx)=>
              <li key={idx} id={idx}>
                {line} <br/>
              </li>)}
            <img src="./app/assets/images/ned3-blur.png" className="teacher-image"/>
        </ul>
      );}
      if (this.player.focus<30) {
      return (
        <ul id="lecture-slide" className="lecture-slide blur5">
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
        <SleepMinigame goesToSleepMeter={this.state.goesToSleepMeter} faintMeter={this.state.faintMeter} player={this.player}/>
      );
    }
  }


  handleCloseEyesOn() {
    if (this.faintSoundOn) {
      this.faintSound.pause();
      this.faintSoundOn = false;
    }
    this.sleepSound.play();
    this.eyesClosedTimer++;
    this.setState({eyesClosed: true});
    this.player.currentEmotion = "eyes closed";
  }

  handleCloseEyesOff() {
    if (this.player.focus < 50) {
      this.faintSound.play();
      this.faintSoundOn = true;}
    else {
      this.faintSound = new Audio("./app/assets/sounds/siren.wav");
      this.faintSoundOn = false;
    }
    this.sleepSound.pause();
    this.eyesClosed++;
    this.setState({eyesClosed: false});
    this.player.currentEmotion = "excited";
  }

  button() {
    if (this.player.focus < 30 && (!(this.state.eyesClosed)) ) {
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
