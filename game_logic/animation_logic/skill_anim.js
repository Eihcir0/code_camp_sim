import Moveable from './moveable.js';
import StudyIcon from './study_icon_anim.js';

class SkillAnim extends StudyIcon {
  constructor(obj1, obj2) { //obj1 = canvas/ctx, obj2 = iconType, value
    super(obj1);
    this.iconType = obj2.type;
    this.value = obj2.value;
    this.pos = [325, 310];
    this.animationOn = true;
    this.movementOn = false;
    this.animSettings();
    this.imageReady = false;
    this.image = new Image();
    this.image.src = this.getImage();
    this.sound = new Audio("./app/assets/sounds/icon.wav");
    window.setTimeout(()=>this.sound.play(),1);
    this.moves = 0;
    this.sunset = (Math.floor(Math.random()*2)-0.5) > 0 ? -1 : 1;
    this.done = false;

    this.getImage=this.getImage.bind(this);
    this.animSettings=this.animSettings.bind(this);
    this.updateAnim=this.updateAnim.bind(this);
    }

    animSettings() {
    switch (this.value) {
      case "ruby":
        this.width = 959;
        this.height = 833;
        this.animSet = 0; // ??
        this.spriteYoffset = 0; // ??
        this.animFrame = 0; // ??
        this.animNumFrames = 1; // ??
        this.animDelay = 20; // ??
        this.animTimer = 0; // ??
        break;
      default:
        break;
    }
    }

    getImage() {
    switch (this.value) {
      case "ruby":
        return "./app/assets/images/ruby.png";
      default:
        return undefined;

    }
    }
    updateAnim(elapsed) {
      this.animTimer += elapsed;
      if (this.animTimer >= this.animDelay) {
        this.animTimer = 0;
        ++this.animFrame;
        this.pos[1]--;
        if (this.animFrame>65) {
          this.pos[0] += this.sunset;
        } else if (this.animFrame>45) {
          this.pos[0] += this.sunset*-1;
        } else if (this.animFrame>25) {
          this.pos[0] += this.sunset;
        } else if (this.animFrame>15) {
          this.pos[0] += this.sunset*-1;
        } else if (this.animFrame>5) {
          this.pos[0] += this.sunset;
        }
        if (this.animFrame > 120) {this.done = true;}
      }//end animTime>animDelay
    }//end function




    render() {
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

export default SkillAnim;
