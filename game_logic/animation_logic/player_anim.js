import Moveable from './moveable.js';

class PlayerAnim extends Moveable {
  constructor(obj) {
    super(obj);
    this.type = "hero";
    this.destination = {};
    this.player=obj.player;
    this.render = this.render.bind(this);
    this.moveTo = this.moveTo.bind(this);
    this.move=this.move.bind(this);
    this.checkArrived=this.checkArrived.bind(this);
    this.moving = 0;

    // 0 = at center
    // 1 = walking to secretary
    // 2 = walking from secretary
    // 2.5 = walking from secretary to kitchen
    // 3 = walking to computer
    //3.5 walking to computer from kitchen
    // 4 = walking from computer
    // 5 = walking to KITCHEN
    // 6 = walking from KITCHEN
    // 7 = walking to LECTURE
    // 8 = walking from LECTURE // NOT USED
    // 9 = at KITCHEN
    // 10 = at secretary
    // 11 at computer
    // 12 at lecture
    // 13 outside of kitchen

    this.imageSheet = new Image();
    this.imageSheet.src =
    "./app/assets/images/hero_spritesheet.png";
    this.imageSeated = new Image();
    this.imageSeated.src =
    "./app/assets/images/hero_seated_spritesheet.png";
    this.soundTyping = new Audio("./app/assets/sounds/typing.wav");
    this.soundTyping.autoplay = true;
    this.soundTyping.load();
    this.animationOn = true;
    this.speed=100;
    this.updateAnimSet();
  }//end constructor


  checkArrived() {
    switch (this.facing) {
      case "E":
      if (this.pos[0]>=this.destination.x) {
        this.destination.cb();
        return true;} else {return false;}
      case "S":
      if (this.pos[1]>=this.destination.y) {
        this.destination.cb();
        return true;} else {return false;}
      case "SE":
      if (this.pos[1]>=this.destination.y) {
        this.destination.cb();
        return true;} else {return false;}
      case "W":
      if (this.pos[0]<=this.destination.x) {
        this.destination.cb();
        return true;} else {return false;}
      case "N":
      if (this.pos[1]<=this.destination.y) {
        this.destination.cb();
        return true;} else {return false;}
      case "NW":
      if (this.pos[1]<=this.destination.y) {
        this.destination.cb();
        return true;} else {return false;}
      default:
        return false;
    }

  }


  move(elapsed) {
    if (this.checkArrived()) {return;}
    let newPos = this.pos.slice(0);
    if (this.movementOn) {
        var move = (this.speed * (elapsed / 1000));
        let speedFactor;
        if (this.DIAGS.includes(this.facing)) { //reduce diag velocity
          speedFactor = 0.375;
        } else {
          speedFactor=1;
        }
          newPos[0] +=
          Math.round(move *  this.MOVES[this.facing][0]);
          newPos[1] +=
          Math.round(move * speedFactor * this.MOVES[this.facing][1]);
      }
    this.pos = newPos;
  }//end move()

  render() {
      this.ctx.drawImage(
  		this.image,
  		this.currentSprite(),
      this.spriteYoffset + this.height*this.animSet,
      this.width,
      this.height,
  		this.pos[0],
      this.pos[1],
      45,
  		68
    );
    }
    updateAnim(elapsed) {
      if (this.animationOn) {
        this.animTimer += elapsed;

        if (this.animTimer >= this.animDelay) {
          this.animTimer = 0;
          ++this.animFrame;
          }
          // if (this.animFrame===1) {
          //   this.soundTyping.play();}
          if (this.animFrame >= this.animNumFrames) {
              this.animFrame = 0;
          }
        }
      }


    updateAnimSet() {
      if (this.player.currentPos === this.player.lastCurrentPos) {return;}

      this.player.lastCurrentPos = this.player.currentPos;
      this.image = this.imageSheet;
      this.animFrame = 0;
      this.animDelay = 90;
      this.animTimer = 0;
      this.spriteXoffset = 0;
      this.spriteYoffset = 0;
      this.width = 25;
      this.height = 38;
      this.animationOn = true;
      this.movementOn = true;
      this.animNumFrames = 4;

      switch (this.player.currentPos) {
        case 0: //at center
          this.pos = [200,330];
          this.animSet = 0;
          this.animNumFrames = 1;
          this.animDelay = 300;
          this.facing = "S";
          this.animationOn = false;
          this.movementOn = false;
          break;
        case 1: //walking W to secretary
          this.animSet = 1;
          this.facing = "W";
          break;
        case 2.5: //walking N from secretary
          this.image = this.imageSheet;
          this.animSet = 3;
          this.facing = "N";
          break;
        case 3: //walking E to computer
          this.animSet = 2;
          this.facing = "E";
          break;
        case 3.5: // walking SE from kitchen
          this.animSet = 2;
          this.facing = "SE";
          break;
        case 4: //walking W from computer
          this.animSet = 1;
          this.facing = "W";
          break;
        case 5: //walking NW to kitchen
        this.animSet = 1;
        this.facing = "NW";
        break;
        case 6: //walking S from kitchen
        this.animSet = 0;
        this.facing = "S";
        break;
        case 7: //walking N to lecture
          this.animSet = 3;
          this.facing = "N";
          break;
        case 9: //at kitchen
          this.pos = [90,200];
          this.animSet = 0;
          this.animNumFrames = 1;
          this.animDelay = 300;
          this.facing = "S";
          this.animationOn = false;
          this.movementOn = false;
          break;
        case 10: // at secretary
          this.pos = [90,330];
          this.image = this.imageSheet;
          this.animSet = 0;
          this.animNumFrames = 1;
          this.animDelay = 300;
          this.facing = "S";
          this.animationOn = false;
          this.movementOn = false;
          break;
        case 11: // seated at computer
          this.pos = [298,321];
          this.image = this.imageSeated;
          this.animSet = 3;
          if (this.animTimer ===0){this.animFrame =
             (Math.floor(Math.random()*3)+1);}
          this.animNumFrames = 3;
          this.animDelay = 3000;
          this.facing = "seated";
          this.movementOn = false;
          break;
        default:
          break;
        }

    }

    //this fn takes a callback for what to do when destination reached
    moveTo(newPos, callback) {
      switch (true) {
        case ((this.player.currentPos === 0
              || this.player.currentPos===10)
              && newPos===11):
          this.destination={x:308, y:330, cb: callback};
          this.player.currentPos = 3;
          break;
        case (this.player.currentPos ===11 && newPos===0):
          this.destination={x:200, y:330, cb: callback};
          this.player.currentPos = 4;
          break;
        case (this.player.currentPos ===10 && newPos===0):
          this.destination={x:200, y:330, cb: callback};
          this.player.currentPos = 3;
          break;
        case ((this.player.currentPos ===0
            || this.player.currentPos === 13)
            && newPos===12):
          this.facing="N";
          this.destination={x:200, y:50, cb: callback};
          this.player.currentPos = 7;
          break;
        case (this.player.currentPos ===0 && newPos===9):
          this.destination={x:90, y:200, cb: callback};
          this.player.currentPos = 5;
          break;
        case (this.player.currentPos ===0 && newPos===10):
          this.destination={x:90, y:330, cb: callback};
          this.player.currentPos = 1;
          break;
        case (this.player.currentPos ===10 && newPos===9):
          this.destination={x:90, y:200, cb: callback};
          this.player.currentPos = 2.5;
          break;
        case (this.player.currentPos ===9 && newPos===10):
          this.destination={x:90, y:330, cb: callback};
          this.player.currentPos = 6;
          break;
        case (this.player.currentPos ===9 && newPos===11):
          this.destination={x:308, y:330, cb: callback};
          this.player.currentPos = 3.5;
          break;
        //if going to lecture from kitchen, go to area 13 e of kitchen first
        case (this.player.currentPos ===9 && newPos===12):
          this.destination={x:200, y:200, cb: ()=> {
            this.player.currentPos=13;
            this.moveTo(12, ()=> {
              this.player.message = "";
              this.player.defaultMessage = "";
              this.player.currentPos=12;
              this.player.session = 1;
            });
            }
          };
          this.player.currentPos = 3;
          break;
        //if going to lecture from secretary, go to kitchen first
        case (this.player.currentPos === 10 && newPos===12):
          this.destination={x: 90, y:200, cb: ()=>{
            this.player.currentPos = 9;
            this.moveTo(12,null);
          }};
          this.player.currentPos =2.5;
          break;
        default:
          break;
    }
    this.player.tempMessage="";
  }


} //end class

export default PlayerAnim;
