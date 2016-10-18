import React from 'react';
import Clock from './../../game_logic/clock.js';
import PairsLine from './pairs_line.jsx';

class PairsSeshDrivingScreen extends React.Component {
  constructor (props) {
    super(props);
    // this.main = this.main.bind(this);
    this.sentenceTexts = ["test","def my_each","(&prc)","self.length.times do |i|", "prc.call","(self[i])", "end", "self", "end", "def my_select","(&prc)", "selects = []", "self.my_each do |item|", "if prc.call(item)", "selects << item", "end", "end", "selects", "end"];
    this.explosions = [];
    this.shotSound = new Audio ("./app/assets/sounds/shot.wav");
    this.state= {
      currentInput: "",
    };
    this.counter=0;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sentences = this.props.sentences;
    this.showing = this.showing.bind(this);
    this.tick = this.tick.bind(this);
    this.initializeSentences = this.initializeSentences.bind(this);
    this.updateSentences = this.updateSentences.bind(this);
    this.addNewSentence = this.addNewSentence.bind(this);
    this.addExplosion = this.addExplosion.bind(this);
    this.renderExplosion = this.renderExplosion.bind(this);
    this.updateExplosions = this.updateExplosions.bind(this);
    this.pairsLines = this.pairsLines.bind(this);
    this.findActive = this.findActive.bind(this);
    this.lineSpacing = this.lineSpacing.bind(this);
    this.over = false;
    this.yPosIncrement = 2;
    this.explosionImage = new Image ();
    this.explosionImage.src = "./app/assets/images/line_explosion.jpg";
    if (this.sentences.length === 0) {this.initializeSentences();}
  }

  componentDidMount() {
    this.canvas = document.getElementById('canvas2');
    this.canvas.height = 500;
    this.canvas.width = 800;
    this.ctx = this.canvas.getContext("2d");
    this.drivingInterval = setInterval(()=>this.tick(),50);
    this.el = document.getElementById("pairs-input");

  }


  lineSpacing() {
      return (Math.max((150 - this.props.switches * 10),80));
  }

  initializeSentences() {
    var yOffset = this.lineSpacing();
    this.sentenceTexts.forEach((el,idx) => {
      this.sentences.push(
        {id: idx, text: el, active: (idx===0 ? true : false), exploded: false, yPos: (500 + (idx * (yOffset - 10)))}
      );
    });

  }

  tick() {
    if (this.props.player.day.pairsDone) {
      this.clearInt();
      return;
    }
    if (!(this.props.stopped) && !(this.props.done)) {
        this.updateSentences();
        this.updateExplosions();
        if (this.el) {this.el.focus();}
    }
  }



  clearInt() {
    clearInterval(this.drivingInterval);
  }

  addExplosion(a) {
    var skill = this.props.player.currentSkill;
    this.props.player.skills[skill]+=3;
    this.explosions.push({yPos: a.yPos, timer: 0});
  }

  updateExplosions() {

    for (var i = 0; i < this.explosions.length; i++) {
      var a = this.explosions[i];
      this.renderExplosion(a);
      a.yPos -= this.yPosIncrement*2;
      a.timer++;
      if (a.timer===8) {
        this.explosions.splice(i,1);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        i--;
      }
    }
  }

  renderExplosion(a) {
    // this.ctx.fillStyle = "rgb(51, 118, 36)";
    // this.ctx.fillRect(550, a.yPos + 310, 200, 50);

    var xOffset=(a.timer %3) * 75;
    var yOffset=Math.floor(a.timer / 3) * 75;
    for (var i = 0; i < 4; i++) {
      this.ctx.drawImage(this.explosionImage, xOffset, yOffset, 75, 75, 5 + i*60, a.yPos -130, 75, 75 );

    }

  }

  addNewSentence() {
    var a = this.sentences.length - 1;
    var newYpos = this.sentences[a].yPos + this.lineSpacing();

    this.sentences.push(
      {text: this.sentences[0].text, exploded: false, done: false, active: false, yPos: newYpos}
    );
  }


  update(field){
    return e => {
      this.setState({[field]: e.currentTarget.value });
    };
  }

  updateSentences() {

    if (this.state.currentInput==="bbr") {
      this.setState({currentInput: this.sentences[this.findActive()].text});
      return;
    }
    this.sentences.forEach(sentence => {
      sentence.yPos -= this.yPosIncrement;
    });
    if (this.sentences[0].yPos <= 200) {
        if (!(this.sentences[0].exploded)) {
        this.props.drivingLines[1]++;
        new Audio ("./app/assets/sounds/missed.wav").play();}
        this.addNewSentence();
        if (this.sentences[0].active) {
          this.sentences[1].active = true;
          this.sentences[0].active=false;
          this.sentences[0].exploded=false;
          this.sentences[0].done = true;
          this.setState({currentInput: ""});
        }
        this.sentences.shift();
    }
  }

  findActive() {
    for (var i = 0; i < this.sentences.length; i++) {
      if (this.sentences[i].active) {return i;}
    }
    return null;
  }

  handleSubmit(e){

    if (e.keyCode===13) {e.preventDefault();}
    if (e.keyCode===13 && this.state.currentInput.length>1) {
      var a = this.findActive();
      if (this.state.currentInput == this.sentences[this.findActive()].text) {
          new Audio ("./app/assets/sounds/explosion.wav").play();
          this.addExplosion(this.sentences[a]);
          this.sentences[a+1].active = true;
          this.sentences[a].exploded = true;
          this.sentences[a].active = false;
          this.props.drivingLines[0]++;
          this.props.drivingLines[1]++;
        }
      else {
        new Audio ("./app/assets/sounds/missed.wav").play();
        this.sentences[a].active=false;
        this.sentences[a].done = true;
        this.sentences[a+1].active=true;
        this.props.drivingLines[1]++;

      }
        this.setState({currentInput: ""});
    } else if (e.keyCode!==8) {
        if (this.sentences[this.findActive()].text[this.state.currentInput.length]==e.key) {
          new Audio ("./app/assets/sounds/shot.wav").play();
        } else {
          new Audio ("./app/assets/sounds/beep.wav").play();
        }
      }
  }

  pairsLines() {
    var results = [];
    this.sentences.forEach((sentence, idx) => {
    if (sentence.yPos<450) {
    results.push(
      <div key={++this.counter} className="pairs-line" style={{top: sentence.yPos + "px"}} >
        <PairsLine currentLine = {sentence} currentInput = {this.state.currentInput}/>
      </div>
      );}
    });
    return results;
  }

  showing() {
    if (this.props.stopped) { return (
      {display: "none"});
    }
  }


  render () {
    return (
      <div className="pairs-driving-sesh" style={this.showing()}>
      <canvas id="canvas2"
        width="800"
        height="520"/>

      <img src="./app/assets/images/computer_screen2.png" className="pairs-computer-screen"/>
        <div className="pairs-input-text">
          <textarea id="pairs-input"
            value={this.state.currentInput}
            onKeyDown={this.handleSubmit}
            onChange={this.update("currentInput")}
            className="pairs-input"  />
       </div>
        <div key={++this.counter} className="pairs-partner-area">
          {this.pairsLines()}
        </div>
      </div>
    );
  }

}//end component


export default PairsSeshDrivingScreen;
