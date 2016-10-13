
class Secretary {
  constructor() {
    this.image = new Image();
    this.image.src = "./app/assets/images/secretary.png";
    this.height = 128;
    this.width = 128;
    this.pos = [30,360];
    this.done = false;
  }
  
  update(here) {
    if (here) {
      this.image.src = "./app/assets/images/secretary.png";
  } else {
      this.image.src = "./app/assets/images/empty_secretary.png";
    }
  }

}


export default Secretary;
