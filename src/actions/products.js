import axios from 'axios'
import { URL, GET_PRODUCTS, GET_PRODUCTS_ERROR, GET_ALL_PRODUCTS, GET_ALL_PRODUCTS_ERROR } from './types';

export const getProducts = () => async dispatch => {

    try {
        const res = await axios.get(`${URL}/product`);
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: GET_PRODUCTS_ERROR,
            payload: err
        })
    }
}

export const getAllProducts = () => async dispatch => {

    try {
        const res = await axios.get(`${URL}/allproduct`);
        dispatch({
            type: GET_ALL_PRODUCTS,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: GET_ALL_PRODUCTS_ERROR,
            payload: err
        })
    }
}
