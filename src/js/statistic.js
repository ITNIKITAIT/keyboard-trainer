export const getStatistic = (words, printedWords) => {
    let correctWords = 0;
    let wrongWords = 0;
    let LettersTotal = 0;
    let correctLetters = 0;
    printedWords.forEach((word, i) => {
        const needWord = words[i].textContent;
        word === needWord ? correctWords++ : wrongWords++;

        for (let j = 0; j < needWord.length; j++) {
            if (word[j] === needWord[j]) correctLetters++;
        }

        LettersTotal += needWord.length;
    });

    const accuracy = Math.round((correctLetters / LettersTotal) * 10000) / 100;

    const wpm = correctLetters / 5 || 0;

    document.getElementById('wpm').innerHTML = wpm + ' WPM';
    document.getElementById('accuracy').innerHTML = accuracy + '%';
    document.getElementById('correct-words').innerHTML = correctWords;
    document.getElementById('wrong-words').innerHTML = wrongWords;
};
