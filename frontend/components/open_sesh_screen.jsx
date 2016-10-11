import React from 'react';
import Secretary from './../../game_logic/animation_logic/secretary.js';
import Desk from './../../game_logic/animation_logic/desk.js';
import Clock from './../../game_logic/clock.js';

import StudyIconAnim from
 './../../game_logic/animation_logic/study_icon_anim.js';
import FireAnim from
 './../../game_logic/animation_logic/fire_anim.js';
import FoodAnim from
 './../../game_logic/animation_logic/food_anim.js';
import StudentAnim from
 './../../game_logic/animation_logic/student_anim.js';


class OpenSesh extends React.Component {
  constructor (props) {
    super(props);
    this.player = this.props.player;
    this.playerAnim = this.props.playerAnim;

    this.main = this.main.bind(this);
    this.renderSprites = this.renderSprites.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.checkForDoneSprites = this.checkForDoneSprites.bind(this);
    this.checkFocus = this.checkFocus.bind(this);

    this.quadrants = this.quadrants.bind(this);
    this.mouseOverWorkStation = this.mouseOverWorkStation.bind(this);
    this.mouseOverLecture = this.mouseOverLecture.bind(this);
    this.mouseOverKitchen = this.mouseOverKitchen.bind(this);
    this.mouseOverCandanessa = this.mouseOverCandanessa.bind(this);
    this.clickWorkStation = this.clickWorkStation.bind(this);
    this.clickLecture = this.clickLecture.bind(this);
    this.clickKitchen = this.clickKitchen.bind(this);
    this.clickCandanessa = this.clickCandanessa.bind(this);
    this.drinksCoffee = this.drinksCoffee.bind(this);
    this.eatsDonut = this.eatsDonut.bind(this);
    this.eatsLunch = this.eatsLunch.bind(this);

    this.handleSave = this.handleSave.bind(this);
    this.initializeSprites = this.initializeSprites.bind(this);
    this.buttons = this.buttons.bind(this);
    this.handleGetOffComputer = this.handleGetOffComputer.bind(this);
    this.cancelAnimationFrame = this.cancelAnimationFrame.bind(this);

    this.background = new Image();
    this.background.src = './app/assets/images/newfloor.png';
    this.sprites = [];
    this.lastTickerCount = this.player.clock.tickCounter;
    this.updateCount = 0;
    this.ateDonut = false;
    this.lastCoffee = [4,0,"am"];



    // var funs = [ //bind functions
    //   this.main,
    //   this.renderSprites,
    //   this.update,
    //   this.render,
    //   this.checkForDoneSprites,
    //   this.checkFocus,
    //
    //   this.quadrants,
    //   this.mouseOverWorkStation,
    //   this.mouseOverLecture,
    //   this.mouseOverKitchen,
    //   this.mouseOverCandanessa,
    //   this.clickWorkStation,
    //   this.clickLecture,
    //   this.clickKitchen,
    //   this.clickCandanessa,
    //
    //   this.handleSave,
    //   this.initializeSprites,
    //   this.buttons,
    //   this.handleGetOffComputer,
    //   this.cancelAnimationFrame
    // ];
    // var that = this;
    // funs.forEach(fun => {
    //   this.fun = this.fun.bind(that);
    // });
  }//end constructor

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
    this.hover1 = document.getElementById('hover1');

    this.background.onload = () => this.main();

  }

  endLunch() {
    this.player.eatingLunch = false;
    this.player.ateLunch = true;
    this.tempMessage = "";
    var now = this.player.clock.time();
    this.lunchTime = null;
    this.player.clock = new Clock(now, this.player.defaultClockSpeed);

  }

  main() {
    if (this.player.eatingLunch) {
      if (this.player.clock.diff(this.lunchTime) > this.lunchMinutes) {
        this.endLunch();
      }
    }


    var dt = (this.player.clock.tickCounter - this.lastTickerCount);
    this.lastTickerCount = this.player.clock.tickCounter;
    this.ctx.drawImage(this.background,-28,0);
    this.update(dt);
    this.renderSprites();

    if (this.player.newStrike) {this.cancelAnimationFrame(this.openSeshAnimationFrame);
    } else {
      if ([0,2,4].includes(this.player.session)) {
        this.openSeshAnimationFrame = window.requestAnimationFrame(this.main);
      } else {
        this.cancelAnimationFrame(this.openSeshAnimationFrame);
      }
    }
  }

  cancelAnimationFrame() {
    if (this.openSeshAnimationFrame) {
      this.playerAnim.soundTyping.pause();
      if (this.player.onFire) {this.player.fireOff();}
      window.cancelAnimationFrame(this.openSeshAnimationFrame);
      this.openSeshAnimationFrame = undefined;
    }
  }

  workStationButtons() {
    return (
      <div className="middle-buttons-area">
        <button className="middle-button1"
          onClick={this.handleSave}>
          SAVE GAME
        </button>
        <button className="middle-button2"
          onClick={this.handleGetOffComputer}>
          LEAVE WORKSTATION
        </button>

        <form target="_blank" action=
            "https://gist.github.com/Eihcir0/865d67dc23378110ec761986ccca4370">
            <button className="middle-button3"
              type="submit" value="GO TO GIST">
              GO TO GIST
            </button>
        </form>
      </div>
    );
  }

  drinksCoffee() {
    if (this.player.clock.diff(this.lastCoffee) < 30) {
      this.player.tempMessage = "COFFEE BREWING...";
    } else {
      this.lastCoffee = this.player.clock.time();
      this.player.focus+=35;
      var coffee = new FoodAnim({canvas: this.canvas, ctx: this.ctx},
        "coffee");
      this.sprites.push(coffee);
    }
  }

  eatsDonut() {

  }

  eatsLunch() {
    if (!(this.player.ateLunch)) {
      this.player.eatingLunch = true;
      this.tempMessage = "TAKING LUNCH BREAK";
      this.player.focus = 100;
      this.player.happiness +=2;
      var now = this.player.clock.time();
      this.lunchTime = now;
      this.lunchMinutes = 5 + Math.floor(Math.random()*30);
      if (this.lunchMinutes > 10) {
        this.player.tempMessage = "Stuck in the microwave line!!!";
      }
      this.player.clock = new Clock(now, this.player.defaultClockSpeed*3);
    }

  }

  kitchenButtons() {
    var eatButton = null;
    if (this.player.eatingLunch) {return null;}
    if ((!(this.player.ateLunch)) && this.player.clock.isBetween([12,1],[13,29])) {
      eatButton =
        <button className = "middle-button5"
          onClick = {this.eatsLunch}>
          🍲 LUNCH BREAK
        </button>;
      }
    if (this.player.clock.isBetween([8,45],[8,59])) {
      eatButton =
        <button className = "middle-button5"
          onClick = {this.eatsDonut}>
          🍩 EAT DONUT
        </button>;
      }

    return (
      <div className="middle-buttons-area">
        <button className="middle-button4"
          onClick={this.drinksCoffee}>
          ☕ DRINK COFFEE
        </button>
        {eatButton}
      </div>
    );
  }

  buttons() {
    if (this.player.working())  {return this.workStationButtons();}
    if (this.player.currentPos===9) {return this.kitchenButtons();}
  }

  handleSave() {
    this.player.message = "🚧 This feature is currently underdevelopment 🚧";
  }


  handleBoards() {
    this.player.message = "🚧 This feature is currently underdevelopment 🚧";

  }

  handleGetOffComputer() {
    this.playerAnim.soundTyping.pause();
    if (this.player.onFire) {this.player.fireOff();}
    this.playerAnim.moveTo(0, ()=> {
      this.player.currentPos=0;
    });
  }


  quadrants() {
    if (this.player.eatingLunch){return null;}
    var candanessa = null;
    var kitchen = null;
    if (this.player.clock.isBetween([7,0],[17,0]) && this.player.currentPos !==10 ) {
      candanessa = <div id="hover4"
        onMouseOver={this.mouseOverCandanessa}
        onClick={this.clickCandanessa}
        onMouseOut={()=> {
          this.player.tempMessage="";
        }}/>;
    }
    if (this.player.currentPos !==9 ) {
      kitchen = <div id="hover3"
        onMouseOver={this.mouseOverKitchen}
        onClick={this.clickKitchen}
        onMouseOut={()=> {
          this.player.tempMessage="";
        }}/>;
    }
    if (!(this.player.working())) {
    return (
      <div className="hovers">
        <div id="hover1"
          onMouseOver={this.mouseOverWorkStation}
          onClick={this.clickWorkStation}
          onMouseOut={()=> {
            this.player.tempMessage="";
          }}/>
        <div id="hover2"
          onMouseOver={this.mouseOverLecture}
          onClick={this.clickLecture}
          onMouseOut={()=> {
            this.player.tempMessage="";
          }}/>
        {kitchen}
        {candanessa}
      </div>
    );}
  }

  clickLecture() {
    if (this.player.clock.isBetween([8,30],[9,30])) {
      this.player.message = "";
      this.player.defaultMessage = "";
      this.playerAnim.moveTo(12, ()=> {
        this.player.currentPos=12;
        this.player.session = 1;
      });
    }
    else {
      this.player.message = "The lecture hall doors are locked.";
    }
  }

  mouseOverLecture() {
    if (this.player.clock.isBetween([8,30],[9,30])) {
      this.player.tempMessage = "Go to lecture";
    } else {this.player.tempMessage = "The lecture hall doors are locked.";}
  }

  clickWorkStation() {
    this.playerAnim.moveTo(11, ()=> {
      this.player.currentPos=11;
    });
  }

  mouseOverWorkStation() {
    this.player.tempMessage = "Go to workstation";

  }

  clickKitchen() {
    if (this.player.clock.isBetween([8,45],[8,59])) {
      this.player.tempMessage="Oh look!  Someone left donuts in the kitchen!";}
    this.playerAnim.moveTo(9, ()=> {
      this.player.currentPos=9;
    });
  }

  mouseOverKitchen() {
    this.player.tempMessage = "Go to kitchen";
  }

  clickCandanessa() {
    this.playerAnim.moveTo(10, ()=> {
      this.player.currentPos=10;
    });
  }

  mouseOverCandanessa() {
    this.player.tempMessage = "Talk to Candanessa";
  }

  checkFocus() {
    if (this.player.focus>0) {return;}
    if (!(this.player.message === "You can't focus any longer.  Take a break.")) {
      this.player.oldMessage = this.player.message;
    }
    this.handleGetOffComputer();
  }


  update (dt) {
    this.checkFocus();
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
      if (sprite.type!=="study icon" && sprite.type!=="student") {
        this.ctx.drawImage(sprite.image,sprite.pos[0],sprite.pos[1]);
      } else if (
        sprite.type==="student" &&
        (!(this.player.clock.isBetween([9,1],[11,59]))) &&
        (!(this.player.clock.isBetween([0,0],[6,0])))
      ) {
        sprite.render();
      }

      if (this.player.onFire) {
        this.player.fire.render();
      }
      if (sprite.type==="study icon") {
        sprite.render();
      }
    });
    this.playerAnim.render(); // render player
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

    d = new StudentAnim(this.player, [412,320], 3);
    this.player.rightStudent = d;
    this.sprites.push(d);
    d = new StudentAnim(this.player, [482,319], 3);
    this.sprites.push(d);
    d = new StudentAnim(this.player, [553,322], 3, 1);
    this.sprites.push(d);
    d = new StudentAnim(this.player, [593,320], 3);
    this.sprites.push(d);
    d = new StudentAnim(this.player, [628,323], 3);
    this.sprites.push(d);
    d = new StudentAnim(this.player, [668,323], 3);
    this.sprites.push(d);

    d = new StudentAnim(this.player, [260,201], 2);
    this.sprites.push(d);
    d = new StudentAnim(this.player, [298,204], 2);
    this.sprites.push(d);
    d = new StudentAnim(this.player, [337,200], 2);
    this.sprites.push(d);
    d = new StudentAnim(this.player, [373,202], 2);
    this.sprites.push(d);
    d = new StudentAnim(this.player, [446,202], 2);
    this.sprites.push(d);
    d = new StudentAnim(this.player, [520,200], 2);
    this.sprites.push(d);
    d = new StudentAnim(this.player, [629,202], 2);
    this.sprites.push(d);

    d = new StudentAnim(this.player, [283,91], 1);
    this.sprites.push(d);
    d = new StudentAnim(this.player, [398,90], 1);
    this.sprites.push(d);
    d = new StudentAnim(this.player, [472,91], 1);
    this.sprites.push(d);
    d = new StudentAnim(this.player, [548,90], 1);
    this.sprites.push(d);
    d = new StudentAnim(this.player, [583,91], 1);
    this.sprites.push(d);
    d = new StudentAnim(this.player, [617,90], 1);
    this.sprites.push(d);
    d = new StudentAnim(this.player, [656,96], 1);
    this.sprites.push(d);

  }//end initialize()


    render () {
      return (
        <div className="canvas-container">
          {this.quadrants()}
          <canvas id="canvas"
            width="800"
            height="520"/>
          {this.buttons()}
        </div>
      );
    }

}//end component


export default OpenSesh;
