let timeLeft;
let timerId = null;
let totalTime; // To track the original starting time for the progress ring
const ring = document.getElementById('progress');
const workInput = document.getElementById('workInput');
const timeDisplay = document.getElementById('time');
const circumference = 2 * Math.PI * 90;

// Initialize the ring
ring.style.strokeDasharray = circumference;

function updateDisplay(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const formattedTime = `${mins}:${secs.toString().padStart(2, '0')}`;
    
    timeDisplay.textContent = formattedTime;
    document.title = `(${formattedTime}) FocusFlow`; // Updates browser tab!
    
    // Calculate progress (from 0 to circumference)
    const progress = seconds / totalTime;
    const offset = circumference - (progress * circumference);
    ring.style.strokeDashoffset = offset;
}

function startTimer() {
    if (timerId) return; // Prevent double-clicking start
    
    // If we're starting fresh, set the total time
    if (!timeLeft) {
        timeLeft = workInput.value * 60;
        totalTime = timeLeft;
    }
    
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);
        
        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerId = null;
            alert("Work session complete!");
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerId);
    timerId = null; // Simply clears interval; timeLeft remains where it was
}

function resetTimer() {
    stopTimer();
    timeLeft = workInput.value * 60;
    totalTime = timeLeft;
    updateDisplay(timeLeft);
}

// Event Listeners
document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);