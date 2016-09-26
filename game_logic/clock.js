class Clock {
  constructor (start, speed = 60) {
    this.start = start;
    this.systemClockAtStart = Date.now();
    this.speed = speed;
    this.paused = false;
    this.pauseOffset = 0;

  }

  time() {
    var now = Date.now();
    let elapsed = (now - this.systemClockAtStart) * this.speed / 1000;
  	let newTime = [];
  	let hours = this.start[0] + Math.floor(elapsed / 3600);
    // debugger;
    if (hours > 11 && hours < 24) {newTime[2] = "pm";}
    else {newTime[2] = "am";}
    hours = (hours > 12) ? hours - 12 : hours;
    hours = (hours > 12) ? hours - 12 : hours;
    newTime[0] = hours.toString();
  	let minutes = this.start[1] + Math.floor((elapsed % 3600)/60);
    if (minutes< 10) {newTime[1] = "0"+minutes;}
    else {newTime[1] = minutes.toString();}

  	return newTime;
}

}//end class

export default Clock;
