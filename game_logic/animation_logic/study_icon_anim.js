import Moveable from './moveable.js';

class StudyIcon extends Moveable {
  constructor(obj) {
    super(obj);
    this.width = 959;
    this.height = 833;
    this.pos = [325, 310];

    this.animationOn = true;
    this.movementOn = false;
    this.animSet = 0; // ??
    this.spriteYoffset = 0; // ??
    this.animFrame = 0; // ??
    this.animNumFrames = 1; // ??
    this.animDelay = 50; // ??
    this.animTimer = 0; // ??
    this.imageReady = false;
    this.image = new Image();
    this.image.src =
    "./app/assets/images/ruby.png";
    this.type = "study icon";
    this.sound = new Audio("./app/assets/sounds/icon.wav");
    this.sound.play();
    this.moves = 0;
    this.sunset = (Math.floor(Math.random()*2)-0.5) > 0 ? -1 : 1;
    this.done = false;
  }


  updateAnim(elapsed) {
      this.animTimer += elapsed;
      if (this.animTimer >= this.animDelay) {
        ++this.animFrame;
        this.pos[1] -= 1;
        if (this.animFrame>25) {
          this.pos[0] += this.sunset;
        } else if (this.animFrame>15) {
          this.pos[0] += this.sunset*-1;
        } else if (this.animFrame>5) {
          this.pos[0] += this.sunset;
        }
        if (this.animFrame > 30) {this.done = true;}
      }
    }




  render() {
    // this.ctx.fillStyle = "rgb(51, 118, 36)";
    // this.ctx.fillRect(300,300,50,50);
      this.ctx.drawImage(
  		this.image,
  		0,
      0,
      this.width,
      this.height,
  		this.pos[0],
      this.pos[1],
      20,
  		16
      );
    }

} //end class

export default StudyIcon;
