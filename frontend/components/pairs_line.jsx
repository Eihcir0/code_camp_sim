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
  }

  line() {
    var cl = this.props.currentLine.text;
    var color0 = {backgroundColor: "white"};
    var color1 = {backgroundColor: "green"};
    var color2 = {backgroundColor: "red"};
    var color3 = {backgroundColor: "black"};
    var color4 = {display: "none"};

    var style = (idx) => {
      if (idx > this.props.currentInput.length -1) {return color0;}
      else {return this.props.currentLine.text[idx]===this.props.currentInput[idx]
      ? color1
      : color2;}
    };

    if (!(this.props.currentLine.active)) {
      if (this.props.currentLine.done) {
        return "💩".repeat(Math.floor(this.props.currentLine.text.length/3));
        }  else {
        return this.props.currentLine.text;
      }
    }


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
      <div style={this.props.currentLine.exploded ? {display: "none"} : {}} className="pairs-line-text">
        {this.line()}
      </div>
    );
  }

}//end component


export default PairsLine;
