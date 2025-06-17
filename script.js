let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

function updateDisplay() {
  const time = Date.now() - startTime + elapsedTime;
  const totalSeconds = Math.floor(time / 100);
  const minutes = Math.floor(totalSeconds / 600);
  const seconds = Math.floor((totalSeconds % 600) / 10);
  const milliseconds = totalSeconds % 10;

  document.getElementById('timer').textContent = 
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

function startTimer() {
  if (!isRunning) {
    startTime = Date.now();
    timer = setInterval(updateDisplay, 100);
    isRunning = true;
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(timer);
    elapsedTime += Date.now() - startTime;
    isRunning = false;
  }
}

function resetTimer() {
  clearInterval(timer);
  document.getElementById('timer').textContent = '00:00:00';
  isRunning = false;
  elapsedTime = 0;
  document.getElementById('lapList').innerHTML = '';
}

function recordLap() {
  if (!isRunning) return;
  const lapTime = document.getElementById('timer').textContent;
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  document.getElementById('lapList').appendChild(lapItem);
}

function clearLaps() {
  document.getElementById('lapList').innerHTML = '';
}

function toggleMode() {
  const body = document.body;
  const icon = document.getElementById('modeIcon');
  const emoji = document.getElementById('modeEmoji');
  body.classList.toggle('light');

  if (body.classList.contains('light')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    emoji.textContent = '☀️';
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    emoji.textContent = '🌙';
  }
}
