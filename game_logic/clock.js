class Clock {
  constructor (start, relativeSpeed = 1) {

    this.start = [0,0,0];
    //start can be military [18,30] or [6,30,"pm"]
    this.start[0] = parseInt(start[0]);
    this.start[1] = parseInt(start[1]);

    if (start[2]) {
      this.start[0] += (
        (start[2] === "pm" && this.start[0] !== 12) ? 12 : 0);
    }

    //60 => 1 real second / 1 game minute or 60 real seconds for 1 gm hr
    this.relativeSpeed = relativeSpeed; // 1 => 1 real sec / game minute
    this.speed = this.relativeSpeed * 60;

    this.ticksPerSecond = 100; //based on Game_Main class
    this.tickFraction = 1000 / this.ticksPerSecond;
    this.paused = false;
    this.time = this.time.bind(this);
    this.tick = this.tick.bind(this);
    this.lastTime = [];
    this.tickCounter = 0;
    this.lastTickerCount = this.tickCounter + 5 - 5;
    this.lastIconTickerCount = this.tickCounter + 5 - 5;
    this.animTickerCount = this.tickCounter + 5 - 5;
  }

  tick(n=1){
    if (!(this.paused)) {
      this.tickCounter += (n * this.tickFraction)*this.relativeSpeed;
    }
  }

  time() {
    if (this.paused) {return this.lastTime;}
    //convert to seconds passed, then minutes, then game minutes
    let elapsed = (this.tickCounter /1000);
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

  diff(lastTime) { //THIS CURRENTLY DOESN'T ACCOUNT FOR AFTER MIDNIGHT
    var newLastTime = lastTime.slice(0);
    newLastTime[0] = parseInt(newLastTime[0]);
    var currentTime = this.time();

    if (newLastTime.length===3) {
      if (newLastTime[2]==="pm" && newLastTime[0] !== 12) { newLastTime[0] = parseInt(newLastTime[0]) + 12;}
    }

    if (currentTime[2]==="pm" && currentTime[0] !== "12") {currentTime[0] = parseInt(currentTime[0]) + 12;}
    if (currentTime[2]==="am" && currentTime[0]==="12") {currentTime[0] = parseInt(currentTime[0]) + 12;}
    var hoursDiff = parseInt(currentTime[0]) - parseInt(newLastTime[0]);
    var minsDiff = parseInt(currentTime[1]) - parseInt(newLastTime[1]);
    return (hoursDiff*60 + minsDiff);
  }

  is(time) {
    var currentTime = this.time();
    return time[0]===currentTime[0]
    && time[1]===currentTime[1]
    && time[2]===currentTime[2];
  }

//this is kinda backwards, i change to am/pm then back
  isBetween(startTime,endTime) {
    if (startTime.length === 2) {
      if (startTime[0] <12) {
        startTime.push("am");
      } else {
          startTime.push("pm");
      }
    }
    if (endTime.length === 2) {
      if (endTime[0] <12) {
        endTime.push("am");
      } else {
        endTime.push("pm");
      }
    }


    var startHour = parseInt(startTime[0]) + (startTime[2] == "pm" && startTime[0] != 12 ? 12 : 0);
    var endHour = parseInt(endTime[0]) + (endTime[2] == "pm" && endTime[0] !=12 ? 12 : 0);
    var startMinute = parseInt(startTime[1]);
    var endMinute = parseInt(endTime[1]);
    var currentTime = this.time();
    var currentHour = parseInt(currentTime[0])+ ((currentTime[2] == "pm" && currentTime[0] !=="12") ? 12 : 0);
    var currentMinute = parseInt(currentTime[1]);
    var startTotal = startHour*60 + startMinute;
    var endTotal = endHour*60 + endMinute;
    var currentTotal = currentHour*60 + currentMinute;
    return (currentTotal<=endTotal && currentTotal>=startTotal);

  }

  pause() {
    this.paused = true;
  }

  unpause() {
    this.paused = false;
  }

}//end class

export default Clock;
