const timer = document.getElementById('timer');
const btnStart = document.getElementById('btnStart');
const btnLap = document.getElementById('btnLap');
const laps = document.querySelector('.laps');
console.dir(timer);

let startTime;
let interval;
let isRunning = false;
let elapsedTime = 0;

function pad(value) {
    return value < 10 ? '0' + value : value;
}

function padMilliseconds(value) {
    if (value < 10) return '00' + value;
    if (value < 100) return '0' + value;
    return value;
}

function updateTimer() {
    const currentTime = new Date();
    elapsedTime = currentTime - startTime;

    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = elapsedTime % 1000;
    timer.textContent = `${pad(minutes)}:${pad(seconds)}:${padMilliseconds(milliseconds)}`;
}

function toggleStartStop() {
    if (isRunning) {
        clearInterval(interval);
        btnStart.textContent = 'Start';
        btnLap.textContent = 'Reset';
    } else {
        startTime = new Date() - elapsedTime;
        interval = setInterval(updateTimer, 100);
        btnStart.textContent = 'Stop';
        btnLap.textContent = 'Lap';
    }
    isRunning = !isRunning;
}

function handleLapReset() {
    if (isRunning) {
        const listLaps = document.querySelectorAll('.laps-item')
        const li = document.createElement("li")
        li.className = 'laps-item'
        li.innerHTML = `<span>Коло ${listLaps.length + 1}</span> ${timer.textContent}`
        laps.appendChild(li);
    } else {
        clearInterval(interval);
        timer.innerHTML = '00:00:00';
        btnStart.textContent = 'Start';
        btnLap.textContent = 'Lap';
        laps.textContent = '';
        elapsedTime = 0;
    }
}

btnStart.addEventListener('click', toggleStartStop);
btnLap.addEventListener('click', handleLapReset);











