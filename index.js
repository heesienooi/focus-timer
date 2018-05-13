const notifier = require('node-notifier');
const args = process.argv.slice(2);
const minutes = (mins) => 1000 * 60 * mins;

let timerInterval;

if (args[0] === '-h' || args['--help']) {
  console.log('focus-timer will creates a timer based on the time specify.')
  console.log('Usage: focus-timer [minutes]');
  return;
}

// Read first argument from cli and parse to minutes else default to 20 mins
let countdownTime = parseInt(args[0]) || 20;

console.log(`Start ${countdownTime} mins timer`);

const counter = () => {
  if (countdownTime <= 0) {
    notifier.notify({
      message: 'Time\'s up! Take rest and continue.',
      closeLabel: 'close',
    });
    clearInterval(timerInterval);
  }

  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(`${countdownTime--} mins`);
};

const startTimer = () => {
    counter();
    timerInterval = setInterval(counter, minutes(1));
}

startTimer();
