import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-8ab50.firebaseio.com'
});

export default instance;