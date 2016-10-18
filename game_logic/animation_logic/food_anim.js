import Moveable from './moveable.js';
import StudyIcon from './study_icon_anim.js';

class FoodAnim extends StudyIcon {
  constructor(obj, type) { //obj = canvas/ctx
    super(obj);
    this.foodType = type;
    this.pos = [92, 180];
    this.animSettings();
    this.animationOn = false;
    this.movementOn = false;
    this.imageReady = false;
    this.image = new Image();
    this.image.src = this.getImage();
    this.sound.autoplay = true;
    this.sound.load();
    this.moves = 0;
    this.sunset = (Math.floor(Math.random()*2)-0.5) > 0 ? -1 : 1;
    this.done = false;

    this.getImage=this.getImage.bind(this);
    this.animSettings=this.animSettings.bind(this);
    this.updateAnim=this.updateAnim.bind(this);
    }

    animSettings() {
    switch (this.foodType) {
      case "coffee":
        this.width = 256;
        this.height = 256;
        this.animSet = 0;
        this.spriteYoffset = 0;
        this.animFrame = 0;
        this.animNumFrames = 1;
        this.animDelay = 20;
        this.animTimer = 0;
        this.sizeMultiplier = 3;
        this.sound = new Audio("./app/assets/sounds/coffee.wav");
        break;
      case "donut":
        this.width = 256;
        this.height = 256;
        this.animSet = 0;
        this.spriteYoffset = 0;
        this.animFrame = 0;
        this.animNumFrames = 1;
        this.animDelay = 20;
        this.animTimer = 0;
        this.sizeMultiplier = 3;
        this.sound = new Audio("./app/assets/sounds/donut.wav");
        break;
      case "lunch":
        this.width = 256;
        this.height = 256;
        this.animSet = 0;
        this.spriteYoffset = 0;
        this.animFrame = 0;
        this.animNumFrames = 1;
        this.animDelay = 20;
        this.animTimer = 0;
        this.sizeMultiplier = 3;
        this.sound = new Audio("./app/assets/sounds/microwave.wav");
        break;
      default:
        break;
    }
    }

    getImage() {
    switch (this.foodType) {
      case "coffee":
        return "./app/assets/images/coffee.png";
      case "donut":
        return "./app/assets/images/donut.png";
      case "lunch":
        return "./app/assets/images/lunch.png";
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
        if (this.animFrame > 90) {this.done = true;}
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
      20 * this.sizeMultiplier,
      16 * this.sizeMultiplier
      );
    }

} //end class

export default FoodAnim;
