import axios from 'axios'
import { URL, GET_PRODUCT_DETAILS, GET_PRODUCT_DETAILS_ERROR } from './types';

export const getProductDetails = (tokenId, productId) => async dispatch => {

    try {
        const res = await axios.get(`${URL}/product/${productId}`, {
            headers: {
                Authorization: tokenId
            }
        });
        dispatch({
            type: GET_PRODUCT_DETAILS,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: GET_PRODUCT_DETAILS_ERROR,
            payload: err
        })
    }
}