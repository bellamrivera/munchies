/**
 * Bella Rivera
 * April 4, 2022
 * CSE154 Section AH
 *
 * This is the JavaScript for my CP2 website. It contains all of the functionality.
 * It sets up the boards, flips the cards, counts the matches, and triggers
 * the celebration when all the matches have been found.
 */

"use strict";
(function() {
  window.addEventListener("load", init);

  // game constants
  const GOAL = 8;
  const NUM_ROWS = 4;
  const NUM_COLS = 4;
  const FOODS = ['1chips', '2chips', '1cookies', '2cookies', '1donut', '2donut',
                    '1fries', '2fries', '1grilledcheese', '2grilledcheese', '1oreos',
                    '2oreos', '1pizza', '2pizza', '1taco', '2taco'];

  /**
   * Initializes the game by creating the board (calls helper function createBoard)
   */
  function init() {
    createBoard();
  }

  let prevTarget;

  /**
   * Called when a user clicks on a card. Flips the card over (AKA shows the image)
   * Also checks for a match. If there is a match, hides both cards. Otherwise,
   * flips them both back over.
   * @param {object} event   the current event (AKA the user clicked on a card)
   */
  function flipCard(event) {
    // current image
    console.log(event);
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
      const DELAY = 900;

      if (prevId.substring(1) === targId.substring(1) && prevId !== targId) {
        updateScore();

        // set visibility to hidden
        let prev = prevTarget;
        setTimeout(addClass, DELAY, target, prev, "matched");
      } else if (prevId.substring(1) !== targId.substring(1)) {

        // flip them back over
        let prev = prevTarget;
        setTimeout(addClass, DELAY, target, prev, "flipped");
      }
      prevTarget = null;
    }
  }

  /**
   * Sets up the board. Randomly places the images in a 4x4 grid. Also adds an
   * event listener to each card so that they are ready to be flipped.
   */
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

  /**
   * Adds a class to both the current card and the previous card.
   * This is mainly so that we can style the desired cards.
   * @param {element} target   the current card
   * @param {element} prev     the previous card
   * @param {string} className the name of the class we want to add
   */
  function addClass(target, prev, className) {
    target.classList.add(className);
    prev.classList.add(className);
  }

  /**
   * Updates the score of the game every time the user finds a match.
   * Once all matches have been found, clears the board and shows celebration
   * text and image, using helper functions.
   */
  function updateScore() {
    let matches = document.getElementById("match-count");
    let updatedScore = parseInt(matches.textContent) + 1;
    matches.textContent = updatedScore;
    if (updatedScore === GOAL) {
      celebrate();
    }
  }

  /**
   * Tells user that they have found all matches. Clears the board and shows
   * a gif of happy cartoon characters with food.
   */
  function celebrate() {
    let element = document.querySelector("#score-text");
    let oldText = document.querySelector("#score-text p");
    let newText = document.createTextNode("You matched all the munchies!");
    element.classList.add('game-over');
    element.replaceChild(newText, oldText);
    clearBoard();
    let gif = document.createElement('img');

    // https://media.giphy.com/media/ZB3IAId94nJj07ZzUf/giphy.gif
    gif.src = "images/happyfood.gif";
    gif.alt = "happy characters with food";
    element.appendChild(gif);
  }

  /**
   * Clears the board from the webpage. Keeps the row sections intact, just
   * removes all of the images from the rows.
   */
  function clearBoard() {
    for (let i = 1; i <= NUM_ROWS; i++) {
      let row = document.getElementById("row" + i);
      row.innerHTML = "";
    }
  }

})();