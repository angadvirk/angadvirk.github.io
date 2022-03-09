let focusPeriod = 0; // focusPeriod in seconds
let breakDuration = 0; // breakDuration in seconds
let cycles = 2; // no of cycles
let currSession = ""; // whether curr session is focus or break. Empty string if neither
let secsLeftGlobal = 0; // secs left in current session, for resume functionality
let cyclesLeftGlobal = 0; // how many cycles currently left.

// DOM Variables:
const focusHours_input = document.getElementById("focusHoursInput");
const focusMins_input = document.getElementById("focusMinsInput");
const focusSecs_input = document.getElementById("focusSecsInput");
const breakMins_input = document.getElementById("breakMinsInput");
const breakSecs_input = document.getElementById("breakSecsInput");
const cycleCount_input = document.getElementById("cycleCountInput");
const totalTime_p = document.getElementById("totalTime");
const warning_p = document.getElementById("warning");
const startButton_div = document.getElementById("startButton");
const mainMenuScene_div = document.getElementById("mainMenuScene");
const mainMenuChild_div = document.getElementById("mainMenuChild");
const timerScene_div = document.getElementById("timerScene");
const timerChild_div = document.getElementById("timerChild");
const timerFocusMessage_p = document.getElementById("timerFocusMessage");
const timerBreakMessage_p = document.getElementById("timerBreakMessage");
const pauseButton_div = document.getElementById("pauseButton");
const resumeButton_div = document.getElementById("resumeButton");
const cancelButton_div = document.getElementById("cancelButton");
const returnButton_div = document.getElementById("returnButton");
const modal_div = document.getElementById("modalDiv");
const modalPause_div = document.getElementById("modalPauseDiv");
const timeRemaining_p = document.getElementById("timeRemaining");
const settingsButton_div = document.getElementById("settingsButton");
const settingsBackButton_div = document.getElementById("settingsBackButton");
const helpButton_div = document.getElementById("helpButton");
const helpBackButton_div = document.getElementById("helpBackButton");
const aboutButton_div = document.getElementById("aboutButton");
const aboutBackButton_div = document.getElementById("aboutBackButton");
const modalAbout_div = document.getElementById("modalAboutDiv");
const modalHelp_div = document.getElementById("modalHelpDiv");
const modalSettings_div = document.getElementById("modalSettingsDiv");
const clearButton_span = document.getElementById("clearButton");
const modalCycleError_div = document.getElementById("modalCycleErrorDiv");
const cycleErrorBackButton_div = document.getElementById("cycleErrorBackButton");

const timerFocusHours_span = document.getElementById('timerFocusHours');
const timerFocusMins_span = document.getElementById('timerFocusMins');
const timerFocusSecs_span = document.getElementById('timerFocusSecs');

const remHours_span = document.getElementById('remHours');
const remMins_span = document.getElementById('remMins');
const remSecs_span = document.getElementById('remSecs');

const focusSound_audio = document.getElementById('focusSound');
const breakSound_audio = document.getElementById('breakSound');
const tadaSound_audio = document.getElementById('tadaSound');

function focusPeriodUpdate() {
  let newFocusPeriod = 0;
  newFocusPeriod += parseInt(focusHours_input.value) * 3600;
  newFocusPeriod += parseInt(focusMins_input.value) * 60;
  newFocusPeriod += parseInt(focusSecs_input.value);
  focusPeriod = newFocusPeriod;
}

function breakDurationUpdate() {
  let newBreakDuration = 0;
  newBreakDuration += parseInt(breakMins_input.value) * 60;
  newBreakDuration += parseInt(breakSecs_input.value);
  breakDuration = newBreakDuration;
}

function cyclesUpdate() {
  let newCycles = 0;
  newCycles += parseInt(cycleCount_input.value);
  cycles = newCycles;
}

function totalTimeCalculator(focusPeriod, breakDuration, cycles) {
  let totalHours = 0;
  let totalMins = 0;
  let totalSecs = (focusPeriod + breakDuration) * cycles;
  let hourString = "";
  let minString = "";
  let secString = "";
  // Calculating totalHours
  totalHours = Math.floor(totalSecs / 3600);
  totalSecs -= totalHours * 3600;
  // Creating hourString
  if (totalHours > 0)
  {
    hourString = totalHours.toString();
    if (totalHours === 1)
    {
      hourString += " hour";
    }
    else 
    {
      hourString += " hours";
    }
  }
  // Calculating totalMins
  totalMins = Math.floor(totalSecs / 60);
  totalSecs -= totalMins * 60;
  // Creating minString
  if (totalMins > 0)
  {
    minString = totalMins.toString();
    if (totalMins === 1)
    {
      minString += " min";
    }
    else 
    {
      minString += " mins";
    }
  }
  // Creating secString
  if (totalSecs > 0)
  {
    secString = totalSecs.toString();
    if (totalSecs === 1)
    {
      secString += " sec";
    }
    else 
    {
      secString += " secs";
    }
  }
  if (!totalHours && !totalMins && !totalSecs) // If hours, mins, and secs are all 0 for both the focus period as well as the break
  {
    secString = totalSecs.toString();
    secString += " secs";
    return secString;
  }
  else 
  {
    return (hourString + " " + minString + " " + secString);
  }
}

function totalTimeUpdate(totalTimeString) {
  totalTime_p.innerHTML = totalTimeString;
}

function secsConverter(secs) {
  let totalHours = 0;
  let totalMins = 0;
  let totalSecs = secs; 
  // Calculating totalHours
  totalHours = Math.floor(totalSecs / 3600);
  totalSecs -= totalHours * 3600;
  // Calculating totalMins
  totalMins = Math.floor(totalSecs / 60);
  totalSecs -= totalMins * 60; 
  let returnArray = [totalHours, totalMins, totalSecs];
  return returnArray;
}

function initializeTimer(hours, mins, secs) {
  // Putting timer values in strings
  let hoursString = hours.toString();
  let minsString = mins.toString();
  let secsString = secs.toString();
  // Zero-padding
  hoursStringPadded = hoursString.padStart(2, '0');
  minsStringPadded = minsString.padStart(2, '0');
  secsStringPadded = secsString.padStart(2, '0');
  // Setting timer values in html
  timerFocusHours_span.innerHTML = hoursStringPadded;
  timerFocusMins_span.innerHTML = minsStringPadded;
  timerFocusSecs_span.innerHTML = secsStringPadded;
}

function saveToStorage(focusSecs, breakSecs, cyclesLeft) {
  let focusTime = secsConverter(focusSecs);
  let breakTime = secsConverter(breakSecs);
  window.localStorage.setItem("focusHours", focusTime[0].toString());
  window.localStorage.setItem("focusMins", focusTime[1].toString());
  window.localStorage.setItem("focusSecs", focusTime[2].toString());
  window.localStorage.setItem("breakMins", breakTime[1].toString());
  window.localStorage.setItem("breakSecs", breakTime[2].toString());
  window.localStorage.setItem("cycles", cyclesLeft.toString());
  console.log(window.localStorage);
}

function startButtonHandler() {
  if (cycles <= 0) {
    modalCycleError_div.classList.remove("modalHidden");
    return;
  }
  focusSound_audio.play(); // Play focus sound
  
  // Transition to timerScene
  mainMenuChild_div.style.opacity = 0;
  setTimeout(() => {
    mainMenuScene_div.removeChild(mainMenuChild_div);
    timerScene_div.appendChild(timerChild_div);  
    timerChild_div.removeChild(timerBreakMessage_p);
  }, 300);
  setTimeout(() => timerChild_div.style.opacity = 1, 320);
  // Set up timer
  let focusSecs = focusPeriod;
  let breakSecs = breakDuration;
  let cyclesLeft = cycles;
  saveToStorage(focusSecs, breakSecs, cyclesLeft); // Save settings for user
  cyclesLeftGlobal = cyclesLeft;
  let initialTime = secsConverter(focusSecs);
  initializeTimer(initialTime[0], initialTime[1], initialTime[2]);
  // Check if cyclesLeft > 0... else, don't start the timer and give a message
  document.body.style.backgroundColor = "#eb725d"; // Red background
  focusStart(focusSecs, breakSecs, cyclesLeft);
}

function resumeButtonHandler() {
  let cyclesLeft = cyclesLeftGlobal;
  if (currSession === "focus")
  {
    let focusSecs = secsLeftGlobal;
    let breakSecs = breakDuration;
    focusStart(focusSecs, breakSecs, cyclesLeft);
  }
  else if (currSession === "break")
  {
    let focusSecs = focusPeriod;
    let breakSecs = secsLeftGlobal;
    breakStart(focusSecs, breakSecs, cyclesLeft);
  }
  secsLeftGlobal = 0; // Resetting secsLeftGlobal to 0
}

function cancelButtonHandler() {
  // Transition to main menu scene... 
  timerChild_div.style.opacity = 0;
  setTimeout(() => {
    if (document.body.contains(document.getElementById('timerFocusMessage')))
    {
      timerChild_div.appendChild(timerBreakMessage_p);
    }
    else if (document.body.contains(document.getElementById('timerBreakMessage')))
    {
      timerChild_div.prepend(timerFocusMessage_p);
    }
    timerScene_div.removeChild(timerChild_div);  
    mainMenuScene_div.appendChild(mainMenuChild_div);
  }, 300);
  setTimeout(() => {
    mainMenuChild_div.style.opacity = 1;
    document.body.style.backgroundColor = "#eb725d"; // Red background
  }, 320);
}

function focusStart(focusSecs, breakSecs, cyclesLeft) {
  currSession = "focus";
  let secsLeft = focusSecs;
  let originalFocusSecs = focusPeriod; // in case timer was paused at some point and resumed, making sure that the next focus session will start with original focus time
  const timeIt = () => {
    if (secsLeft === 0) // At end of focus period
    {
      clearInterval(timerInterval); // Stop counting down
      breakSound_audio.play(); // Play break sound
      // Transition to 'break' view
      timerChild_div.style.opacity = 0;
      setTimeout(() => {
        timerChild_div.removeChild(timerFocusMessage_p);
        timerChild_div.prepend(timerBreakMessage_p);
      }, 300);
      setTimeout(() => {
        timerChild_div.style.opacity = 1;
        document.body.style.backgroundColor = "#7f91b8"; // blue background
      }, 320);
      // Setup break timer and start it
      let initialBreakTime = secsConverter(breakSecs);
      // To ensure timer number doesn't update before 'Break' appears
      setTimeout(() => {
        initializeTimer(initialBreakTime[0], initialBreakTime[1], initialBreakTime[2]);
        breakStart(originalFocusSecs, breakSecs, cyclesLeft); // start break
      }, 310);
    }
    else if (document.body.contains(document.getElementById('mainMenuChild'))) 
    // Cancel button pressed
    {
      clearInterval(timerInterval);
    }
    else if (!modalPause_div.classList.contains("modalHidden"))
    // Pause button pressed 
    {
      // Stop countdown
      clearInterval(timerInterval);
      // Set global variable to time left in current session
      secsLeftGlobal = secsLeft;
    }
    else 
    {
      secsLeft--;
      let timeLeft = secsConverter(secsLeft);
      initializeTimer(timeLeft[0], timeLeft[1], timeLeft[2]);
    }  
  };
  let timerInterval = setInterval(timeIt, 1000);
  // Start counting down... when countdown reaches 0, call 
  // 'breakStart' function...
  // Display 'CANCEL' button and add a 'click' event listener to it
}

function breakStart(focusSecs, breakSecs, cyclesLeft) {
  currSession = "break";
  let secsLeft = breakSecs;
  let originalBreakSecs = breakDuration;
  const timeIt = () => {
    if (secsLeft === 0) // At end of break period
    {
      clearInterval(timerInterval); // Stop counting down 
      // Decrement cycles
      let updatedCyclesLeft = cyclesLeft - 1; 
      cyclesLeftGlobal = updatedCyclesLeft;
      if (updatedCyclesLeft > 0)
      {
        focusSound_audio.play(); // Play focus sound
        // Transition to 'focus' view
        timerChild_div.style.opacity = 0;
        setTimeout(() => {
          timerChild_div.removeChild(timerBreakMessage_p);
          timerChild_div.prepend(timerFocusMessage_p);
        }, 300);
        setTimeout(() => {
          timerChild_div.style.opacity = 1;
          document.body.style.backgroundColor = "#eb725d"; // Red background
        }, 320);
        // Setup focus timer and start it
        let initialFocusTime = secsConverter(focusSecs);
        // To ensure timer number doesn't update before 'Focus' appears
        setTimeout(() => {
          initializeTimer(initialFocusTime[0], initialFocusTime[1], initialFocusTime[2]);
          focusStart(focusSecs, originalBreakSecs, updatedCyclesLeft); // start break
        }, 310);
      }
      else 
      {
        // Give message/fanfare sound of congrats or something to user 
        // for completing all cycles, and return to the main menu. 
        currSession = "";
        tadaSound_audio.play();
        modal_div.classList.remove("modalHidden");
      }    
    }
    else if (document.body.contains(document.getElementById('mainMenuChild'))) 
    // Cancel button pressed
    {
      clearInterval(timerInterval);
    }
    else if (!modalPause_div.classList.contains("modalHidden"))
    // Pause button pressed 
    {
      // Stop countdown
      clearInterval(timerInterval);
      // Set global variable to time left in current session
      secsLeftGlobal = secsLeft;
    }
    else 
    {
      secsLeft--;
      let timeLeft = secsConverter(secsLeft);
      initializeTimer(timeLeft[0], timeLeft[1], timeLeft[2]);
    }  
  };
  let timerInterval = setInterval(timeIt, 1000);
}

function main() {
  timerScene_div.removeChild(timerChild_div); // No timer when app starts
  // Initialize input fields to right values
  if (window.localStorage.getItem("focusHours"))
  {
    focusHours_input.value = window.localStorage.getItem("focusHours");
    // If focusHours exists in localStorage, they all exist, so additional 
    // 'if's are not needed...
    focusMins_input.value = window.localStorage.getItem("focusMins");
    focusSecs_input.value = window.localStorage.getItem("focusSecs");
    breakMins_input.value = window.localStorage.getItem("breakMins");
    breakSecs_input.value = window.localStorage.getItem("breakSecs");
    cycleCount_input.value = window.localStorage.getItem("cycles");
  }
  focusPeriodUpdate();
  breakDurationUpdate();
  cyclesUpdate();
  totalTimeUpdate(totalTimeCalculator(focusPeriod, breakDuration, cycles));
  focusHours_input.addEventListener('input', () => {
    if (parseInt(focusHours_input.value) < 0 || focusHours_input.value.includes(".") || focusHours_input.value.includes("e") || focusHours_input.value.includes("E"))
    {
      focusHours_input.value = "0";
    } 
    else if (parseInt(focusHours_input.value) > 23)
    {
      focusHours_input.value = "23";
    }
    else if (!focusHours_input.value) // If falsy value detected in input field
    {
      focusHours_input.value = "0";
    }
    focusPeriodUpdate();
    totalTimeUpdate(totalTimeCalculator(focusPeriod, breakDuration, cycles));
  }); 
  focusMins_input.addEventListener('input', () => {
    if (parseInt(focusMins_input.value) < 0 || focusMins_input.value.includes(".") || focusMins_input.value.includes("e") || focusMins_input.value.includes("E"))
    {
      focusMins_input.value = "0";
    }
    else if (parseInt(focusMins_input.value) > 59)
    {
      focusMins_input.value = "59";
    }
    else if (!focusMins_input.value)
    {
      focusMins_input.value = "0";
    }
    focusPeriodUpdate();
    totalTimeUpdate(totalTimeCalculator(focusPeriod, breakDuration, cycles));
  });
  focusSecs_input.addEventListener('input', () => {
    if (parseInt(focusSecs_input.value) < 0 || focusSecs_input.value.includes(".") || focusSecs_input.value.includes("e") || focusSecs_input.value.includes("E"))
    {
      focusSecs_input.value = "0";
    }
    else if (parseInt(focusSecs_input.value) > 59)
    {
      focusSecs_input.value = "59";
    }
    else if (!focusSecs_input.value)
    {
      focusSecs_input.value = "0";
    }
    focusPeriodUpdate();
    totalTimeUpdate(totalTimeCalculator(focusPeriod, breakDuration, cycles));
  });
  breakMins_input.addEventListener('input', () => {
    if (parseInt(breakMins_input.value) < 0 || breakMins_input.value.includes(".") || breakMins_input.value.includes("e") || breakMins_input.value.includes("E"))
    {
      breakMins_input.value = "0";
    }
    else if (parseInt(breakMins_input.value) > 59)
    {
      breakMins_input.value = "59";
    }
    else if (!breakMins_input.value)
    {
      breakMins_input.value = "0";
    }
    breakDurationUpdate();
    totalTimeUpdate(totalTimeCalculator(focusPeriod, breakDuration, cycles));
  });
  breakSecs_input.addEventListener('input', () => {
    if (parseInt(breakSecs_input.value) < 0 || breakSecs_input.value.includes(".") || breakSecs_input.value.includes("e") || breakSecs_input.value.includes("E"))
    {
      breakSecs_input.value = "0";
    }
    else if (parseInt(breakSecs_input.value) > 59)
    {
      breakSecs_input.value = "59";
    }
    else if (!breakSecs_input.value)
    {
      breakSecs_input.value = "0";
    }
    breakDurationUpdate();
    totalTimeUpdate(totalTimeCalculator(focusPeriod, breakDuration, cycles));
  });
  cycleCount_input.addEventListener('input', () => {
    if (parseInt(cycleCount_input.value) < 1 || cycleCount_input.value.includes(".") || cycleCount_input.value.includes("e") || cycleCount_input.value.includes("E"))
    {
      cycleCount_input.value = "0";
    }
    else if (parseInt(cycleCount_input.value) > 20)
    {
      cycleCount_input.value = "20";
    }
    else if (!cycleCount_input.value)
    {
      cycleCount_input.value = "0";
    }
    cyclesUpdate();
    totalTimeUpdate(totalTimeCalculator(focusPeriod, breakDuration, cycles));
  });
  startButton_div.addEventListener('click', () => startButtonHandler());
  pauseButton_div.addEventListener('click', () => {
    // Show time remaining in modalPauseDiv
    remHours_span.innerHTML = timerFocusHours_span.innerHTML; 
    remMins_span.innerHTML = timerFocusMins_span.innerHTML;
    remSecs_span.innerHTML = timerFocusSecs_span.innerHTML;
    modalPause_div.classList.remove("modalHidden"); // Show pause popup
  });
  resumeButton_div.addEventListener('click', () => {
    modalPause_div.classList.add("modalHidden"); // Hide pause popup
    resumeButtonHandler(); // Similar to startButtonHandler, but uses secsLeftGlobal
  });
  cancelButton_div.addEventListener('click', () => cancelButtonHandler());
  returnButton_div.addEventListener('click', () => {
    modal_div.classList.add("modalHidden"); // Hide modal popup
    cancelButtonHandler();
  });
  settingsButton_div.addEventListener('click', () => {
    modalSettings_div.classList.remove("modalHidden");
  });
  settingsBackButton_div.addEventListener('click', () => {
    modalSettings_div.classList.add("modalHidden");
  });
  helpButton_div.addEventListener('click', () => {
    modalHelp_div.classList.remove("modalHidden");
  });
  helpBackButton_div.addEventListener('click', () => {
    modalHelp_div.classList.add("modalHidden");
  });
  aboutButton_div.addEventListener('click', () => {
    modalAbout_div.classList.remove("modalHidden");
  });
  aboutBackButton_div.addEventListener('click', () => {
    modalAbout_div.classList.add("modalHidden");
  });
  cycleErrorBackButton_div.addEventListener('click', () => {
    modalCycleError_div.classList.add("modalHidden");
  })
  clearButton_span.addEventListener('click', () => {
    window.localStorage.clear();
    focusHours_input.value = "0";
    focusMins_input.value = "25";
    focusSecs_input.value = "0";
    breakMins_input.value = "5";
    breakSecs_input.value = "0";
    cycleCount_input.value = "2";
    focusPeriodUpdate();
    breakDurationUpdate();
    cyclesUpdate();
    totalTimeUpdate(totalTimeCalculator(focusPeriod, breakDuration, cycles));
  });
}

main();