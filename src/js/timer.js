import { printedWords, words } from './main.js';
import { getStatistic } from './statistic.js';

const timerBar = document.querySelector('.timer-bar__content');
const time = document.querySelector('.time');

export const timer = (s) => {
    let secLeft = s;
    const interval = setInterval(() => {
        secLeft--;
        if (secLeft < 0) {
            clearInterval(interval);
            getStatistic(words, printedWords);
            return;
        }
        timerBar.style.width = (secLeft / s) * 100 + '%';
        time.textContent = `0:${secLeft < 10 ? '0' + secLeft : secLeft}`;
    }, 1000);
    return () => {
        clearInterval(interval);
        time.textContent = '1:00';
        timerBar.style.width = '100%';
    };
};
