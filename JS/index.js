let nav = document.getElementsByTagName("nav")[0];
let sec2 = document.getElementById("About");
let numberCounter = document.getElementsByClassName("number-counter");
let togglerIcn = document.getElementsByClassName("navbar-toggler-icon")[0];
// preload var
let preload = document.getElementById("preloader");
// counter variables
let nums = document.querySelectorAll(".section6 > div > h3");
let section = document.querySelector(".section6");
let started = false; // Function Started ? No

//bars animation
let section2Bars = document.querySelectorAll(".progress-bar");
const section2 = document.getElementById("About");
let workedOnce = false;

// text animation
let span = document.querySelector("main > header > div > span");
//counter variable
let count = 0;

//all modal togglers
const allElements = document.getElementsByClassName("modal-toggler");

//preload animation
function moveParts() {
  let top = document.getElementById("topPre");
  let bottom = document.getElementById("bottomPre");
  let circle = document.getElementById("circle");
  let opVal = 0.5;

  top.style.transform = "translateY(-100%)";
  top.style.opacity = opVal;
  bottom.style.transform = "translateY(100%)";
  bottom.style.opacity = opVal;
  circle.style.opacity = 0;
}

addEventListener("load", () => {
  moveParts();
  addEventListener("transitionend", () => {
    preload.style.visibility = "hidden";
  });

  //!text animation
  // Create a ResizeObserver instance
  let observer = new ResizeObserver((entires) => {
    const content = ["Larry Daniels", "Developer", "Designer"];
    for (let entry of entires) {
      if (entry.contentRect.width == 0) {
        entry.target.textContent = content[count++];
        count >= 3 ? (count = 0) : count;
      }
    }
  });
  observer.observe(span);
});

window.onscroll = function () {
  if (window.scrollY >= section.offsetTop - 450) {
    if (!started) {
      nums.forEach((num) => startCount(num));
    }
    started = true;
  }
  //!scrolling bar animation
  if (window.scrollY >= section2.offsetTop - 200 && !workedOnce) {
    workedOnce = true;
    section2Bars.forEach((bar) => {
      let width = 15;
      const targetWidth = bar.dataset.width;
      const interval = setInterval(() => {
        if (width >= targetWidth) {
          clearInterval(interval);
        } else {
          width++;
          bar.style.width = `${width}%`;
        }
      }, 0); // Adjust the interval time (in milliseconds) to control the speed of the growth
    });
  }
};

function startCount(el) {
  let goal = el.dataset.goal;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent == goal) {
      clearInterval(count);
    }
  }, 2000 / goal);
}

// fixed in all sections
addEventListener("scroll", function () {
  if (window.scrollY >= sec2.offsetTop) {
    nav.classList.add("nav-inButton");
    nav.classList.remove("nav-inTop");
    togglerIcn.style.backgroundImage = 'url("./../assets/icons/black.svg")';
  } else {
    nav.classList.remove("nav-inButton");
    nav.classList.add("nav-inTop");
    togglerIcn.style.backgroundImage = 'url("./../assets/icons/white.svg")';
  }
});

//handle modal
function openModal(imgSrc) {
  const modal = document.getElementById("modal"); //get the modal
  const modalImg = document.getElementById("modal-image"); //modal image
  const myModal = new bootstrap.Modal(modal); //set the modal to control it
  modalImg.src = imgSrc; //set the image to the modal
  myModal.show();
}

for (const element of allElements) {
  element.addEventListener("click", function () {
    openModal(this.parentElement.parentElement.previousElementSibling.src);
  });
}

//handle modal navigation

function move(step) {
  let images = [
    ...new Set(
      [...document.querySelectorAll(".img-card img")].map((img) => img.src)
    ),
  ]; // Remove duplicates and convert to array

  const modalImg = document.getElementById("modal-image"); // Modal image
  const currentIndex = images.indexOf(modalImg.src);
  const newIndex = currentIndex + step;

  // Handle out-of-bounds index
  if (newIndex >= images.length) {
    modalImg.src = images[0]; // Reset to the first image
  } else if (newIndex < 0) {
    modalImg.src = images[images.length - 1]; // Go to the last image
  } else {
    modalImg.src = images[newIndex]; // Go to the next/previous image
  }
}
