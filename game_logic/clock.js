class Clock {
  constructor (start, speed = 60) {
    this.start = [0,0,0];
    this.start[0] = parseInt(start[0]);
    this.start[1] = parseInt(start[1]);
    if (start[2]) {
      this.start[0] += (start[2]==="pm" ? 12 : 0);
    }
    this.systemClockAtStart = Date.now();
    this.speed = speed;
    this.paused = false;
    this.pauseOffset = 0;
    this.time = this.time.bind(this);
    this.lastTime = [];
  }

  diff(lastTime) { //THIS CURRENTLY DOESN'T ACCOUNT FOR AM/PM
    var currentTime = this.time();
    var hoursDiff = parseInt(currentTime[0]) - parseInt(lastTime[0]);
    var minsDiff = parseInt(currentTime[1]) - parseInt(lastTime[1]);
    return (hoursDiff*60 + minsDiff);
  }

  is(time) {
    var currentTime = this.time();
    return time[0]===currentTime[0]
    && time[1]===currentTime[1]
    && time[2]===currentTime[2];
  }

  isBetween(startTime,endTime) {
    if (startTime.length < 3) {startTime.push("am");}
    if (endTime.length < 3) {endTime.push("am");}
    var startHour = startTime[0] + (startTime[2] == "pm" ? 12 : 0);
    var endHour = endTime[0] + (endTime[2] == "pm" ? 12 : 0);
    var startMinute = startTime[1];
    var endMinute = endTime[1];
    var currentTime = this.time();
    var currentHour = parseInt(currentTime[0])+ (currentTime[2] == "pm" ? 12 : 0);
    var currentMinute = parseInt(currentTime[1]);
    if (currentHour > startHour && currentHour < endHour) {
        return true;
      }
    if (currentHour == startHour && currentMinute>=startMinute) {
      return true;
    }
    if (currentHour == endHour && currentMinute<=endMinute) {
      return true;
    }
    return false;
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
