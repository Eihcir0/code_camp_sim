// import * as Sprites from './../../game_logic/animation_logic/sprites.js';
import React from 'react';
import Secretary from './../../game_logic/animation_logic/secretary.js';
import Desk from './../../game_logic/animation_logic/desk.js';
import StudyIconAnim from
 './../../game_logic/animation_logic/study_icon_anim.js';
import Fire from
 './../../game_logic/animation_logic/fire.js';
// import ReactDOM from 'react-dom';


class OpenSesh extends React.Component {
  constructor (props) {
    super(props);
    this.main = this.main.bind(this);
    this.renderSprites = this.renderSprites.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.checkForDoneSprites = this.checkForDoneSprites.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.initializeSprites = this.initializeSprites.bind(this);
    this.buttons = this.buttons.bind(this);
    this.handleGetOffComputer = this.handleGetOffComputer.bind(this);

    this.background = new Image();
    this.background.src = './app/assets/images/newfloor.png';
    this.sprites = [];
    this.lastTime = Date.now();
    this.state= {
      // lastTime: Date.now()
      // isLiked: false
    };
    // this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.canvas = document.getElementById('canvas');
    this.canvas.height = 500;
    this.canvas.width = 800;
    this.ctx = this.canvas.getContext("2d");
    this.initializeSprites();
    this.background.onload = () => this.main();

  }

  initializeSprites () {
    this.sprites.push(new Secretary);
    var d = new Desk(1);
    d.pos = [290,90];
    this.sprites.push(d);
    d = new Desk(2);
    d.pos = [250,200];
    this.sprites.push(d);
    d = new Desk(3);
    d.pos = [300,320];
    this.sprites.push(d);

  }

  main() {
    var dt = Date.now() - this.lastTime;
    this.lastTime = Date.now();

    this.ctx.drawImage(this.background,-28,0);
    this.props.playerAnim.ctx = this.ctx;
    this.props.playerAnim.canvas = this.canvas;
    this.update(dt);
    this.renderSprites();

    window.requestAnimationFrame(this.main);
  }


  handleGetOffComputer() {
    this.props.playerAnim.soundTyping.pause();
    this.props.playerAnim.moveTo(0, ()=>(this.props.player.currentPos=0));
  }


  buttons() {
    if (this.props.player.currentPos === 11)  {
      return (
        <button className="middle-button"
          onClick={this.handleGetOffComputer}>
          LEAVE WORKSTATION
        </button>
      );
    }
  }



  handleClick(e) {
    console.log("click");
    console.log(e.pageX);
    console.log(e.pageY);
    var y = e.pageY;
    var x = e.pageX;
    if (!(this.props.player.currentPos === 11)) {
      if (y>520 && x<553) {
        // execute animation for walking to secretary
        this.props.player.currentPos = 10;}

      if (x>315 && x<492 && y>430 && y<520) {
           // animation walking to desk with move()
        this.props.player.currentPos = 11;
      }

      if (x<321 && y>273 && y<418) {
        // animation walking to kitchen
        this.props.player.currentPos = 9;
      }
      if (x>125 && x<421 && y<186) {
        // animation walking to kitchen
        this.props.player.currentPos = 12;
      }
    }
  }//end handle click

  update (dt) {
      this.props.playerAnim.update(dt);
      this.checkForDoneSprites();
      this.sprites.forEach(sprite => sprite.update(dt));
      this.randomFire();
      this.randomIcon();

  }

  renderSprites () {
    this.sprites.forEach(sprite => {
      if (sprite.type==="study icon" || sprite.type==="fire") {
        sprite.render();
      } else {
        this.ctx.drawImage(sprite.image,sprite.pos[0],sprite.pos[1]);
      }
      this.props.playerAnim.render(); // render player
    });
  }

  checkForDoneSprites () {

    for (var i = 0; i < this.sprites.length; i++) {
      var sprite = this.sprites[i];
      if (sprite.type === "fire") {
        if (sprite.times >= sprite.maxTimes) {
          this.props.player.onFire = false;

          sprite.done = true;
        }
      }
      if (sprite.done) {
        this.sprites.splice(i);
        i -=1;
      }
    }
  }


  randomFire() { //this goes away
    if (Math.floor(Math.random()*5000) < 5
      && this.props.player.currentPos===11
      && this.props.player.onFire===false) {
        this.addFire();
    }
  }

  addFire () {
    var d = new Fire({canvas: this.canvas, ctx: this.ctx,
      player: this.props.player});
    this.sprites.push(d);
    this.props.player.onFire = true;
  }

  randomIcon() {  //this goes away
    if (
      ((Math.floor(Math.random()*1000) -
      (this.props.player.onFire ? 50 : 0))
      < 10) &&
      this.props.player.currentPos===11 ) {
      this.addStudyIcon();
    }
  }

  addStudyIcon () {
    if ( (Date.now() - this.props.player.lastIconTime) > 70) {
      var d = new StudyIconAnim({canvas: this.canvas, ctx: this.ctx});
      this.sprites.push(d);
      this.props.player.lastIconTime = Date.now();
      this.props.player.skills.Ruby += 1;
    }
  }

  render () {
    return (
      <div className="canvas-container">
        <canvas id="canvas"
          width="800"
          height="520"
          onClick={this.handleClick}/>

        {this.buttons()}
      </div>
    );
  }


}//end component


export default OpenSesh;
