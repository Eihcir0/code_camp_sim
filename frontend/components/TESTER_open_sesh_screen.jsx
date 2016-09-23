
import React from 'react';
import ReactDOM from 'react-dom';
import SpriteAnimator from 'react-sprite-animator';

class OpenSesh extends React.Component {
  constructor (props) {
    super(props);
    this.state= {
      isLiked: false
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick () {
    const {isLiked} = this.state;
    this.setState({isLiked: !isLiked});
  }

  render () {
    const {isLiked} = this.state;
    return (
      <section className="open-sesh">
        <div onClick={this.onClick}>
          <SpriteAnimator
            ref='sprite'
            x='100'
            y='100'
            width={36}
            height={36}
            sprite='./frontend/components/heart.svg'
            shouldAnimate={isLiked}
            fps={60}
            startFrame={0}
            stopLastFrame={true}
            reset={!isLiked}
          />
        </div>
      </section>
    );
  }
}

export default OpenSesh;
