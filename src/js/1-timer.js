import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('[data-start]');
const datetimePicker = document.getElementById('datetime-picker');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let countdownInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      handleInvalidDate();
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
      datetimePicker.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer() {
  const now = new Date();
  const timeRemaining = userSelectedDate - now;

  if (timeRemaining <= 0) {
    clearInterval(countdownInterval);
    startBtn.disabled = true;
    datetimePicker.disabled = false;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeRemaining);

  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}

function handleInvalidDate() {
  iziToast.error({
    title: 'Error',
    message: 'Please choose a date in the future',
    position: 'topCenter',
  });
  startBtn.disabled = true;
  datetimePicker.disabled = false;
}

function initializePage() {
  startBtn.disabled = true;
}

startBtn.addEventListener('click', () => {
  if (userSelectedDate && userSelectedDate > new Date()) {
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }
    countdownInterval = setInterval(updateTimer, 1000);
    startBtn.disabled = true;
    datetimePicker.disabled = true;
  } else {
    handleInvalidDate();
  }
});

initializePage();
