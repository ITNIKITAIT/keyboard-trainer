import { printedWords, words, reload } from './main.js';
import { getStatistic } from './statistic.js';

const timerBar = document.querySelector('.timer-bar__content');
const time = document.querySelector('.time');

const reloadTimer = () => {
    time.textContent = '1:00';
    timerBar.style.width = '100%';
};

export class Timer {
    constructor(sec) {
        this.sec = sec;
        this.secLeft = sec;
        this.intervalId = null;
    }

    start() {
        this.intervalId = setInterval(() => {
            this.secLeft--;
            if (this.secLeft < 0) {
                getStatistic(words, printedWords);
                this.stop();
                reload();
                return;
            }
            timerBar.style.width = (this.secLeft / this.sec) * 100 + '%';
            time.textContent = `0:${
                this.secLeft < 10 ? '0' + this.secLeft : this.secLeft
            }`;
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        reloadTimer();
    }
}
