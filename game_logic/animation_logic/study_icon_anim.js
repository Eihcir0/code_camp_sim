import Moveable from './moveable.js';

class StudyIcon extends Moveable {
  constructor(obj1, obj2) { //obj1 = canvas/ctx, obj2 = iconType, value
    super(obj1);
    this.type = "study icon";
    this.sizeMultiplier = 1;
  }
} //end class

export default StudyIcon;
