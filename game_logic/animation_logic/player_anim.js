import Moveable from './moveable.js';

class PlayerAnim extends Moveable {
  constructor(obj) {
    super(obj);
    this.type = "hero";
    this.player=obj.player;

    this.moving = 0;
    // 0 = at center
    // 1 = walking to secretary
    // 2 = walking from secretary
    // 3 = walking to computer
    // 4 = walking from computer
    // 5 = walking to KITCHEN
    // 6 = walking from KITCHEN
    // 7 = walking to LECTURE
    // 8 = walking from LECTURE
    // 9 = at KITCHEN
    // 10 = at secretary
    // 11 at computer

    this.imageSheet = new Image();
    this.imageSheet.src =
    "./app/assets/images/spritesheet.png";
    this.imageSeated = new Image();
    this.imageSeated.src =
    "./app/assets/images/hero_seated.png";
    this.soundTyping = new Audio("./app/assets/sounds/typing.wav");
    this.animationOn = true;

    this.updateAnimSet();


  }


  updateAnimSet() {  //should refactor this with a const array?
    if (this.player.currentPos !== this.player.lastCurrentPos) {
    this.player.lastCurrentPos = this.player.currentPos;
    switch (this.player.currentPos) {
      case 0:
        this.pos = [200,330];
        this.image = this.imageSheet;
        this.animSet = 0;
        this.animFrame = 0;
        this.animNumFrames = 1;
        this.animDelay = 300;
        this.animTimer = 0;
        this.spriteYoffset = 250;
        this.spriteXoffset = 37;
        this.width = 32;
        this.height = 64;
        this.facing = "S";
        this.animationOn = false;
        this.movementOn = false;
        break;
      case 9:
        this.pos = [80,200];
        this.image = this.imageSheet;
        this.animSet = 0;
        this.animFrame = 0;
        this.animNumFrames = 1;
        this.animDelay = 300;
        this.animTimer = 0;
        this.spriteYoffset = 250;
        this.spriteXoffset = 37;
        this.width = 32;
        this.height = 64;
        this.facing = "S";
        this.animationOn = false;
        this.movementOn = false;
        break;
      case 10:
        this.pos = [90,330];
        this.image = this.imageSheet;
        this.animSet = 0;
        this.animFrame = 0;
        this.animNumFrames = 1;
        this.animDelay = 300;
        this.animTimer = 0;
        this.spriteYoffset = 250;
        this.spriteXoffset = 37;
        this.width = 32;
        this.height = 64;
        this.facing = "S";
        this.animationOn = false;
        this.movementOn = false;
        break;
      case 11:
        this.pos = [300,323];
        this.image = this.imageSeated;
        this.animSet = 0; // ??
        this.animFrame = 0; // ??
        this.animNumFrames = 3; // ??
        this.animDelay = 300; // ??
        this.animTimer = 0; // ??
        this.spriteYoffset = 0; // ??
        this.spriteXoffset = 0; // ??
        this.width = 64;
        this.height = 64;
        this.facing = "seated";
        this.spriteYoffset = 0;
        this.animationOn = true;
        this.movementOn = false;
        break;
      default:
        break;
      }
    }
  }



  updateAnim(elapsed) {
    if (this.animationOn) {
      this.animTimer += elapsed;

      if (this.animTimer >= this.animDelay) {
        this.animTimer = 0;
        // ++this.animFrame;
        this.animFrame = Math.floor(Math.random()*3);
        if (this.animFrame===1) {
          console.log("sound");this.soundTyping.play();}
        if (this.animFrame >= this.animNumFrames) {
            this.animFrame = 0;
          }
        }
      }
    }

  render() {
    // this.ctx.fillStyle = "rgb(51, 118, 36)";
    // this.ctx.fillRect(300,300,50,50);
      this.ctx.drawImage(
  		this.image,
  		this.currentSprite(),
      this.spriteYoffset,
      this.width,
      this.height,
  		this.pos[0],
      this.pos[1],
      this.width,
  		this.height
      );
    }

} //end class

export default PlayerAnim;
