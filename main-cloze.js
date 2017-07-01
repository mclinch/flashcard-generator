var ClozeCard = require("./cloze-card.js");
var cardData = require("./cloze-card.json");
var inquirer = require("inquirer");

studyCards();

function studyCards() {
  
  var currentCard;
  var cardArray = [];
  var initialCorrect = 0;
  var initialIndex = 0;
  
  for (var i = 0; i < cardData.length; i++) {
    currentCard = new ClozeCard(cardData[i].partial, cardData[i].cloze);
    cardArray.push(currentCard);
  }
  
  studySession(initialCorrect, cardArray, initialIndex);
}

function endSession(score) {
  console.log("Study Round Over!");
  console.log("You got " + score + " correct!");
  inquirer.prompt([{
    type: "input",
    name: "text",
    message: "Study more (y) or go home (n)?"
  }]).then(function(answer) {

    if (answer.text.charAt(0).toLowerCase() === "y") {
      
      studyCards();
    } 
    else {
 // end session
      console.log("Call it a day!");
      console.log("Good work!");
    }
  });
}

function studySession(currentScore, cardArray, currentIndex) {
  if (currentIndex < cardArray.length) {
    promptUser(cardArray, currentIndex, currentScore);
  }
  else {
    endSession(currentScore);
  }
}

function promptUser(cardArray, currentIndex, currentScore) {
  var card = cardArray[currentIndex];
  inquirer.prompt([{
    type: "input",
    name: "text",
    message: card.partial + "\nAnswer:"
  }]).then(function(answer) {
    if (answer.text.trim().toLowerCase() === card.cloze.trim().toLowerCase()) {
      currentScore++;
      console.log("\nYou are correct!");
    }
    else {
      console.log("\nIncorrect!");
    }
    console.log(card.displayCard());
    currentIndex++;
    console.log("-------------------------\n");
    studySession(currentScore, cardArray, currentIndex);
  });
}