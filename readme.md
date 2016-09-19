## Code Camp Sim

### Background

App Academy was an intense, unique, "once in a lifetime" experience that involved learning massive amounts of new material, careful time management, and all the while trying to have a little fun throughout the course.  CodeCampSim is an attempt to share this experience to those who are curious about what goes on in a bootcamp like this or candidates who might be wondering what the program is like.

### Functionality & MVP

- [ ] Users can login, save status, and make post comments on the forums.
- [ ] Sleep, happiness, and concentration meters update realtime.
- [ ] Code snippets for "homework" and "assessments" evaluated through API calls to the REPL.IT server
- [ ] Users play mini-games such as: "don't fall asleep during lecture", "hyper tic-tac-toe", "myTowersOf Hanoi""pair-programming" and "debugger"


### Wireframes

![wireframes](https://github.com/Eihcir0/code_camp_sim/blob/master/docs/wireframe.jpg)

### Technologies & Technical Challenges

This simulation will be written mostly in React.js with some vanilla JavaScript components leveraging HTML5 Canvas.  The backend will be written in Ruby on Rails with a SQLite database.  

The primary technical challenges will be:

- Planning to intricate simulation logic, which is still far from complete as of the writing of this document.
- Remembering how to create a backend in Rails.
- Remembering how to use React.js.
- Figuring out how to use the REPL.IT API.

### Implementation Timeline

**Day 1 Monday**: Continue planning and pseudocode for mini-games, game logic including class structure and components.  By the end of the day I should be ready to start coding.

**Day 2 Tuesday**:
I'm going to start with the main game loop logic completely in vanilla js.  Not writing any of the minigames this day.  By the end of the day, this should be a completed console log game (without the minigames)

**Day 3 Wednesday**:
Design the main screen and components for gameplay.  For now I will have buttons at the bottom that switch between Lecture / Pairs Programming / Assessments and Free Time.  By the end of the day I should have a main window component, with the center screen component, and a side bar.


**Day 4 Thursday**:
Write the lecture and open time logic and components.  

**Day 5 Friday**: Write the pair-programming minigame and debugger minigame.


**Day 6 Saturday**: Write Assessments minigame and debug.

**Day 7 Sunday**: Create backend, post to heroku.
