'use strict';

const inputColor = document.querySelector('.input-color');

inputColor.addEventListener('input', () => {
    const color = inputColor.value;
    document.querySelector('.keyboard').style.backgroundColor = color;
});

window.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase();
    const button = document.querySelector(`.keyButton[data-key="${key}"]`);
    if (button) {
        button.classList.add('btn-active');
        setTimeout(() => {
            button.classList.remove('btn-active');
        }, 200);
    }
});
