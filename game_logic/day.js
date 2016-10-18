import Clock from './clock.js';



class Day {
  constructor (player, arrivalTime) {
    this.player = player;

    this.player.clock = new Clock(arrivalTime, this.player.defaultClockSpeed); //CHANGE ME!! *****
    this.player.currentPos = 0;
    this.player.leaving=false;
    this.player.ateDonut = false;
    this.lastCoffee = undefined;
    this.talkedToCandanessa = false;
    this.workingLateOnFridaySucks = false;
    this.fireCounter = Math.floor(this.player.score / 100000) + 1 + Math.floor(Math.random()*3);
    this.eatingLunch = false; //these should be in the day
    this.noLunchPenalty = 1;// (0.5 cuts it in half)
    this.ateLunch = false;
    this.player.lastIconTickerCount = 0;
    this.beginningScore = this.player.score;
    this.chanceForFireOffset = 0; //delete me
    this.workstationStartTime = undefined; //delete me

    this.beginningSkillPoints =
    this.player.skills[this.player.currentSkill] ? this.player.skills[this.player.currentSkill] : 0;
    this.beginningHappiness = this.player.happiness;
    this.pairsDone = false;
    this.lectureNotes = this.getDaysLectureNotes(this.player.dayNum);

  }



  secretaryMessage() {
    if (this.player.dayNum === 1 && this.player.session===0) {
      return "Please go to the lecture area immediately!!";
    }
  }

  nightTime() {
    console.log("night time!");
  }

  getDaysLectureNotes(day) {
    switch (day) {
      case 1:
        return [
                [//0
                  "One of the hardest parts of an intensive bootcamp like this is getting enough sleep...",
                  "",
                  "...and staying awake during lectures! "
                ],
                [//1
                  "Stare at the lecture too long, you lose focus and you'll eventually lose consciousness..."
                ],
                [//2
                  "To regain focus, you need to close your eyes.",
                  "",
                  "But if you keep your eyes closed too long you'll fall asleep.",
                  ""
                ],
                [//3
                  "Fainting during lecture gets you a strike.",
                  "Falling asleep gets you a strike,",
                  "10 strikes and you're out!",
                  "",
                  "OK, with that out of the way,",
                  "let's learn Ruby!!!",
                  "",
                  " Take a look at this code:"
                ],
                [//4
                  "> def my_each",
                  ">  i = 0",
                  ">  while i < self.length",
                  ">   yield self[i]",
                  ">   i += 1",
                  ">  end",
                  ">  self[0]",
                  "> end"
                ]
              ];
      case 2:
        return [
                  [       //0
                    "Ruby methods: Public, Private, Protected",
                    "",
                    "Public methods can be called by everyone - no access control is",
                    "enforced. They do not belong only to one object.  Every instance",
                    "of the class can call them.  A class's instance methods are ",
                    "public by default."
                  ],
                  [       //1
                    "Private methods cannot be called with an explicit receiver - ",
                    "the receiver is always self. This means that private ",
                    "methods can be called only in the context of",
                    "the current object.",
                    "",
                    "Protected methods can be invoked only by objects of the",
                    "defining class and its subclasses. "
                  ],
                  [       //2
                    "Symbols in Ruby",
                    "Symbols are immutable.  Because of this,",
                    "symbols are instantiated faster than strings",
                    "and some operations like comparing two symbols",
                     "are also faster.",
                    "",
                    "General rule of thumb:",
                    "Use symbols when you need internal identifiers."
                  ],
                    [ //3
                      "Q: When would you not want to use symbols?",
                      "(actual interview question)",
                      "A: In older version of Ruby (prior to 2.2)",
                      "symbols were not garbage collected and hence",
                      "were a source of memory leaks.",
                      "",
                      "Now, let's look at the next example carefully."
                    ],
                    [  //4
                      "> class Fred",
                      ">   $f1 = :Fred",
                      "> end",
                      "> Fred = 1",
                      "> $f2 = :Fred",
                      "> $f1.object_id   #=> 2514190",
                      "> $f2.object_id   #=> 2514190"
                    ]
                  ];
      case 3:
        return [
                  [       //0
                    "What's the difference between Procs and Lambdas?",
                    "",
                    "One of the main differences is how RETURN (and BREAK)",
                    "are treated from within the proc or lambda. ",
                    "",
                    "Take a look at this code and guess what will happen:"
                  ],
                  [  //1
                    "> def test",
                    ">   lam = lambda { return }",
                    ">   lam.call",
                    ">   puts \"prints\"",
                    ">   proc = Proc.new { return }",
                    ">   proc.call",
                    ">   puts \"doesn't print\"",
                    "> end"
                  ],
                  [  //2
                    "The first 'prints' gets printed,",
                    "but the 'doesn't print' does not.",
                    "",
                    "The lambda returns to the context",
                    "of the method and continues.",
                    "",
                    "Whereas the proc breaks out of the ",
                    "method."
                  ],
                  [ //3
                    "The main difference between lambdas and",
                    "and procs is the way in which control flow is",
                    "handled.  When a RETURN statement is reached ",
                    "within a proc, instead of returning from the",
                    "context where it was called, it returns from",
                   "the scope on which it (the proc) was defined.",
                   "",
                   "Easy, right?"
                 ],
                  [ //4
                    "The main difference between lambdas and",
                    "and procs is the way in which control flow is",
                    "handled.  When a RETURN statement is reached ",
                    "within a proc, instead of returning from the",
                    "context where it was called, it returns from",
                   "the scope on which it (the proc) was defined.",
                   "",
                   "Easy, right?"
                  ]
                ];
      case 4:
        return [
                  [       //0
                    "MORE RUBY",
                    "Did you know?",
                    "[1,2,3] - [1] => [1,2]",
                    "",
                    "[1,2,3] | [3,4] => [1,2,3,4] (union)",
                    "",
                    "[1,2,3] & [3,4] => [3] (intersection)"
                  ],
                  [  //1
                    "Your first assessment is next Monday.",
                    "The higher your RUBY SKILL is the easier",
                    "the test will be for you.",
                    "",
                    "Assessments are taken seriously.",
                    "If you fail the assessment you will",
                    "be kicked out of Code Camp."
                  ],
                  [  //2
                    "The assessment is pretty straight forward.",
                    "",
                    "You will be writing your own version of",
                    "Ruby's Array#each method.",
                    "",
                    "You basically just need to memorize the",
                    "the following code:"
                  ],
                  [  //3
                    "> def my_each",
                    "> i = 0",
                    "> while i < self.length",
                    ">  yield self[i]",
                    ">  i += 1",
                    "> end",
                    "> self[0]",
                    "> end"
                  ],
                  [  //2
                    "> def my_each",
                    "> i = 0",
                    "> while i < self.length",
                    ">  yield self[i]",
                    ">  i += 1",
                    "> end",
                    "> self[0]",
                    "> end"
                  ]
                ];
      case 5:
        return [
                  [       //0
                    "Once again, reminder:",
                    "MONDAY IS YOUR FIRST ASSEMSSMENT",
                    "If your Ruby skill is over 70%",
                    "then you are almost guaranteed to pass.",
                    "",
                    "If you're not there yet, then you",
                    "better study hard this weekend!",
                  ],
                  [  //1
                    "The assessment is pretty straight forward.",
                    "",
                    "You will be writing your own version of",
                    "Ruby's Array#each method.",
                    "",
                    "You basically just need to memorize the",
                    "the following code:"
                  ],
                  [  //2
                    "> def my_each",
                    "> i = 0",
                    "> while i < self.length",
                    ">  yield self[i]",
                    ">  i += 1",
                    "> end",
                    "> self[0]",
                    "> end"
                  ],
                  [  //3
                    "> def my_each",
                    "> i = 0",
                    "> while i < self.length",
                    ">  yield self[i]",
                    ">  i += 1",
                    "> end",
                    "> self[0]",
                    "> end"
                  ],
                  [  //2
                    "> def my_each",
                    "> i = 0",
                    "> while i < self.length",
                    ">  yield self[i]",
                    ">  i += 1",
                    "> end",
                    "> self[0]",
                    "> end"
                  ]
                ];
      default:

    }
  }


} //end class

export default Day;


// }
// main() {
//   while (this.player.session < 5) {
//     this.playSession();
//   }
//   this.nightTime();
// }
//
// playSession() {
//   switch (this.player.session) {
//     case 0:
//       this.session = new Morning(this.player);
//       break;
//     case 1:
//       if (this.player.weekDay===5) {
//         this.session = new Assessment(this.player);
//       } else {
//         this.session = new Lecture(this.player);
//       }
//       break;
//     case 2:
//       this.session = new Lunch(this.player);
//       break;
//     case 3:
//       if ([1,2,3].includes(this.player.weekDay)) {
//         this.session = new PairsProgramming(this.player);
//       } else {
//         this.session = new SoloProject(this.player);
//       }
//       break;
//     case 4:
//       this.session = new Evening(this.player);
//       break;
//     default:
//       break;
//   }

// }

//this.session = new NightTime (which will
// get alarm, calc new stats and arrival time within Session(night))
//
//
// [       //0
// ],
