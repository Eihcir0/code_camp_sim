import React from 'react';
import Clock from './../../game_logic/clock.js';

class PairsLine extends React.Component {
  constructor (props) {
    super(props);
    // this.main = this.main.bind(this);

    this.state= {
      currentInput: ""
    };
    this.line = this.line.bind(this);
  //  this.zzinterval = setInterval(()=>this.tick(),50);
  }

  tick() {

  }

  checkOver(time) {
  }

  line() {
    if (!(this.props.currentLine.active)) {return this.props.currentLine.text;}
    var cl = this.props.currentLine.text;
    var color0 = {backgroundColor: "white"};
    var color1 = {backgroundColor: "green"};
    var color2 = {backgroundColor: "red"};

    var style = (idx) => {
      if (idx > this.props.currentInput.length -1) {return color0;}
      else {return this.props.currentLine.text[idx]===this.props.currentInput[idx]
      ? color1
      : color2;}
    };

    var results = cl.split("").map((char,idx)=> {
        return (
          <span className="letter"
            style={style(idx)}
            key={idx}>
            {char}
          </span>);
      });

    return results;

  }

  render () {
    return (
      <div className="pairs-line-text">
        {this.line()}
      </div>
    );
  }

}//end component


export default PairsLine;
