let countdown;
const timeDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const button = document.querySelectorAll("[data-time]");

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now(); //currentTime in milli scnd
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    //stop on condition
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    //display
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const reminaderSeconds = seconds % 60;

  const display = `${minutes}:${
    reminaderSeconds < 10 ? "0" : ""
  }${reminaderSeconds}`;
  timeDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(timesteamp) {
  const end = new Date(timesteamp);
  const hours = end.getHours();
  const abjustHour = hours > 12 ? hours - 12 : hours;
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${abjustHour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

button.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const min = this.minutes.value;
    timer(min * 60);
    this.reset();
});

