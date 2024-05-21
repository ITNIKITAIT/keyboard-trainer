const API_URL = `https://random-word-api.herokuapp.com`;

export let words = [];

export const getWords = async (num = 50) => {
    try {
        const data = await fetch(API_URL + `/word?number=${num}`);
        words = await data.json();
    } catch (err) {
        console.log(err);
    }
};
