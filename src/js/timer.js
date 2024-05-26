import { reload } from './main.js';
import { displayStatistic } from './statistic.js';

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
        this.isStart = false;
    }

    start() {
        this.isStart = true;

        this.intervalId = setInterval(() => {
            this.secLeft--;
            if (this.secLeft < 0) {
                displayStatistic();
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
        this.isStart = false;
        this.secLeft = this.sec;
        reloadTimer();
    }
}
