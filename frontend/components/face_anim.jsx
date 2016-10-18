import React from 'react';


class FaceAnim extends React.Component {
  constructor(props) {
    super(props);
    this.player = this.props.player;
    this.baseFace=this.baseFace.bind(this);
    this.getFace=this.getFace.bind(this);
    this.getDiv=this.getDiv.bind(this);
    this.getFireFace=this.getFireFace.bind(this);
    this.winkCounter=0;
    this.fireCounter=0;
    this.state={face: null};
    // this.player = this.props.player;

  }

  componentDidMount() {
    this.interval = window.setInterval(this.getFace,100);
  }

  getDiv(filename) {
    var fullName = `./app/assets/images/face_icons/${filename}.jpg`;
    return (
      <div>
        <img className="player-pic"
          src={fullName}/>
      </div>
    );
  }

  setLookLeft() {
    if (Math.random()>0 && this.player.sleepBank>40) { //>0?? a little much
      this.player.newFace = (this.player.happiness>70) ?
      {filename:"rested_happy_look_left", duration: Math.floor(Math.random()*30+1)} :
      {filename:"rested_unhappy_look_left", duration: Math.floor(Math.random()*30+1)};
    }
  }

  getFace() {
    if (this.player.onFire) {
      this.getFireFace();
    } else {
    this.face = this.getDiv(this.baseFace());
    this.winkCounter++;
    if (this.winkCounter>50) {
      this.winkCounter=0;
      if (!(this.player.onFire)  && (this.newFace===false)) {
        if (Math.random()>0.5) {
          this.setLookLeft();
        } else {
        this.player.newFace={filename:"blink", duration: Math.floor(Math.random()*4+1)};
        }
      }
    }
    if (this.player.newFace) {
      this.face=this.getDiv(this.player.newFace.filename);
      this.player.newFace.duration--;
      if (this.player.newFace.duration<=0) {this.player.newFace=false;}
    }
  }
    this.setState({face: this.face});
  }

  getFireFace() { //ADD IMAGE => UPDATE PRELOADS!!!
    this.fireCounter++;
    if (this.fireCounter>5) {
      this.fireCounter=0;
      var rand = Math.floor(Math.random()*8)+1;
      switch (true) {
        case (rand===1):
          this.face=this.getDiv("on_fire");
          break;
        case (rand===2):
          this.face=this.getDiv("on_fire1");
          break;
        case (rand===3):
          this.face=this.getDiv("on_fire2");
          break;
        case (rand===4):
          this.face=this.getDiv("on_fire3");
          break;
        case (rand===5):
          this.face=this.getDiv("on_fire4");
          break;
        case (rand===6):
          this.face=this.getDiv("on_fire5");
          break;
        case (rand===7):
          this.face=this.getDiv("on_fire6");
          break;
        case (rand===8):
          this.face=this.getDiv("on_fire7");
          break;
        default:
          break;
      }
    }
    return this.face;
  }

  baseFace() {
  switch (true) {
    case (this.player.happiness>70):
      switch (true) {
        case (this.player.sleepBank>60):
          //happy rested face
          return "rested_happy";
        case (this.player.sleepBank>30):
          if (this.player.clock.time()[0]%2===0) {
            return "tired_happy";
          } else {return "tired_happy2";}
        default:
        return "exhausted_sad";
      }
    case (this.player.happiness>40): //unhappy - sad
      switch (true) {
        case (this.player.sleepBank>60):
        //sad rested face
          return "rested_sad";
        case (this.player.sleepBank>30):
          //sad tired face
          return "tired_indifferent";
        default://exhausted sad
          return "exhausted_sad";
      }
    default:
    //very unhappy / angry but rested
      switch (true) {
        case (this.player.sleepBank>60):
          //angry rested face
          return "rested_angry";
        case (this.player.sleepBank>30):
          //tired angry (2 faces)
          if (this.player.clock.time()[0]%2===0) {
            return "tired_angry";
          } else {return "tired_miserable";}
        default:
        //exhausted then exhausted angry
          return "exhausted_angry";
      }
    }
  }

  render() {
    return this.state.face;
  }

}//end class

export default FaceAnim;
