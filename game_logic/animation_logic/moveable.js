
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
      "NW"   : [-1,-3.5],
      "SE"   : [ 1, 1.8],
      "SW"   : [-1, 1],
      "STOP" : [ 0, 0],
      "seated" : [0,0]
      };
    this.DIAGS = ["NE","NW","SE","SW"];
    this.ctx = obj.ctx;
    this.canvas = obj.canvas;
  }

  currentSprite() { //this is really just the X offset calc'd
  return (
    (this.animFrame * this.width) + this.spriteXoffset
    );
  }

  update(elapsed) {

    if (this.type === "hero") {this.updateAnimSet();}
    this.updateAnim(elapsed);
    if (this.movementOn) {this.move(elapsed);}
  }



} //end class

export default Moveable;
