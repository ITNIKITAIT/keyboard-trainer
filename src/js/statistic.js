import { getWpmRecord, saveResult } from './localStorage.js';
import { printedWords, globalWords } from './main.js';

export const updateWpm = () => {
    document.getElementById('record').innerHTML = getWpmRecord() + ' WPM';
};

export const getStatistic = () => {
    let correctWords = 0;
    let wrongWords = 0;
    let LettersTotal = 0;
    let correctLetters = 0;
    printedWords.forEach((word, i) => {
        const needWord = globalWords[i].textContent;
        word === needWord ? correctWords++ : wrongWords++;

        for (let j = 0; j < needWord.length; j++) {
            if (word[j] === needWord[j]) correctLetters++;
        }

        LettersTotal += needWord.length;
    });

    // formula for ccuracy
    const accuracy = Math.round((correctLetters / LettersTotal) * 10000) / 100;

    // formula for wpm
    const wpm = correctLetters / 5 || 0;

    if (wpm > getWpmRecord()) {
        saveResult('wpm', wpm);
        updateWpm();
    }
    return {
        correctWords,
        accuracy,
        wpm,
        wrongWords,
        correctLetters,
        LettersTotal,
    };
};

export const displayStatistic = () => {
    const {
        correctWords,
        accuracy,
        wpm,
        wrongWords,
        correctLetters,
        LettersTotal,
    } = getStatistic();
    document.getElementById('wpm').innerHTML = wpm + ' WPM';
    document.getElementById('accuracy').innerHTML = accuracy + '%';
    document.getElementById('correct-words').innerHTML = correctWords;
    document.getElementById('wrong-words').innerHTML = wrongWords;
    document.getElementById('correct-clicks').innerHTML = correctLetters;
    document.getElementById('incorrect-clicks').innerHTML =
        LettersTotal - correctLetters;
    document.getElementById('total-clicks').innerHTML = LettersTotal;
};
