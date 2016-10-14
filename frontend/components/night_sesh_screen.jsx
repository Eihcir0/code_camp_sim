import React from 'react';
import Clock from './../../game_logic/clock.js';
import Week from './../../game_logic/week.js';

class NightSeshScreen extends React.Component {
    constructor (props) {
      super(props);
      this.player = this.props.player;
      this.player.clock.pause();
      this.handleClick = this.handleClick.bind(this);
      this.ticker = 0;
      this.sound = new Audio("./app/assets/sounds/typing.wav");
      window.setTimeout(this.sound.play(),1);
      this.redStyle={color: "red"};
      this.greenStyle={color: "green"};
      this.done=false;
      this.interval = window.setInterval(()=>this.ticker++,100);
      }


    scoreChange() {
      var change = this.player.score - this.player.day.beginningScore;
      var changeText = `+ ${change}`;
      if (this.ticker===20) {
        new Audio("./app/assets/sounds/explosion.wav").play();
      }
      if (this.ticker<20) {
        return (

          <div>DAY {this.player.dayNum} RESULTS<br/><br/><br/>
            <br/>SCORE </div>
        );
      } else {
        return (
          <div>DAY {this.player.dayNum} RESULTS<br/><br/><br/>
            <br/>SCORE
              <span className="pair-result-number" style={change>0 ? this.greenStyle :   this.redStyle}>
                {changeText}
              </span>
          </div>
        );
      }

    }

    skillChange() {
      var skill = this.player.currentSkill.toUpperCase()+" SKILL ";
      var change = Math.round((this.player.skills[this.player.currentSkill] - this.player.day.beginningSkillPoints)/10);
      var changeText = `+ ${change}%`;
      if (this.ticker===40) {
        new Audio("./app/assets/sounds/explosion.wav").play();
      }
      if (this.ticker<40) {
        return (

          <div><br/>{skill} </div>
        );
      } else {
        return (

          <div>
            <br/>{skill}
              <span className="pair-result-number" style={change>0 ? this.greenStyle :   this.redStyle}>
                {changeText}
              </span>
          </div>
        );
      }

    }

    happinessChange() {
      var change = Math.round(this.player.happiness - this.player.day.beginningHappiness);
      var changeText = change < 0 ? `${change}` : `+ ${change}`;
      if (this.ticker===60) {
        new Audio("./app/assets/sounds/explosion.wav").play();
      }
      if (this.ticker<60) {
        return (

          <div><br/>HAPPINESS </div>
        );
      } else {
        this.done = true;
        return (

          <div>
            <br/>HAPPINESS
              <span className="pair-result-number" style={change<0 ? this.redStyle :   this.greenStyle}>
                {changeText}
              </span>
          </div>
        );
      }

    }

    handleClick() {
      if (this.ticker<60) {return;}
      clearInterval(this.interval);
      var newClockSpeed;
      //cancel interval
      if (this.done===false) {return;}

      this.player.week.advanceDay();
      this.player.session = 0;


    }

    render() {
      return (
        <div className="day-results" onClick={this.handleClick}>
          <br/>
          {this.scoreChange()}
          {this.skillChange()}
          {this.happinessChange()}
        </div>
      );
    }

    // render () {   OLD ONE
    //   return (
    //     <div className="pairs-results" onClick={this.handleClick}>
    //       driving lines:{this.props.drivingLines[0]} out of {this.props.drivingLines[1]} <br/>
    // navigating lines:{this.props.navigatingLines[0]} out of {this.props.navigatingLines[1]} <br/>
    //     good switches: {this.props.goodSwitches} <br/>
    //   bad Switches: {this.props.badSwitches} <br/>
    //     </div>
    //   );
    // }

  }//end component




export default NightSeshScreen;
