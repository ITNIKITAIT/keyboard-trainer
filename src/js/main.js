import { getWords } from './api.js';
import { timer } from './timer.js';

export let words = [];
export let printedWords = [];
let isStart = false;
let stopTimer;

const field = document.querySelector('.field');
const writeInput = document.querySelector('.input-write');

const fillWords = async () => {
    field.innerHTML = '';
    const data = await getWords();
    data.map((word) => {
        const div = `<div class="word">${word}</div>`;
        field.insertAdjacentHTML('beforeend', div);
    });
    words = document.querySelectorAll('.word');
    words[0].classList.add('word-current');
};

window.onload = fillWords;

const reload = () => {
    printedWords = [];
    field.style.marginTop = `0px`;
    isStart = false;
    if (stopTimer) stopTimer();
    clearInput(writeInput);
    fillWords();
};
document.querySelector('.btn-reload').addEventListener('click', reload);

const clearInput = (input) => {
    input.value = '';
};
const updateWord = (currWord, newWord) => {
    currWord.classList.add(
        currWord.textContent === newWord ? 'word--correct' : 'word--incorrect'
    );
    currWord.classList.remove('word-current');
};
const checkInput = (currWord, newWord) => {
    if (!currWord.textContent.startsWith(newWord)) {
        currWord.classList.add('word--incorrect');
    } else {
        currWord.classList.remove('word--incorrect');
    }
};
const updateLine = (nextWord) => {
    const maxTop = 120;
    if (nextWord && nextWord.getBoundingClientRect().top > maxTop) {
        const margin = parseInt(field.style.marginTop || 0);
        const lineHeight = 58;
        field.style.marginTop = margin - lineHeight + 'px';
    }
};

writeInput.addEventListener('input', () => {
    const newWord = writeInput.value;

    if (newWord === ' ') {
        clearInput(writeInput);
        return;
    }

    if (!isStart) {
        isStart = true;
        stopTimer = timer(10);
    }

    const index = printedWords.length;
    const currWord = words[index];

    if (newWord.at(-1) === ' ') {
        const trimmedWord = newWord.trim();

        printedWords.push(trimmedWord);
        updateWord(currWord, trimmedWord);

        const nextWord = words[index + 1];
        nextWord.classList.add('word-current');

        updateLine(nextWord);

        clearInput(writeInput);
        return;
    }
    checkInput(currWord, newWord);
});
