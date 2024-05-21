import { getWords, words } from './api.js';

const fillWords = async () => {
    const field = document.querySelector('.field--wrapper');
    field.innerHTML = '';
    await getWords();
    words.forEach((word) => {
        const div = `<div class="word">${word}</div>`;
        field.insertAdjacentHTML('beforeend', div);
    });
};

window.onload = fillWords;

const printedWords = [];

const clearinput = (input) => {
    input.value = '';
};

const writeInput = document.querySelector('.input-write');

writeInput.addEventListener('input', () => {
    const newWord = writeInput.value;
    if (newWord === ' ') clearinput(writeInput);
    if (newWord.at(-1) === ' ') {
        printedWords.push(newWord.trim());
        clearinput(writeInput);
    }

    const index = printedWords.length;
    if (!words[index].startsWith(newWord)) {
    }
});
