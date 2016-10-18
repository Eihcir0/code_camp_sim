import React from 'react';
import Clock from './../../game_logic/clock.js';

class AssessmentSesh extends React.Component {
  constructor (props) {
    super(props);
    this.player = this.props.player;
    this.skill = this.player.currentSkill;
    this.skillCapitalized =
      this.skill.charAt(0).toUpperCase() + this.skill.slice(1);
    this.assessmentNum = Math.floor(this.player.dayNum / 7);
    var possiblePoints = 100;
    this.state = {
      possiblePoints: possiblePoints,
      score: null,
      median: null,
      mean: null,
      passingScore: null,
      yourScoreStyle: {}
    };
    this.passSound = new Audio("./app/assets/sounds/congrats-ding.wav");
    // this.passSound.load();
    this.failSound = new Audio("./app/assets/sounds/buzzer.mp3");
    // this.failSound.load();
    this.explosionSound = new Audio("./app/assets/sounds/explosion.wav");
    this.ticker = 0;
    this.done = false;
    this.tick = this.tick.bind(this);
    this.handleDone = this.handleDone.bind(this);
    this.button = this.button.bind(this);
    this.interval = window.setInterval(this.tick,20);

  }

  tick() {
    this.ticker++;
    var rand;
      if (this.ticker < 350){ //*********PLAYER SCORE
        rand = Math.floor(( Math.random() * 99 + 1));
        this.setState({score: rand});}
      if (this.ticker === 350){
        var score = 1; //
        this.explosionSound = "";
        this.explosionSound = new Audio("./app/assets/sounds/explosion.wav");
        this.explosionSound.autoplay = true;
        this.explosionSound.autoplay = true;

        this.setState({score: score});}
      if (this.ticker < 450) { //*********MEDIAN
        rand = Math.floor(( Math.random() * 99 + 1));
        this.setState({median: rand});}
      if (this.ticker === 450) {
        this.explosionSound = "";
        this.explosionSound = new Audio("./app/assets/sounds/explosion.wav");
        this.explosionSound.autoplay = true;
        this.setState({median: this.state.possiblePoints});}
      if (this.ticker < 550) { //********* MEAN
        rand = Math.floor(( Math.random() * 99 + 1));
        this.setState({mean: rand});}
      if (this.ticker === 550) {
        this.explosionSound = "";
        this.explosionSound = new Audio("./app/assets/sounds/explosion.wav");
        this.explosionSound.autoplay = true;
        rand =
          ((Math.floor( Math.random()*20 + 1 ) + 70) / 100)
          * this.state.possiblePoints;
        this.setState({mean: rand});}
      if (this.ticker < 650) { // ********** PASSING SCORE

        rand = Math.floor(( Math.random() * 99 + 1));
        this.setState({passingScore: rand});}
      if (this.ticker === 650) {
        this.explosionSound = "";
        this.explosionSound = new Audio("./app/assets/sounds/explosion.wav");
        this.explosionSound.autoplay = true;
        rand =
          ((Math.floor( Math.random()*20 + 1 ) + 75) / 100)
          * this.state.possiblePoints;
        this.setState({passingScore: rand});
        if (this.state.score >= this.state.passingScore) {
          this.setState({yourScoreStyle: {color: "green"}});
        } else {
          this.setState({yourScoreStyle: {color: "green"}});
        }
        this.done = true;
        this.player.clock.pause();
      }
    }


  handleDone() {
    if (this.state.score >= this.state.passingScore) {
      this.player.assessments.push("PASS");
      this.player.happiness += 20;
      var clock = new Clock([12,1]);
      this.player.currentPos = 0;
      this.player.clock = clock;
    } else {
      this.player.assessments.push("FAIL");
      var clock = new Clock([12,1]);
      debugger;
      this.player.currentPos = 0;
      this.player.clock = clock;
    }
  }

  button() {
    if (!(this.done)) {return null;}

    return (
      <button onClick={this.handleDone}       className="assessment-button">continue</button>
    );
  }

  render() {

    return (
      <div className="assessment-results">
          <span className="assessment-results-text" >TODAY IS ASSESSMENT DAY!  HOPE YOU STUDIED</span>
          <br/><br/>
          <span className="assessment-results-text" >ASSESSMENT #{this.assessmentNum} {this.skillCapitalized}</span><br/><br/><br/>
          <span className="assessment-results-text" >POSSIBLE POINTS: {this.state.possiblePoints}</span><br/>
          <br/>
          YOU SCORED:<span className="assessment-results-text"  style={this.state.yourScoreStyle}> {this.state.score}</span><br/><br/>
        <span className="assessment-results-text" >CLASS MEDIAN: {this.state.median}</span><br/><br/>
          <span className="assessment-results-text" >CLASS AVERAGE: {this.state.mean}</span><br/><br/>
          <span className="assessment-results-text" >PASSING SCORE: {this.state.passingScore}</span><br/><br/>
          <br/><br/><br/><br/>
          <span className="assessment-results-text" >
            [🚧 Assessment feature currently in development...ACTUAL CODE CHALLENGES COMING SOON! 🚧]
          </span>
          {this.button()}
      </div>
    );
  }



}//end component


export default AssessmentSesh;
