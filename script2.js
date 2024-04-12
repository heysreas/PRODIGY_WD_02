let timer; // Timer variable
let isRunning = false; // Flag to track if the stopwatch is running
let startTime; // Start time of the stopwatch
let elapsedTime = 0; // Elapsed time in milliseconds
let laps = []; // Array to store lap times

function startStop() {
  if (!isRunning) {
    startTimer();
    document.getElementById('startStop').textContent = 'Stop';
  } else {
    stopTimer();
    document.getElementById('startStop').textContent = 'Start';
  }
}

function startTimer() {
  isRunning = true;
  startTime = Date.now() - elapsedTime;
  timer = setInterval(updateDisplay, 10);
}

function stopTimer() {
  isRunning = false;
  clearInterval(timer);
}

function lapReset() {
  if (isRunning) {
    recordLap();
  } else {
    resetTimer();
  }
}

function updateDisplay() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  const formattedTime = formatTime(elapsedTime);
  document.getElementById('display').textContent = formattedTime;
}

function formatTime(time) {
  const date = new Date(time);
  const minutes = padTime(date.getMinutes());
  const seconds = padTime(date.getSeconds());
  const milliseconds = padTime(Math.floor(date.getMilliseconds() / 10));
  return `${minutes}:${seconds}:${milliseconds}`;
}

function padTime(time) {
  return time < 10 ? `0${time}` : time;
}

function recordLap() {
  const lapTime = elapsedTime;
  const formattedLapTime = formatTime(lapTime);
  laps.push(formattedLapTime);
  const lapsList = document.getElementById('lapsList');
  const lapItem = document.createElement('li');
  lapItem.classList.add('lapItem');
  lapItem.textContent = `Lap ${laps.length}: ${formattedLapTime}`;
  lapsList.appendChild(lapItem);
}

function resetTimer() {
  stopTimer();
  elapsedTime = 0;
  document.getElementById('display').textContent = '00:00:00';
  laps = [];
  const lapsList = document.getElementById('lapsList');
  lapsList.innerHTML = '';
}
