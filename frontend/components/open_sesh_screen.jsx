import React from 'react';
import Secretary from './../../game_logic/animation_logic/secretary.js';
import Desk from './../../game_logic/animation_logic/desk.js';
import StudyIconAnim from
 './../../game_logic/animation_logic/study_icon_anim.js';
import FireAnim from
 './../../game_logic/animation_logic/fire_anim.js';


class OpenSesh extends React.Component {
  constructor (props) {
    super(props);
    console.log("new openSesh screen");
    this.player = this.props.player;
    this.playerAnim = this.props.playerAnim;
    this.main = this.main.bind(this);
    this.renderSprites = this.renderSprites.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.checkForDoneSprites = this.checkForDoneSprites.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.initializeSprites = this.initializeSprites.bind(this);
    this.buttons = this.buttons.bind(this);
    this.handleGetOffComputer = this.handleGetOffComputer.bind(this);
    this.cancelAnimationFrame = this.cancelAnimationFrame.bind(this);
    this.background = new Image();
    this.background.src = './app/assets/images/newfloor.png';
    this.sprites = [];
    this.lastTime = Date.now();
    this.updateCount = 0;
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
    this.player.ctx = this.ctx;
    this.player.canvas = this.canvas;
    this.playerAnim.ctx = this.ctx;
    this.playerAnim.canvas = this.canvas;
    this.initializeSprites();
    this.background.onload = () => this.main();

  }

  initializeSprites () {
    //need to change this up between animated and not-animated
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
    this.update(dt);
    this.renderSprites();

    if ([0,2,4].includes(this.player.session)) {
      this.openSeshAnimationFrame = window.requestAnimationFrame(this.main);
    } else {this.cancelAnimationFrame();}

  }

  cancelAnimationFrame() {
    if (this.openSeshAnimationFrame) {
      this.playerAnim.soundTyping.pause();
      if (this.player.onFire) {this.player.fireOff();}
      window.cancelAnimationFrame(this.openSeshAnimationFrame);
      this.openSeshAnimationFrame = undefined;
    }
  }

  buttons() {
    if (this.player.currentPos === 11)  {
      return (
        <div className="middle-buttons-area">
          <button className="middle-button1">
            SAVE GAME
          </button>
          <button className="middle-button2"
            onClick={this.handleGetOffComputer}>
            LEAVE WORKSTATION
          </button>
          <button className="middle-button3">
            CHECK BULLETIN BOARDS
          </button>
        </div>
      );
    }
  }

  handleGetOffComputer() {
    this.playerAnim.soundTyping.pause();
    if (this.player.onFire) {this.player.fireOff();}
    this.playerAnim.moveTo(0, ()=>(this.player.currentPos=0));
  }

  handleClick(e) {
    console.log("click");
    console.log(e.pageX);
    console.log(e.pageY);
    var y = e.pageY;
    var x = e.pageX;
    if (!(this.player.currentPos === 11)) {
      if (y>520 && x<553) {
        // execute animation for walking to secretary
        this.player.currentPos = 10;}

      if (x>315 && x<492 && y>430 && y<520) {
           // animation walking to desk with move()
        this.player.currentPos = 11;
      }

      if (x<321 && y>273 && y<418) {
        // animation walking to kitchen
        this.player.currentPos = 9;
      }
      if (x>125 && x<421 && y<186) {
        // animation walking to lecture
        if (this.player.clock.isBetween([8,30],[9,30])) {
          this.player.message = "";
          this.player.defaultMessage = "";
          this.player.currentPos = 12;
        }
        else {
          this.player.message = "The lecture hall doors are locked.";
          this.player.currentPos = 0;
        }
      }
    }
  }//end handle click

  //need to add a "on hover" ie mouseover section.  will change the classes of some overlays to make it darker.
  update (dt) {
      if (this.player.focus<=0) {
        this.player.message="You can't focus any longer.  Take a break.";
        this.handleGetOffComputer();
      }
      this.updateCount += dt;
      if (this.player.working()) {
        if (this.updateCount>100) {
          this.updateCount = 0;

          var workstationUpdate = this.player.workstationGo();
          if (workstationUpdate){
            this.addStudyIcon(workstationUpdate);
            }
        }
      }
      this.sprites.forEach(sprite => sprite.update(dt));
      if (this.player.onFire) {
        this.player.fire.update(dt);}
      this.playerAnim.update(dt);
      this.checkForDoneSprites();
      //check for new icon
  }

  addStudyIcon(newIcon) { //this should take an object account
    this.sprites.push(newIcon);
    this.player.lastIconTime = Date.now();
  }

  renderSprites () {
    ////draw furniture first then fire, then study icons then hero
    this.sprites.forEach(sprite => {
      if (sprite.type!=="study icon") {
        this.ctx.drawImage(sprite.image,sprite.pos[0],sprite.pos[1]);
      }
      if (this.player.onFire) {this.player.fire.render();}
      if (sprite.type==="study icon") {
        sprite.render();
      }
      this.playerAnim.render(); // render player
    });
  }

  checkForDoneSprites () { //change to check for done icons

    for (var i = 0; i < this.sprites.length; i++) {
      var sprite = this.sprites[i];
      if (sprite.done) {
        this.sprites.splice(i,1);
        i -=1;
      }
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
