import axios from 'axios';

const BASE_URL = 'http://gjjsp-backend/'

export default axios.create({
    baseURL: BASE_URL
})
