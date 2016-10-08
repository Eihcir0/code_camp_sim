import Moveable from './moveable.js';
import StudyIcon from './study_icon_anim.js';

class PointsAnim extends StudyIcon {
  constructor(obj1, obj2) { //obj1 = canvas/ctx, obj2 = iconType, value
    super(obj1);
    this.iconType = obj2.type;
    this.value = obj2.value;
    this.numValue = this.value+1-1;
    this.value = this.value === 1000 ? "+1,000" : `+${this.value}`;
    this.pos = [325, 310];
    this.animationOn = true;
    this.animTimer = 0;
    this.animFrame = 0;
    this.animDelay = 20;
    this.movementOn = false;
    this.sound = this.numValue === 1000 ?
    new Audio("./app/assets/sounds/woohoo.wav") :
    new Audio("./app/assets/sounds/icon.wav");
    window.setTimeout(()=>this.sound.play(),1);
    this.sunset = (Math.floor(Math.random()*2)-0.5) > 0 ? -1 : 1;
    this.done = false;
    this.updateAnim=this.updateAnim.bind(this);
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
        if (this.animFrame > 90 && this.numValue<1000) {this.done = true;}
        if (this.animFrame > 150 && this.numValue===1000) {this.done = true;}
      }//end animTime>animDelay
    }//end function




    render() {
      if (this.numValue < 1000){
      this.ctx.font = "24px serif";
      this.ctx.fillStyle = "white";
      if (this.numValue>500) {
        this.ctx.font = "36px serif";
        this.ctx.fillStyle = "lightgreen";
      }
      this.ctx.fillText(this.value, this.pos[0], this.pos[1]);
    } else {
      this.ctx.font = "48px serif";
      this.ctx.strokeStyle = "lightgreen";
      this.ctx.strokeText(this.value, this.pos[0], this.pos[1]);
    }
}
} //end class

export default PointsAnim;
