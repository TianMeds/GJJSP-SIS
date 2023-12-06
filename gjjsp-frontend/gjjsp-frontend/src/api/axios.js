import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://gjjsp-backend'
})

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Authorization'] = 'Bearer';

export default instance;    