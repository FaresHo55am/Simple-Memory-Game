let correct = 0;
let firstImage = null;
let secondImage = null;

let moons = document.getElementsByName("image");

Setup();

function Setup() {
  let left_add = 105;
  let curr_left = 250;
  const positions = ["20px", "135px", "250px"];

  for (let i = 0; i < moons.length; i++) {
    moons[i].src = "Moon.gif";
    moons[i].style.position = "absolute";
    moons[i].style.cursor = "pointer";
    moons[i].style.top = positions[Math.floor(i / 4)];
    moons[i].style.left = curr_left + "px";
    curr_left += left_add;
    if ((i + 1) % 4 === 0) {
      curr_left = 250;
    }

    moons[i].addEventListener("click", handleClick);
  }
}

function handleClick() {
  if (!firstImage || !secondImage) {
    this.src = this.dataset.id + ".gif"; // show after click
    if (!firstImage) {
      firstImage = this; // assign first image
    } else if (this !== firstImage) {
      secondImage = this; // assign second image
      checkMatch();
    }
  }
}

function checkMatch() {
  if (firstImage.dataset.id === secondImage.dataset.id) {
    console.log("Correct! The images match.");
    correct++;
    // cant click again if correct
    firstImage.removeEventListener("click", handleClick);
    secondImage.removeEventListener("click", handleClick);
    // null both image objects
    resetSelection();

    if (correct === 6) {
      // display congrats
      var h1 = document.createElement("h1");
      h1.textContent = "Congrats";
      h1.style.color = "red";
      document.body.appendChild(h1);
    }
  } else {
    // after showing both, wait 2 seconds then hide both
    console.log("Not correct! The images do not match.");
    setTimeout(function () {
      firstImage.src = "Moon.gif";
      secondImage.src = "Moon.gif";
      resetSelection();
    }, 2000);
  }
}

function resetSelection() {
  firstImage = null;
  secondImage = null;
}
