const API_URL = 'https://random-word-api.herokuapp.com';

export const getWords = async (num = 50) => {
    try {
        const data = await fetch(API_URL + `/word?number=${num}`);
        return await data.json();
    } catch (err) {
        console.log(err);
    }
};
