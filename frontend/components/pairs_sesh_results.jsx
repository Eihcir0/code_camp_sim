import React from 'react';
import Clock from './../../game_logic/clock.js';
import PairsLine from './pairs_line.jsx';

class PairsSeshResults extends React.Component {
    constructor (props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.startTime = Date.now();
      this.calculating=this.calculating.bind(this);
      this.ticker = 0;
      new Audio("./app/assets/sounds/typing.wav").play();
      this.interval = window.setInterval(()=>this.ticker++,100);
      this.redStyle={color: "red"};
      this.greenStyle={color: "green"};
      this.graded=false;
      }

    calculating() {

      // if (this.ticker<20) {
      // return <div><br/> Calculating results of todays pair programming...<br/><br/></div>;
      // } else {
      //   return <div><br/><br/><br/><br/></div>;
      // }
    }

    totalSwitches() {
      var totSwitches = this.props.goodSwitches + this.props.badSwitches;
      if (this.ticker===20) {
        new Audio("./app/assets/sounds/explosion.wav").play();
      }
      if (this.ticker<20) {
        return (

          <div><br/>TOTAL SWITCHES: </div>
        );
      } else {
        return (

          <div>
            <br/>TOTAL SWITCHES:
              <span className="pair-result-number" style={totSwitches===6 ? this.greenStyle :   this.redStyle}>
                {totSwitches}
              </span>
          </div>
        );
      }

    }

    goodSwitches() {
      if (this.ticker===40) {
        new Audio("./app/assets/sounds/explosion.wav").play();
      }
      if (this.ticker<40) {
        return (

          <div><br/>GOOD SWITCHES (around 30 minutes): </div>
        );
      } else {
        return (

          <div>
            <br/>GOOD SWITCHES (around 30 minutes):
              <span className="pair-result-number"
                style={this.props.goodSwitches===6 ? this.greenStyle : this.redStyle}>
                {this.props.goodSwitches}
              </span>
          </div>
        );
      }
    }

    badSwitches() {
      if (this.ticker===60) {
        new Audio("./app/assets/sounds/explosion.wav").play();
      }
      if (this.ticker<60) {
        return (

          <div><br/>BAD SWITCHES: </div>
        );
      } else {
        return (

          <div>
            <br/>BAD SWITCHES:
              <span className="pair-result-number"
                style={this.props.badSwitches===0 ? this.greenStyle : this.redStyle}>
                {this.props.badSwitches}
              </span>
          </div>
        );
      }

    }

    grade() {
      var grade;

      var points = this.props.goodSwitches;
      if (this.props.totalSwitches<5 || this.props.totalSwitches>10) {points-=3;}
      switch (true) {
        case (points<=2):
          grade="F";
          break;
        case (points===3):
          grade="D";
          break;
        case (points===4):
          grade="C";
          break;
        case (points===5):
          grade="B";
          break;
        case (points===6):
          grade="A";
          break;

        default:


      }
      if (this.ticker===100) {
          if (["A","B"].includes(grade) && this.graded===false) {
              new Audio("./app/assets/sounds/congrats-ding.wav").play();
              grade==="A" ? this.props.player.happiness+=20 : this.props.player.happiness+=10;
              this.graded=true;
          } else if (grade==="F" && this.graded===false) {
              new Audio("./app/assets/sounds/buzzer.mp3").play();
              this.props.player.happiness-=10;
              this.graded=true;
          } else {new Audio("./app/assets/sounds/explosion.wav").play();
              if (grade==="D" && this.graded===false) {this.props.player.happiness-=3;}
              this.graded=true;
            }
        }
      if (this.ticker<100) {
        return (

          <div><br/><br/><br/>YOUR PAIR PROGRAMMING GRADE FOR THE DAY:
          </div>
        );
      } else {
        return (

          <div>
            <br/><br/><br/>YOUR PAIR PROGRAMMING GRADE FOR THE DAY:
              <br/><br/>
            <span className="grade"
              style={(["A","B","C"].includes(grade)) ? this.greenStyle : this.redStyle}>
              {grade}
            </span>
          </div>
        );
      }

    }

    handleClick() {
      var newClockSpeed;
      //cancel interval
      if (this.graded===false) {return;}
      this.props.player.message = "You're done for the day!  Keep working or leave whenever you want!";
      this.props.player.clock = new Clock ([18,1],this.props.player.defaultClockSpeed);
      this.props.player.currentPos = 0;
      this.props.player.session = 4;

    }

    render() {
      return (
        <div className="pairs-results" onClick={this.handleClick}>
          <br/>
          {this.calculating()}
          {this.totalSwitches()}
          {this.goodSwitches()}
          {this.badSwitches()}
          {this.grade()}
        </div>
      );
    }

  }//end component




export default PairsSeshResults;
