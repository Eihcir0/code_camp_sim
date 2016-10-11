import Moveable from './moveable.js';

class StudentAnim extends Moveable {
  constructor(player, pos, desk, snumber) {
    super({ctx: player.ctx, canvas: player.canvas});
    this.number=snumber;
    if (snumber===undefined) {
      this.number=Math.floor(Math.random()*9)+2;}
    this.player = player;
    this.desk = desk;
    this.type = "student";
    this.width = 25;
    this.height = 25;
    this.pos = pos;

    this.done = false;
    this.animationOn = true;
    this.movementOn = false;
    this.animSet = 0; // ??
    this.spriteYoffset = 0; // ??
    this.spriteXoffset = 0; // ??
    this.animFrame = 0; // ??
    this.animNumFrames = 4; // ??
    this.animDelay = 1000 + Math.random()*500; // ??
    this.animTimer = 0; // ??
    this.imageReady = false;
    this.image = new Image();
    this.turnedAround = false;
    switch (this.number) {
      case 1:
        this.image.src =
        "./app/assets/images/student3.png";
        break;
      case 2:
        this.image.src =
        "./app/assets/images/student2.png";
        break;
      case 3:
        this.image.src =
        "./app/assets/images/student1.png";
        break;
      case 4:
        this.image.src =
        "./app/assets/images/student4.png";
        break;
      case 5:
        this.image.src =
        "./app/assets/images/student4.png";
        break;
      case 6:
        this.image.src =
        "./app/assets/images/student6.png";
        break;
      case 7:
        this.image.src =
        "./app/assets/images/student6.png";
        break;
      case 8:
        this.image.src =
        "./app/assets/images/student4.png";
        break;
      case 9:
        this.image.src =
        "./app/assets/images/student5.png";
        break;
      case 10:
        this.image.src =
        "./app/assets/images/student5.png";
        break;
      default:

    }

  }


  updateAnim(elapsed) {
      this.animTimer += elapsed;
      if (this.turnedAround && !this.player.onFire) {this.animFrame=1;
      this.turnedAround = false;}
      if (this.animTimer > this.animDelay) {
        this.animTimer = 0;
        var num=Math.floor(Math.random()*1000)+1;
        this.animFrame=0;
        if (num>990 && num<995 && this.animFrame===0) {this.animFrame=1;}
        else if (num>995 && this.animFrame===0) {this.animFrame=2;}
      }
      if (this.player.onFire) {
        this.desk === 3 ? this.animFrame=1 : this.animFrame=3;
        this.turnedAround = true;
      }
    }




  render() {
    // this.ctx.fillStyle = "rgb(51, 118, 36)";
    // this.ctx.fillRect(300,300,50,50);
      this.ctx.drawImage(
  		this.image,
      this.width*this.animFrame,
      0,
      this.width,
      this.height,
  		this.pos[0],
      this.pos[1],
      50,60
      );
    }

} //end class

export default StudentAnim;
