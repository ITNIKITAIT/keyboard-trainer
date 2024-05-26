const activateButton = btn => {
    btn.classList.add('btn-active');
    setTimeout(() => {
        btn.classList.remove('btn-active');
    }, 200);
};
const setKeyboardColor = color => {
    const keyboard = document.querySelector('.keyboard');
    keyboard.style.backgroundColor = color;
    document.querySelectorAll('.keyButton').forEach(btn => {
        btn.style.color = color;
    });
};
export const setButtonClickEvent = () => {
    document.querySelectorAll('.keyButton').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) return;
            activateButton(btn);
        });
    });
};

export const setInputColor = () => {
    const inputColor = document.querySelector('.input-color');
    inputColor.addEventListener('input', () =>
        setKeyboardColor(inputColor.value)
    );
};

export const setKeyboardEvent = () => {
    window.addEventListener('keydown', e => {
        const key = e.key.toUpperCase();
        const button = document.querySelector(`.keyButton[data-key="${key}"]`);
        if (button) {
            activateButton(button);
        }
    });
};
