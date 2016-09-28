import React from 'react';
import Clock from './../../game_logic/clock.js';
import PairsLine from './pairs_line.jsx';

class PairsSeshScreen extends React.Component {
  constructor (props) {
    super(props);
    // this.main = this.main.bind(this);
    this.sentenceTexts = ["this is a test","this is the second test", "this is the third"];
    this.sentences = [];
    this.shotSound = new Audio ("./app/assets/sounds/shot.wav");
    this.state= {
      currentInput: "",
    };
    // this.onClick = this.onClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.initializeSentences = this.initializeSentences.bind(this);
    this.updateSentences = this.updateSentences.bind(this);
    this.pairsLines = this.pairsLines.bind(this);
    this.yyinterval = setInterval(()=>this.tick(),50);
    this.initializeSentences();
    this.over = false;
    this.yPosOffset = 1;
    this.props.player.message = "TYPE THE TEXT AS FAST AS YOU CAN!";
  }

  initializeSentences() {
    this.sentenceTexts.forEach((el,idx) => {
      this.sentences.push(
        {text: el, active: (idx===0 ? true : false), yPos: 500 + idx*100}
      );
    });

  }

  update(field){
    return e => {
      this.setState({[field]: e.currentTarget.value });
    };
  }

  tick() {
    this.checkOver();
    this.updateSentences();
  }

  checkOver() {
    if (this.sentences.length===0) {
    clearInterval(this.yyinterval);
    console.log("OVER");}
  }
  updateSentences() {

    if (this.currentInput==="bbr") {
      this.setState({currentInput: this.sentences[0]});
    }


    this.sentences.forEach(sentence => {
      sentence.yPos -= this.yPosOffset;
    });
    if (this.sentences[0].yPos <= 200) {
        new Audio ("./app/assets/sounds/missed.wav").play();
        this.setState({currentInput: ""});
        if (this.sentences.length>0) {
        this.sentences.shift();
        this.sentences[0].active = true;}
    }
  }

  handleSubmit(e){

    if (e.keyCode===13) {e.preventDefault();}
    if (e.keyCode===13 && this.state.currentInput.length>1) {
      if (this.state.currentInput == this.sentences[0].text) {
          new Audio ("./app/assets/sounds/explosion.wav").play();
        }
      else {
        new Audio ("./app/assets/sounds/missed.wav").play();
      }
        this.sentences.shift();
        this.sentences[0].active=true;
        this.setState({currentInput: ""});
    } else if (e.keyCode!==8) {
        if (this.sentences[0].text[this.state.currentInput.length]==e.key) {
          new Audio ("./app/assets/sounds/shot.wav").play();
        } else {
          new Audio ("./app/assets/sounds/beep.wav").play();
        }
      }
    }

  pairsLines() {
    var results = [];
    this.sentences.forEach((sentence, idx) => {
    if (sentence.yPos<500) {
    results.push(
      <div className="pairs-line" key={idx} style={{top: sentence.yPos + "px"}} >
        <PairsLine currentLine = {sentence} currentInput = {this.state.currentInput}/>
      </div>
      );}
    });
    return results;
  }



  render () {
    return (
      <div className="pairs-sesh">
        <div className="pairs-input-text">
       </div>
        <textarea
          value={this.state.currentInput}
          onKeyDown={this.handleSubmit}
          onChange={this.update("currentInput")}
          className="pairs-input" autoFocus />
        {this.pairsLines()}
      </div>
    );
  }

}//end component


export default PairsSeshScreen;
