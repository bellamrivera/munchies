"use strict";
(function() {
	window.addEventListener("load", init);

  function init() {
    createBoard();
  }

  var prevTarget;
  function flipCard(event) {
    // current image
    let target = event.currentTarget;

    // when flipped, remove from flipped class and show the image
    event.currentTarget.classList.remove("flipped");
    let source = "images/" + target.id + ".jpeg";
    target.src = source;

    // if no previous image, set the previous to this one
    if (prevTarget == null) {
      prevTarget = target;
    } else {
      // if there is a previous, check if the current matches the previous
      if (prevTarget.id == target.id) {
        updateScore();

        // set visibility to hidden
        let prev = prevTarget;
        setTimeout(addClass, 900, target, prev, "matched");
      } else {
        // replace this by setting the image for the class
        // setTimeout(flipBack(event, prevTarget), 2000);
        let prev = prevTarget;
        setTimeout(addClass, 900, target, prev, "flipped");
      }
      prevTarget = null;
    }
  }

  function addClass(target, prev, className) {
    console.log(target);
    console.log(prev);
    target.classList.add(className);
    prev.classList.add(className);
  }

  function updateScore() {
    let matches = document.getElementById("match-count");
    let updatedScore = parseInt(matches.textContent) + 1;
    matches.textContent = updatedScore;
    if (updatedScore === 8) {
      let element = document.querySelector("#score-text");
      let oldText = document.querySelector("#score-text p");
      let newText = document.createTextNode("You matched all the munchies!");
      newText.classList.add('game-over');
      element.replaceChild(newText, oldText);
    }
  }

  function createBoard() {
    // set up with random placement of images
    const numRows = 4;
    const numCols = 4;
    const foods =['chips', 'chips', 'cookies', 'cookies', 'donut', 'donut',
                    'fries', 'fries', 'grilledcheese', 'grilledcheese', 'oreos',
                    'oreos', 'pizza', 'pizza', 'taco', 'taco'];

    for (let i = 1; i <= numRows; i++) {
      let row = document.getElementById("row" + i);
      console.log('row = ' + row);
      for (let j = 1; j <= numCols; j++) {
        // use random index to create image of selected food
        let index = Math.floor(Math.random() * foods.length);
        console.log('foods = ' + foods);
        console.log('food = ' + foods[index]);
        let img = document.createElement('img');
        img.src = 'images/' + foods[index] + '.jpeg';
        img.id = foods[index];
        // remove from list, so we don't reuse
        img.alt = foods[index];
        foods.splice(index, 1);

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
})();