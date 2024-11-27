let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

const timeDisplay = document.getElementById('time-display');
const lapsContainer = document.getElementById('laps');
const progressBar = document.getElementById('progress-bar');
const themeToggle = document.getElementById('theme-toggle');

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', addLap);
document.addEventListener('keydown', handleKeyboard);

themeToggle.addEventListener('click', toggleTheme);

function startTimer() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 10);
    isRunning = true;
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
  }
}

function resetTimer() {
  clearInterval(timer);
  elapsedTime = 0;
  isRunning = false;
  timeDisplay.textContent = '00:00:00.00';

  // Reset the progress bar
  updateProgressBar(0);

  // Clear lap times
  lapsContainer.innerHTML = '';
}

function addLap() {
  if (isRunning) {
    const lapTime = formatTime(Date.now() - startTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsContainer.appendChild(lapItem);

    // Save lap to localStorage
    const laps = JSON.parse(localStorage.getItem('laps')) || [];
    laps.push(lapTime);
    localStorage.setItem('laps', JSON.stringify(laps));
  }
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);

  // Update progress bar (example: max time = 1 minute)
  updateProgressBar((elapsedTime % 60000) / 60000 * 100);
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);

  return `${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

function pad(number) {
  return number.toString().padStart(2, '0');
}

function updateProgressBar(percent) {
  progressBar.style.width = `${percent}%`;
}

function toggleTheme() {
  document.body.classList.toggle('dark');
}

function handleKeyboard(event) {
  if (event.key === 's') startTimer();
  if (event.key === 'p') pauseTimer();
  if (event.key === 'r') resetTimer();
  if (event.key === 'l') addLap();
}
