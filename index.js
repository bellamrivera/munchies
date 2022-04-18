"use strict";
(function() {
	window.addEventListener("load", init);

  function init() {
  	let images = document.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {
      images[i].addEventListener('click', flipCard);
    }
  }

  var prevTarget;
  function flipCard(event) {
    // current image
    let target = event.currentTarget;

    // when flipped, add it to the flipped class and show the image
    event.currentTarget.classList.add("flipped");
    let source = "images/" + target.id + ".jpeg";
    target.src = source;
    console.log("target = " + target.id);

    // if no previous image, set the previous to this one
    if (prevTarget == null) {
      prevTarget = target;
      console.log(prevTarget.id);
    } else {
      // if there is a previous, check if the current matches the previous
      console.log("does " + target.id + " match " + prevTarget.id + "?");
      if (prevTarget.id == target.id) {
        let matches = document.getElementById("match-count");
        matches.textContent = parseInt(matches.textContent) + 1;
        // set visibility hidden
        console.log("YES!");
      } else {
        // replace this by setting the image for the class
        // setTimeout(flipBack(event, prevTarget), 2000);
        let prev = prevTarget;
        setTimeout(function() {
          target.classList.remove("flipped");
          target.src = "images/black.jpeg";
          prev.classList.remove("flipped");
          prev.src = "images/black.jpeg";
        }, 1300);
        // document.getElementById(target).src = "images/black.jpeg";
        // console.log(document.getElementById(target));
        // document.getElementById(prevTarget).src = "images/black.jpeg";
      }
      prevTarget = null;
    }


    //   let score = id("score");
    //   let total = parseInt(score.textContent) + 1;
    //   // Need to convert the string content into a number.
    //   score.textContent = parseInt(score.textContent) + 1;
    //   if (total === 24) {
    //     qs("#game p").textContent = "You have whacked all bugs";
    //   }
    // }
  }

  // function flipBack(event, prevTarget) {

  // }
})();