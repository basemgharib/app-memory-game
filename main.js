// select Blocks Container
let blockContainer = document.querySelector('.memory-game-blocks'),
  // Create Array From Game Blocks
  blocks = Array.from(blockContainer.children),
  // Effect Duration
  duration = 1000,
  // Create Range Of Keys
  orderRange = Array.from(Array(blocks.length).keys());

// Select The Start Game Button
document.querySelector('.control-buttons span').onclick = () => {
  // Prompt Window To Ask For Name
  let whatName = prompt('What is your name ?'),
  //Say hello here and name
    spanHello = document.querySelector('.name span');
  // If Name Is Empty and  Set Name To Unknown and Set Name To Your Name
  whatName == "" || whatName == null ? spanHello.textContent = `Unknown غير معروف` : spanHello.textContent = whatName;
  // add play Sound
  document.getElementById('play').play();
  // Remove Splash Screen
  document.querySelector('.control-buttons').remove();
  
  //Add Timer
  let timerTime = 3,
  timerForTime = document.querySelector('.info-container .timer span'),
  countDown = setInterval( () => {
      secundPass();
    }, duration);
  //function run timer
  function secundPass() {
    // get minutes
    let minutes = Math.floor(timerTime / 60),
      //get secound
      secound = timerTime % 60;
      // change time in span
      timerForTime.textContent = `${minutes}:${secound}`;
    if (secound < 10) {
      secound = `0${secound}`;
    }
    if (timerTime > 0) {
      timerTime --;
      timerForTime.textContent = `${minutes}:${secound}`;
    } else {
      timerForTime.textContent = `End time`;
      clearInterval(countDown);
      popUp();
    }
  }
}
// pop up function
function popUp() {
  let pup = document.getElementById('pop-up');
  // add css opacity in popup
  pup.style.opacity = 1;
}

shuffle(orderRange);

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {
  // Add CSS Order Property
  block.style.order = orderRange[index];
  // Add Click Event
  block.addEventListener('click', () => {
    // Trigger The Flip Block Function
    flipBlock(block);
  });
});

// Flip Block Function
function flipBlock(block) {
  // Add Class is-flipped
  block.classList.add('is-flipped');
  // Collect All Flipped Cards
  let allBlocksFlipped = blocks.filter(selectedBlocks => selectedBlocks.classList.contains('is-flipped'));
  // If Theres Two Selected Blocks
  if (allBlocksFlipped.length === 2) {
    // Stop Clicking Function
    stopFlipp()
    // Check Matched Block Function
    hasMatched(allBlocksFlipped[0], allBlocksFlipped[1])
  }
}

// Stop Clicking Function
function stopFlipp() {
  // Add Class No Clicking on Main Container
  blockContainer.classList.add('no-clicking');
  // Wait Duration
  setTimeout(() => {
    // Remove Class No Clicking After The Duration
    blockContainer.classList.remove('no-clicking');
  }, duration);
}

// Check Matched Block
function hasMatched(firstSelected, secoundSelected) {
  // Change Tries errors
  let tries = document.querySelector('.tries span');
  // check tow data Technology equal
  if(firstSelected.dataset.technology === secoundSelected.dataset.technology) {
    firstSelected.classList.add('has-match');
    secoundSelected.classList.add('has-match');
    // remove flip class
    firstSelected.classList.remove('is-flipped');
    secoundSelected.classList.remove('is-flipped');
    // add success sound and play
    document.getElementById('success').play();
  } else {
    tries.textContent = parseInt(tries.textContent) + 1;
    setTimeout(() => {
      firstSelected.classList.remove('is-flipped');
      secoundSelected.classList.remove('is-flipped');
    }, duration);
    // add sound fail and play
    document.getElementById('fail').play();
  }
}

// Shuffle Function
function shuffle(array) {
  // Settings Vars
  let current = array.length,
    temp,
    random;
  // loop
  while (current > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * current);
    // Decrease Length By One
    current --;
    // [1] Save Current Element in Stash
    temp = array[current];
    // [2] Current Element = Random Element
    array[current] = array[random];
    // [3] Random Element = Get Element From Stash
    array[random] = temp;
  }
  return array;
}