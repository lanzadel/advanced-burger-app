import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://advanced-react-app-78b59.firebaseio.com/'
});

export default instance;