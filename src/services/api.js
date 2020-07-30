import axios from 'axios';

// trata automaticamente as variáveis de ambiente
require('dotenv').config()

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export default api;