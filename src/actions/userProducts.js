import axios from 'axios'
import { URL, GET_USER_PRODUCTS, GET_USER_PRODUCTS_ERROR } from './types';

export const getUserProducts = (tokenId, sellerId) => async dispatch => {

    try {
        const res = await axios.get(`${URL}/products/${sellerId}`, {
            headers: {
                Authorization: tokenId
            }
        });
        dispatch({
            type: GET_USER_PRODUCTS,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: GET_USER_PRODUCTS_ERROR,
            payload: err
        })
    }
}