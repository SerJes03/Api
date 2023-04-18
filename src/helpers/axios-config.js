import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:'https://back-jess-iud.herokuapp.com/api/'

});

export {axiosInstance}