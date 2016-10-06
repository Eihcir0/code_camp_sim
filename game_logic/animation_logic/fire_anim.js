import Moveable from './moveable.js';

class FireAnim extends Moveable {
  constructor(player) {
    super({ctx: player.ctx, canvas: player.canvas});
    this.player = player;
    this.type = "fire";
    this.width = 93;
    this.height = 200;
    this.pos = [290, 210];

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
    this.sound = new Audio("./app/assets/sounds/hes_on_fire.wav");
    this.sound.play();
    this.moves = 0;
    this.times = 0;

  }


  updateAnim(elapsed) {
      this.animTimer += elapsed;
      if (this.animTimer > this.animDelay) {
        this.animFrame++;
        if (this.times %3 ===0 && this.animFrame === this.animNumFrames) {
          this.player.fireSound=new Audio("./app/assets/sounds/fire.wav");
          this.player.fireSound.play();}
        this.animTimer = 0;
        if (this.animFrame > this.animNumFrames) {
          this.animFrame = 0;
          this.times++;

        }
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

export default FireAnim;
