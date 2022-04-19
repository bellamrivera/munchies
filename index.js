"use strict";
(function() {
	window.addEventListener("load", init);

  function init() {
  	let images = document.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {
      images[i].classList.add("flipped");
      images[i].addEventListener('click', flipCard);
    }
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
        setTimeout(addClass, 1000, target, prev, "matched");
      } else {
        // replace this by setting the image for the class
        // setTimeout(flipBack(event, prevTarget), 2000);
        let prev = prevTarget;
        setTimeout(addClass, 1300, target, prev, "flipped");
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
      document.querySelector("#score-text").textContent = "You matched all the munchies!";
    }
  }
})();