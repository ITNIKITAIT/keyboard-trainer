import { getWords } from './api.js';
import {
    setButtonClickEvent,
    setInputColor,
    setKeyboardEvent,
} from './keyboard.js';
import { Timer } from './timer.js';
import { updateWpm } from './statistic.js';

export let globalWords = [];
export let printedWords = [];

const SECONDS = 60;
const timer = new Timer(SECONDS);

const field = document.querySelector('.field');
const writeInput = document.querySelector('.input-write');

const printWords = words => {
    words.forEach(word => {
        const div = `<div class="word">${word}</div>`;
        field.insertAdjacentHTML('beforeend', div);
    });
    globalWords = document.querySelectorAll('.word');
};

const addMoreWords = async num => {
    const data = await getWords(num);
    printWords(data);
};

const fillField = async () => {
    const loader = document.querySelector('.loader');
    const fieldWpapper = document.querySelector('.field--wrapper');
    fieldWpapper.style.display = 'none';
    loader.style.display = 'block';
    field.innerHTML = '';

    const numWords = 50;
    const data = await getWords(numWords);
    printWords(data);

    fieldWpapper.style.display = 'block';
    loader.style.display = 'none';

    globalWords[0].classList.add('word-current');
};

const clearInput = input => (input.value = '');

const updateWord = (currWord, newWord) => {
    currWord.classList.add(
        currWord.textContent === newWord ? 'word--correct' : 'word--incorrect'
    );
    currWord.classList.remove('word-current');

    if (printedWords.length > globalWords.length / 2) {
        const extraWordsCount = 30;
        addMoreWords(extraWordsCount);
    }
};
const checkInput = (currWord, newWord) => {
    if (!currWord.textContent.startsWith(newWord)) {
        currWord.classList.add('word--incorrect');
    } else {
        currWord.classList.remove('word--incorrect');
    }
};
const updateLine = nextWord => {
    const maxTop = 120;
    if (nextWord && nextWord.getBoundingClientRect().top > maxTop) {
        const margin = parseInt(field.style.marginTop || 0);
        const lineHeight = 58;
        field.style.marginTop = margin - lineHeight + 'px';
    }
};

export const reload = () => {
    printedWords = [];
    field.style.marginTop = '0px';
    clearInput(writeInput);
    fillField();

    if (timer) timer.stop();
};
document.querySelector('.btn-reload').addEventListener('click', reload);

writeInput.addEventListener('input', () => {
    const newWord = writeInput.value;

    if (newWord === ' ') {
        clearInput(writeInput);
        return;
    }

    if (!timer.isStart) {
        timer.start();
    }

    const index = printedWords.length;
    const currWord = globalWords[index];

    if (newWord.at(-1) === ' ') {
        const trimmedWord = newWord.trim();

        printedWords.push(trimmedWord);
        updateWord(currWord, trimmedWord);

        const nextWord = globalWords[index + 1];
        nextWord.classList.add('word-current');

        updateLine(nextWord);

        clearInput(writeInput);
        return;
    }

    checkInput(currWord, newWord);
});

window.onload = () => {
    fillField();
    setButtonClickEvent();
    setInputColor();
    setKeyboardEvent();
    updateWpm();
};
