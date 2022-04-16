"use strict";
(function() {
	window.addEventListener("load", init);

  function init() {
  	let images = document.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {
      images[i].addEventListener('click', flipCard);
    }
  }

  let prevTarget;
  function flipCard(event) {
    let target = event.currentTarget.id;
    console.log(target);
    let toMatch;
    if (prevTarget == null) {
      prevTarget = target;
    } else {
      toMatch = prevTarget;
      prevTarget = null;
    }
    console.log("prev target = " + prevTarget);
    console.log("to match = " + prevTarget);
    if(!event.currentTarget.classList.contains("flipped")) {
      event.currentTarget.classList.add("flipped");
      let source = "images/" + target + ".jpeg";
      event.currentTarget.src = source;

      event.currentTarget.addEventListener('click', findMatch);
    //   let score = id("score");
    //   let total = parseInt(score.textContent) + 1;
    //   // Need to convert the string content into a number.
    //   score.textContent = parseInt(score.textContent) + 1;
    //   if (total === 24) {
    //     qs("#game p").textContent = "You have whacked all bugs";
    //   }
    // }
    }
  }

  function findMatch(event) {
    console.log("prev target = " + target);
  }
})();