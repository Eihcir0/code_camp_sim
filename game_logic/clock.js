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
    this.is = this.is.bind(this);
    this.convertToAmPm = this.convertToAmPm.bind(this);
    this.convertToMilitaryTime = this.convertToMilitaryTime.bind(this);
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

  time() { //returns in am/pm

    if (this.paused) {return this.lastTime;}
    //convert to seconds passed, then minutes, then game minutes
    let elapsed = (this.tickCounter /1000);
    let newTime = [];
    let hours = this.start[0] + Math.floor((this.start[1] + elapsed) / 60);
    let minutes = Math.floor((this.start[1]+elapsed) % 60);
    newTime = this.convertToAmPm([hours,minutes]);
    this.lastTime = newTime;
    return newTime;
  }


  convertToMilitaryTime(timeX) {
    if (timeX.length === 2) {
      return timeX;}
    var hour = parseInt(timeX[0]);
    var minute = parseInt(timeX[1]);
    var ampm = timeX[2];
    if (timeX[0] !== "12" && ampm === "pm") {
          hour += 12;
        }
    if (timeX[0] == "12" && ampm === "am") {
      hour -=12;
    }
    return [hour,minute];
  }

  convertToAmPm(time) {

    if (time[2]) {return time;}
    var newTime = [0,0];
    newTime[0] = parseInt(time[0]) % 24;
    newTime[1] = parseInt(time[1]);
    if (newTime[1]< 10) {newTime[1] = "0" + newTime[1];}
    else {newTime[1] = newTime[1].toString();}
    var ampm = (newTime[0] > 11 && newTime[0] < 24) ? "pm" : "am";
    if (newTime[0] > 12) {newTime[0] -=12;}
    if (newTime[0] === 0) {newTime[0] = 12;}
    return [newTime[0].toString(),newTime[1],ampm];
  }

  is(time) { //AMPM time only
    time = this.convertToAmPm(time);
    var currentTime = this.time();
    return time[0]===currentTime[0]
    && time[1]===currentTime[1]
    && time[2]===currentTime[2];
  }




  diff(timeA, timeB = this.time()) { // returns timeB - timeA in minutes

    var currentTime = this.convertToMilitaryTime(timeB);
    var currentHour = currentTime[0];
    var currentMinute = currentTime[1];

    var startTime = this.convertToMilitaryTime(timeA);
    var startHour = startTime[0];
    var startMinute = startTime[1];

    var hoursDiff = currentHour - startHour;
    var minsDiff = currentMinute - startMinute;


    return (hoursDiff*60 + minsDiff);
  }

  isBetween(startTime,endTime, target = this.time()) { //inclusive

    var currentTime = this.convertToMilitaryTime(target);
    var currentHour = currentTime[0];
    var currentMinute = currentTime[1];

    var startTime = this.convertToMilitaryTime(startTime);
    var startHour = startTime[0];
    var startMinute = startTime[1];

    var endTime = this.convertToMilitaryTime(endTime);
    var endHour = endTime[0];
    var endMinute = endTime[1];

    var startTotal = startHour*60 + startMinute;
    var endTotal = endHour*60 + endMinute;
    var currentTotal = currentHour*60 + currentMinute;
    return (currentTotal<=endTotal && currentTotal>=startTotal);

  }

  isAfter(startTime, target = this.time()) { //exclusive


    var targetTime = this.convertToMilitaryTime(target);
    var targetHour = targetTime[0];
    var targetMinute = targetTime[1];

    var startTime = this.convertToMilitaryTime(startTime);
    var startHour = startTime[0];
    var startMinute = startTime[1];

    var startTotal = startHour*60 + startMinute;

    var targetTotal = targetHour*60 + targetMinute;
    return (startTotal > targetTotal);

  }

  isBefore(startTime, target = this.time()) { //exclusive


    var targetTime = this.convertToMilitaryTime(target);
    var targetHour = targetTime[0];
    var targetMinute = targetTime[1];

    var startTime = this.convertToMilitaryTime(startTime);
    var startHour = startTime[0];
    var startMinute = startTime[1];

    var startTotal = startHour*60 + startMinute;

    var targetTotal = targetHour*60 + targetMinute;
    return (startTotal < targetTotal);

  }

  add(minutesToAdd, start = this.time()) { //returns Military Time

    var startTime = this.convertToMilitaryTime(start);
    var startHour = startTime[0];
    var startMinute = startTime[1];
    var totalStartMinutes = startHour * 60 + startMinute;
    var totalMinutes = totalStartMinutes + minutesToAdd;
    return [Math.floor(totalMinutes / 60), totalMinutes % 60];
  }


  subtract(minutesToSubtract, start = this.time()) { //returns Military Time

    var startTime = this.convertToMilitaryTime(start);
    var startHour = startTime[0];
    var startMinute = startTime[1];
    var totalStartMinutes = startHour * 60 + startMinute;
    var totalMinutes = totalStartMinutes - minutesToSubtract;
    return [Math.floor(totalMinutes / 60), totalMinutes % 60];
  }




  pause() {
    this.paused = true;
  }

  unpause() {
    this.paused = false;
  }

}//end class

export default Clock;
