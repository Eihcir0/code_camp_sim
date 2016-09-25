
class Desk {
  constructor(id) {
    this.image = new Image();
    if (id===1) {this.image.src = "./app/assets/images/newdesks.png";}
    if (id===2) {this.image.src = "./app/assets/images/newdesks2.png";}
    if (id===3) {this.image.src = "./app/assets/images/newdesks3.png";}
    this.height = 75;
    this.width = 856;
    this.pos = [0,150];
    this.done = false;

  }
  update() {
    return;
  }

}

export default Desk;
