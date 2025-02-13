import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

export const getProducts = () => api.get('/products/');
export const getProductById = (id) => api.get(`/products/${id}/`);