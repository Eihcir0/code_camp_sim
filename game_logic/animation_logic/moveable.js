
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


} //end class

export default Moveable;
