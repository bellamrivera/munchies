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

  function addClass(target, prev, className) {
    target.classList.add(className);
    prev.classList.add(className);
  }

  function updateScore() {
    const goal = 8;
    let matches = document.getElementById("match-count");
    let updatedScore = parseInt(matches.textContent) + 1;
    matches.textContent = updatedScore;
    if (updatedScore === goal) {
      celebrate();
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
    gif.src = "images/happyfood.gif";
    element.appendChild(gif);
    // console.log(document.getElementById('#score-text'));
    // document.getElementById('#score-text').appendChild(gif);
  }

  function createBoard() {
    // set up with random placement of images
    const numRows = 4;
    const numCols = 4;
    const foods =['1chips', '2chips', '1cookies', '2cookies', '1donut', '2donut',
                    '1fries', '2fries', '1grilledcheese', '2grilledcheese', '1oreos',
                    '2oreos', '1pizza', '2pizza', '1taco', '2taco'];

    for (let i = 1; i <= numRows; i++) {
      let row = document.getElementById("row" + i);
      for (let j = 1; j <= numCols; j++) {
        // use random index to create image of selected food
        let index = Math.floor(Math.random() * foods.length);
        let food = foods[index];
        let img = document.createElement('img');
        let foodType = food.substring(1);
        img.src = 'images/' + foodType + '.jpeg';
        img.id = food;
        // remove from list, so we don't reuse
        img.alt = foodType;
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

  function clearBoard() {
    const numRows = 4;
    for (let i = 1; i <= numRows; i++) {
      let row = document.getElementById("row" + i);
      row.innerHTML = "";
    }
  }

})();