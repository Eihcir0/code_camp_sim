import Moveable from './moveable.js';

class Fire extends Moveable {
  constructor(obj) {
    super(obj);
    this.width = 93;
    this.height = 200;
    this.pos = [285, 210];

    this.animationOn = true;
    this.movementOn = false;
    this.animSet = 0; // ??
    this.spriteYoffset = 0; // ??
    this.spriteXoffset = 0; // ??
    this.animFrame = 0; // ??
    this.animNumFrames = 9; // ??
    this.animDelay = 40; // ??
    this.animTimer = 0; // ??
    this.imageReady = false;
    this.image = new Image();
    this.image.src =
    "./app/assets/images/fire.png";
    this.type = "fire";
    this.sound = new Audio("./app/assets/sounds/fire.wav");
    this.sound.play();
    this.moves = 0;
    this.done = false;
    this.times = 0;
    this.maxTimes = Math.floor(Math.random()*25)+10;
  }


  updateAnim(elapsed) {
      this.animTimer += elapsed;
      if (this.animTimer > this.animDelay) {
        ++this.animFrame;
        this.animTimer = 0;
        if (this.animFrame > this.animNumFrames) {
          this.animFrame = 0;
          this.times++;
          this.sound.play();

        }
        if (this.times === this.maxTimes - 2) {this.animNumFrames = 15;}
        if (this.times === this.maxTimes -1 ) {this.done = true;}
      }
    }




  render() {
    // this.ctx.fillStyle = "rgb(51, 118, 36)";
    // this.ctx.fillRect(300,300,50,50);
      this.ctx.drawImage(
  		this.image,
      this.currentSprite(),
      0,
      this.width,
      this.height,
  		this.pos[0],
      this.pos[1],
      this.width,
  		this.height
      );
    }

} //end class

export default Fire;
