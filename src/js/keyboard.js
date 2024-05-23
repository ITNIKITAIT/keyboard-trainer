const inputColor = document.querySelector('.input-color');

const activateButton = btn => {
    btn.classList.add('btn-active');
    setTimeout(() => {
        btn.classList.remove('btn-active');
    }, 200);
};

document.querySelectorAll('.keyButton').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) return;
        activateButton(btn);
    });
});

inputColor.addEventListener('input', () => {
    const keyboard = document.querySelector('.keyboard');
    const color = inputColor.value;
    keyboard.style.backgroundColor = color;
    document.querySelectorAll('.keyButton').forEach(btn => {
        btn.style.color = color;
    });
});

window.addEventListener('keydown', e => {
    const key = e.key.toUpperCase();
    const button = document.querySelector(`.keyButton[data-key="${key}"]`);
    if (button) {
        activateButton(button);
    }
});
