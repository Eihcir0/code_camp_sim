
class Moveable {
  constructor(obj) {
    // this.board = obj.board;
    // this.boardDimensions = this.board.boardDimensions;
    this.MOVES = {
      "N"    : [ 0,-1],
      "S"    : [ 0, 1],
      "E"    : [ 1, 0],
      "W"    : [-1, 0],
      "NE"   : [ 1,-1],
      "NW"   : [-1,-1],
      "SE"   : [ 1, 1],
      "SW"   : [-1, 1],
      "STOP" : [ 0, 0],
      "seated" : [0,0]
      };
    this.DIAGS = ["NE","NW","SE","SW"];
    this.ctx = obj.ctx;
    this.canvas = obj.canvas;
    // this.lastDir = "S";
    // this.done = false;
    // this.blinking = obj.blinking || 0;
  }

  currentSprite() { //this is really just the X offset calc'd
  return (
    (this.animSet * (this.width * this.animNumFrames)) +
    (this.animFrame * this.width) + this.spriteXoffset
    );
  }

  update(elapsed) {

    if (this.type === "hero") {this.updateAnimSet();}
    this.updateAnim(elapsed);
    this.move(elapsed);

  }

  move(elapsed) {
    let newPos = this.pos.slice(0);
    if (this.movementOn) {
      var move = (this.speed * (elapsed / 1000));
      let speedFactor;

      if (this.DIAGS.includes(this.facing)) { //reduce diag velocity
        speedFactor = 0.75;
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


  // updateAnim(elapsed) {
  //
  //     this.animTimer += elapsed;
  //
  //     if (this.animTimer >= this.animDelay) {
  //       if (this.automover) {
  //         ++this.currentMovement;
  //
  //         if (this.currentMovement >= this.numMovements - 1) {
  //           this.currentMovement = 0;
  //         }
  //         this.facing = (this.movements[this.currentMovement]);
  //       }
  //       this.animTimer = 0;
  //       if (this.animationOn) {++this.animFrame;
  //         if (this.animFrame >= this.animNumFrames) {
  //             this.animFrame = 0;
  //         }
  //
  //         }
  //     }
  //   }



  // stop() {
  //   if (this.facing !== "STOP") {
  //   this.lastDir = this.facing;}
  //   this.facing = "STOP";
  //   this.animationOn = false;
  // }

  go(dir) {
    // this.facing = dir;
    // this.animationOn = true;
    // this.speed = this.Maxspeed;
    // this.updateAnimSet();
  }


  // render() {
  //   if (this.name === 'FIREBALL') {console.log(this);}
  //     this.ctx.drawImage(
  // 		this.image,
  // 		this.currentSprite(),
  //     this.spriteYoffset*this.height,
  //     this.width,
  //     this.height,
  // 		this.pos[0],
  //     this.pos[1],
  //     this.width,
  // 		this.height
	//   );
  // }

  // preventOutOfBounds() {
  //   let northern = this.boardDimensions[0][1];
  //   let western = this.boardDimensions[0][0];
  //   let southern = this.boardDimensions[1][1] - this.height;
  //   let eastern = this.boardDimensions[1][0] - this.width;
  //   this.pos[0] = Math.max(this.pos[0], western);
  //   this.pos[0] = Math.min(this.pos[0], eastern);
  //   this.pos[1] = Math.max(this.pos[1], northern);
  //   this.pos[1] = Math.min(this.pos[1], southern);
  // }

  // isOutOfBounds() {
  //   let northern = this.boardDimensions[0][1];
  //   let western = this.boardDimensions[0][0];
  //   let southern = this.boardDimensions[1][1] - this.height;
  //   let eastern = this.boardDimensions[1][0] - this.width;
  //   return (
  //     this.pos[0]< western ||
  //     this.pos[0]> eastern ||
  //     this.pos[1]< northern ||
  //     this.pos[1]> southern);
  // }


} //end class

export default Moveable;
