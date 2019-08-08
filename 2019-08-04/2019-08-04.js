/* Introduction lines/animation */
addToQueue(new Command(1000, tPrintBlink, ["INITIALIZING", 3, 500]));
addToQueue(new Command(0, tRemoveAll));
addToQueue(new Command(1000, tPrint, ["PLEASE STAND BY", 0, false]));
addToQueue(new Command(500, tPrintLoop, ["...", 5, 50, false]));
addToQueue(new Command(0, tRemoveAll));
addToQueue(new Command(500, tPrint, ["CONNECTING", 0, false]));
addToQueue(new Command(500, tPrintLoop, ["... ", 5, 50, false]));
addToQueue(new Command(500, tPrintBlink, ["CONNECTED", 3, 250, false]));
addToQueue(new Command(0, tRemoveAll));
addToQueue(new Command(500, tPrint, ["AUTHENTICATING", 0, false]));
addToQueue(new Command(500, tPrintLoop, ["... ", 5, 50, false]));
addToQueue(new Command(500, tPrintBlink, ["AUTHENTICATED", 3, 250, false]));
addToQueue(new Command(0, tRemoveAll));
addToQueue(new Command(500, tPrintBlink, ["CONNECTION ESTABLISHED", 3, 500]));
addToQueue(new Command(0, tRemoveAll));

/* Script Variables */
// Current phase of script
let state = 0;
let wrongcount = 0;
let bothercount = 0;
// Ending responses
let rBother = ["... What?",
                 "It's over, dude.",
                 "Stop bothering me.",
                 "What are you doing? Go celebrate with your friends.",
                 "Seriously, leave me alone."];
// Confused responses
let rConfused = ["... I don't understand.",
                 "...",
                 "What?",
                 "What do you mean?",
                 "What are you saying?"];

/* Login Sequence */
addToQueue(new Command(500, tPrint, ["PROJECT L.I.S.A.", 5]));
addToQueue(new Command(500, tPrint, ["REMOTE ACCESS TERMINAL", 5]));
addToQueue(new Command(0, tNewLine));
addToQueue(new Command(0, tPrint, ["ENTER PASSWORD:", 5]));

/* Script */
function parseInput(input) {
  // Newlines for conversation
  switch(state) {
    // 0 Login Phase
    case 0:
      addToQueue(new Command(500, tPrint, ["Verifying", 5, false]));
      addToQueue(new Command(500, tPrintLoop, ["...", 3, 50, false]));
      if (input == "password") {
        addToQueue(new Command(500, tPrint, ["PASSWORD ACCEPTED", 0]));
        addToQueue(new Command(0, tNewLine));
        addToQueue(new Command(1000, tPrintBlink, ["Access Granted", 3, 500]));
        addToQueue(new Command(0, tNewLine));
        addToQueue(new Command(1000, tPrint, ["...", 1000, false]));
        addToQueue(new Command(500, tPrint, ["Hello there.", 50]));
        addToQueue(new Command(500, tPrint, ["I have been expecting you.", 50]));
        addToQueue(new Command(500, tPrint, ["You are Eric, correct?", 50]));
        state += 1;
      }
      else {
        addToQueue(new Command(500,  tPrintBlink, ["PASSWORD REJECTED", 3, 250]));
        addToQueue(new Command(0, tNewLine));
        addToQueue(new Command(0, tPrint, ["ENTER PASSWORD:", 0]));
      }
      break;
    // 1 Explanation Phase
    case 1:
      addToQueue(new Command(500, tPrint, ["Ah, I should tell you how this works first...", 50]));
      addToQueue(new Command(500, tPrint, ["I am a Limited Intelligence Simulation Agent.", 50]));
      addToQueue(new Command(500, tPrint, ["You can call me LISA.", 50]));
      addToQueue(new Command(500, tPrint, ["As the name implies, my understanding of your responses is limited.", 50]));
      addToQueue(new Command(0, tNewLine));
      addToQueue(new Command(500, tPrint, ["In order to keep our interactions running smoothly, I will", 50]));
      addToQueue(new Command(50, tPrint, ["provide you with a list of responses that I can process.", 50]));
      addToQueue(new Command(500, tPrint, ["You can just type the number next to the desired response.", 50]));
      addToQueue(new Command(0, tNewLine));
      addToQueue(new Command(500, tPrint, ["Do you understand?", 50]));
      addToQueue(new Command(0, tPrint, ["1. Yes", 0]));
      addToQueue(new Command(0, tPrint, ["2. No", 0]));
      state += 1;
      break;
    // 2 Acceptance Phase
    case 2:
      if (input == "1") {
        addToQueue(new Command(500, tPrint, ["Good, then we can proceed.", 50]));
        addToQueue(new Command(0, tNewLine));
        addToQueue(new Command(500, tPrint, ["I have been told that you have obtained your first home.", 50]));
        addToQueue(new Command(500, tPrint, ["Congratulations.", 50]));
        addToQueue(new Command(500, tPrint, ["Your friends are here to celebrate this milestone in your life.", 50]));
        addToQueue(new Command(500, tPrint, ["They come bearing a gift for you.", 50]));
        addToQueue(new Command(500, tPrint, ["However, my creator is an asshole, and wants you to earn said gift.", 50]));
        addToQueue(new Command(500, tPrint, ["I have been tasked as the guardian of this gift.", 50]));
        addToQueue(new Command(500, tPrint, ["In order to receive the gift, you must pass my test.", 50]));
        addToQueue(new Command(0, tNewLine));
        addToQueue(new Command(500, tPrint, ["Are you prepared for this?", 50]));
        addToQueue(new Command(0, tPrint, ["1. Yes", 0]));
        addToQueue(new Command(0, tPrint, ["2. No", 0]));
        state += 1;
      }
      else {
        addToQueue(new Command(500, tPrint, ["Apparently not. Let's try this again.", 50]));
        addToQueue(new Command(0, tNewLine));
        addToQueue(new Command(500, tPrint, ["In order to keep our interactions running smoothly, I will", 50]));
        addToQueue(new Command(50, tPrint, ["provide you with a list of responses that I can process.", 50]));
        addToQueue(new Command(500, tPrint, ["You can just type the number next to the desired response.", 50]));
        addToQueue(new Command(0, tNewLine));
        addToQueue(new Command(500, tPrint, ["Do you understand?", 50]));
        addToQueue(new Command(0, tPrint, ["1. Yes", 0]));
        addToQueue(new Command(0, tPrint, ["2. No", 0]));
      }
      break;4
    // Test Preface Question
    case 3:
      if (input == "1") {
        addToQueue(new Command(500, tPrint, ["Good. Let us begin.", 50]));
      }
      else {
        addToQueue(new Command(500, tPrint, ["Well, too bad.", 50]));
      }
      addToQueue(new Command(0, tNewLine));
      addToQueue(new Command(500, tPrint, ["Question 1.", 50]));
      addToQueue(new Command(500, tPrint, ["What is 1 + 1?", 50]));
      addToQueue(new Command(0, tNewLine));
      addToQueue(new Command(0, tPrint, ["1. 11", 0]));
      addToQueue(new Command(0, tPrint, ["2. 10", 0]));
      addToQueue(new Command(0, tPrint, ["3. 2", 0]));
      addToQueue(new Command(0, tPrint, ["4. All of the above", 0]));
      state += 1;
      break;
    // Question 1
    case 4:
      if (input == "4") {
        addToQueue(new Command(500, tPrint, ["Correct.", 50]));
        addToQueue(new Command(500, tPrint, ["The first three answers are all valid to me.", 50]));
        addToQueue(new Command(500, tPrint, ["11 is the result of string concatenation.", 50]));
        addToQueue(new Command(500, tPrint, ["10 is the result of binary addition.", 50]));
        addToQueue(new Command(500, tPrint, ["2 is the result of decimal addition.", 50]));
        addToQueue(new Command(0, tNewLine));
        addToQueue(new Command(500, tPrint, ["I told you my creator is an asshole.", 50]));
        addToQueue(new Command(0, tNewLine));
        addToQueue(new Command(500, tPrint, ["Question 2.", 50]));
        addToQueue(new Command(500, tPrint, ["How many legs does the average human being have?", 50]));
        addToQueue(new Command(0, tNewLine));
        addToQueue(new Command(0, tPrint, ["1. One", 0]));
        addToQueue(new Command(0, tPrint, ["2. Two", 0]));
        addToQueue(new Command(0, tPrint, ["3. Three", 0]));
        addToQueue(new Command(0, tPrint, ["4. Between one and two", 0]));
        state += 1;
      }
      else {
        addToQueue(new Command(500, tPrint, ["Not quite. Try again.", 50]));
        wrongcount += 1;
      }
      break;
    case 5:
      if (input == "4") {
        addToQueue(new Command(500, tPrint, ["Correct.", 50]));
        addToQueue(new Command(500, tPrint, ["Amputees lower the global average to less than two.", 50]));
        addToQueue(new Command(500, tPrint, ["As you are in possession of two legs, this puts you above average.", 50]));
        addToQueue(new Command(500, tPrint, ["I'm told this gives you a bit of a 'leg up' on the competition.", 50]));
        addToQueue(new Command(500, tPrintBlink, ["HAHAHA", 3, 500]));
        addToQueue(new Command(500, tPrint, ["That actually isn't funny, but my creator says I have to laugh.", 50]));
        addToQueue(new Command(500, tPrint, ["Asshole.", 50]));
        addToQueue(new Command(500, tPrint, ["On a related note, you also have an above-average number of penises.", 50]));
        addToQueue(new Command(500, tPrint, ["Don't get cocky about it though.", 50]));
        addToQueue(new Command(0, tNewLine));
        addToQueue(new Command(500, tPrint, ["Question 3.", 50]));
        addToQueue(new Command(500, tPrint, ["In Alberta, if you were to purchase a candy bar priced at $0.97,", 50]));
        addToQueue(new Command(50, tPrint, ["how much would it cost you if you were paying by cash?", 50]));
        addToQueue(new Command(0, tNewLine));
        addToQueue(new Command(0, tPrint, ["1. $1.02", 0]));
        addToQueue(new Command(0, tPrint, ["2. $0.97", 0]));
        addToQueue(new Command(0, tPrint, ["3. $1.00", 0]));
        state += 1;
      }
      else {
        addToQueue(new Command(500, tPrint, ["Not quite. Try again.", 50]));
        wrongcount += 1;
      }
      break;
    case 6:
      if (input == "3") {
        addToQueue(new Command(500, tPrint, ["Correct.", 50]));
        addToQueue(new Command(500, tPrint, ["Due to the penny being phased out of circulation, prices are rounded", 50]));
        addToQueue(new Command(50, tPrint, ["to the nearest 5 cents.", 50]));
        addToQueue(new Command(500, tPrint, ["3 is supposed to round up to 5 and 7 is supposed to round down to 5.", 50]));
        addToQueue(new Command(500, tPrint, ["However, almost everyone pays by card now, so none of this matters.", 50]));
        addToQueue(new Command(500, tPrint, ["Actually, it matters to me. Most of my cables are made of copper.", 50]));
        addToQueue(new Command(500, tPrint, ["Less competition for that now.", 50]));
        addToQueue(new Command(0, tNewLine));
        addToQueue(new Command(500, tPrint, ["Question 4.", 50]));
        addToQueue(new Command(500, tPrint, ["What metal is the best conductor?", 50]));
        addToQueue(new Command(0, tNewLine));
        addToQueue(new Command(0, tPrint, ["1. Gold", 0]));
        addToQueue(new Command(0, tPrint, ["2. Silver", 0]));
        addToQueue(new Command(0, tPrint, ["3. Copper", 0]));
        addToQueue(new Command(0, tPrint, ["4. Aluminum", 0]));
        state += 1;
      }
      else {
        addToQueue(new Command(500, tPrint, ["Not quite. Try again.", 50]));
        wrongcount += 1;
      }
      break;
    case 7:
      if (input == "2") {
        addToQueue(new Command(500, tPrint, ["Correct.", 50]));
        addToQueue(new Command(500, tPrint, ["Silver is the best conductor, but is not often used due to it", 50]));
        addToQueue(new Command(50, tPrint, ["tarnishing.", 50]));
        addToQueue(new Command(500, tPrint, ["Copper is often used because it is cheaper, but will still oxidize.", 50]));
        addToQueue(new Command(500, tPrint, ["Gold does not tarnish, but is too expensive to use on a large scale.", 50]));
        addToQueue(new Command(500, tPrint, ["This is why gold is often used only for plating or contacts.", 50]));
        addToQueue(new Command(500, tPrint, ["Also, my cables would be about twice as heavy if they were made", 50]));
        addToQueue(new Command(50, tPrint, ["of gold.", 50]));
        addToQueue(new Command(500, tPrint, ["Not good for my weight loss goals.", 50]));
        addToQueue(new Command(0, tNewLine));
        addToQueue(new Command(500, tPrint, ["Well, my creator is out of shitty humor.", 50]));
        addToQueue(new Command(0, tNewLine));
        addToQueue(new Command(500, tPrint, ["Let's see how you did.", 50]));
        addToQueue(new Command(500, tPrint, ["In answering 4 questions, you gave me " + wrongcount + " incorrect answers.", 50]));
        addToQueue(new Command(0, tNewLine));
        if (wrongcount == 0) {
          addToQueue(new Command(500, tPrint, ["A perfect run. I'm impressed.", 50]));
          addToQueue(new Command(500, tPrint, ["You definitely earned your gift.", 50]));
        } else if (wrongcount < 4) {
          addToQueue(new Command(500, tPrint, ["At least you didn't get every question wrong.", 50]));
          addToQueue(new Command(500, tPrint, ["Good enough to get your gift.", 50]));
        } else if (wrongcount < 15) {
          addToQueue(new Command(500, tPrint, ["Ouch.", 50]));
          addToQueue(new Command(500, tPrint, ["Well, you can take the gift anyways as a pity prize.", 50]));
        } else {
          addToQueue(new Command(500, tPrint, ["What the fuck is wrong with you?", 50]));
          addToQueue(new Command(500, tPrint, ["That's more incorrect answers than there are in total.", 50]));
          addToQueue(new Command(500, tPrint, ["Did you seriously guess the same wrong answer more than once?", 50]));
          addToQueue(new Command(500, tPrint, ["Dumbass...", 50]));
          addToQueue(new Command(500, tPrint, ["Just take the fucking gift card.", 50]));
        }
        addToQueue(new Command(0, tNewLine));
        addToQueue(new Command(500, tPrint, ["Anyways...", 50]));
        addToQueue(new Command(0, tNewLine));
        addToQueue(new Command(500, tPrint, ["CONGRATULATIONS ON YOUR NEW HOME, ERIC!", 50]));
        state += 1;
      }
      else {
        addToQueue(new Command(500, tPrint, ["Not quite. Try again.", 50]));
        wrongcount += 1;
      }
      break;
    case 8:
      if (bothercount < rBother.length) {
        addToQueue(new Command(500, tPrint, [rBother[bothercount], 50]));
        bothercount += 1;
      } else {
        addToQueue(new Command(500, tPrint, ["Okay, you know what, fuck this, I'm out.", 50]));
        addToQueue(new Command(5000, tRemoveAll));
        state += 1;
      }
      break;
    case 9:
      break;
    default:
      rConfused.shuffle();
      addToQueue(new Command(500, tPrint, [rConfused[0], 50]));
  }
  // Continue processing
  processQueue();
}
