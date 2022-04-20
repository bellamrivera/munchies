// Bella Rivera
// April 4, 2022
// CSE154 Section AH
// This is the JavaScript for my CP2 website. It contains all of the functionality.
    // It sets up the boards, flips the cards, counts the matches, and triggers
    // the celebration when all the matches have been found.

"use strict";
(function() {
	window.addEventListener("load", init);

  // game constants
  const GOAL = 8;
  const NUM_ROWS = 4;
  const NUM_COLS = 4;
  const FOODS =['1chips', '2chips', '1cookies', '2cookies', '1donut', '2donut',
                    '1fries', '2fries', '1grilledcheese', '2grilledcheese', '1oreos',
                    '2oreos', '1pizza', '2pizza', '1taco', '2taco'];


  function init() {
    createBoard();
  }

  var prevTarget;
  function flipCard(event) {
    // current image
    let target = event.currentTarget;

    // when flipped, remove from flipped class and show the image
    event.currentTarget.classList.remove("flipped");
    let food = target.id.substring(1);
    let source = "images/" + food + ".jpeg";
    target.src = source;

    // if no previous image, set the previous to this one
    if (prevTarget == null) {
      prevTarget = target;
    } else {

      // if there is a previous, check if the current matches the previous
      let prevId = prevTarget.id;
      let targId = target.id;
      if (prevId.substring(1) == targId.substring(1) && prevId != targId) {
        updateScore();

        // set visibility to hidden
        let prev = prevTarget;
        setTimeout(addClass, 900, target, prev, "matched");
      } else if (prevId.substring(1) != targId.substring(1)) {
        // replace this by setting the image for the class
        // setTimeout(flipBack(event, prevTarget), 2000);
        let prev = prevTarget;
        setTimeout(addClass, 900, target, prev, "flipped");
      }
      prevTarget = null;
    }
  }

  function createBoard() {
    // set up with random placement of images
    for (let i = 1; i <= NUM_ROWS; i++) {
      let row = document.getElementById("row" + i);
      for (let j = 1; j <= NUM_COLS; j++) {
        // use random index to create image of selected food
        let index = Math.floor(Math.random() * FOODS.length);
        let food = FOODS[index];
        let img = document.createElement('img');
        let foodType = food.substring(1);
        img.src = 'images/' + foodType + '.jpeg';
        img.id = food;
        // remove from list, so we don't reuse
        img.alt = foodType;
        FOODS.splice(index, 1);

        // add to designated row
        row.appendChild(img);
      }
    }

    let images = document.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {
      images[i].classList.add("flipped");
      images[i].addEventListener('click', flipCard);
    }
  }

  function addClass(target, prev, className) {
    target.classList.add(className);
    prev.classList.add(className);
  }

  function updateScore() {
    let matches = document.getElementById("match-count");
    let updatedScore = parseInt(matches.textContent) + 1;
    matches.textContent = updatedScore;
    if (updatedScore === GOAL) {
      celebrate();
    }
  }

  function clearBoard() {
    for (let i = 1; i <= NUM_ROWS; i++) {
      let row = document.getElementById("row" + i);
      row.innerHTML = "";
    }
  }

  function celebrate() {
    let element = document.querySelector("#score-text");
    let oldText = document.querySelector("#score-text p");
    let newText = document.createTextNode("You matched all the munchies!");
    element.classList.add('game-over');
    element.replaceChild(newText, oldText);
    clearBoard();
    let gif = document.createElement('img')
    // https://media.giphy.com/media/ZB3IAId94nJj07ZzUf/giphy.gif
    gif.src = "images/happyfood.gif";
    element.appendChild(gif);
    // console.log(document.getElementById('#score-text'));
    // document.getElementById('#score-text').appendChild(gif);
  }

})();