import React from 'react';
import Clock from './../../game_logic/clock.js';

class PairsSeshScreen extends React.Component {
  constructor (props) {
    super(props);
    // this.main = this.main.bind(this);

    this.state= {
    };
    // this.onClick = this.onClick.bind(this);
   this.yyinterval = setInterval(()=>this.tick(),50);
  }

  tick() {

  }

  checkOver(time) {
  }


  render () {
    return (
      <div className="">
      </div>
    );
  }

}//end component


export default PairsSeshScreen;
