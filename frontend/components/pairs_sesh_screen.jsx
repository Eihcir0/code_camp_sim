import React from 'react';
import Clock from './../../game_logic/clock.js';
import PairsLine from './pairs_line.jsx';

class PairsSeshScreen extends React.Component {
  constructor (props) {
    super(props);
    // this.main = this.main.bind(this);
    this.sentenceTexts = ["def my_each(&prc)","self.length.times do |i|", "prc.call(self[i])", "end", "self", "end", "def my_select(&prc)", "selects = []", "self.my_each do |item|", "if prc.call(item)", "selects << item", "end", "end", "selects", "end"];
    this.sentences = [];
    this.shotSound = new Audio ("./app/assets/sounds/shot.wav");
    this.state= {
      currentInput: "",
    };
    // this.onClick = this.onClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.initializeSentences = this.initializeSentences.bind(this);
    this.updateSentences = this.updateSentences.bind(this);
    this.getRandomSentence = this.getRandomSentence.bind(this);
    this.addNewSentence = this.addNewSentence.bind(this);
    this.pairsLines = this.pairsLines.bind(this);
    this.yyinterval = setInterval(()=>this.tick(),50);
    this.initializeSentences();
    this.over = false;
    this.yPosIncrement = 6;
    this.lineSpacing = 100;
    this.props.player.message = "TYPE THE TEXT AS FAST AS YOU CAN!";
  }

  getRandomSentence() {
    var a = Math.floor(Math.random()*this.sentenceTexts.length);
    return this.sentenceTexts[a];
  }

  addNewSentence() {
    var a = this.sentences.length - 1;
    var newYpos = this.sentences[a].yPos + this.lineSpacing;

    this.sentences.push(
      {text: this.sentences[0].text, active: false, yPos: newYpos}
    );
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
    document.getElementById("pairs-input").focus();
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
      sentence.yPos -= this.yPosIncrement;
    });
    if (this.sentences[0].yPos <= 200) {
        new Audio ("./app/assets/sounds/missed.wav").play();
        this.setState({currentInput: ""});
        this.addNewSentence();
        this.sentences.shift();
        this.sentences[0].active = true;
    } else {this.checkOver();}
  }

  handleSubmit(e){

    if (e.keyCode===13) {e.preventDefault();}
    if (e.keyCode===13 && this.state.currentInput.length>1) {
      this.setState({currentInput: ""});
      if (this.state.currentInput == this.sentences[0].text) {
          new Audio ("./app/assets/sounds/explosion.wav").play();
          //add explosion anim
          this.sentences.shift();
          this.sentences[0].active=true;
        }
      else {
        new Audio ("./app/assets/sounds/missed.wav").play();
        this.sentences[0].active=false;
        this.sentences[1].active=true;
      }
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
        <img src="/Users/Eihcir0/Desktop/code_camp_sim/app/assets/images/computer_screen2.png" className="pairs-computer-screen"/>
        <div className="pairs-input-text">
          <textarea id="pairs-input"
            value={this.state.currentInput}
            onKeyDown={this.handleSubmit}
            onChange={this.update("currentInput")}
            className="pairs-input" autoFocus />
       </div>
        <div className="pairs-partner-area">
          {this.pairsLines()}
        </div>
      </div>
    );
  }

}//end component


export default PairsSeshScreen;
