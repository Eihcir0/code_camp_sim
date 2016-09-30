import React from 'react';
import Clock from './../../game_logic/clock.js';

class PairsSeshOpenScreen extends React.Component {
  // constructor (props) {
  //   this.state= {
  //     counter: 0
  //   };
  //   this.zzinteral = setInterval()
  // }
  //
  // clearInt() {
  //   clearInterval(this.zzinterval);
  // }
  //
  // addExplosion(a) {
  //   this.explosions.push({yPos: a.yPos, timer: 0});
  // }
  //
  // updateExplosions() {
  //
  //   for (var i = 0; i < this.explosions.length; i++) {
  //     var a = this.explosions[i];
  //     this.renderExplosion(a);
  //     a.yPos -= this.yPosIncrement*2;
  //     a.timer++;
  //     if (a.timer===8) {
  //       this.explosions.splice(i,1);
  //       this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  //       i--;
  //     }
  //   }
  // }
  //
  // renderExplosion(a) {
  //   // this.ctx.fillStyle = "rgb(51, 118, 36)";
  //   // this.ctx.fillRect(550, a.yPos + 310, 200, 50);
  //   var xOffset=(a.timer %3) * 75;
  //   var yOffset=Math.floor(a.timer / 3) * 75;
  //   for (var i = 0; i < 4; i++) {
  //     this.ctx.drawImage(this.explosionImage, xOffset, yOffset, 75, 75, 530 + i*60, a.yPos -130, 75, 75 );
  //
  //   }
  //
  // }
  //
  // addNewSentence() {
  //   var a = this.sentences.length - 1;
  //   var newYpos = this.sentences[a].yPos + this.lineSpacing;
  //   var firstOne = this.sentences[0];
  //   this.sentences.push(
  //     {error: firstOne.error,
  //       text: this.sentenceTexts[firstOne.id],
  //       exploded: false,
  //       done: false,
  //       active: false,
  //       yPos: newYpos,
  //       id: firstOne.id}
  //   );
  // }
  //
  //
  // update(field){
  //   return e => {
  //     this.setState({[field]: e.currentTarget.value });
  //   };
  // }
  //
  // checkOver() {
  //   if (this.sentences.length===0) {
  //   clearInterval(this.yyinterval);
  //   console.log("OVER");}
  // }
  //
  // updateSentences() {
  //
  //   if (this.state.currentInput==="bbr") {
  //     this.setState({currentInput: this.sentences[0].text});
  //     return;
  //   }
  //   this.sentences.forEach(sentence => {
  //     sentence.yPos -= this.yPosIncrement;
  //   });
  //   if (this.sentences[0].yPos <= 200) {
  //       if (!(this.sentences[0].exploded) && !(this.sentences[0].done)) {
  //         new Audio ("./app/assets/sounds/missed.wav").play();}
  //       this.addNewSentence();
  //       if (this.sentences[0].active) {
  //         this.sentences[1].active = true;
  //         this.sentences[0].active=false;
  //         this.sentences[0].exploded=false;
  //         this.sentences[0].done = true;
  //         this.setState({currentInput: this.sentences[1].error});
  //       }
  //       this.sentences.shift();
  //   } else {this.checkOver();}
  // }
  //
  // findActive() {
  //   for (var i = 0; i < this.sentences.length; i++) {
  //     if (this.sentences[i].active) {return i;}
  //   }
  //   return null;
  // }
  //
  // handleSubmit(e){
  //
  //   if (e.keyCode===13) {e.preventDefault();}
  //   if (e.keyCode===13) {
  //     // debugger;
  //     var a = this.findActive();
  //     if (this.state.currentInput == this.sentences[a].text) {
  //         new Audio ("./app/assets/sounds/explosion.wav").play();
  //         this.addExplosion(this.sentences[a]);
  //         this.sentences[a+1].active = true;
  //         this.sentences[a].exploded = true;
  //         this.sentences[a].active = false;
  //       }
  //     else {
  //       new Audio ("./app/assets/sounds/missed.wav").play();
  //       this.sentences[a].active=false;
  //       this.sentences[a].text="💩".repeat(Math.floor(this.sentences[a].text.length/3));
  //       this.sentences[a].done = true;
  //       this.sentences[a+1].active=true;
  //     }
  //       this.setState({currentInput: this.sentences[a+1].error});
  //   } else if (e.keyCode!==8) {
  //       if (this.sentences[this.findActive()].text[this.state.currentInput.length]==e.key) {
  //         new Audio ("./app/assets/sounds/shot.wav").play();
  //       } else {
  //         new Audio ("./app/assets/sounds/beep.wav").play();
  //       }
  //     }
  //   }
  //
  // pairsLines() {
  //   var results = [];
  //   this.sentences.forEach((sentence, idx) => {
  //   if (sentence.yPos<500) {
  //   results.push(
  //     <div className="pairs-navigating-line" style={sentence.exploded ? {display: "none"} : {top: sentence.yPos + "px"}} >
  //
  //
  //       {sentence.text}
  //     </div>
  //     );}
  //   });
  //   return results;
  // }
  //
  //
  //
  // render () {
  //   return (
  //     <div className="pairs-sesh">
  //     <canvas id="canvas2"
  //       width="800"
  //       height="520"/>
  //
  //       <img src="/Users/Eihcir0/Desktop/code_camp_sim/app/assets/images/computer_screen2.png" className="pairs-computer-screen"/>
  //       <div className="pairs-input-text">
  //         <textarea id="pairs-input"
  //           value={this.state.currentInput}
  //           onKeyDown={this.handleSubmit}
  //           onChange={this.update("currentInput")}
  //           className="pairs-input" autoFocus />
  //      </div>
  //       <div className="pairs-partner-area">
  //         {this.pairsLines()}
  //       </div>
  //     </div>
  //   );
  // }
  //
}//end component


export default PairsSeshOpenScreen;
