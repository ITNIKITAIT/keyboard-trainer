export const getWpmRecord = () => {
    const wpm = localStorage.getItem('wpm');
    return JSON.parse(wpm) || 0;
};

export const saveResult = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};
