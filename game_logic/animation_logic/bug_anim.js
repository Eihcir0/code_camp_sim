import Moveable from './moveable.js';
import StudyIcon from './study_icon_anim.js';

class BugAnim extends StudyIcon {
  constructor(obj1, obj2) { //obj1 = canvas/ctx, obj2 = iconType, value
    super(obj1);
    this.iconType = "bug";
    this.value = "bug";

    this.pos = [292, 305];
    this.animationOn = true;
    this.movementOn = false;
    this.height=30;
    this.width=30;
    this.animSet = 0; // ??
    this.spriteYoffset = 0; // ??
    this.animFrame = 0; // ??
    this.animNumFrames = 2; // ??
    this.animDelay = 20; // ??
    this.animTimer = 0; // ??
    this.imageReady = false;
    this.image = new Image();
    this.image.src = "./app/assets/images/bug.png";
    this.sound = new Audio("./app/assets/sounds/bug_sound.wav");
    this.sound.playbackRate = 0.75+(Math.random()/2);
    this.sound.play();
    this.moves = 0;
    this.sunset = (Math.floor(Math.random()*2)-0.5) > 0 ? -1 : 1;
    this.done = false;

  }


  updateAnim(elapsed) {
      this.animTimer += elapsed;
      if (this.animTimer >= this.animDelay) {
        this.animTimer = 0;
        ++this.animFrame;
        this.pos[1]++;
        if (this.animFrame > 60) {
          this.pos[0] += -this.sunset;
          this.pos[0] += -this.sunset;
        }
        else if (this.animFrame > 50) {
          this.pos[0] += +this.sunset;
          this.pos[0] += +this.sunset;
        } else if (this.animFrame> 42) {
          this.pos[0] += -this.sunset;
          this.pos[0] += -this.sunset;
        } else if (this.animFrame> 30) {
          this.pos[0] += this.sunset;
          this.pos[0] += this.sunset;
        } else {
          this.pos[0] += -this.sunset;
          this.pos[0] += -this.sunset;
        }
        if (this.animFrame > 70) {this.done = true;}
      }//end animTime>animDelay
    }//end function




  render() {
    // this.ctx.fillStyle = "rgb(51, 118, 36)";
    // this.ctx.fillRect(300,300,50,50);
      this.ctx.drawImage(
  		this.image,
  		0 + (this.animFrame%2)*this.width,
      0,
      this.width,
      this.height,
  		this.pos[0],
      this.pos[1],
      60,
  		60
      );
    }

} //end class

export default BugAnim;
