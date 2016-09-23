// import * as Sprites from './../../game_logic/animation_logic/sprites.js';
import React from 'react';
import Secretary from './../../game_logic/animation_logic/secretary.js';
import Desk from './../../game_logic/animation_logic/desk.js';
import Kitchen from './../../game_logic/animation_logic/kitchen.js';
import PlayerAnim from './../../game_logic/animation_logic/player_anim.js';
import StudyIconAnim from
 './../../game_logic/animation_logic/study_icon_anim.js';
import Fire from
 './../../game_logic/animation_logic/fire.js';
// import ReactDOM from 'react-dom';


class OpenSesh extends React.Component {
  constructor (props) {
    super(props);
    this.main = this.main.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    this.initialize();
    this.background.onload = () => this.main();

    }

  main() {
    var dt = Date.now() - this.lastTime;
    this.lastTime = Date.now();

    this.ctx.drawImage(this.background,-28,0);
    this.update(dt);
    this.renderSprites();

    window.requestAnimationFrame(this.main);

  }


    handleClick(e) {
      console.log("click");
      console.log(e.pageX);
      console.log(e.pageY);
      var y = e.pageY;
      var x = e.pageX;
      if (y>500 && x<305) {
        // execute animation for walking to secretary
        this.props.player.currentPos = 10;}

      if (x>470 && x<550 && y>430 && y<520) {
         // animation walking to desk
        this.props.player.currentPos = 11;

      }


      if (x<321 && y>273 && y<418) {
         // animation walking to kitchen
        this.props.player.currentPos = 9;

      }



    }
  render () {

    return (
      <canvas id="canvas" width="800" height="520" onClick={this.handleClick}/>
    );
  }

  initialize () {
      this.sprites.push(new Secretary);
      var d = new Desk(1);
      d.pos = [220,70];
      this.sprites.push(d);
      d = new Desk(2);
      d.pos = [250,200];
      this.sprites.push(d);
      d = new Desk(3);
      d.pos = [300,320];
      this.sprites.push(d);
      d = new PlayerAnim({player: this.props.player, canvas: this.canvas, ctx: this.ctx});
      this.sprites.push(d);
      this.addFire();

    }

    addStudyIcon () {
      var d = new StudyIconAnim({canvas: this.canvas, ctx: this.ctx});
      this.sprites.push(d);
    }
    addFire () {
      var d = new Fire({canvas: this.canvas, ctx: this.ctx});
      this.sprites.push(d);
      this.props.player.onFire = true;
      this.props.player.message = "YOU'RE ON FIRE!";
    }

    update (dt) {
        if (((Math.floor(Math.random()*1000) - (this.props.player.onFire ? 50 : 0)) < 10) && this.props.player.currentPos===11) {this.addStudyIcon();}
        var newSprites = this.sprites.slice(0);
        if (Math.floor(Math.random()*5000) < 10 && this.props.player.currentPos===11) {this.addFire();}
        var newSprites = this.sprites.slice(0);
        for (var i = 0; i < this.sprites.length; i++) {
          if (this.sprites[i].done) {
            if (this.sprites[i].type === "fire")
            { this.props.player.onFire = false;
            this.props.player.message = "";
          }
            newSprites.splice(i);
          }
        }
        this.sprites = newSprites;
        this.sprites.forEach(sprite => sprite.update(dt));

      }

    renderSprites () {
      var hero;
      this.sprites.forEach(sprite => {
        if (sprite.type === "hero") {
          hero = sprite;
        } else if (sprite.type==="study icon" || sprite.type==="fire") {
          sprite.render();
        } else {
          this.ctx.drawImage(sprite.image,sprite.pos[0],sprite.pos[1]);
        }
        if (hero) {hero.render(); }
      });
    }

}//end component


export default OpenSesh;
