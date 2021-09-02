/**
 * Elements
 */
const landing = document.getElementById("landing");
const form = document.getElementById("newParticipantForm");
const controls = document.getElementById("controls");
const playNextButton = document.querySelector("button#playNext");
const trialIndicator = document.getElementById("currentTrial");
const recordingIndicator = document.getElementById("isRecording");

const participantIDElement = document.getElementById("participantID");
const numTrialsElement = document.getElementById("numTrials");
const recordDataElement = document.getElementById("recordData");
// ---

/**
 * Trial stuff
 */
let participantID = 0;
let numTrials = 1;
let recordData = true;

const trialList = [];
let currentTrial = 0;

const play = (soundID) => {
  console.log(soundID);
};

const playNext = () => {
  if (currentTrial <= numTrials - 1) {
    play(trialList[currentTrial]);
    if (currentTrial === numTrials - 1) {
      playNextButton.innerHTML = "Exit";
      trialIndicator.innerHTML = "Trials complete.";
    } else {
      trialIndicator.innerHTML =
        "Trial " + (currentTrial + 1) + " / " + numTrials;
    }
    currentTrial++;
  } else {
    clearTrialList();
    showLanding();
  }
};

const clearTrialList = () => {
  while (trialList.length > 0) trialList.pop();
};

const createTrialList = () => {
  for (i = 0; i < numTrials; i++) {
    trialList[i] = Math.trunc(Math.random() * 4);
  }

  trialIndicator.innerHTML = "Trial 1 / " + numTrials;
};
// ---

/**
 * Form stuff
 */
const formSubmitHandler = () => {
  participantID = participantIDElement.value;
  numTrials = numTrialsElement.value;
  recordData = recordDataElement.checked;

  if (numTrials <= 0) {
    showLanding();
    resetForm();
    return;
  }

  createTrialList();
  showControls();
  resetForm();
};

const resetForm = () => {
  participantIDElement.value = 0;
  numTrialsElement.value = 1;
  recordDataElement.checked = true;
};
// ---

/**
 * UI section visibility control functions
 */
const showLanding = () => {
  hideAll();
  show(landing);
};

const showForm = () => {
  hideAll();
  resetForm();
  show(form);
};

const showControls = () => {
  hideAll();
  show(controls);
  recordingIndicator.innerHTML = recordData
    ? "Recording data."
    : "Not recording data.";
};

const hideAll = () => {
  hide(landing);
  hide(form);
  hide(controls);
};

const hide = (element) => {
  !element.classList.contains("d-none") && element.classList.add("d-none");
};

const show = (element) => {
  element.classList.contains("d-none") && element.classList.remove("d-none");
};
// ---
