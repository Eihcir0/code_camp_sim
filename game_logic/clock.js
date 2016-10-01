class Clock {
  constructor (start, speed = 60) {
    this.start = start;
    this.systemClockAtStart = Date.now();
    this.speed = speed;
    this.paused = false;
    this.pauseOffset = 0;
    this.time = this.time.bind(this);
    this.lastTime = [];
  }
  pause() {
    this.paused = true;
    this.pauseStartTime = Date.now();
  }

  unpause() {
    this.paused = false;
    var now = Date.now();
    this.pauseOffset += (now-this.pauseStartTime);
  }
  time() {
    if (this.paused) {return this.lastTime;}
    var now = Date.now();
    let elapsed = ((now - this.systemClockAtStart - this.pauseOffset) * this.speed / 1000)/60;
  	let newTime = [];
  	let hours = this.start[0] + Math.floor((this.start[1] + elapsed) / 60);
    if (hours > 11 && hours < 24) {newTime[2] = "pm";}
    else {newTime[2] = "am";}
    hours = (hours > 12) ? hours - 12 : hours;
    hours = (hours > 12) ? hours - 12 : hours;
    newTime[0] = hours.toString();
  	let minutes = Math.floor((this.start[1]+elapsed) % 60);
    if (minutes< 10) {newTime[1] = "0"+minutes;}
    else {newTime[1] = minutes.toString();}
    this.lastTime = newTime;
  	return newTime;
}

}//end class

export default Clock;
