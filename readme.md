# Code Camp Sim
### (technical README below)

### SUMMARY

I'm a recent App Academy bootcamp grad my goal in creating this was to share my experience.  Please note: This is **not** a game, this is a simulation!!  If it seems a little confusing at times or you're not sure what you should be doing, then I've done my job -- it's a feature ;)

### Game vs. Real Life

- SLEEP: For me, managing sleep was the most important aspect of bootcamp.  In the game, as your sleep bank gets lower, it becomes more difficult to focus and harder not to fall asleep during the morning lectures.  (In reality, the lectures were very well done, but it was still difficult not to fall asleep during the end of the week!)

- HAPPINESS: We were all so focused on learning that it was difficult to remember to have fun once in a while.  Be sure to keep your happiness level up by being a good pair programmer and having fun on the weekend.

- PAIR PROGRAMMING: This was something that was new for most of us.  We were told that the importance of the daily pair programming was to learn how to collaborate well with different people.  The coding practice was not as important as being a good pair.  Since we were new, we were instructed to switch automatically every so often. In Code Camp Sim you should focus more on switching every 30 minute!

- COFFE: Yes, coffee got me through many days, but just like in real life, if you drink coffee too late you won't be able to sleep right when you get home.

- LUNCH: Don't forget to eat lunch!  You'll suffer a 50% reduction in focus for the rest of the day if you don't.  And just like at school, you're likely to get stuck in the microwave line, so go early! (1 microwave for 80+ students = average 20 minute wait)

### Technical README

#### What I've learned
This turned out to be a much more involved process than I originally thought.  I learned so much from the experience.  But, now that I've completed a working version, I feel depressed when I look back at the codebase.  I should have planned better.  I should have refactored more as I wrote.  As this is the most complex app I've written, I now see quite clearly the value of the Redux pattern, whereas before I knew how to implement it but did not realize it's importance.  It can get a little out of hand when there are 20 million components updating state at any given time.  I am currently developing Code Camp Sim 2.0, and this time I'm starting with the Redux cycle.  Whenever I want to update state an action is dispatched and the store is updated accordingly.  

This simulation will be written mostly in React.js with some vanilla JavaScript components leveraging HTML5 Canvas.  For the backend (still in development) I am using Firebase, and I implemented a Redux cycle to handle save game / load game.

First, the following class modules were created in vanilla Javascript:

- player
- clock
- day
- moveables
  - player_anim
  - students
  - icons


Next, the following React Components were implemented next:

- game_main
- open_sesh
- lecture_sesh
- pairs-sesh
- night-time

Finally, the FirebaseDB was set up and the following components added:
- login
- game
