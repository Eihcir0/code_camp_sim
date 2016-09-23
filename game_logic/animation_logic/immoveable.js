
class Immoveable {
  constructor(obj) {

    this.board = obj.board;
    this.boardDimensions = this.board.boardDimensions;
    this.ctx = this.board.ctx;
    this.canvas = this.board.canvas;
    this.done = false;
  }



} //end class

module.exports = Immoveable;
